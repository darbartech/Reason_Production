import { requireStaffUser } from '@/lib/server/current-staff';

export const dynamic = 'force-dynamic';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  await requireStaffUser();
  return <>{children}</>;
}
