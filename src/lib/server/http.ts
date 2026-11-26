export const NO_STORE = { 'Cache-Control': 'no-store' };

export const isMutating = (method: string) => !['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase());

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  });
}

export const fail = (status: number, message: string, extra: Record<string, unknown> = {}, headers: Record<string, string> = {}) =>
  json({ message, ...extra }, status, headers);

export type BodyResult = { value: Record<string, any> } | { message: string };

// Mirrors the old express.json({ limit }) behaviour: oversize or malformed bodies are a 400
// named "Invalid request." rather than a crash. Vercel also caps request bodies independently.
export async function readJsonBody(req: Request, maxBytes: number): Promise<BodyResult> {
  const declared = Number(req.headers.get('content-length') || 0);
  if (declared > maxBytes) return { message: 'Invalid request.' };
  let text = '';
  try {
    text = await req.text();
  } catch {
    return { message: 'Invalid request.' };
  }
  if (text.length > maxBytes * 4) return { message: 'Invalid request.' };
  if (!text.trim()) return { value: {} };
  try {
    const parsed = JSON.parse(text);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return { message: 'Invalid request.' };
    return { value: parsed as Record<string, any> };
  } catch {
    return { message: 'Invalid request.' };
  }
}

// Behind the platform's proxy these headers are set by the proxy, not the client.
// Self-hosting behind nginx/vanilla Node needs `X-Forwarded-For` overwritten at the proxy
// or per-IP rate limits can be bypassed by spoofing it.
export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim() || 'unknown';
  return req.headers.get('x-real-ip') || 'unknown';
}

// Basic CSRF defence for cookie auth: browsers send Origin on cross-site writes.
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host.toLowerCase();
    const forwarded = process.env.TRUST_PROXY ? req.headers.get('x-forwarded-host') : null;
    const host = String(forwarded || req.headers.get('host') || '').split(',')[0].trim().toLowerCase();
    return !!host && originHost === host;
  } catch {
    return false;
  }
}

const ALLOWED_ORIGINS = String(process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Browsers attach Origin to every cross-origin POST, so a mismatch means another site
// submitted this form. Left empty the check is off, which is what local development needs.
export function isAllowedPublicOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!ALLOWED_ORIGINS.length || !origin) return true;
  return ALLOWED_ORIGINS.includes(origin);
}
