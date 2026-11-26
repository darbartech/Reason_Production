import { destroySession } from '@/lib/server/session';
import { json } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  return runAdmin(req, { skipAuth: true }, async () => {
    const cookie = await destroySession(req);
    return json({ ok: true }, 200, { 'Set-Cookie': cookie });
  });
}
