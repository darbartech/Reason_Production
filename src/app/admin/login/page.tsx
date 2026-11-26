import { redirect } from 'next/navigation';
import LoginForm from '@/components/admin/LoginForm';
import { currentStaffUser } from '@/lib/server/current-staff';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (await currentStaffUser()) redirect('/admin');
  return <LoginForm />;
}
