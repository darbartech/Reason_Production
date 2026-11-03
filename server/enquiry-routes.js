// Public endpoint used by the website form:  POST /api/enquiries
const express = require('express');
const crypto = require('crypto');
const https = require('https');
const querystring = require('querystring');
const { tx, query } = require('./db');
const rateLimit = require('./rate-limit');
const { FORM } = require('./constants');

const router = express.Router();
router.use(express.json({ limit: '20kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 5,
  message: 'Too many submissions from your network. Please wait a few minutes or contact us on WhatsApp.',
});

const clean = (v, max) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max) : '';

const ALLOWED_ORIGINS = String(process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Browsers attach Origin to every cross-origin POST, so a mismatch means another site
// submitted this form. Left empty the check is off, which is what local development needs.
function allowedOrigin(req, res, next) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.length && origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ success: false, message: 'Request blocked.' });
  }
  next();
}

const PHONE_RE = /^(\+?977[-\s]?)?9[78][0-9]{8}$|^(01[-\s]?)?[45][0-9]{6,7}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(b) {
  const errors = {};
  const d = {};
  const oneOf = (key, list, msg) => {
    const v = clean(b[key], 100);
    if (!list.includes(v)) errors[key] = msg; else d[key] = v;
  };

  d.fullName = clean(b.fullName, 100);
  if (d.fullName.length < 2) errors.fullName = 'Please enter your full name';

  d.phone = clean(b.phone, 30);
  if (!PHONE_RE.test(d.phone)) errors.phone = 'Please enter a valid Nepali mobile or landline number';
  else d.phone = d.phone.replace(/[-\s]/g, '');

  d.email = clean(b.email, 254).toLowerCase();
  if (d.email && !EMAIL_RE.test(d.email)) errors.email = 'Please enter a valid email address';

  oneOf('preferredDestination', FORM.destinations, 'Please select a preferred destination');
  oneOf('studyLevel', FORM.studyLevels, 'Please select your study level');

  d.sourcePage = clean(b.sourcePage, 500);
  d.referrer = clean(b.referrer, 500);
  for (const k of ['utmSource', 'utmMedium', 'utmCampaign', 'utmContent', 'utmTerm']) d[k] = clean(b[k], 200);

  return { errors, data: d };
}

function verifyTurnstile(response, remoteip) {
  return new Promise((resolve) => {
    let settled = false;
    let timer;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };
    const postData = querystring.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response,
      remoteip,
    });
    const options = {
      hostname: 'challenges.cloudflare.com',
      path: '/turnstile/v0/siteverify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try { finish(JSON.parse(body)); }
        catch { finish({ success: false }); }
      });
    });
    timer = setTimeout(() => {
      req.destroy();
      finish({ success: false });
    }, 5000);
    req.on('error', () => finish({ success: false }));
    req.write(postData);
    req.end();
  });
}

router.post('/enquiries', allowedOrigin, limiter, async (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: real users never fill the hidden "website" field. Pretend success.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(201).json({ success: true });
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const cfTurnstileResponse = typeof body.cfTurnstileResponse === 'string' ? body.cfTurnstileResponse : '';
    if (!cfTurnstileResponse) {
      return res.status(400).json({ success: false, message: 'Captcha verification failed' });
    }
    const result = await verifyTurnstile(cfTurnstileResponse, req.ip);
    if (!result.success) {
      return res.status(400).json({ success: false, message: 'Captcha verification failed' });
    }
  }

  const { errors, data: d } = validate(body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: 'Please check the form and try again.', errors });
  }

  const fingerprint = crypto.createHash('sha256')
    .update(`${d.phone.toLowerCase()}|${d.preferredDestination}|${Math.floor(Date.now() / 86400000)}`)
    .digest('hex');

  try {
    // Duplicate guard: same phone + same destination within 24h -> accept silently, don't create a 2nd lead.
    const dup = await query(
      `SELECT lead_number FROM student_enquiries
        WHERE phone = $1 AND preferred_country = $2 AND created_at > now() - interval '24 hours' LIMIT 1`,
      [d.phone, d.preferredDestination]
    );
    if (dup.rowCount) return res.status(200).json({ success: true, leadNumber: dup.rows[0].lead_number });

    const inserted = await tx(async (c) => {
      const { rows } = await c.query(
        `INSERT INTO student_enquiries (
           full_name, phone, email, preferred_country, study_level,
           source_page, referrer, utm_source, utm_medium, utm_campaign, utm_content, utm_term, fingerprint)
         VALUES ($1,$2,NULLIF($3,''),$4,$5,NULLIF($6,''),NULLIF($7,''),NULLIF($8,''),NULLIF($9,''),
                 NULLIF($10,''),NULLIF($11,''),NULLIF($12,''),$13)
         RETURNING lead_number, id`,
        [d.fullName, d.phone, d.email, d.preferredDestination, d.studyLevel,
         d.sourcePage, d.referrer, d.utmSource, d.utmMedium, d.utmCampaign, d.utmContent, d.utmTerm, fingerprint]
      );
      await c.query(`INSERT INTO enquiry_events (enquiry_id, type, actor_name) VALUES ($1,'RECEIVED','Website form')`, [rows[0].id]);
      return rows[0];
    });

    return res.status(201).json({ success: true, leadNumber: inserted.lead_number });
  } catch (err) {
    if (err.code === '23505') {
      // Fingerprint or lead_number collision: treat as duplicate, don't show error to the user.
      // Look up the existing lead number by fingerprint so the UI always gets a consistent value.
      try {
        const { rows } = await query(
          `SELECT lead_number FROM student_enquiries WHERE fingerprint = $1 LIMIT 1`,
          [fingerprint]
        );
        return res.status(200).json({ success: true, leadNumber: rows[0]?.lead_number });
      } catch {
        return res.status(200).json({ success: true });
      }
    }
    console.error('[enquiry] save failed:', err.message);
    return res.status(503).json({
      success: false,
      message: 'We could not save your enquiry right now. Please try again in a moment or contact us on WhatsApp.',
    });
  }
});

// Malformed JSON etc.
router.use((err, req, res, next) => {
  if (err && (err.type === 'entity.parse.failed' || err.type === 'entity.too.large')) {
    return res.status(400).json({ success: false, message: 'Invalid request.' });
  }
  console.error('[enquiry] error:', err);
  res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
});

module.exports = router;
