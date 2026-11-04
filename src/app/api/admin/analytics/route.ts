import { query } from '@/lib/server/db';
import { CLOSED_STATUSES } from '@/lib/server/constants';
import { SELECT_ENQ, mapEnquiry, scopeSql } from '@/lib/server/enquiries';
import { json } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

const FUNNEL = [
  { key: 'enquiries', statuses: null as string[] | null, label: 'Enquiries' },
  { key: 'counseling', statuses: ['COUNSELING_SCHEDULED', 'COUNSELING_COMPLETED', 'DOCUMENTS_PENDING', 'APPLICATION_STARTED', 'OFFER_RECEIVED', 'VISA_PROCESSING', 'VISA_GRANTED', 'ENROLLED'], label: 'Counselling' },
  { key: 'applications', statuses: ['APPLICATION_STARTED', 'OFFER_RECEIVED', 'VISA_PROCESSING', 'VISA_GRANTED', 'ENROLLED'], label: 'Applications' },
  { key: 'offers', statuses: ['OFFER_RECEIVED', 'VISA_PROCESSING', 'VISA_GRANTED', 'ENROLLED'], label: 'Offers' },
  { key: 'visa_granted', statuses: ['VISA_GRANTED', 'ENROLLED'], label: 'Visa Granted' },
  { key: 'enrolled', statuses: ['ENROLLED'], label: 'Enrolled' },
];

export async function GET(req: Request) {
  return runAdmin(req, {}, async ({ user }) => {
    const p: unknown[] = [];
    const scope = scopeSql(user, p);
    const where = scope ? `WHERE ${scope}` : '';

    const counts = (sql: string) => query(sql, p).then((r) => r.rows);

    const [byCountry, byStatus, byIntake, bySource, byCampaign, monthly] = await Promise.all([
      counts(`SELECT preferred_country AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY preferred_country ORDER BY value DESC, label ASC`),
      counts(`SELECT status AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY status ORDER BY value DESC, label ASC`),
      counts(`SELECT COALESCE(preferred_intake, 'Not specified') AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY 1 ORDER BY value DESC, label ASC`),
      counts(`SELECT COALESCE(NULLIF(utm_source,''),'Direct / Organic') AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY 1 ORDER BY value DESC, label ASC LIMIT 10`),
      counts(`SELECT COALESCE(NULLIF(utm_campaign,''),'(none)') AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY 1 ORDER BY value DESC, label ASC LIMIT 10`),
      query(
        `SELECT to_char(date_trunc('month', (created_at AT TIME ZONE 'Asia/Kathmandu')), 'YYYY-MM') AS label,
                count(*)::int AS value
           FROM student_enquiries e ${where}
          GROUP BY date_trunc('month', (created_at AT TIME ZONE 'Asia/Kathmandu'))
          ORDER BY label DESC
          LIMIT 12`,
        p
      ),
    ]);

    const funnel = [];
    for (const stage of FUNNEL) {
      const parts: string[] = [];
      const params = [...p];
      if (scope) parts.push(scope);
      if (stage.statuses) {
        params.push(stage.statuses);
        parts.push(`e.status = ANY($${params.length}::text[])`);
      }
      const sqlWhere = parts.length ? `WHERE ${parts.join(' AND ')}` : '';
      const { rows } = await query<{ n: number }>(`SELECT count(*)::int AS n FROM student_enquiries e ${sqlWhere}`, params);
      funnel.push({ key: stage.key, label: stage.label, value: rows[0].n });
    }

    const fupParams = [...p];
    fupParams.push(CLOSED_STATUSES);
    const fupParts: string[] = [];
    if (scope) fupParts.push(scope);
    fupParts.push(`(e.status <> ALL($${fupParams.length}::text[]))`);
    fupParts.push(`e.next_follow_up_at <= now() + interval '2 days'`);
    const { rows: dueRows } = await query(
      `${SELECT_ENQ} WHERE ${fupParts.join(' AND ')}
         ORDER BY CASE WHEN e.next_follow_up_at < now() THEN 0 ELSE 1 END, e.next_follow_up_at ASC
         LIMIT 25`,
      fupParams
    );

    return json({
      byCountry,
      byStatus,
      byIntake,
      bySource,
      byCampaign,
      monthly: monthly.rows,
      funnel,
      dueNow: dueRows.map(mapEnquiry),
    });
  });
}
