import { NextResponse } from 'next/server';
import { signToken, COOKIE_NAME_EXPORT } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'laila2026';

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = await signToken({ username });

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME_EXPORT, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });
    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME_EXPORT, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return response;
}
