import { randomBytes } from 'node:crypto';
import { ROLES } from './constants';

export const USER_COLS = 'id, email, name, role, active, created_at, last_login_at';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface StaffRow {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'COUNSELOR';
  active: boolean;
  created_at: string | Date;
  last_login_at: string | Date | null;
}

export const mapUser = (r: StaffRow) => ({
  id: r.id, email: r.email, name: r.name, role: r.role, active: r.active,
  createdAt: new Date(r.created_at).toISOString(),
  lastLoginAt: r.last_login_at ? new Date(r.last_login_at).toISOString() : null,
});

export const validEmail = (email: string) => EMAIL_RE.test(email) && email.length <= 254;
export const validRole = (role: string) => ROLES.includes(role);

const tempPassword = () => randomBytes(12).toString('base64url');

export const countActiveAdmins = (db: { query: (t: string, p?: unknown[]) => Promise<{ rows: { n: number }[] }> }) =>
  db.query(`SELECT count(*)::int AS n FROM users WHERE role = 'ADMIN' AND active`).then((r) => r.rows[0].n);

// Shared by create and reset. Returns an error string, or the password to persist.
export function resolvePassword(value: unknown): { password: string; generated: boolean } | { error: string } {
  const supplied = typeof value === 'string' ? value : '';
  if (!supplied) return { password: tempPassword(), generated: true };
  if (supplied.length < 8) return { error: 'Password must be at least 8 characters.' };
  if (supplied.length > 200) return { error: 'Password is too long.' };
  return { password: supplied, generated: false };
}
