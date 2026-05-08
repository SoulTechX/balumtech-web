import { products } from "@/lib/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Terminal as TerminalIcon, ShoppingCart, Truck, Star, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const waNumber = "5492974294025";
  const waMsg = `Hola BALUMTech, estoy interesado en el producto: ${product.nombre}`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

  const getBadgeClasses = (color: string) => {
    switch (color) {
      case 'yellow': return 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20';
      case 'purple': return 'bg-purple-500/15 text-purple-400 border border-purple-500/20';
      case 'green': return 'bg-green-500/15 text-green-400 border border-green-500/20';
      case 'blue': return 'bg-blue-500/15 text-blue-400 border border-blue-500/20';
      case 'violet': return 'bg-violet-500/15 text-violet-400 border border-violet-500/20';
      case 'pink': return 'bg-pink-500/15 text-pink-400 border border-pink-500/20';
      case 'orange': return 'bg-orange-500/15 text-orange-400 border border-orange-500/20';
      default: return 'bg-blue-500/15 text-blue-400 border border-blue-500/20';
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-blue-500/30">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-zinc-500 font-mono flex items-center gap-2">
          <Link href="/tienda" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Volver a la Tienda
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-400">{product.categoria}</span>
          <span className="mx-2">/</span>
          <span className="text-white truncate">{product.nombre.split('—')[0]}</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* IMAGE */}
          <div className="glass-panel rounded-3xl p-8 flex items-center justify-center relative min-h-[400px] overflow-hidden group border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            {product.imagen || product.imagenUrl ? (
              <Image 
                src={product.imagen || product.imagenUrl || ""} 
                alt={product.nombre} 
                fill
                className="object-contain p-8 drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="text-zinc-600 font-mono">No image available</div>
            )}
            <div className="absolute top-4 left-4 z-10">
              <span className={`${getBadgeClasses(product.badgeColor)} text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md`}>
                {product.badge}
              </span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className={i <= Math.floor(product.rating) ? "text-blue-400 fill-blue-400" : "text-zinc-700"} />
                ))}
              </div>
              <span className="text-xs text-zinc-500 font-mono">({product.reviews} reviews)</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{product.nombre}</h1>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-white tracking-tight">{product.precioLabel}</div>
              {product.cuotas && (
                <div className="text-sm text-green-400 mt-1 font-medium bg-green-500/10 w-fit px-3 py-1 rounded border border-green-500/20">
                  en {product.cuotas.cantidad} cuotas fijas de ${product.cuotas.monto.toLocaleString("es-AR")}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-400 bg-white/[0.02] border border-white/5 w-fit px-4 py-2 rounded-xl mb-8">
              <Truck size={16} className="text-blue-400" />
              <span>{product.envio}</span>
            </div>

            {/* HERO SPECS GRID */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.heroSpecs.map((spec, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{spec.label}</div>
                  <div className="text-sm text-zinc-300 font-medium">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <a 
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-white text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Consultar por WhatsApp
              </a>
              <Link
                href="/tienda"
                className="flex-1 glass-panel text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors group text-center"
              >
                <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* 2. SECCIÓN ¿QUÉ INCLUYE? */}
          <div className="glass-panel rounded-3xl p-8 lg:p-10 border border-white/5 h-full">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Check className="text-green-400" />
              ¿Qué incluye exactamente?
            </h3>
            <ul className="space-y-4">
              {product.incluye.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500/20 p-1 rounded border border-green-500/30 shrink-0">
                    <Check size={12} className="text-green-400" />
                  </div>
                  <span className="text-zinc-300 leading-relaxed font-mono text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. TERMINAL DE SPECS */}
          <div className="bg-[#0d1117] rounded-3xl p-8 lg:p-10 border border-[#30363d] shadow-2xl relative overflow-hidden group h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500"></div>
            
            <div className="flex items-center gap-2 mb-8 border-b border-[#30363d] pb-4">
              <TerminalIcon size={20} className="text-zinc-400" />
              <h3 className="text-sm font-mono text-zinc-400">root@balumtech:~/specs# cat {product.slug}.json</h3>
            </div>

            <div className="font-mono text-[13px] leading-loose">
              <span className="text-[#8b949e]">{"{"}</span>
              <div className="pl-4">
                {product.terminalSpecs.map((spec, idx) => (
                  <div key={idx} className="flex items-start mb-1">
                    <span className="text-[#79c0ff] whitespace-nowrap mr-2">"{spec.key}"</span>
                    <span className="text-[#8b949e] mr-2">:</span>
                    <span className="text-[#7ee787]">"{spec.value}"</span>
                    {idx < product.terminalSpecs.length - 1 && <span className="text-[#8b949e]">,</span>}
                  </div>
                ))}
              </div>
              <span className="text-[#8b949e]">{"}"}</span>
              
              <div className="mt-6 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="w-2 h-4 bg-green-500 animate-pulse inline-block"></span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
