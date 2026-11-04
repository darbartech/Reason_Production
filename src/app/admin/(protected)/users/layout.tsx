import { requireAdminStaff } from '@/lib/server/current-staff';

export default async function StaffManagementLayout({ children }: { children: React.ReactNode }) {
  await requireAdminStaff();
  return <>{children}</>;
}
