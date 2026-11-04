import { getCsrfToken } from '@/lib/server/session';
import { json } from '@/lib/server/http';
import { runAdmin } from '@/lib/server/guard';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  return runAdmin(req, {}, async ({ user }) => json({ user, csrfToken: getCsrfToken(req) }));
}
