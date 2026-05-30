import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.pathname

  // ── ADMIN ──
  if (url === '/admin/login') {
    if (user) {
      return NextResponse.redirect(new URL('/admin/tienda', request.url))
    }
    return response
  }

  if (url.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (url.startsWith('/api/productos') && request.method !== 'GET') {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'No autorizado. Se requiere sesión.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }

  // ── METRIKA ──
  if (url === '/metrika/login') {
    if (user) {
      return NextResponse.redirect(new URL('/metrika', request.url))
    }
    return response
  }

  if (url.startsWith('/metrika')) {
    if (!user) {
      return NextResponse.redirect(new URL('/metrika/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/productos/:path*', '/metrika/:path*'],
}
