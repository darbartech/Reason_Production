// Tiny in-memory fixed-window rate limiter (no dependency).
// Fine for a single Node process; use Redis or a reverse proxy limit if you scale out.
function rateLimit({ windowMs, max, key, message }) {
  const hits = new Map();
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
  }, Math.min(windowMs, 60_000));
  timer.unref();

  return (req, res, next) => {
    const k = key ? key(req) : req.ip;
    const now = Date.now();
    let e = hits.get(k);
    if (!e || e.reset <= now) { e = { count: 0, reset: now + windowMs }; hits.set(k, e); }
    e.count += 1;
    if (e.count > max) {
      res.set('Retry-After', String(Math.ceil((e.reset - now) / 1000)));
      return res.status(429).json({ success: false, message: message || 'Too many requests. Please try again later.' });
    }
    next();
  };
}
module.exports = rateLimit;
