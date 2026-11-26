import { query } from '@/lib/server/db';
import { json } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

// Liveness/readiness probe for the platform load balancer. Verifies the database
// because a static-only 200 would mask an API that cannot serve enquiries.
export async function GET() {
  try {
    await query('SELECT 1');
    return json({ ok: true });
  } catch (err: any) {
    // The body stays generic; the reason belongs in the platform's runtime logs.
    console.error('[healthz] database unavailable:', err?.code || err?.name || 'unknown', err?.message);
    return json({ ok: false }, 503);
  }
}
