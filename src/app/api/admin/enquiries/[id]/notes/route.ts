import { tx } from '@/lib/server/db';
import { loadDetail, poolRunner } from '@/lib/server/enquiries';
import { fail, json } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return runAdmin(req, { bodyLimit: 50 * 1024 }, async ({ user, body }) => {
    const text = typeof body.body === 'string' ? body.body.trim() : '';
    if (!text) return fail(400, 'Please write a note first.');
    if (text.length > 5000) return fail(400, 'Note is too long (max 5000 characters).');

    const out = await tx(async (c) => {
      const runner = poolRunner(c);
      const visible = await loadDetail(runner, id, user);
      if (!visible) return null;
      await c.query(`INSERT INTO enquiry_notes (enquiry_id, author_id, author_name, body) VALUES ($1,$2,$3,$4)`, [
        id, user.id, user.name, text,
      ]);
      await c.query(`INSERT INTO enquiry_events (enquiry_id, type, actor_id, actor_name) VALUES ($1,'NOTE_ADDED',$2,$3)`, [
        id, user.id, user.name,
      ]);
      return loadDetail(runner, id, user);
    });

    if (!out) return fail(404, 'Enquiry not found.');
    return json(out);
  });
}
