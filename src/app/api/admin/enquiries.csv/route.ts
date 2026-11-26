import { query } from '@/lib/server/db';
import { SELECT_ENQ, csvEscape, scopeSql } from '@/lib/server/enquiries';
import { fail } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

const HEADERS = [
  'Lead Number', 'Created At', 'Full Name', 'Phone', 'Email',
  'Country', 'Intake', 'Study Level', 'Course', 'Budget',
  'Education Level', 'Result Type', 'Result',
  'English Test', 'English Score',
  'Contact Method', 'Contact Time',
  'Status', 'Priority', 'Assigned To', 'Next Follow Up',
  'Source Page', 'Referrer',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term',
  'Message',
];

export async function GET(req: Request) {
  return runAdmin(req, {}, async ({ user }) => {
    const p: unknown[] = [];
    const scope = scopeSql(user, p);
    const where = scope ? `WHERE ${scope}` : '';
    const { rows } = await query(
      `${SELECT_ENQ} ${where} ORDER BY e.created_at DESC`,
      p
    );

    const lines = [HEADERS.join(',')];
    for (const r of rows) {
      lines.push([
        csvEscape(r.lead_number),
        csvEscape(new Date(r.created_at).toISOString()),
        csvEscape(r.full_name),
        csvEscape(r.phone),
        csvEscape(r.email),
        csvEscape(r.preferred_country),
        csvEscape(r.preferred_intake),
        csvEscape(r.study_level),
        csvEscape(r.preferred_course),
        csvEscape(r.budget_range),
        csvEscape(r.education_level),
        csvEscape(r.academic_result_type),
        csvEscape(r.academic_result),
        csvEscape(r.english_test),
        csvEscape(r.english_score),
        csvEscape(r.preferred_contact_method),
        csvEscape(r.preferred_contact_time),
        csvEscape(r.status),
        csvEscape(r.priority),
        csvEscape(r.assigned_name),
        csvEscape(r.next_follow_up_at ? new Date(r.next_follow_up_at).toISOString() : ''),
        csvEscape(r.source_page),
        csvEscape(r.referrer),
        csvEscape(r.utm_source),
        csvEscape(r.utm_medium),
        csvEscape(r.utm_campaign),
        csvEscape(r.utm_content),
        csvEscape(r.utm_term),
        csvEscape(r.message),
      ].join(','));
    }

    const filename = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    return new Response('\uFEFF' + lines.join('\r\n'), {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  });
}
