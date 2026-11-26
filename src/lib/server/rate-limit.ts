type Bucket = { count: number; reset: number };

// Fixed-window limiter. The Map is per warm instance, so on a scale-to-zero platform the
// effective ceiling is `max` per instance rather than per client globally — pair it with
// platform-level rate limiting (see README) for anything that must be a hard global cap.
const hits = new Map<string, Bucket>();
let lastSweep = 0;

export type RateVerdict = { ok: true } | { ok: false; retryAfterSec: number };

export function rateLimit(key: string, windowMs: number, max: number): RateVerdict {
  const now = Date.now();
  if (now - lastSweep > Math.min(windowMs, 60_000)) {
    lastSweep = now;
    for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
  }
  let e = hits.get(key);
  if (!e || e.reset <= now) {
    e = { count: 0, reset: now + windowMs };
    hits.set(key, e);
  }
  e.count += 1;
  if (e.count > max) return { ok: false, retryAfterSec: Math.ceil((e.reset - now) / 1000) };
  return { ok: true };
}
