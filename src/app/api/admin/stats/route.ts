import { query } from '@/lib/server/db';
import { CLOSED_STATUSES } from '@/lib/server/constants';
import { SELECT_ENQ, mapEnquiry, scopeSql } from '@/lib/server/enquiries';
import { json } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  return runAdmin(req, {}, async ({ user }) => {
    const p: unknown[] = [];
    const scope = scopeSql(user, p);
    p.push(CLOSED_STATUSES);
    const closedStatusesIdx = p.length;
    const where = scope ? `WHERE ${scope}` : '';
    const notClosedSql = `(e.status <> ALL($${closedStatusesIdx}::text[]))`;
    const { rows } = await query(
      `SELECT
          count(*) FILTER (WHERE e.status = 'NEW')::int AS new_leads,
          count(*) FILTER (WHERE e.next_follow_up_at <= now() AND ${notClosedSql})::int AS due,
          count(*)::int AS total,
          count(*) FILTER (WHERE (e.created_at AT TIME ZONE 'Asia/Kathmandu')
                                >= date_trunc('month', now() AT TIME ZONE 'Asia/Kathmandu'))::int AS this_month,
          count(*) FILTER (WHERE (e.next_follow_up_at AT TIME ZONE 'Asia/Kathmandu')::date
                                = (now() AT TIME ZONE 'Asia/Kathmandu')::date
                                AND ${notClosedSql})::int AS due_today,
          count(*) FILTER (WHERE e.next_follow_up_at < now()
                                AND ${notClosedSql})::int AS overdue,
          count(*) FILTER (WHERE e.next_follow_up_at BETWEEN now() AND now() + interval '7 days'
                                AND ${notClosedSql})::int AS upcoming_next7,
          count(*) FILTER (WHERE e.next_follow_up_at IS NULL
                                AND ${notClosedSql})::int AS no_followup
         FROM student_enquiries e ${where}`,
      p
    );
    const rp: unknown[] = [];
    const rscope = scopeSql(user, rp);
    const recent = await query(`${SELECT_ENQ} ${rscope ? 'WHERE ' + rscope : ''} ORDER BY e.created_at DESC LIMIT 8`, rp);
    const s = rows[0] as Record<string, number>;
    return json({
      stats: {
        newLeads: s.new_leads,
        followUpsDue: s.due,
        total: s.total,
        thisMonth: s.this_month,
        dueToday: s.due_today,
        overdue: s.overdue,
        upcomingNext7: s.upcoming_next7,
        noFollowup: s.no_followup,
      },
      recent: recent.rows.map(mapEnquiry),
    });
  });
}
