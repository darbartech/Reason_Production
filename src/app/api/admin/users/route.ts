import { query } from '@/lib/server/db';
import { hashPassword } from '@/lib/server/password';
import { USER_COLS, mapUser, resolvePassword, validEmail, validRole, type StaffRow } from '@/lib/server/staff';
import { fail, json } from '@/lib/server/http';
import { requireAdminRole, runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  return runAdmin(req, {}, async ({ user }) => {
    const denied = requireAdminRole(user);
    if (denied) return denied;
    const { rows } = await query<StaffRow>(`SELECT ${USER_COLS} FROM users ORDER BY active DESC, role ASC, name ASC`);
    return json({ users: rows.map(mapUser) });
  });
}

export async function POST(req: Request) {
  return runAdmin(req, { bodyLimit: 50 * 1024 }, async ({ user, body: b }) => {
    const denied = requireAdminRole(user);
    if (denied) return denied;

    const email = String(b.email || '').trim().toLowerCase();
    const name = String(b.name || '').trim();
    const role = String(b.role || '').trim().toUpperCase();

    if (!validEmail(email)) return fail(400, 'Enter a valid email address.');
    if (!name || name.length > 120) return fail(400, 'Enter a name (max 120 characters).');
    if (!validRole(role)) return fail(400, 'Choose a valid role.');

    const pw = resolvePassword(b.password);
    if ('error' in pw) return fail(400, pw.error);

    const exists = await query(`SELECT 1 FROM users WHERE lower(email) = $1`, [email]);
    if (exists.rows[0]) return fail(409, 'A staff account with that email already exists.');

    const hash = await hashPassword(pw.password);
    const { rows } = await query<StaffRow>(
      `INSERT INTO users (email, name, role, password_hash) VALUES ($1,$2,$3,$4) RETURNING ${USER_COLS}`,
      [email, name, role, hash]
    );
    return json({ user: mapUser(rows[0]), temporaryPassword: pw.generated ? pw.password : null }, 201);
  });
}
