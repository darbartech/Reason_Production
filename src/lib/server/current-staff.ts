import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserByToken, SESSION_COOKIE, type StaffUser } from './session';

// Replaces the Express admin-pages gate: the staff HTML is rendered per request, so an
// unauthenticated visitor never receives the shell at all.
export const currentStaffUser = cache(async (): Promise<StaffUser | null> => {
  const store = await cookies();
  return getUserByToken(store.get(SESSION_COOKIE)?.value);
});

export async function requireStaffUser() {
  const user = await currentStaffUser();
  if (!user) redirect('/admin/login');
  return user;
}

export async function requireAdminStaff() {
  const user = await requireStaffUser();
  if (user.role !== 'ADMIN') redirect('/admin');
  return user;
}
