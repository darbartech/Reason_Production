import { json, clientIp } from '@/lib/server/http';
import { rateLimit } from '@/lib/server/rate-limit';

export const dynamic = 'force-dynamic';

// Control characters are stripped so a reported value can't forge log lines.
const CRLF = new RegExp('[\\r\\n\\u0000-\\u001f]', 'g');
const logField = (value: unknown) => String(value ?? '').replace(CRLF, ' ').slice(0, 500);

// Receives the violations reported by the report-only CSP.
export async function POST(req: Request) {
  const verdict = rateLimit(`csp|${clientIp(req)}`, 60 * 1000, 20);
  if (!verdict.ok) return json({ message: 'Too many reports.' }, 429, { 'Retry-After': String(verdict.retryAfterSec) });

  const parsed = await req.json().catch(() => null);
  const report = parsed && typeof parsed === 'object' ? (parsed as Record<string, any>)['csp-report'] : null;
  if (report) {
    console.warn(
      '[csp]',
      logField(report['violated-directive']),
      '->',
      logField(report['blocked-uri']),
      'on',
      logField(report['document-uri'])
    );
  }
  return new Response(null, { status: 204 });
}
