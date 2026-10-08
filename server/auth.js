const crypto = require('crypto');
const { promisify } = require('util');
const { query } = require('./db');

const scrypt = promisify(crypto.scrypt);
const COOKIE = 'reason_admin_session';
const SESSION_HOURS = Number(process.env.ADMIN_SESSION_HOURS || 12);
const N = 16384, R = 8, P = 1;

// CSRF tokens are derived from the session token, so they survive restarts and need no storage.
// Without SESSION_SECRET a per-boot key is used, which invalidates tokens on every restart.
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.SESSION_SECRET && process.env.NODE_ENV === 'production') {
  console.warn('[auth] SESSION_SECRET is not set; admin sessions will need re-login after every restart.');
}
const CSRF_KEY = crypto.createHmac('sha256', SESSION_SECRET).update('reason-admin-csrf').digest();

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const key = await scrypt(password, salt, 64, { N, r: R, p: P });
  return `scrypt$${N}$${R}$${P}$${salt.toString('base64')}$${key.toString('base64')}`;
}

async function verifyPassword(password, stored) {
  try {
    const [alg, n, r, p, salt, hash] = String(stored).split('$');
    if (alg !== 'scrypt') return false;
    const expected = Buffer.from(hash, 'base64');
    const key = await scrypt(password, Buffer.from(salt, 'base64'), expected.length, { N: +n, r: +r, p: +p });
    return crypto.timingSafeEqual(key, expected);
  } catch { return false; }
}

// Used so a login for an unknown email takes the same time as a real one.
const DUMMY_HASH = 'scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$' + Buffer.alloc(64).toString('base64');

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

function issueCsrfToken(tokenHash) {
  return crypto.createHmac('sha256', CSRF_KEY).update(tokenHash).digest('hex');
}

function verifyCsrfToken(tokenHash, providedToken) {
  if (typeof providedToken !== 'string' || providedToken.length !== 64) return false;
  const expected = Buffer.from(issueCsrfToken(tokenHash), 'hex');
  const provided = Buffer.from(providedToken, 'hex');
  return provided.length === expected.length && crypto.timingSafeEqual(provided, expected);
}

function parseCookies(header) {
  const out = {};
  String(header || '').split(';').forEach((part) => {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  });
  return out;
}

function cookieSecure() {
  const v = process.env.COOKIE_SECURE;
  if (v !== undefined && v !== '') return String(v).toLowerCase() === 'true';
  return process.env.NODE_ENV === 'production';
}

function setSessionCookie(res, token, maxAgeSec) {
  const parts = [`${COOKIE}=${encodeURIComponent(token)}`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${maxAgeSec}`];
  if (cookieSecure()) parts.push('Secure');
  res.append('Set-Cookie', parts.join('; '));
}
const clearSessionCookie = (res) => setSessionCookie(res, '', 0);

async function createSession(res, userId, meta) {
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = sha256(token);
  await query('DELETE FROM sessions WHERE expires_at < now()');
  const ipHash = meta?.ip ? sha256(String(meta.ip)) : null;
  const userAgent = meta?.userAgent ? String(meta.userAgent).slice(0, 512) : null;
  await query(
    `INSERT INTO sessions (token_hash, user_id, expires_at, ip_hash, user_agent) VALUES ($1, $2, now() + ($3 || ' hours')::interval, $4, $5)`,
    [tokenHash, userId, String(SESSION_HOURS), ipHash, userAgent]
  );
  const csrfToken = issueCsrfToken(tokenHash);
  setSessionCookie(res, token, SESSION_HOURS * 3600);
  return { tokenHash, csrfToken };
}

async function updateSessionMetadata(tokenHash, meta) {
  const ipHash = meta?.ip ? sha256(String(meta.ip)) : null;
  const userAgent = meta?.userAgent ? String(meta.userAgent).slice(0, 512) : null;
  await query(
    `UPDATE sessions SET ip_hash = COALESCE($2, ip_hash), user_agent = COALESCE($3, user_agent) WHERE token_hash = $1`,
    [tokenHash, ipHash, userAgent]
  );
}

async function destroySession(req, res) {
  const token = parseCookies(req.headers.cookie)[COOKIE];
  if (token) {
    const tokenHash = sha256(token);
    await query('DELETE FROM sessions WHERE token_hash = $1', [tokenHash]);
  }
  clearSessionCookie(res);
}

async function getUser(req) {
  const token = parseCookies(req.headers.cookie)[COOKIE];
  if (!token) return null;
  const tokenHash = sha256(token);
  const { rows } = await query(
    `SELECT u.id, u.email, u.name, u.role
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = $1 AND s.expires_at > now() AND u.active`,
    [tokenHash]
  );
  if (rows[0]) {
    await query(`UPDATE sessions SET last_used_at = now() WHERE token_hash = $1`, [tokenHash]);
  }
  return rows[0] || null;
}
function getCsrfToken(req) {
  const token = parseCookies(req.headers.cookie)[COOKIE];

  if (!token) return null;

  const tokenHash = sha256(token);

  return issueCsrfToken(tokenHash);
}

async function cleanupExpiredSessions() {
  await query(`DELETE FROM sessions WHERE expires_at < now() OR (revoked_at IS NOT NULL AND revoked_at < now() - interval '7 days')`);
}

async function requireAuth(req, res, next) {
  try {
    const user = await getUser(req);
    if (!user) return res.status(401).json({ message: 'Please sign in to continue.' });
    req.user = user;
    next();
  } catch (err) { next(err); }
}

// Basic CSRF defence for cookie auth: browsers send Origin on cross-site POST/PATCH.
function sameOrigin(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const origin = req.headers.origin;

  // Some requests may not include Origin.
  if (!origin) {
    return next();
  }

  try {
    const originUrl = new URL(origin);

    // Production: strict same-origin check.
    if (process.env.NODE_ENV === 'production') {
      const forwardedHost =
        req.headers['x-forwarded-host'] ||
        req.headers.host;

      if (originUrl.host !== forwardedHost) {
        return res.status(403).json({ message: 'Request blocked.' });
      }

      return next();
    }

    // Development:
    // Browser -> Next.js :3000 -> Express :8000
    const allowedDevOrigins = new Set([
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ]);

    if (allowedDevOrigins.has(origin)) {
      return next();
    }

    // Also allow direct local Express requests when applicable.
    const requestHost = req.headers.host;

    if (
      originUrl.host === requestHost ||
      originUrl.host === 'localhost:8000' ||
      originUrl.host === '127.0.0.1:8000'
    ) {
      return next();
    }

    return res.status(403).json({ message: 'Request blocked.' });
  } catch {
    return res.status(403).json({ message: 'Request blocked.' });
  }
}


function requireCsrf(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const token = parseCookies(req.headers.cookie)[COOKIE];
  if (!token) return res.status(403).json({ message: 'CSRF check failed.' });
  const tokenHash = sha256(token);
  const provided = req.headers['x-csrf-token'];
  if (!verifyCsrfToken(tokenHash, provided)) {
    return res.status(403).json({ message: 'CSRF check failed.' });
  }
  next();
}
module.exports = {
  hashPassword,
  verifyPassword,
  DUMMY_HASH,
  createSession,
  updateSessionMetadata,
  destroySession,
  getUser,
  getCsrfToken,
  requireAuth,
  sameOrigin,
  requireCsrf,
  cleanupExpiredSessions,
  issueCsrfToken,
  verifyCsrfToken,
};