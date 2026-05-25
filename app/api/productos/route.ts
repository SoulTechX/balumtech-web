import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Helper para mapear productos de base de datos (snake_case) a formato frontend (camelCase)
function mapToFrontend(dbProduct: any) {
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.nombre,
    nombre: dbProduct.nombre, // mantendremos ambos por compatibilidad
    categoria: dbProduct.categoria,
    badge: dbProduct.badge,
    badgeColor: dbProduct.badge_color,
    precio: dbProduct.precio,
    cuotas: dbProduct.cuotas,
    precioLabel: dbProduct.precio_label,
    envio: dbProduct.envio,
    stock: dbProduct.stock,
    rating: Number(dbProduct.rating || 5),
    reviews: Number(dbProduct.reviews || 0),
    imagen: dbProduct.imagen,
    heroSpecs: dbProduct.hero_specs || [],
    incluye: dbProduct.incluye || [],
    terminalSpecs: dbProduct.terminal_specs || [],
  }
}

// Helper para mapear del frontend (camelCase) al formato de base de datos (snake_case)
function mapToDatabase(feProduct: any) {
  return {
    slug: feProduct.slug || feProduct.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    nombre: feProduct.nombre || feProduct.name,
    categoria: feProduct.categoria,
    badge: feProduct.badge,
    badge_color: feProduct.badgeColor,
    precio: feProduct.precio === '' || feProduct.precio === null ? null : Number(feProduct.precio),
    cuotas: feProduct.cuotas || null,
    precio_label: feProduct.precioLabel || 'Consultar',
    envio: feProduct.envio,
    stock: feProduct.stock,
    rating: feProduct.rating ? Number(feProduct.rating) : 5.0,
    reviews: feProduct.reviews ? Number(feProduct.reviews) : 0,
    imagen: feProduct.imagen,
    hero_specs: feProduct.heroSpecs || [],
    incluye: feProduct.incluye || [],
    terminal_specs: feProduct.terminalSpecs || [],
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error cargando productos de Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    const formatted = data.map(mapToFrontend)
    return NextResponse.json(formatted, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json()
    const supabase = await createClient()

    const dbData = mapToDatabase(newProduct)

    const { data, error } = await supabase
      .from('productos')
      .insert(dbData)
      .select()
      .single()

    if (error) {
      console.error('Error insertando en Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, product: mapToFrontend(data) })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const updated = await request.json()
    if (!updated.id) {
      return NextResponse.json({ success: false, error: 'ID requerido' }, { status: 400 })
    }

    const supabase = await createClient()
    const dbData = mapToDatabase(updated)

    const { data, error } = await supabase
      .from('productos')
      .update(dbData)
      .eq('id', updated.id)
      .select()
      .single()

    if (error) {
      console.error('Error actualizando en Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, product: mapToFrontend(data) })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0', 10)

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID inválido' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error eliminando en Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
