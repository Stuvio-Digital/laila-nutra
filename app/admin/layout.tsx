export const metadata = {
  title: 'CMS Admin — Laila Nutra',
  robots: 'noindex, nofollow',
};

// Minimal shell for /admin/login (no auth guard here)
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
