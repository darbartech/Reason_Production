// Serves the exported staff-portal HTML only to signed-in staff.
// Must be mounted BEFORE express.static so out/portal/admin_access*.html is never served publicly.
const express = require('express');
const path = require('path');
const { getUser } = require('./auth');

const OUT = path.join(__dirname, '..', 'out');
const router = express.Router();

<<<<<<< HEAD
const ADMIN_RE = /^\/admin(?:\.html)?(?:\/|$)/i;

function fileFor(route) {
  if (route === '/admin') return 'admin.html';
  if (route === '/admin/login') return 'admin/login.html';
  if (route === '/admin/enquiries') return 'admin/enquiries.html';
  if (route === '/admin/users') return 'admin/users.html';
  // /admin/enquiries/<uuid> -> the single exported placeholder page; the component reads the id from the URL.
  if (/^\/admin\/enquiries\/[^/]+$/.test(route)) return 'admin/enquiries/_.html';
=======
const BASE = '/portal/admin_access';
const ADMIN_RE = /^\/portal\/admin_access(\.html)?(\/|$)/;

function fileFor(route) {
  if (route === BASE) return 'portal/admin_access.html';
  if (route === `${BASE}/login`) return 'portal/admin_access/login.html';
  if (route === `${BASE}/enquiries`) return 'portal/admin_access/enquiries.html';
  // /portal/admin_access/enquiries/<uuid> -> the single exported placeholder page; the component reads the id from the URL.
  if (new RegExp(`^${BASE}/enquiries/[^/]+$`).test(route)) return 'portal/admin_access/enquiries/_.html';
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
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

    if (route === `${BASE}/login`) {
      if (user) return res.redirect(302, BASE);
      return res.sendFile(path.join(OUT, file));
    }
<<<<<<< HEAD
    if (!user) return res.redirect(302, '/admin/login');
    // Staff management is admin-only; counselors are sent back to the dashboard.
    if (route === '/admin/users' && user.role !== 'ADMIN') return res.redirect(302, '/admin');
=======
    if (!user) return res.redirect(302, `${BASE}/login`);
>>>>>>> b1b6701386924f18880d04f958a0725ebed25e8e
    return res.sendFile(path.join(OUT, file));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
