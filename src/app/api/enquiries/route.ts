import { createHash } from 'node:crypto';
import { query, tx } from '@/lib/server/db';
import { FORM } from '@/lib/server/constants';
import { isAllowedPublicOrigin, json, readJsonBody, clientIp } from '@/lib/server/http';
import { rateLimit } from '@/lib/server/rate-limit';
import { verifyTurnstile } from '@/lib/server/turnstile';

export const dynamic = 'force-dynamic';

// Public endpoint used by the website form:  POST /api/enquiries

const CONTROL_CHARS = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g');
const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(CONTROL_CHARS, '').trim().slice(0, max) : '';

const PHONE_RE = /^(\+?977[-\s]?)?9[78][0-9]{8}$|^(01[-\s]?)?[45][0-9]{6,7}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(b: Record<string, any>) {
  const errors: Record<string, string> = {};
  const d: Record<string, string> = {};
  const oneOf = (key: string, list: string[], msg: string) => {
    const v = clean(b[key], 100);
    if (!list.includes(v)) errors[key] = msg;
    else d[key] = v;
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

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (!isAllowedPublicOrigin(req)) {
    return json({ success: false, message: 'Request blocked.' }, 403);
  }

  const verdict = rateLimit(`enquiry|${ip}`, 15 * 60 * 1000, 5);
  if (!verdict.ok) {
    return json(
      { success: false, message: 'Too many submissions from your network. Please wait a few minutes or contact us on WhatsApp.' },
      429,
      { 'Retry-After': String(verdict.retryAfterSec) }
    );
  }

  const parsed = await readJsonBody(req, 20 * 1024);
  if ('message' in parsed) return json({ success: false, message: parsed.message }, 400);
  const body = parsed.value;

  // Honeypot: real users never fill the hidden "website" field. Pretend success.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ success: true }, 201);
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const cfTurnstileResponse = typeof body.cfTurnstileResponse === 'string' ? body.cfTurnstileResponse : '';
    if (!cfTurnstileResponse) {
      return json({ success: false, message: 'Captcha verification failed' }, 400);
    }
    const result = await verifyTurnstile(cfTurnstileResponse, ip);
    if (!result.success) {
      return json({ success: false, message: 'Captcha verification failed' }, 400);
    }
  }

  const { errors, data: d } = validate(body);
  if (Object.keys(errors).length) {
    return json({ success: false, message: 'Please check the form and try again.', errors }, 400);
  }

  const fingerprint = await sha256Hex(
    `${d.phone.toLowerCase()}|${d.preferredDestination}|${Math.floor(Date.now() / 86400000)}`
  );

  try {
    // Duplicate guard: same phone + same destination within 24h -> accept silently, don't create a 2nd lead.
    const dup = await query<{ lead_number: string }>(
      `SELECT lead_number FROM student_enquiries
        WHERE phone = $1 AND preferred_country = $2 AND created_at > now() - interval '24 hours' LIMIT 1`,
      [d.phone, d.preferredDestination]
    );
    if (dup.rowCount) return json({ success: true, leadNumber: dup.rows[0].lead_number }, 200);

    const inserted = await tx(async (c) => {
      const res = await c.query<{ lead_number: string; id: string }>(
        `INSERT INTO student_enquiries (
           full_name, phone, email, preferred_country, study_level,
           source_page, referrer, utm_source, utm_medium, utm_campaign, utm_content, utm_term, fingerprint)
         VALUES ($1,$2,NULLIF($3,''),$4,$5,NULLIF($6,''),NULLIF($7,''),NULLIF($8,''),NULLIF($9,''),
                 NULLIF($10,''),NULLIF($11,''),NULLIF($12,''),$13)
         RETURNING lead_number, id`,
        [d.fullName, d.phone, d.email, d.preferredDestination, d.studyLevel,
         d.sourcePage, d.referrer, d.utmSource, d.utmMedium, d.utmCampaign, d.utmContent, d.utmTerm, fingerprint]
      );
      await c.query(`INSERT INTO enquiry_events (enquiry_id, type, actor_name) VALUES ($1,'RECEIVED','Website form')`, [res.rows[0].id]);
      return res.rows[0];
    });

    return json({ success: true, leadNumber: inserted.lead_number }, 201);
  } catch (err: any) {
    if (err?.code === '23505') {
      // Fingerprint or lead_number collision: treat as duplicate, don't show error to the user.
      // Look up the existing lead number by fingerprint so the UI always gets a consistent value.
      try {
        const { rows } = await query<{ lead_number: string }>(
          `SELECT lead_number FROM student_enquiries WHERE fingerprint = $1 LIMIT 1`,
          [fingerprint]
        );
        return json({ success: true, leadNumber: rows[0]?.lead_number }, 200);
      } catch {
        return json({ success: true }, 200);
      }
    }
    console.error('[enquiry] save failed:', err?.message);
    return json(
      {
        success: false,
        message: 'We could not save your enquiry right now. Please try again in a moment or contact us on WhatsApp.',
      },
      503
    );
  }
}

async function sha256Hex(value: string) {
  const { createHash } = await import('node:crypto');
  return createHash('sha256').update(value).digest('hex');
}
