// Shared plumbing for the operator CLIs (db:migrate, admin:create, db:export).
// Deliberately separate from src/lib/server/db.ts: a CLI wants one short-lived
// connection and must not import the app bundle, but the connection settings
// (SSL handling especially) are kept identical so local and deployed behaviour match.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// .env is read directly: these scripts run outside Next, which loads it for the app.
function loadEnv() {
  const file = path.join(ROOT, '.env');
  if (!fs.existsSync(file)) return;
  try {
    process.loadEnvFile(file);
    return;
  } catch {
    /* Node without loadEnvFile, or a line it rejects — fall through to a manual parse */
  }
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    if (line.trim().startsWith('#')) continue;
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    if (process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}
loadEnv();

function sslOption() {
  const v = String(process.env.DATABASE_SSL || '').trim().toLowerCase();
  if (!['true', '1', 'yes', 'require'].includes(v)) {
    if (!['', 'false', '0', 'no'].includes(v)) {
      console.warn(`[db] DATABASE_SSL="${process.env.DATABASE_SSL}" is not recognised; use true or false. SSL is OFF.`);
    }
    return false;
  }
  const ca = process.env.DATABASE_CA_CERT;
  if (ca) return { rejectUnauthorized: true, ca };
  console.warn('[db] DATABASE_SSL is on without DATABASE_CA_CERT; certificate verification is disabled.');
  return { rejectUnauthorized: false };
}

export function assertConfigured() {
  const url = process.env.DATABASE_URL || '';
  if (!url || /USER:PASSWORD@HOST/.test(url)) {
    throw new Error(
      'DATABASE_URL is not configured. Set it in .env (local) or the deployment environment panel to your real PostgreSQL connection string.'
    );
  }
}

let pool;

export function getPool() {
  if (!pool) {
    assertConfigured();
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: sslOption(),
      max: 1,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      application_name: 'reasons-cli',
    });
    pool.on('error', (err) => console.error('[db] idle client error:', err.message));
  }
  return pool;
}
