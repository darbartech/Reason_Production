import { query } from '@/lib/server/db';
import { hashPassword } from '@/lib/server/password';
import { UUID_RE } from '@/lib/server/enquiries';
import { resolvePassword } from '@/lib/server/staff';
import { fail, json } from '@/lib/server/http';
import { requireAdminRole, runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return runAdmin(req, { bodyLimit: 50 * 1024 }, async ({ user, body: b }) => {
    const denied = requireAdminRole(user);
    if (denied) return denied;
    if (!UUID_RE.test(id)) return fail(404, 'Staff account not found.');

    const pw = resolvePassword(b.password);
    if ('error' in pw) return fail(400, pw.error);

    const hash = await hashPassword(pw.password);
    const { rows } = await query(`UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING id`, [hash, id]);
    if (!rows[0]) return fail(404, 'Staff account not found.');

    // Any session still holding the old password must be dropped.
    await query('DELETE FROM sessions WHERE user_id = $1', [id]);
    return json({ ok: true, temporaryPassword: pw.generated ? pw.password : null });
  });
}
