import { query } from '@/lib/server/db';
import { verifyPassword, DUMMY_HASH } from '@/lib/server/password';
import { createSession, updateSessionMetadata } from '@/lib/server/session';
import { clientIp, fail, json, sameOrigin } from '@/lib/server/http';
import { rateLimit } from '@/lib/server/rate-limit';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail(403, 'Request blocked.');

  const ip = clientIp(req);

  return runAdmin(
    req,
    { skipAuth: true, bodyLimit: 50 * 1024 },
    async ({ body }) => {
      const email = String(body.email || '').trim().toLowerCase().slice(0, 254);
      const password = String(body.password || '').slice(0, 200);

      const verdict = rateLimit(`login-ip|${ip}`, 15 * 60 * 1000, 30);
      if (!verdict.ok) {
        return fail(429, 'Too many sign-in attempts from your network. Please wait a few minutes and try again.', {}, {
          'Retry-After': String(verdict.retryAfterSec),
        });
      }
      const perAccount = rateLimit(`login|${ip}|${email}`, 15 * 60 * 1000, 10);
      if (!perAccount.ok) {
        return fail(429, 'Too many sign-in attempts. Please wait a few minutes and try again.', {}, {
          'Retry-After': String(perAccount.retryAfterSec),
        });
      }

      const { rows } = await query<{ id: string; email: string; name: string; role: 'ADMIN' | 'COUNSELOR'; password_hash: string }>(
        `SELECT id, email, name, role, password_hash FROM users WHERE lower(email) = $1 AND active`,
        [email]
      );
      const u = rows[0];
      // Constant-ish time: an unknown email still costs a scrypt run.
      const ok = await verifyPassword(password, u ? u.password_hash : DUMMY_HASH);
      if (!u || !ok) return fail(401, 'Incorrect email or password.');

      const { tokenHash, csrfToken, cookie } = await createSession(u.id);
      await updateSessionMetadata(tokenHash, { ip, userAgent: req.headers.get('user-agent') });
      await query('UPDATE users SET last_login_at = now() WHERE id = $1', [u.id]);

      return json(
        { user: { id: u.id, email: u.email, name: u.name, role: u.role }, csrfToken },
        200,
        { 'Set-Cookie': cookie }
      );
    }
  );
}
