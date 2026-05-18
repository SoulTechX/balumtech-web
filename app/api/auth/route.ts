import { NextResponse } from 'next/server';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'balum2026';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'balum-secret-2026';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', ADMIN_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 horas
      path: '/',
    });
    return res;
  }

  return NextResponse.json({ success: false, error: 'Credenciales incorrectas' }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
  return res;
}
