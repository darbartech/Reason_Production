import { query, tx } from '@/lib/server/db';
import { PRIORITIES, STATUSES } from '@/lib/server/constants';
import { SELECT_ENQ, UUID_RE, loadDetail, poolRunner, scopeSql } from '@/lib/server/enquiries';
import { fail, json } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

const NOT_FOUND = { status: 404, body: { message: 'Enquiry not found.' } } as const;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return runAdmin(req, {}, async ({ user }) => {
    const d = await loadDetail(poolRunner(), id, user);
    if (!d) return fail(404, 'Enquiry not found.');
    return json(d);
  });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return runAdmin(req, { bodyLimit: 50 * 1024 }, async ({ user, body: b }) => {
    if (!UUID_RE.test(id)) return fail(404, 'Enquiry not found.');

    const out = await tx(async (c) => {
      const runner = poolRunner(c);
      const lockParams: unknown[] = [id];
      const lockScope = scopeSql(user, lockParams);
      const found = await c.query(
        `${SELECT_ENQ} WHERE e.id = $1 ${lockScope ? 'AND ' + lockScope : ''} FOR UPDATE OF e`,
        lockParams as any[]
      );
      const cur = found.rows[0];
      if (!cur) return NOT_FOUND;

      const sets: string[] = [];
      const vals: unknown[] = [];
      const events: [string, Record<string, unknown>][] = [];
      const set = (col: string, v: unknown) => {
        vals.push(v);
        sets.push(`${col} = $${vals.length}`);
      };
      const isAdminUser = user.role === 'ADMIN';

      if ('status' in b && b.status !== cur.status) {
        if (!STATUSES.includes(b.status)) return { status: 400, body: { message: 'Invalid status.' } };
        set('status', b.status);
        events.push(['STATUS_CHANGED', { from: cur.status, to: b.status }]);
      }
      if ('priority' in b && b.priority !== cur.priority) {
        if (!PRIORITIES.includes(b.priority)) return { status: 400, body: { message: 'Invalid priority.' } };
        set('priority', b.priority);
        events.push(['PRIORITY_CHANGED', { from: cur.priority, to: b.priority }]);
      }
      if ('assignedTo' in b) {
        const to = b.assignedTo || null;
        if (to !== (cur.assigned_to || null)) {
          if (to !== null && !UUID_RE.test(to)) return { status: 400, body: { message: 'Invalid counselor.' } };
          if (!isAdminUser && to !== null && to !== user.id) {
            return { status: 403, body: { message: 'You can only assign leads to yourself.' } };
          }
          if (!isAdminUser && to === null && cur.assigned_to !== user.id) {
            return { status: 403, body: { message: 'You can only unassign your own leads.' } };
          }
          let toName: string | null = null;
          if (to) {
            const u = (await c.query('SELECT name FROM users WHERE id = $1 AND active', [to])).rows[0];
            if (!u) return { status: 400, body: { message: 'That counselor does not exist or is inactive.' } };
            toName = u.name;
          }
          set('assigned_to', to);
          events.push(['ASSIGNED', { from: cur.assigned_name || null, to: toName }]);
        }
      }
      if ('nextFollowUpAt' in b) {
        let to: string | null = null;
        if (b.nextFollowUpAt) {
          const d = new Date(b.nextFollowUpAt);
          if (Number.isNaN(d.getTime())) return { status: 400, body: { message: 'Invalid follow-up date.' } };
          to = d.toISOString();
        }
        const from = cur.next_follow_up_at ? new Date(cur.next_follow_up_at).toISOString() : null;
        if (to !== from) {
          set('next_follow_up_at', to);
          events.push(['FOLLOW_UP_SET', { from, to }]);
        }
      }

      if (sets.length) {
        vals.push(id);
        await c.query(`UPDATE student_enquiries SET ${sets.join(', ')}, updated_at = now() WHERE id = $${vals.length}`, vals as any[]);
        for (const [type, detail] of events) {
          await c.query(
            `INSERT INTO enquiry_events (enquiry_id, type, actor_id, actor_name, detail) VALUES ($1,$2,$3,$4,$5)`,
            [id, type, user.id, user.name, JSON.stringify(detail)]
          );
        }
      }
      return { status: 200, body: await loadDetail(runner, id, user) };
    });

    return json(out.body, out.status);
  });
}
