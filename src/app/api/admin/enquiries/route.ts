import { query } from '@/lib/server/db';
import { CLOSED_STATUSES } from '@/lib/server/constants';
import { DATE_RE, SELECT_ENQ, UUID_RE, mapEnquiry, scopeSql } from '@/lib/server/enquiries';
import { json } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 20;

export async function GET(req: Request) {
  return runAdmin(req, {}, async ({ user }) => {
    const q = new URL(req.url).searchParams;
    const p: unknown[] = [];
    const add = (v: unknown) => {
      p.push(v);
      return `$${p.length}`;
    };
    const where: string[] = [];
    const scope = scopeSql(user, p);
    if (scope) where.push(scope);

    const str = (k: string) => (q.get(k) || '').trim();
    if (str('q')) {
      const like = add(`%${str('q').slice(0, 100).replace(/[\\%_]/g, '\\$&')}%`);
      where.push(`(e.full_name ILIKE ${like} OR e.phone ILIKE ${like} OR e.email ILIKE ${like} OR e.lead_number ILIKE ${like})`);
    }
    if (str('status')) where.push(`e.status = ${add(str('status'))}`);
    if (str('country')) where.push(`e.preferred_country = ${add(str('country'))}`);
    if (str('intake')) where.push(`e.preferred_intake = ${add(str('intake'))}`);
    if (str('priority')) where.push(`e.priority = ${add(str('priority'))}`);

    const assigned = str('assigned');
    if (assigned === 'me') where.push(`e.assigned_to = ${add(user.id)}`);
    else if (assigned === 'unassigned') where.push('e.assigned_to IS NULL');
    else if (UUID_RE.test(assigned)) where.push(`e.assigned_to = ${add(assigned)}`);

    if (DATE_RE.test(str('dateFrom'))) where.push(`(e.created_at AT TIME ZONE 'Asia/Kathmandu')::date >= ${add(str('dateFrom'))}::date`);
    if (DATE_RE.test(str('dateTo'))) where.push(`(e.created_at AT TIME ZONE 'Asia/Kathmandu')::date <= ${add(str('dateTo'))}::date`);

    const fu = str('followUp');
    const notClosedFU = () => `(e.status <> ALL(${add(CLOSED_STATUSES)}::text[]))`;
    if (fu === 'due') {
      where.push(`e.next_follow_up_at <= now() AND ${notClosedFU()}`);
    } else if (fu === 'today') {
      where.push(`(e.next_follow_up_at AT TIME ZONE 'Asia/Kathmandu')::date = (now() AT TIME ZONE 'Asia/Kathmandu')::date AND ${notClosedFU()}`);
    } else if (fu === 'overdue') {
      where.push(`e.next_follow_up_at < now() AND ${notClosedFU()}`);
    } else if (fu === 'upcoming') {
      where.push(`e.next_follow_up_at BETWEEN now() AND now() + interval '7 days' AND ${notClosedFU()}`);
    } else if (fu === 'none') {
      where.push(`e.next_follow_up_at IS NULL AND ${notClosedFU()}`);
    }

    const w = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const page = Math.min(Math.max(parseInt(str('page') || '1', 10) || 1, 1), 10_000);

    const count = await query<{ n: number }>(`SELECT count(*)::int AS n FROM student_enquiries e ${w}`, p);
    const total = count.rows[0].n;
    const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1);
    const rows = await query(
      `${SELECT_ENQ} ${w} ORDER BY e.created_at DESC LIMIT ${PAGE_SIZE} OFFSET ${(page - 1) * PAGE_SIZE}`,
      p
    );
    return json({ enquiries: rows.rows.map(mapEnquiry), page, pageSize: PAGE_SIZE, total, totalPages });
  });
}
