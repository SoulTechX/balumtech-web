import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Gradientes para asignar a los productos (por índice rotativo)
const GRADIENTS = [
  'from-blue-600/20 via-indigo-600/10 to-transparent',
  'from-purple-600/20 via-purple-600/5 to-transparent',
  'from-cyan-600/20 via-blue-600/5 to-transparent',
  'from-green-600/20 via-emerald-600/5 to-transparent',
  'from-yellow-500/15 via-orange-500/5 to-transparent',
  'from-violet-600/20 via-purple-600/5 to-transparent',
  'from-pink-500/15 via-rose-500/5 to-transparent',
  'from-sky-600/20 via-blue-600/5 to-transparent',
  'from-emerald-600/15 via-green-600/5 to-transparent',
  'from-orange-500/15 via-amber-500/5 to-transparent',
  'from-red-500/15 via-rose-500/5 to-transparent',
  'from-slate-500/15 via-gray-500/5 to-transparent',
]

// Helper para mapear productos de base de datos (snake_case) a formato frontend (camelCase)
function mapToFrontend(dbProduct: any, index = 0) {
  const precio = dbProduct.precio ?? null
  const cuotas = dbProduct.cuotas ?? null
  const envio = dbProduct.envio ?? ''

  // Detectar envío gratis desde el campo `envio`
  const envioGratis =
    typeof envio === 'string' &&
    (envio.toLowerCase().includes('gratis') || envio.toLowerCase().includes('incluido'))

  // Calcular cuotasPrecio si hay datos de cuotas
  let cuotasPrecio: string | undefined = undefined
  if (cuotas && typeof cuotas === 'object' && cuotas.cantidad && cuotas.monto) {
    cuotasPrecio = `${cuotas.cantidad}x $${Number(cuotas.monto).toLocaleString('es-AR')}`
  }

  return {
    // Campos de base de datos (snake_case)
    id: dbProduct.id,
    slug: dbProduct.slug,
    nombre: dbProduct.nombre,
    categoria: dbProduct.categoria,
    badge: dbProduct.badge,
    badgeColor: dbProduct.badge_color,
    badgeType: (dbProduct.badge_color as string) || 'nuevo',
    precio: precio,
   cuotas: cuotas?.cantidad ?? undefined,  // ✅ devuelve solo el número,
    precioLabel: dbProduct.precio_label || 'Consultar',
    envio: envio,
    stock: dbProduct.stock,
    rating: Number(dbProduct.rating || 5),
    reviews: Number(dbProduct.reviews || 0),
    imagen: dbProduct.imagen,
    heroSpecs: dbProduct.hero_specs || [],
    incluye: dbProduct.incluye || [],
    terminalSpecs: dbProduct.terminal_specs || [],
    // Alias para compatibilidad con componentes del frontend
    name: dbProduct.nombre,
    image: dbProduct.imagen,
    price: precio,
    priceLabel: dbProduct.precio_label || 'Consultar',
    currency: 'ARS',
    cuotasPrecio: cuotasPrecio,
    desc: dbProduct.descripcion || '',
    envioGratis: envioGratis,
    gradient: GRADIENTS[index % GRADIENTS.length],
  }
}

// Helper para mapear del frontend (camelCase) al formato de base de datos (snake_case)
function mapToDatabase(feProduct: any) {
  // Procesar las cuotas para guardarlas en la estructura JSONB {"cantidad": X, "monto": Y}
  let cuotasDb = null;
  const cantCuotas = feProduct.cuotas ? Number(feProduct.cuotas) : null;
  if (cantCuotas && cantCuotas > 0) {
    // Limpiar el string del precio por cuota para obtener solo el valor numérico (ej: "$28.420" -> 28420)
    let montoCuota = 0;
    if (feProduct.cuotasPrecio) {
      const limpio = String(feProduct.cuotasPrecio).replace(/[^0-9]/g, '');
      montoCuota = Number(limpio);
    } else if (feProduct.precio || feProduct.price) {
      // Si no hay precio de cuota especificado, aproximar
      const total = Number(feProduct.precio || feProduct.price);
      montoCuota = Math.round(total / cantCuotas);
    }
    cuotasDb = { cantidad: cantCuotas, monto: montoCuota };
  }

  return {
    slug:
      feProduct.slug ||
      (feProduct.name || feProduct.nombre || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
    nombre: feProduct.nombre || feProduct.name,
    categoria: feProduct.categoria,
    badge: feProduct.badge,
    badge_color: feProduct.badgeType || feProduct.badgeColor,
    precio:
      feProduct.precio === '' || feProduct.precio === null
        ? null
        : feProduct.precio != null
          ? Number(feProduct.precio)
          : feProduct.price != null
            ? Number(feProduct.price)
            : null,
    cuotas: cuotasDb,
    precio_label: feProduct.precioLabel || feProduct.priceLabel || 'Consultar',
    envio: feProduct.envio || '',
    stock: feProduct.stock || 'Disponible',
    rating: feProduct.rating ? Number(feProduct.rating) : 5.0,
    reviews: feProduct.reviews ? Number(feProduct.reviews) : 0,
    imagen: feProduct.image || feProduct.imagen,
    descripcion: feProduct.desc || feProduct.descripcion || '',
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

    const formatted = data.map((product, index) => mapToFrontend(product, index))
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

    // Obtener el índice para asignar gradiente correcto
    const { count } = await supabase
      .from('productos')
      .select('*', { count: 'exact', head: true })
    const index = (count ?? 1) - 1

    return NextResponse.json({ success: true, product: mapToFrontend(data, index) })
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

    return NextResponse.json({ success: true, product: mapToFrontend(data, updated.id - 1) })
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
    const { error } = await supabase.from('productos').delete().eq('id', id)

    if (error) {
      console.error('Error eliminando en Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
