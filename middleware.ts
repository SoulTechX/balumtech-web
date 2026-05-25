import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Crear el cliente de Supabase específico para el middleware
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

  // Obtener sesión del usuario actual
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.pathname

  // Permitir la página de login libremente
  if (url === '/admin/login') {
    // Si ya está logueado, redirigir directo a la tienda del admin
    if (user) {
      return NextResponse.redirect(new URL('/admin/tienda', request.url))
    }
    return response
  }

  // Proteger rutas de admin (ej: /admin/tienda) -> redirigir a login si no hay usuario autenticado
  if (url.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Proteger mutaciones de la API de productos (POST, PUT, DELETE)
  if (url.startsWith('/api/productos') && request.method !== 'GET') {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'No autorizado. Se requiere sesión.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/productos/:path*'],
}
