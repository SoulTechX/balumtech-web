import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_FILE = path.join(process.cwd(), 'data', 'productos.json');

const readProducts = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch { return []; }
};

const writeProducts = (products: any[]) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch { return false; }
};

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products, {
    headers: { 'Cache-Control': 'no-store' }
  });
}

export async function POST(request: Request) {
  const newProduct = await request.json();
  const products = readProducts();
  const maxId = products.reduce((max: number, p: any) => p.id > max ? p.id : max, 0);
  newProduct.id = maxId + 1;
  if (!newProduct.slug && newProduct.name) {
    newProduct.slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  products.push(newProduct);
  if (writeProducts(products)) {
    return NextResponse.json({ success: true, product: newProduct });
  }
  return NextResponse.json({ success: false, error: 'Error guardando' }, { status: 500 });
}

export async function PUT(request: Request) {
  const updated = await request.json();
  const products = readProducts();
  const index = products.findIndex((p: any) => p.id === updated.id);
  if (index === -1) return NextResponse.json({ success: false, error: 'No encontrado' }, { status: 404 });
  products[index] = updated;
  if (writeProducts(products)) {
    return NextResponse.json({ success: true, product: updated });
  }
  return NextResponse.json({ success: false, error: 'Error guardando' }, { status: 500 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '0', 10);
  if (!id) return NextResponse.json({ success: false, error: 'ID inválido' }, { status: 400 });
  let products = readProducts();
  products = products.filter((p: any) => p.id !== id);
  if (writeProducts(products)) return NextResponse.json({ success: true });
  return NextResponse.json({ success: false, error: 'Error guardando' }, { status: 500 });
}
