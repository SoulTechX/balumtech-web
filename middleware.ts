import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // Permitir login y API de auth libremente
  if (url === '/admin/login' || url.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Proteger rutas de admin → redirige al login
  if (url.startsWith('/admin')) {
    const token = req.cookies.get('admin_token')?.value;
    const secret = process.env.ADMIN_SECRET || 'balum-secret-2026';
    if (!token || token !== secret) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Proteger mutaciones de la API de productos
  if (url.startsWith('/api/productos') && req.method !== 'GET') {
    const token = req.cookies.get('admin_token')?.value;
    const secret = process.env.ADMIN_SECRET || 'balum-secret-2026';
    if (!token || token !== secret) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/productos/:path*'],
};
