import { query } from '@/lib/server/db';
import { hashPassword, verifyPassword } from '@/lib/server/password';
import { createSession } from '@/lib/server/session';
import { fail, json } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

// Self-service password change: any signed-in staff member, for their own account only.
export async function POST(req: Request) {
  return runAdmin(req, { bodyLimit: 50 * 1024 }, async ({ user, ip, body }) => {
    const current = typeof body.currentPassword === 'string' ? body.currentPassword : '';
    const next = typeof body.newPassword === 'string' ? body.newPassword : '';

    if (!current) return fail(400, 'Enter your current password.');
    if (next.length < 8) return fail(400, 'New password must be at least 8 characters.');
    if (next.length > 200) return fail(400, 'Password is too long.');
    if (next === current) return fail(400, 'Your new password must be different from the current one.');

    const { rows } = await query<{ password_hash: string }>(
      'SELECT password_hash FROM users WHERE id = $1',
      [user.id]
    );
    const stored = rows[0]?.password_hash;
    if (!stored) return fail(404, 'Account not found.');
    if (!(await verifyPassword(current, stored))) {
      return fail(400, 'Your current password is incorrect.');
    }

    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [await hashPassword(next), user.id]);

    // Rotate the session: other devices are signed out, this one continues with a fresh token
    // (and therefore a new CSRF token).
    const { tokenHash, csrfToken, cookie } = await createSession(user.id, {
      ip,
      userAgent: req.headers.get('user-agent'),
    });
    await query('DELETE FROM sessions WHERE user_id = $1 AND token_hash <> $2', [user.id, tokenHash]);

    return json({ ok: true, csrfToken }, 200, { 'Set-Cookie': cookie });
  });
}
