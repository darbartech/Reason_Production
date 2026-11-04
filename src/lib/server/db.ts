import { Pool, type PoolClient, type PoolConfig, type QueryResult, type QueryResultRow } from 'pg';

function sslOption(): PoolConfig['ssl'] {
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
  // Encrypted, but the server certificate is not verified. Set DATABASE_CA_CERT
  // (the provider's CA) if the database host is not on a trusted network path.
  console.warn('[db] DATABASE_SSL is on without DATABASE_CA_CERT; certificate verification is disabled.');
  return { rejectUnauthorized: false };
}

function assertConfigured() {
  const url = process.env.DATABASE_URL || '';
  if (!url || /USER:PASSWORD@HOST/.test(url)) {
    throw new Error(
      'DATABASE_URL is not configured. Set it in .env (local) or the deployment environment panel to your real PostgreSQL connection string.'
    );
  }
}

// Warm containers are reused between requests, so the pool lives on globalThis: a
// module-level `let` would be re-created whenever the bundle is re-evaluated.
declare global {
  var __reasonsPool: Pool | undefined;
}

export function getPool(): Pool {
  if (!globalThis.__reasonsPool) {
    assertConfigured();
    globalThis.__reasonsPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: sslOption(),
      // One connection per warm container: platforms scale out by starting more of them,
      // and a transaction-mode pooler has a small connection budget. node-postgres sends
      // unnamed statements, so it does not need prepared-statement caching to be disabled.
      max: 1,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      application_name: 'reasons-site',
    });
    globalThis.__reasonsPool.on('error', (err: Error) => console.error('[db] idle client error:', err.message));
  }
  return globalThis.__reasonsPool;
}

export async function query<T extends QueryResultRow = Record<string, any>>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  return getPool().query<T>(text, params as unknown[]);
}

export async function tx<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const out = await fn(client);
    await client.query('COMMIT');
    return out;
  } catch (err) {
    try {
      await client.query('ROLLBACK');
    } catch {
      /* ignore */
    }
    throw err;
  } finally {
    client.release();
  }
}
