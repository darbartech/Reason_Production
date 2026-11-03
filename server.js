
try {
  process.loadEnvFile?.();
} catch {
  // no .env file; rely on real environment variables
}

const express = require('express');
const fs = require('fs');
const path = require('path');
const enquiryRoutes = require('./server/enquiry-routes');
const adminRoutes = require('./server/admin-routes');
const adminPages = require('./server/admin-pages');
const { cleanupExpiredSessions } = require('./server/auth');
const rateLimit = require('./server/rate-limit');

const app = express();
const cspReportLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: 'Too many reports.',
});
const logField = (value) =>
  String(value ?? '').replace(/[\r\n\u0000-\u001f]/g, ' ').slice(0, 500);
const PORT = Number(process.env.PORT) || 8000;
const OUT_DIR = path.join(__dirname, 'out');

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com data:; frame-src https://www.google.com https://www.youtube.com; connect-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; report-uri /csp-report"
  );
  next();
});

if (process.env.TRUST_PROXY) {
  const tp = Number(process.env.TRUST_PROXY);
  app.set('trust proxy', Number.isNaN(tp) ? process.env.TRUST_PROXY : tp);
}

// Receives the violations reported by the report-only CSP above.
app.post(
  '/csp-report',
  cspReportLimiter,
  express.json({ type: ['application/csp-report', 'application/json'], limit: '10kb' }),
  (req, res) => {
    const report = req.body && req.body['csp-report'];
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
    res.status(204).end();
  }
);

// Admin API (Phase 4): session-protected
app.use('/api/admin', adminRoutes);

// API (Phase 3): POST /api/enquiries
app.use('/api', enquiryRoutes);
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, error: 'not_found' });
});

// Admin UI pages (Phase 4): HTML is only served to signed-in users.
// Must stay BEFORE express.static so out/portal/admin_access*.html is never served publicly.
app.use(adminPages);

// Block encoded or case-variant admin paths from falling through to express.static.
app.use((req, res, next) => {
  let decoded;
  try {
    decoded = decodeURIComponent(req.path);
  } catch {
    return res.status(400).end();
  }
  const normalized = decoded.replace(/\\/g, '/').toLowerCase();
  if (/^\/admin(?:\.html)?(?:\/|$)/.test(normalized)) {
    return res.status(404).sendFile(path.join(OUT_DIR, '404.html'));
  }
  next();
});

// Serve static files from the out directory (extensions: ['html'] lets /contact
// resolve to contact.html from the static export).
// index/redirect are off because sections with children exist as BOTH out/blog.html and
// out/blog/; serve-static prefers the directory and 301s /blog to /blog/, a URL that never
// matches the canonical tag. The resolver below answers the flat file instead.
app.use(express.static(OUT_DIR, { extensions: ['html'], index: false, redirect: false }));

// The export is fully static, so every valid route has its own file and anything reaching
// here is a genuine miss.
app.use((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const relative = pathname === '/' ? 'index.html' : `${pathname.replace(/\/+$/, '')}.html`;
  const file = path.join(OUT_DIR, relative);

  if (file.startsWith(OUT_DIR + path.sep) && fs.existsSync(file)) {
    return res.sendFile(file);
  }

  res.status(404).sendFile(path.join(OUT_DIR, '404.html'));
});

setInterval(() => {
  cleanupExpiredSessions().catch((err) => console.error('[sessions] cleanup failed:', err.message));
}, 60 * 60 * 1000).unref();
cleanupExpiredSessions().catch((err) => console.error('[sessions] initial cleanup failed:', err.message));

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}\n`);
  console.log(`   Press Ctrl+C to stop the server\n`);
});
