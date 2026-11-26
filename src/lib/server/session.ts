import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { query } from './db';

export const SESSION_COOKIE = 'reason_admin_session';

const SESSION_HOURS_RAW = Number(process.env.ADMIN_SESSION_HOURS || 12);
export const SESSION_HOURS =
  Number.isFinite(SESSION_HOURS_RAW) && SESSION_HOURS_RAW > 0 && SESSION_HOURS_RAW <= 168
    ? SESSION_HOURS_RAW
    : 12;
if (SESSION_HOURS !== SESSION_HOURS_RAW) {
  console.warn('[auth] ADMIN_SESSION_HOURS must be between 1 and 168; using 12.');
}

// CSRF tokens are derived from the session token, so they survive restarts and need no storage.
// Without SESSION_SECRET a per-boot key is used, which invalidates tokens on every restart.
const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString('hex');
if (!process.env.SESSION_SECRET && process.env.NODE_ENV === 'production') {
  console.error(
    '[auth] SESSION_SECRET is not set. Set a stable random value (openssl rand -hex 32) or every restart invalidates admin CSRF tokens and forces re-login.'
  );
}
const CSRF_KEY = createHmac('sha256', SESSION_SECRET).update('reason-admin-csrf').digest();

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

export function issueCsrfToken(tokenHash: string) {
  return createHmac('sha256', CSRF_KEY).update(tokenHash).digest('hex');
}

export function verifyCsrfToken(tokenHash: string, providedToken: unknown) {
  if (typeof providedToken !== 'string' || providedToken.length !== 64) return false;
  const expected = Buffer.from(issueCsrfToken(tokenHash), 'hex');
  const provided = Buffer.from(providedToken, 'hex');
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

function cookieSecure() {
  const v = process.env.COOKIE_SECURE;
  if (v !== undefined && v !== '') return String(v).toLowerCase() === 'true';
  return process.env.NODE_ENV === 'production';
}

export function sessionCookie(token: string, maxAgeSec: number) {
  const parts = [`${SESSION_COOKIE}=${encodeURIComponent(token)}`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${maxAgeSec}`];
  if (cookieSecure()) parts.push('Secure');
  return parts.join('; ');
}

export const clearSessionCookie = () => sessionCookie('', 0);

export function readSessionToken(req: Request) {
  const header = req.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i <= 0) continue;
    if (part.slice(0, i).trim() !== SESSION_COOKIE) continue;
    const raw = part.slice(i + 1).trim();
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
  return null;
}

export interface StaffUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'COUNSELOR';
}

export async function createSession(
  userId: string,
  meta?: { ip?: string | null; userAgent?: string | null }
): Promise<{ tokenHash: string; csrfToken: string; cookie: string }> {
  const token = randomBytes(32).toString('base64url');
  const tokenHash = sha256(token);
  await query(
    `DELETE FROM sessions WHERE expires_at < now() OR (revoked_at IS NOT NULL AND revoked_at < now() - interval '7 days')`
  );
  const ipHash = meta?.ip ? sha256(String(meta.ip)) : null;
  const userAgent = meta?.userAgent ? String(meta.userAgent).slice(0, 512) : null;
  await query(
    `INSERT INTO sessions (token_hash, user_id, expires_at, ip_hash, user_agent) VALUES ($1, $2, now() + ($3 || ' hours')::interval, $4, $5)`,
    [tokenHash, userId, String(SESSION_HOURS), ipHash, userAgent]
  );
  return { tokenHash, csrfToken: issueCsrfToken(tokenHash), cookie: sessionCookie(token, SESSION_HOURS * 3600) };
}

export async function updateSessionMetadata(
  tokenHash: string,
  meta?: { ip?: string | null; userAgent?: string | null }
) {
  const ipHash = meta?.ip ? sha256(String(meta.ip)) : null;
  const userAgent = meta?.userAgent ? String(meta.userAgent).slice(0, 512) : null;
  await query(
    `UPDATE sessions SET ip_hash = COALESCE($2, ip_hash), user_agent = COALESCE($3, user_agent) WHERE token_hash = $1`,
    [tokenHash, ipHash, userAgent]
  );
}

export async function getUserByToken(token: string | null | undefined): Promise<StaffUser | null> {
  if (!token) return null;
  const tokenHash = sha256(token);
  const { rows } = await query<StaffUser>(
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

export async function getUser(req: Request): Promise<StaffUser | null> {
  return getUserByToken(readSessionToken(req));
}

export async function destroySession(req: Request) {
  const token = readSessionToken(req);
  if (token) {
    await query('DELETE FROM sessions WHERE token_hash = $1', [sha256(token)]);
  }
  return clearSessionCookie();
}

export function getCsrfToken(req: Request) {
  const token = readSessionToken(req);
  if (!token) return null;
  return issueCsrfToken(sha256(token));
}

export function checkCsrf(req: Request) {
  const token = readSessionToken(req);
  if (!token) return false;
  return verifyCsrfToken(sha256(token), req.headers.get('x-csrf-token'));
}
