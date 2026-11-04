// Create (or reset the password of) a staff account.
//   npm run admin:create -- --email you@example.com --name "Your Name" --role ADMIN
// Every value also has an environment fallback, so the same command works with no flags:
//   ADMIN_EMAIL, ADMIN_NAME, ADMIN_ROLE, ADMIN_PASSWORD
// Flags win over the environment. With no password from either source a strong random one
// is generated and printed once.
//
// Needs Node 22.18+ / 23.6+: it imports the app's own scrypt module directly
// (src/lib/server/password.ts) so hashes written here always verify at login.
import { getPool } from './db-tool.mjs';
import { hashPassword, tempPassword } from '../src/lib/server/password.ts';

const ROLES = ['ADMIN', 'COUNSELOR'];

function args() {
  const out = {};
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith('--')) out[a[i].slice(2)] = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : 'true';
  }
  return out;
}

const a = args();
const from = (flag, envKey) => String(a[flag] || process.env[envKey] || '').trim();

const email = from('email', 'ADMIN_EMAIL').toLowerCase();
const name = from('name', 'ADMIN_NAME');
const role = (from('role', 'ADMIN_ROLE') || 'COUNSELOR').toUpperCase();
const passwordFlag = a.password || process.env.ADMIN_PASSWORD || '';
const fromEnvPassword = !a.password && !!process.env.ADMIN_PASSWORD;
const generated = !passwordFlag;
const password = generated ? tempPassword() : passwordFlag;

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name || name.length > 120 || !ROLES.includes(role)) {
  console.error('Usage: npm run admin:create -- --email you@example.com --name "Your Name" --role ADMIN|COUNSELOR [--password "..."]');
  console.error('       Or set ADMIN_EMAIL / ADMIN_NAME / ADMIN_ROLE / ADMIN_PASSWORD and run it with no flags.');
  process.exit(1);
}

if (a.password) {
  console.warn('  Warning: --password is visible in shell history and process listings; use ADMIN_PASSWORD or omit it to generate one.');
} else if (fromEnvPassword) {
  console.warn(`  Using the password from ADMIN_PASSWORD (${email}). Remove it from the environment once you have signed in.`);
}

if (password.length < 8) {
  console.error('Password must be at least 8 characters.');
  process.exit(1);
}

try {
  const pool = getPool();
  const hash = await hashPassword(password);
  const { rows } = await pool.query(
    `INSERT INTO users (email, name, role, password_hash) VALUES ($1,$2,$3,$4)
     ON CONFLICT (lower(email)) DO UPDATE
       SET name = EXCLUDED.name, role = EXCLUDED.role, password_hash = EXCLUDED.password_hash, active = true
     RETURNING (xmax = 0) AS inserted`,
    [email, name, role, hash]
  );
  if (!rows[0].inserted) {
    // A password reset must not leave old sessions usable.
    await pool.query(`DELETE FROM sessions WHERE user_id = (SELECT id FROM users WHERE lower(email) = $1)`, [email]);
  }
  console.log(`✔ ${rows[0].inserted ? 'Created' : 'Updated'} ${role} account: ${email}`);
  if (generated) console.log(`  Temporary password (shown once): ${password}`);
  await pool.end();
} catch (err) {
  console.error('✖ Failed:', err.message);
  if (/relation "users" does not exist/.test(err.message)) console.error('  Run "npm run db:migrate" first.');
  process.exit(1);
}
