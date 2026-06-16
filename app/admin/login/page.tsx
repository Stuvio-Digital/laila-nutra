import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Admin Login — Laila Nutra CMS',
  robots: 'noindex, nofollow',
};

export default async function LoginPage() {
  const authed = await isAuthenticated();
  if (authed) redirect('/admin/events');

  return <LoginForm />;
}
