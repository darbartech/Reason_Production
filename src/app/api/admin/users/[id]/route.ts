import { tx } from '@/lib/server/db';
import { UUID_RE } from '@/lib/server/enquiries';
import { USER_COLS, countActiveAdmins, mapUser, validRole, type StaffRow } from '@/lib/server/staff';
import { fail, json } from '@/lib/server/http';
import { requireAdminRole, runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return runAdmin(req, { bodyLimit: 50 * 1024 }, async ({ user, body: b }) => {
    const denied = requireAdminRole(user);
    if (denied) return denied;
    if (!UUID_RE.test(id)) return fail(404, 'Staff account not found.');

    const out = await tx(async (c) => {
      const cur = (await c.query<StaffRow>(`SELECT ${USER_COLS} FROM users WHERE id = $1 FOR UPDATE`, [id])).rows[0];
      if (!cur) return { status: 404, body: { message: 'Staff account not found.' } };

      const sets: string[] = [];
      const vals: unknown[] = [];
      const set = (col: string, v: unknown) => {
        vals.push(v);
        sets.push(`${col} = $${vals.length}`);
      };
      const self = cur.id === user.id;

      if ('name' in b) {
        const name = String(b.name || '').trim();
        if (!name || name.length > 120) return { status: 400, body: { message: 'Enter a name (max 120 characters).' } };
        if (name !== cur.name) set('name', name);
      }

      if ('role' in b) {
        const role = String(b.role || '').trim().toUpperCase();
        if (!validRole(role)) return { status: 400, body: { message: 'Choose a valid role.' } };
        if (role !== cur.role) {
          if (self) return { status: 400, body: { message: 'You cannot change your own role.' } };
          if (cur.role === 'ADMIN' && cur.active && (await countActiveAdmins(c)) <= 1) {
            return { status: 400, body: { message: 'At least one active admin is required.' } };
          }
          set('role', role);
        }
      }

      let lockedOut = false;
      if ('active' in b) {
        const active = b.active === true;
        if (active !== cur.active) {
          if (!active) {
            if (self) return { status: 400, body: { message: 'You cannot deactivate your own account.' } };
            if (cur.role === 'ADMIN' && (await countActiveAdmins(c)) <= 1) {
              return { status: 400, body: { message: 'At least one active admin is required.' } };
            }
          }
          set('active', active);
          lockedOut = !active;
        }
      }

      if (!sets.length) return { status: 200, body: { user: mapUser(cur) } };

      vals.push(id);
      const { rows } = await c.query<StaffRow>(
        `UPDATE users SET ${sets.join(', ')} WHERE id = $${vals.length} RETURNING ${USER_COLS}`,
        vals as any[]
      );
      // Deactivation must take effect immediately rather than at cookie expiry.
      if (lockedOut) await c.query('DELETE FROM sessions WHERE user_id = $1', [id]);
      return { status: 200, body: { user: mapUser(rows[0]) } };
    });

    return json(out.body, out.status);
  });
}
