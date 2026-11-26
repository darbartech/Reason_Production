import { query } from './db';
import type { PoolClient } from 'pg';
import type { StaffUser } from './session';

export const SELECT_ENQ = `
  SELECT e.*, u.name AS assigned_name
    FROM student_enquiries e
    LEFT JOIN users u ON u.id = e.assigned_to`;

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const isAdmin = (u: StaffUser) => u.role === 'ADMIN';

// Admins see every lead. Counselors see leads assigned to them plus unassigned ones.
export function scopeSql(user: StaffUser, params: unknown[]): string | null {
  if (isAdmin(user)) return null;
  params.push(user.id);
  return `(e.assigned_to = $${params.length} OR e.assigned_to IS NULL)`;
}

export function mapEnquiry(r: any) {
  return {
    id: r.id, leadNumber: r.lead_number, fullName: r.full_name, phone: r.phone, email: r.email,
    country: r.preferred_country, intake: r.preferred_intake, studyLevel: r.study_level,
    course: r.preferred_course, budget: r.budget_range, educationLevel: r.education_level,
    resultType: r.academic_result_type, result: r.academic_result,
    englishTest: r.english_test, englishScore: r.english_score,
    contactMethod: r.preferred_contact_method, contactTime: r.preferred_contact_time,
    message: r.message, sourcePage: r.source_page, referrer: r.referrer,
    utmSource: r.utm_source, utmMedium: r.utm_medium, utmCampaign: r.utm_campaign,
    utmContent: r.utm_content, utmTerm: r.utm_term,
    status: r.status, stage: null, priority: r.priority,
    assignedTo: r.assigned_to, assignedToName: r.assigned_name || null,
    nextFollowUpAt: r.next_follow_up_at ? new Date(r.next_follow_up_at).toISOString() : null,
    createdAt: new Date(r.created_at).toISOString(), updatedAt: new Date(r.updated_at).toISOString(),
  };
}

type Runner = { query: (text: string, params?: unknown[]) => Promise<{ rows: any[] }> };

export async function loadDetail(db: Runner, id: string, user: StaffUser) {
  if (!UUID_RE.test(id)) return null;
  const params: unknown[] = [id];
  const scope = scopeSql(user, params);
  const rows = (await db.query(`${SELECT_ENQ} WHERE e.id = $1 ${scope ? 'AND ' + scope : ''}`, params)).rows;
  if (!rows[0]) return null;
  const [notes, events] = await Promise.all([
    db.query(`SELECT id, author_name, body, created_at FROM enquiry_notes WHERE enquiry_id = $1 ORDER BY created_at DESC`, [id]),
    db.query(`SELECT id, type, actor_name, detail, created_at FROM enquiry_events WHERE enquiry_id = $1 ORDER BY created_at DESC`, [id]),
  ]);
  return {
    enquiry: mapEnquiry(rows[0]),
    notes: notes.rows.map((n) => ({ id: n.id, authorName: n.author_name, body: n.body, createdAt: new Date(n.created_at).toISOString() })),
    timeline: events.rows.map((v) => ({
      id: v.id, type: v.type, actorName: v.actor_name, detail: v.detail || {}, createdAt: new Date(v.created_at).toISOString(),
    })),
  };
}

export const poolRunner = (client?: PoolClient): Runner => ({
  query: (text, params) => (client ? client.query(text, params as any[]) : query(text, params)) as any,
});

// Neutralise spreadsheet formulas before quoting.
export function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return '';
  const raw = String(v);
  const s = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
