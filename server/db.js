const fs = require('fs');
const path = require('path');

// Load .env (Node >= 20.12 has loadEnvFile; fall back to a tiny parser otherwise).
function loadEnv() {
  const file = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(file)) return;
  try {
    if (typeof process.loadEnvFile === 'function') return process.loadEnvFile(file);
  } catch { /* fall through to manual parse */ }
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    if (process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}
loadEnv();

const { Pool } = require('pg');

function sslOption() {
  const v = String(process.env.DATABASE_SSL || '').trim().toLowerCase();
  const sslEnabled = ['true', '1', 'yes', 'require'].includes(v);
  if (!sslEnabled) {
    if (!['', 'false', '0', 'no'].includes(v)) {
      console.warn(`[db] DATABASE_SSL="${process.env.DATABASE_SSL}" is not recognised; use true or false. SSL is OFF.`);
    }
    return false;
  }
  const ca = process.env.DATABASE_CA_CERT;
  if (ca) {
    return { rejectUnauthorized: true, ca };
  }
  return { rejectUnauthorized: false };
}

function assertConfigured() {
  const url = process.env.DATABASE_URL || '';
  if (!url || /USER:PASSWORD@HOST/.test(url)) {
    throw new Error(
      'DATABASE_URL is not configured. Edit .env and set it to your real PostgreSQL connection string, e.g.\n' +
      '  DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/reason'
    );
  }
}

let pool;
function getPool() {
  if (!pool) {
    assertConfigured();
    pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: sslOption(), max: 10 });
    pool.on('error', (err) => console.error('[db] idle client error:', err.message));
  }
  return pool;
}

const query = (text, params) => getPool().query(text, params);

async function tx(fn) {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const out = await fn(client);
    await client.query('COMMIT');
    return out;
  } catch (err) {
    try { await client.query('ROLLBACK'); } catch { /* ignore */ }
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { query, tx, getPool, assertConfigured };
