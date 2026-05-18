import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Terminal as TerminalIcon, ShoppingCart, Truck, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import GalleryViewer from "@/components/GalleryViewer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Spec { key: string; value: string; }
interface Producto {
  id: number; slug: string; name: string;
  price: number | null; priceLabel: string; currency: string;
  cuotas?: number; cuotasPrecio?: string;
  badge: string; badgeType: string;
  desc: string; image: string; categoria: string;
  envioGratis: boolean; rating: number; reviews: number;
  gradient: string; envio?: string; stock?: string;
  heroSpecs?: Spec[]; incluye?: string[]; terminalSpecs?: Spec[];
  images?: string[];
}

function getProducts(): Producto[] {
  try {
    const file = path.join(process.cwd(), "data", "productos.json");
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch { return []; }
}

const waNumber = "5492974779978";

const badgeClasses: Record<string, string> = {
  nuevo: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  stock: "bg-green-500/15 text-green-400 border border-green-500/20",
  pedido: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  pro: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = getProducts();
  const prod = all.find(p => p.slug === slug);
  if (!prod) notFound();

  const waMsg = `Hola BALUMTech, estoy interesado en: ${prod.name}`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;
  const badgeCls = badgeClasses[prod.badgeType] || badgeClasses.nuevo;
  const cuotaMonto = prod.cuotasPrecio ? prod.cuotasPrecio : null;
  const heroSpecs = prod.heroSpecs || [];
  const incluye = prod.incluye?.length ? prod.incluye : prod.desc ? [prod.desc] : [];
  const terminalSpecs = prod.terminalSpecs || [];

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-blue-500/30">
      {/* Aura BG */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-30%] right-[-20%] w-[50vw] h-[50vw] bg-blue-600/8 blur-[150px] rounded-full mix-blend-screen"/>
        <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/8 blur-[120px] rounded-full mix-blend-screen"/>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-zinc-500 font-mono flex items-center gap-2">
          <Link href="/tienda" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={14}/> Volver a la Tienda
          </Link>
          <span>/</span>
          <span className="text-zinc-400">{prod.categoria}</span>
          <span>/</span>
          <span className="text-white truncate">{prod.name.split("—")[0].trim()}</span>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Galería */}
          <GalleryViewer
            mainImage={prod.image}
            images={prod.images || []}
            altText={prod.name}
            gradient={prod.gradient}
          />

          {/* Detalles */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="mb-4">
              <span className={`${badgeCls} text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg`}>
                {prod.badge}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[1,2,3,4,5].map(i=>(
                  <Star key={i} size={14} className={i<=Math.floor(prod.rating)?"text-blue-400 fill-blue-400":"text-zinc-700"}/>
                ))}
              </div>
              <span className="text-xs text-zinc-500 font-mono">({prod.reviews} reviews)</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{prod.name}</h1>

            <div className="mb-6">
              <div className="text-3xl font-bold text-white tracking-tight">{prod.priceLabel}</div>
              {prod.cuotas && cuotaMonto && (
                <div className="text-sm text-green-400 mt-1 font-medium bg-green-500/10 w-fit px-3 py-1 rounded border border-green-500/20">
                  en {prod.cuotas} cuotas fijas de {cuotaMonto}
                </div>
              )}
            </div>

            {(prod.envio || prod.envioGratis) && (
              <div className="flex items-center gap-2 text-sm text-zinc-400 bg-white/[0.02] border border-white/5 w-fit px-4 py-2 rounded-xl mb-6">
                <Truck size={16} className="text-blue-400"/>
                <span>{prod.envio || (prod.envioGratis ? "Envío gratis" : "Consultar envío")}</span>
              </div>
            )}

            {prod.stock && (
              <div className="text-xs text-zinc-500 mb-6 font-mono">Estado: <span className="text-green-400">{prod.stock}</span></div>
            )}

            {/* Hero Specs */}
            {heroSpecs.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {heroSpecs.map((s,i)=>(
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{s.key}</div>
                    <div className="text-sm text-zinc-300 font-medium">{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={waLink} target="_blank" rel="noreferrer"
                className="flex-1 bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Consultar por WhatsApp
              </a>
              <Link href="/tienda"
                className="flex-1 glass-panel text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                <ShoppingCart size={18}/> Volver al catálogo
              </Link>
            </div>
          </div>
        </div>

        {/* DETALLE INFERIOR */}
        {(incluye.length > 0 || terminalSpecs.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Incluye */}
            {incluye.length > 0 && (
              <div className="glass-panel rounded-3xl p-8 border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Check className="text-green-400"/> ¿Qué incluye exactamente?
                </h3>
                <ul className="space-y-4">
                  {incluye.map((item,idx)=>(
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-500/20 p-1 rounded border border-green-500/30 shrink-0">
                        <Check size={12} className="text-green-400"/>
                      </div>
                      <span className="text-zinc-300 leading-relaxed font-mono text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Terminal specs */}
            {terminalSpecs.length > 0 && (
              <div className="bg-[#0d1117] rounded-3xl p-8 border border-[#30363d] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500"/>
                <div className="flex items-center gap-2 mb-6 border-b border-[#30363d] pb-4">
                  <TerminalIcon size={18} className="text-zinc-400"/>
                  <span className="text-sm font-mono text-zinc-400">root@balumtech:~/specs# cat {prod.slug}.json</span>
                </div>
                <div className="font-mono text-[13px] leading-loose">
                  <span className="text-[#8b949e]">{"{"}</span>
                  <div className="pl-4">
                    {terminalSpecs.map((s,idx)=>(
                      <div key={idx} className="flex items-start mb-1">
                        <span className="text-[#79c0ff] whitespace-nowrap mr-2">"{s.key}"</span>
                        <span className="text-[#8b949e] mr-2">:</span>
                        <span className="text-[#7ee787]">"{s.value}"</span>
                        {idx < terminalSpecs.length-1 && <span className="text-[#8b949e]">,</span>}
                      </div>
                    ))}
                  </div>
                  <span className="text-[#8b949e]">{"}"}</span>
                  <div className="mt-4 flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="w-2 h-4 bg-green-500 animate-pulse inline-block"/>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
