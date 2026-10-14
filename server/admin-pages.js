// Serves the exported staff-portal HTML only to signed-in staff.
// Must be mounted BEFORE express.static so out/portal/admin_access*.html is never served publicly.
const express = require('express');
const path = require('path');
const { getUser } = require('./auth');

const OUT = path.join(__dirname, '..', 'out');
const router = express.Router();

const BASE = '/portal/admin_access';
const ADMIN_RE = /^\/portal\/admin_access(\.html)?(\/|$)/;

function fileFor(route) {
  if (route === BASE) return 'portal/admin_access.html';
  if (route === `${BASE}/login`) return 'portal/admin_access/login.html';
  if (route === `${BASE}/enquiries`) return 'portal/admin_access/enquiries.html';
  // /portal/admin_access/enquiries/<uuid> -> the single exported placeholder page; the component reads the id from the URL.
  if (new RegExp(`^${BASE}/enquiries/[^/]+$`).test(route)) return 'portal/admin_access/enquiries/_.html';
  return null;
}

router.use(async (req, res, next) => {
  if (!ADMIN_RE.test(req.path)) return next();
  try {
    const route = req.path.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
    const file = fileFor(route);
    if (!file) return res.status(404).sendFile(path.join(OUT, '404.html'));

    const user = await getUser(req);
    res.set('Cache-Control', 'no-store');

    if (route === `${BASE}/login`) {
      if (user) return res.redirect(302, BASE);
      return res.sendFile(path.join(OUT, file));
    }
    if (!user) return res.redirect(302, `${BASE}/login`);
    return res.sendFile(path.join(OUT, file));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
