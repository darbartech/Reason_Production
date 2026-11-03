// Serves the exported admin HTML only to signed-in staff.
// Must be mounted BEFORE express.static so out/admin*.html is never served publicly.
const express = require('express');
const path = require('path');
const { getUser } = require('./auth');

const OUT = path.join(__dirname, '..', 'out');
const router = express.Router();

const ADMIN_RE = /^\/admin(?:\.html)?(?:\/|$)/i;

function fileFor(route) {
  if (route === '/admin') return 'admin.html';
  if (route === '/admin/login') return 'admin/login.html';
  if (route === '/admin/enquiries') return 'admin/enquiries.html';
  if (route === '/admin/users') return 'admin/users.html';
  // /admin/enquiries/<uuid> -> the single exported placeholder page; the component reads the id from the URL.
  if (/^\/admin\/enquiries\/[^/]+$/.test(route)) return 'admin/enquiries/_.html';
  return null;
}

router.use(async (req, res, next) => {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(req.path);
  } catch {
    return res.status(400).end();
  }
  decodedPath = decodedPath.replace(/\\/g, '/');
  if (!ADMIN_RE.test(decodedPath)) return next();
  try {
    const route = decodedPath.replace(/\.html$/i, '').replace(/\/+$/, '').toLowerCase() || '/';
    const file = fileFor(route);
    if (!file) return res.status(404).sendFile(path.join(OUT, '404.html'));

    const user = await getUser(req);
    res.set('Cache-Control', 'no-store');

    if (route === '/admin/login') {
      if (user) return res.redirect(302, '/admin');
      return res.sendFile(path.join(OUT, file));
    }
    if (!user) return res.redirect(302, '/admin/login');
    // Staff management is admin-only; counselors are sent back to the dashboard.
    if (route === '/admin/users' && user.role !== 'ADMIN') return res.redirect(302, '/admin');
    return res.sendFile(path.join(OUT, file));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
