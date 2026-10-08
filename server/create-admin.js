// Create (or reset the password of) a staff account.
//   npm run admin:create -- --email you@example.com --name "Your Name" --role ADMIN [--password "..."]
// If --password is omitted a strong random one is generated and printed once.
const crypto = require('crypto');
const { getPool, assertConfigured } = require('./db');
const { hashPassword } = require('./auth');
const { ROLES } = require('./constants');

function args() {
  const out = {}; const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith('--')) { out[a[i].slice(2)] = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : 'true'; }
  }
  return out;
}

(async () => {
  const a = args();
  const email = String(a.email || '').trim().toLowerCase();
  const name = String(a.name || '').trim();
  const role = String(a.role || 'COUNSELOR').trim().toUpperCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name || !ROLES.includes(role)) {
    console.error('Usage: npm run admin:create -- --email you@example.com --name "Your Name" --role ADMIN|COUNSELOR [--password "..."]');
    process.exit(1);
  }
  let password = a.password;
  const generated = !password;
  if (generated) password = crypto.randomBytes(12).toString('base64url');
  if (password.length < 8) { console.error('Password must be at least 8 characters.'); process.exit(1); }

  try {
    assertConfigured();
    const pool = getPool();
    const hash = await hashPassword(password);
    const { rows } = await pool.query(
      `INSERT INTO users (email, name, role, password_hash) VALUES ($1,$2,$3,$4)
       ON CONFLICT (lower(email)) DO UPDATE
         SET name = EXCLUDED.name, role = EXCLUDED.role, password_hash = EXCLUDED.password_hash, active = true
       RETURNING (xmax = 0) AS inserted`,
      [email, name, role, hash]
    );
    console.log(`✔ ${rows[0].inserted ? 'Created' : 'Updated'} ${role} account: ${email}`);
    if (generated) console.log(`  Temporary password (shown once): ${password}`);
    await pool.end();
  } catch (err) {
    console.error('✖ Failed:', err.message);
    if (/relation "users" does not exist/.test(err.message)) console.error('  Run "npm run db:migrate" first.');
    process.exit(1);
  }
})();
