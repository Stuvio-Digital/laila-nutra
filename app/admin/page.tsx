import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default async function AdminRoot() {
  const authed = await isAuthenticated();
  if (authed) redirect('/admin/events');
  redirect('/admin/login');
}
