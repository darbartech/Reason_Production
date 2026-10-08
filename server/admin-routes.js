// Staff API, mounted at /api/admin. Everything except /auth/login and /auth/logout needs a session.
const express = require('express');
const { query, tx } = require('./db');
const {
  verifyPassword, DUMMY_HASH, createSession, updateSessionMetadata, destroySession, requireAuth, sameOrigin,getCsrfToken, requireCsrf,
} = require('./auth');
const rateLimit = require('./rate-limit');
const { STATUSES, STAGES, STAGES_CLOSED, CLOSED_STATUSES, PRIORITIES, FORM } = require('./constants');

const router = express.Router();
router.use(express.json({ limit: '50kb' }));
router.use(sameOrigin);

const PAGE_SIZE = 20;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const isAdmin = (u) => u.role === 'ADMIN';

// ---------- helpers ----------
const SELECT_ENQ = `
  SELECT e.*, u.name AS assigned_name
    FROM student_enquiries e
    LEFT JOIN users u ON u.id = e.assigned_to`;

// Admins see every lead. Counselors see leads assigned to them plus unassigned ones.
function scopeSql(user, params) {
  if (isAdmin(user)) return null;
  params.push(user.id);
  return `(e.assigned_to = $${params.length} OR e.assigned_to IS NULL)`;
}

function mapEnquiry(r) {
  return {
    id: r.id, leadNumber: r.lead_number, fullName: r.full_name, phone: r.phone, email: r.email,
    country: r.preferred_country, intake: r.preferred_intake, studyLevel: r.study_level,
    course: r.preferred_course, budget: r.budget_range, educationLevel: r.education_level,
    resultType: r.academic_result_type, result: r.academic_result,
    englishTest: r.english_test, englishScore: r.english_score,
    contactMethod: r.preferred_contact_method, contactTime: r.preferred_contact_time,
    message: r.message, sourcePage: r.source_page, referrer: r.referrer,
    utmSource: r.utm_source, utmMedium: r.utm_medium, utmCampaign: r.utm_campaign,
    utmContent: r.utm_content, utmTerm: r.utm_term,
    status: r.status, stage: null, priority: r.priority,
    assignedTo: r.assigned_to, assignedToName: r.assigned_name || null,
    nextFollowUpAt: r.next_follow_up_at ? new Date(r.next_follow_up_at).toISOString() : null,
    createdAt: new Date(r.created_at).toISOString(), updatedAt: new Date(r.updated_at).toISOString(),
  };
}

async function loadDetail(db, id, user) {
  if (!UUID_RE.test(id)) return null;
  const params = [id];
  const scope = scopeSql(user, params);
  const { rows } = await db.query(`${SELECT_ENQ} WHERE e.id = $1 ${scope ? 'AND ' + scope : ''}`, params);
  if (!rows[0]) return null;
  const [notes, events] = await Promise.all([
    db.query(`SELECT id, author_name, body, created_at FROM enquiry_notes WHERE enquiry_id = $1 ORDER BY created_at DESC`, [id]),
    db.query(`SELECT id, type, actor_name, detail, created_at FROM enquiry_events WHERE enquiry_id = $1 ORDER BY created_at DESC`, [id]),
  ]);
  return {
    enquiry: mapEnquiry(rows[0]),
    notes: notes.rows.map((n) => ({ id: n.id, authorName: n.author_name, body: n.body, createdAt: new Date(n.created_at).toISOString() })),
    timeline: events.rows.map((v) => ({
      id: v.id, type: v.type, actorName: v.actor_name, detail: v.detail || {}, createdAt: new Date(v.created_at).toISOString(),
    })),
  };
}

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ---------- auth ----------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  key: (req) => `${req.ip}|${String(req.body?.email || '').toLowerCase()}`,
  message: 'Too many sign-in attempts. Please wait a few minutes and try again.',
});

router.post('/auth/login', loginLimiter, wrap(async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  const { rows } = await query(
    `SELECT id, email, name, role, password_hash FROM users WHERE lower(email) = $1 AND active`, [email]
  );
  const u = rows[0];
  const ok = await verifyPassword(password, u ? u.password_hash : DUMMY_HASH); // constant-ish time
  if (!u || !ok) return res.status(401).json({ message: 'Incorrect email or password.' });
  const { tokenHash, csrfToken } = await createSession(res, u.id);
  await updateSessionMetadata(tokenHash, { ip: req.ip, userAgent: req.headers['user-agent'] });
  await query('UPDATE users SET last_login_at = now() WHERE id = $1', [u.id]);
  res.json({ user: { id: u.id, email: u.email, name: u.name, role: u.role }, csrfToken });
}));

router.post('/auth/logout', wrap(async (req, res) => {
  await destroySession(req, res);
  res.json({ ok: true });
}));

router.get('/auth/me', requireAuth, (req, res) => {
  res.json({
    user: req.user,
    csrfToken: getCsrfToken(req),
  });
});


// Everything below needs a session.
router.use(requireAuth);
router.use(requireCsrf);

// ---------- dashboard ----------
router.get('/stats', wrap(async (req, res) => {
  const p = [];
  const scope = scopeSql(req.user, p);
  p.push(CLOSED_STATUSES);
  const closedStatusesIdx = p.length;
  const where = scope ? `WHERE ${scope}` : '';
  const notClosedSql = `(e.status <> ALL($${closedStatusesIdx}::text[]))`;
  const { rows } = await query(
    `SELECT
        count(*) FILTER (WHERE e.status = 'NEW')::int AS new_leads,
        count(*) FILTER (WHERE e.next_follow_up_at <= now() AND ${notClosedSql})::int AS due,
        count(*)::int AS total,
        count(*) FILTER (WHERE (e.created_at AT TIME ZONE 'Asia/Kathmandu')
                              >= date_trunc('month', now() AT TIME ZONE 'Asia/Kathmandu'))::int AS this_month,
        count(*) FILTER (WHERE (e.next_follow_up_at AT TIME ZONE 'Asia/Kathmandu')::date
                              = (now() AT TIME ZONE 'Asia/Kathmandu')::date
                              AND ${notClosedSql})::int AS due_today,
        count(*) FILTER (WHERE e.next_follow_up_at < now()
                              AND ${notClosedSql})::int AS overdue,
        count(*) FILTER (WHERE e.next_follow_up_at BETWEEN now() AND now() + interval '7 days'
                              AND ${notClosedSql})::int AS upcoming_next7,
        count(*) FILTER (WHERE e.next_follow_up_at IS NULL
                              AND ${notClosedSql})::int AS no_followup
       FROM student_enquiries e ${where}`, p
  );
  const rp = [];
  const rscope = scopeSql(req.user, rp);
  const recent = await query(`${SELECT_ENQ} ${rscope ? 'WHERE ' + rscope : ''} ORDER BY e.created_at DESC LIMIT 8`, rp);
  const s = rows[0];
  res.json({
    stats: {
      newLeads: s.new_leads,
      followUpsDue: s.due,
      total: s.total,
      thisMonth: s.this_month,
      dueToday: s.due_today,
      overdue: s.overdue,
      upcomingNext7: s.upcoming_next7,
      noFollowup: s.no_followup,
    },
    recent: recent.rows.map(mapEnquiry),
  });
}));

// ---------- filter options ----------
router.get('/meta', wrap(async (req, res) => {
  const [users, countries, intakes] = await Promise.all([
    query(`SELECT id, name, role FROM users WHERE active ORDER BY name`),
    query(`SELECT DISTINCT preferred_country AS v FROM student_enquiries`),
    query(`SELECT DISTINCT preferred_intake AS v FROM student_enquiries`),
  ]);
  const union = (base, extra) => [...new Set([...base, ...extra.map((r) => r.v)])];
  const all = users.rows;
  res.json({
    statuses: STATUSES,
    stages: STAGES,
    priorities: PRIORITIES,
    countries: union(FORM.destinations, countries.rows),
    intakes: union(FORM.intakes, intakes.rows),
    // Who a lead can be assigned to: admins -> anyone; counselors -> themselves only.
    counselors: isAdmin(req.user) ? all : all.filter((u) => u.id === req.user.id),
    allCounselors: all,
  });
}));

// ---------- analytics ----------
router.get('/analytics', wrap(async (req, res) => {
  const p = [];
  const scope = scopeSql(req.user, p);
  const where = scope ? `WHERE ${scope}` : '';

  const counts = (sql) => query(sql, p).then((r) => r.rows);

  const [
    byCountry, byStatus, byIntake, bySource, byCampaign, monthly,
  ] = await Promise.all([
    counts(`SELECT preferred_country AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY preferred_country ORDER BY value DESC, label ASC`),
    counts(`SELECT status AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY status ORDER BY value DESC, label ASC`),
    counts(`SELECT preferred_intake AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY preferred_intake ORDER BY value DESC, label ASC`),
    counts(`SELECT COALESCE(NULLIF(utm_source,''),'Direct / Organic') AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY 1 ORDER BY value DESC, label ASC LIMIT 10`),
    counts(`SELECT COALESCE(NULLIF(utm_campaign,''),'(none)') AS label, count(*)::int AS value FROM student_enquiries e ${where} GROUP BY 1 ORDER BY value DESC, label ASC LIMIT 10`),
    query(
      `SELECT to_char(date_trunc('month', (created_at AT TIME ZONE 'Asia/Kathmandu')), 'YYYY-MM') AS label,
              count(*)::int AS value
         FROM student_enquiries e ${where}
        GROUP BY date_trunc('month', (created_at AT TIME ZONE 'Asia/Kathmandu'))
        ORDER BY label DESC
        LIMIT 12`,
      p
    ),
  ]);

  const FUNNEL = [
    { key: 'enquiries', statuses: null, label: 'Enquiries' },
    { key: 'counseling', statuses: ['COUNSELING_SCHEDULED', 'COUNSELING_COMPLETED', 'DOCUMENTS_PENDING', 'APPLICATION_STARTED', 'OFFER_RECEIVED', 'VISA_PROCESSING', 'VISA_GRANTED', 'ENROLLED'], label: 'Counselling' },
    { key: 'applications', statuses: ['APPLICATION_STARTED', 'OFFER_RECEIVED', 'VISA_PROCESSING', 'VISA_GRANTED', 'ENROLLED'], label: 'Applications' },
    { key: 'offers', statuses: ['OFFER_RECEIVED', 'VISA_PROCESSING', 'VISA_GRANTED', 'ENROLLED'], label: 'Offers' },
    { key: 'visa_granted', statuses: ['VISA_GRANTED', 'ENROLLED'], label: 'Visa Granted' },
    { key: 'enrolled', statuses: ['ENROLLED'], label: 'Enrolled' },
  ];

  const funnel = [];
  for (const stage of FUNNEL) {
    const parts = [];
    const params = [...p];
    if (scope) parts.push(scope);
    if (stage.statuses) {
      params.push(stage.statuses);
      parts.push(`e.status = ANY($${params.length}::text[])`);
    }
    const sqlWhere = parts.length ? `WHERE ${parts.join(' AND ')}` : '';
    const { rows } = await query(
      `SELECT count(*)::int AS n FROM student_enquiries e ${sqlWhere}`,
      params
    );
    funnel.push({ key: stage.key, label: stage.label, value: rows[0].n });
  }

  const ALL_CLOSED = CLOSED_STATUSES;
  const fupParams = [...p];
  fupParams.push(ALL_CLOSED);
  const fupParts = [];
  if (scope) fupParts.push(scope);
  fupParts.push(`(e.status <> ALL($${fupParams.length}::text[]))`);
  fupParts.push(`e.next_follow_up_at <= now() + interval '2 days'`);
  const { rows: dueRows } = await query(
    `${SELECT_ENQ} WHERE ${fupParts.join(' AND ')}
       ORDER BY CASE WHEN e.next_follow_up_at < now() THEN 0 ELSE 1 END, e.next_follow_up_at ASC
       LIMIT 25`,
    fupParams
  );

  res.json({
    byCountry, byStatus, byIntake, bySource, byCampaign,
    monthly: monthly.rows, funnel,
    dueNow: dueRows.map(mapEnquiry),
  });
}));

// ---------- enquiries list ----------
router.get('/enquiries', wrap(async (req, res) => {
  const q = req.query;
  const p = [];
  const add = (v) => { p.push(v); return `$${p.length}`; };
  const where = [];
  const scope = scopeSql(req.user, p);
  if (scope) where.push(scope);

  const str = (k) => (typeof q[k] === 'string' ? q[k].trim() : '');
  if (str('q')) {
    const like = add(`%${str('q').slice(0, 100).replace(/[\\%_]/g, '\\$&')}%`);
    where.push(`(e.full_name ILIKE ${like} OR e.phone ILIKE ${like} OR e.email ILIKE ${like} OR e.lead_number ILIKE ${like})`);
  }
  if (str('status')) where.push(`e.status = ${add(str('status'))}`);
  if (str('country')) where.push(`e.preferred_country = ${add(str('country'))}`);
  if (str('intake')) where.push(`e.preferred_intake = ${add(str('intake'))}`);
  if (str('priority')) where.push(`e.priority = ${add(str('priority'))}`);

  const assigned = str('assigned');
  if (assigned === 'me') where.push(`e.assigned_to = ${add(req.user.id)}`);
  else if (assigned === 'unassigned') where.push('e.assigned_to IS NULL');
  else if (UUID_RE.test(assigned)) where.push(`e.assigned_to = ${add(assigned)}`);

  if (DATE_RE.test(str('dateFrom'))) where.push(`(e.created_at AT TIME ZONE 'Asia/Kathmandu')::date >= ${add(str('dateFrom'))}::date`);
  if (DATE_RE.test(str('dateTo'))) where.push(`(e.created_at AT TIME ZONE 'Asia/Kathmandu')::date <= ${add(str('dateTo'))}::date`);

  const fu = str('followUp');
  const ALL_CLOSED = CLOSED_STATUSES;
  const notClosedFU = () => `(e.status <> ALL(${add(ALL_CLOSED)}::text[]))`;
  if (fu === 'due') {
    where.push(`e.next_follow_up_at <= now() AND ${notClosedFU()}`);
  } else if (fu === 'today') {
    where.push(`(e.next_follow_up_at AT TIME ZONE 'Asia/Kathmandu')::date = (now() AT TIME ZONE 'Asia/Kathmandu')::date AND ${notClosedFU()}`);
  } else if (fu === 'overdue') {
    where.push(`e.next_follow_up_at < now() AND ${notClosedFU()}`);
  } else if (fu === 'upcoming') {
    where.push(`e.next_follow_up_at BETWEEN now() AND now() + interval '7 days' AND ${notClosedFU()}`);
  } else if (fu === 'none') {
    where.push(`e.next_follow_up_at IS NULL AND ${notClosedFU()}`);
  }

  const w = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const page = Math.max(parseInt(str('page') || '1', 10) || 1, 1);

  const count = await query(`SELECT count(*)::int AS n FROM student_enquiries e ${w}`, p);
  const total = count.rows[0].n;
  const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1);
  const rows = await query(
    `${SELECT_ENQ} ${w} ORDER BY e.created_at DESC LIMIT ${PAGE_SIZE} OFFSET ${(page - 1) * PAGE_SIZE}`, p
  );
  res.json({ enquiries: rows.rows.map(mapEnquiry), page, pageSize: PAGE_SIZE, total, totalPages });
}));

// ---------- CSV export (MUST be declared before /enquiries/:id) ----------
router.get('/enquiries.csv', wrap(async (req, res) => {
  const p = [];
  const scope = scopeSql(req.user, p);
  const where = scope ? `WHERE ${scope}` : '';
  const { rows } = await query(
    `${SELECT_ENQ} ${where} ORDER BY e.created_at DESC`, p
  );

  const esc = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const headers = [
    'Lead Number', 'Created At', 'Full Name', 'Phone', 'Email',
    'Country', 'Intake', 'Study Level', 'Course', 'Budget',
    'Education Level', 'Result Type', 'Result',
    'English Test', 'English Score',
    'Contact Method', 'Contact Time',
    'Status', 'Priority', 'Assigned To', 'Next Follow Up',
    'Source Page', 'Referrer',
    'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term',
    'Message',
  ];

  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push([
      esc(r.lead_number),
      esc(new Date(r.created_at).toISOString()),
      esc(r.full_name),
      esc(r.phone),
      esc(r.email),
      esc(r.preferred_country),
      esc(r.preferred_intake),
      esc(r.study_level),
      esc(r.preferred_course),
      esc(r.budget_range),
      esc(r.education_level),
      esc(r.academic_result_type),
      esc(r.academic_result),
      esc(r.english_test),
      esc(r.english_score),
      esc(r.preferred_contact_method),
      esc(r.preferred_contact_time),
      esc(r.status),
      esc(r.priority),
      esc(r.assigned_name),
      esc(r.next_follow_up_at ? new Date(r.next_follow_up_at).toISOString() : ''),
      esc(r.source_page),
      esc(r.referrer),
      esc(r.utm_source),
      esc(r.utm_medium),
      esc(r.utm_campaign),
      esc(r.utm_content),
      esc(r.utm_term),
      esc(r.message),
    ].join(','));
  }

  const filename = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send('\uFEFF' + lines.join('\r\n'));
}));

// ---------- single enquiry ----------
router.get('/enquiries/:id', wrap(async (req, res) => {
  const d = await loadDetail({ query }, req.params.id, req.user);
  if (!d) return res.status(404).json({ message: 'Enquiry not found.' });
  res.json(d);
}));

router.patch('/enquiries/:id', wrap(async (req, res) => {
  const id = req.params.id;
  if (!UUID_RE.test(id)) return res.status(404).json({ message: 'Enquiry not found.' });
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const user = req.user;

  const out = await tx(async (c) => {
    const params = [id];
    const scope = scopeSql(user, params);
    const cur = (await c.query(
      `${SELECT_ENQ} WHERE e.id = $1 ${scope ? 'AND ' + scope : ''} FOR UPDATE OF e`, params
    )).rows[0];
    if (!cur) return { status: 404, body: { message: 'Enquiry not found.' } };

    const sets = []; const vals = []; const events = [];
    const set = (col, v) => { vals.push(v); sets.push(`${col} = $${vals.length}`); };

    if ('status' in b && b.status !== cur.status) {
      if (!STATUSES.includes(b.status)) return { status: 400, body: { message: 'Invalid status.' } };
      set('status', b.status);
      events.push(['STATUS_CHANGED', { from: cur.status, to: b.status }]);
    }
    if ('priority' in b && b.priority !== cur.priority) {
      if (!PRIORITIES.includes(b.priority)) return { status: 400, body: { message: 'Invalid priority.' } };
      set('priority', b.priority);
      events.push(['PRIORITY_CHANGED', { from: cur.priority, to: b.priority }]);
    }
    if ('assignedTo' in b) {
      const to = b.assignedTo || null;
      if (to !== (cur.assigned_to || null)) {
        if (to !== null && !UUID_RE.test(to)) return { status: 400, body: { message: 'Invalid counselor.' } };
        if (!isAdmin(user) && to !== null && to !== user.id) {
          return { status: 403, body: { message: 'You can only assign leads to yourself.' } };
        }
        if (!isAdmin(user) && to === null && cur.assigned_to !== user.id) {
          return { status: 403, body: { message: 'You can only unassign your own leads.' } };
        }
        let toName = null;
        if (to) {
          const u = (await c.query('SELECT name FROM users WHERE id = $1 AND active', [to])).rows[0];
          if (!u) return { status: 400, body: { message: 'That counselor does not exist or is inactive.' } };
          toName = u.name;
        }
        set('assigned_to', to);
        events.push(['ASSIGNED', { from: cur.assigned_name || null, to: toName }]);
      }
    }
    if ('nextFollowUpAt' in b) {
      let to = null;
      if (b.nextFollowUpAt) {
        const d = new Date(b.nextFollowUpAt);
        if (Number.isNaN(d.getTime())) return { status: 400, body: { message: 'Invalid follow-up date.' } };
        to = d.toISOString();
      }
      const from = cur.next_follow_up_at ? new Date(cur.next_follow_up_at).toISOString() : null;
      if (to !== from) {
        set('next_follow_up_at', to);
        events.push(['FOLLOW_UP_SET', { from, to }]);
      }
    }

    if (sets.length) {
      vals.push(id);
      await c.query(`UPDATE student_enquiries SET ${sets.join(', ')}, updated_at = now() WHERE id = $${vals.length}`, vals);
      for (const [type, detail] of events) {
        await c.query(
          `INSERT INTO enquiry_events (enquiry_id, type, actor_id, actor_name, detail) VALUES ($1,$2,$3,$4,$5)`,
          [id, type, user.id, user.name, JSON.stringify(detail)]
        );
      }
    }
    return { status: 200, body: await loadDetail(c, id, user) };
  });

  res.status(out.status).json(out.body);
}));

router.post('/enquiries/:id/notes', wrap(async (req, res) => {
  const id = req.params.id;
  const text = typeof req.body?.body === 'string' ? req.body.body.trim() : '';
  if (!text) return res.status(400).json({ message: 'Please write a note first.' });
  if (text.length > 5000) return res.status(400).json({ message: 'Note is too long (max 5000 characters).' });

  const out = await tx(async (c) => {
    const visible = await loadDetail(c, id, req.user);
    if (!visible) return null;
    await c.query(`INSERT INTO enquiry_notes (enquiry_id, author_id, author_name, body) VALUES ($1,$2,$3,$4)`,
      [id, req.user.id, req.user.name, text]);
    await c.query(`INSERT INTO enquiry_events (enquiry_id, type, actor_id, actor_name) VALUES ($1,'NOTE_ADDED',$2,$3)`,
      [id, req.user.id, req.user.name]);
    return loadDetail(c, id, req.user);
  });
  if (!out) return res.status(404).json({ message: 'Enquiry not found.' });
  res.json(out);
}));

// ---------- errors ----------
router.use((req, res) => res.status(404).json({ message: 'Not found.' }));
router.use((err, req, res, next) => {
  if (err && (err.type === 'entity.parse.failed' || err.type === 'entity.too.large')) {
    return res.status(400).json({ message: 'Invalid request.' });
  }
  console.error('[admin] error:', err);
  res.status(500).json({ message: 'Something went wrong on the server. Please try again.' });
});

module.exports = router;
