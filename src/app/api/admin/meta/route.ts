import { query } from '@/lib/server/db';
import { FORM, PRIORITIES, STAGES, STATUSES } from '@/lib/server/constants';
import { json } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  return runAdmin(req, {}, async ({ user }) => {
    const [users, countries, intakes] = await Promise.all([
      query<{ id: string; name: string; role: 'ADMIN' | 'COUNSELOR' }>(`SELECT id, name, role FROM users WHERE active ORDER BY name`),
      query<{ v: string }>(`SELECT DISTINCT preferred_country AS v FROM student_enquiries`),
      query<{ v: string }>(`SELECT DISTINCT preferred_intake AS v FROM student_enquiries WHERE preferred_intake IS NOT NULL`),
    ]);
    const union = (base: string[], extra: { v: string }[]) => [...new Set([...base, ...extra.map((r) => r.v)])];
    const all = users.rows;
    return json({
      statuses: STATUSES,
      stages: STAGES,
      priorities: PRIORITIES,
      countries: union(FORM.destinations, countries.rows),
      intakes: union(FORM.intakes, intakes.rows),
      // Who a lead can be assigned to: admins -> anyone; counselors -> themselves only.
      counselors: user.role === 'ADMIN' ? all : all.filter((u) => u.id === user.id),
      allCounselors: all,
    });
  });
}
