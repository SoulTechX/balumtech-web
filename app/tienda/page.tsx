"use client"
import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, MessageCircle, Bot, Shield, Cpu, Monitor, Wifi, Search, 
  SlidersHorizontal, Zap, Server, Camera, Router, Truck, Star, 
  ChevronDown, X, Filter, Package
} from "lucide-react";

// ─── TIPOS ───────────────────────────────────────────
interface Producto {
  id: number;
  name: string;
  price: number | null;
  priceLabel: string;
  currency: string;
  cuotas?: number;
  cuotasPrecio?: string;
  badge: string;
  badgeType: "nuevo" | "stock" | "pedido" | "pro";
  desc: string;
  icon: React.ReactNode;
  categoria: string;
  envioGratis: boolean;
  rating: number;
  reviews: number;
  gradient: string;
}

// ─── DATOS DE PRODUCTOS ──────────────────────────────
const waNumber = "5492974779978";

const productos: Producto[] = [
  // IA & Automatización
  { 
    id: 1, name: "Agente IA Inmobiliario — Automatización 24/7 con n8n", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Especialidad", badgeType: "nuevo",
    desc: "Automatización completa de leads, agenda y seguimiento para inmobiliarias y corredores. Incluye configuración personalizada.",
    icon: <Bot size={48} />, categoria: "IA", envioGratis: false,
    rating: 5, reviews: 12, gradient: "from-blue-600/20 via-indigo-600/10 to-transparent"
  },
  { 
    id: 2, name: "Auditoría y Optimización de Flujos n8n / Make", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Pro", badgeType: "pro",
    desc: "Análisis profundo, optimización de rendimiento y limpieza de workflows existentes. Reducí costos y errores.",
    icon: <SlidersHorizontal size={48} />, categoria: "IA", envioGratis: false,
    rating: 4.8, reviews: 8, gradient: "from-purple-600/20 via-purple-600/5 to-transparent"
  },
  { 
    id: 3, name: "Chatbot IA Empresarial — Atención al Cliente Inteligente", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Nuevo", badgeType: "nuevo",
    desc: "Asistente virtual con IA generativa para atención 24/7. Aprende de tu negocio y responde como un humano.",
    icon: <MessageCircle size={48} />, categoria: "IA", envioGratis: false,
    rating: 4.9, reviews: 6, gradient: "from-cyan-600/20 via-blue-600/5 to-transparent"
  },
  { 
    id: 4, name: "Automatización de Reportes con IA — Datos en Tiempo Real", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Pro", badgeType: "pro",
    desc: "Generación automática de informes con datos actualizados. Integración con Google Sheets, CRMs y ERPs.",
    icon: <Zap size={48} />, categoria: "IA", envioGratis: false,
    rating: 4.7, reviews: 4, gradient: "from-yellow-500/15 via-orange-500/5 to-transparent"
  },

  // Seguridad Electrónica
  { 
    id: 5, name: "Kit CCTV Hogar 4 Cámaras Dahua — Visión Nocturna + App Móvil", 
    price: 285000, priceLabel: "$285.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$28.420",
    badge: "Stock disponible", badgeType: "stock",
    desc: "4 cámaras Dahua 2MP con visión nocturna, DVR 4ch, disco 1TB, cables y fuentes. Incluye instalación básica.",
    icon: <Camera size={48} />, categoria: "Seguridad", envioGratis: true,
    rating: 4.9, reviews: 23, gradient: "from-green-600/20 via-emerald-600/5 to-transparent"
  },
  { 
    id: 6, name: "Kit CCTV Empresa 8 Cámaras Profesional — Analytics de Movimiento", 
    price: 520000, priceLabel: "$520.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$51.840",
    badge: "Stock disponible", badgeType: "stock",
    desc: "8 cámaras Hikvision 4MP, NVR 8ch con analytics, disco 2TB. Alertas inteligentes y acceso remoto.",
    icon: <Camera size={48} />, categoria: "Seguridad", envioGratis: true,
    rating: 5, reviews: 15, gradient: "from-green-600/20 via-teal-600/5 to-transparent"
  },
  { 
    id: 7, name: "Control de Accesos Biométrico — Cerradura Inteligente", 
    price: 180000, priceLabel: "$180.000", currency: "ARS",
    cuotas: 6, cuotasPrecio: "$33.000",
    badge: "Instalación incluida", badgeType: "stock",
    desc: "Cerraduras inteligentes con lector biométrico, código PIN y control desde el celular. Ideal oficinas.",
    icon: <Shield size={48} />, categoria: "Seguridad", envioGratis: true,
    rating: 4.6, reviews: 9, gradient: "from-emerald-600/15 via-green-600/5 to-transparent"
  },

  // Redes & Conectividad
  { 
    id: 8, name: "Nodo de Red Pro — Access Point Ubiquiti + Cableado Cat6", 
    price: 145000, priceLabel: "$145.000", currency: "ARS",
    cuotas: 6, cuotasPrecio: "$26.620",
    badge: "Instalación incluida", badgeType: "stock",
    desc: "Mejora de cobertura Wi-Fi con access point Ubiquiti empresarial y cableado estructurado categoría 6.",
    icon: <Wifi size={48} />, categoria: "Redes", envioGratis: true,
    rating: 4.8, reviews: 18, gradient: "from-sky-600/20 via-blue-600/5 to-transparent"
  },
  { 
    id: 9, name: "Red Mesh Empresarial — Conectividad Industrial", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Proyecto", badgeType: "pedido",
    desc: "Solución de conectividad robusta para yacimientos, campos petroleros y plantas industriales. Diseño a medida.",
    icon: <Router size={48} />, categoria: "Redes", envioGratis: false,
    rating: 5, reviews: 7, gradient: "from-orange-500/15 via-amber-500/5 to-transparent"
  },
  { 
    id: 10, name: "VPN & Firewall Corporativo — Cisco / MikroTik", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Pro", badgeType: "pro",
    desc: "Infraestructura de seguridad perimetral para oficinas distribuidas. VPN site-to-site y firewall avanzado.",
    icon: <Server size={48} />, categoria: "Redes", envioGratis: false,
    rating: 4.9, reviews: 5, gradient: "from-red-500/15 via-rose-500/5 to-transparent"
  },

  // Hardware & Workstations
  { 
    id: 11, name: "PC BALUM v1 Gamer — Ryzen 7 + RTX 4060 + 32GB RAM", 
    price: 820000, priceLabel: "$820.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$81.780",
    badge: "A pedido", badgeType: "pedido",
    desc: "PC gamer de alto rendimiento armada en Sarmiento. Ryzen 7 7700X, RTX 4060 8GB, 32GB DDR5, SSD 1TB NVMe.",
    icon: <Monitor size={48} />, categoria: "Hardware", envioGratis: true,
    rating: 5, reviews: 11, gradient: "from-violet-600/20 via-purple-600/5 to-transparent"
  },
  { 
    id: 12, name: "Workstation Diseño / IA — Renderizado 3D Profesional", 
    price: 1200000, priceLabel: "$1.200.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$119.640",
    badge: "A pedido", badgeType: "pedido",
    desc: "Estación de trabajo para renderizado 3D, entrenamiento de IA y diseño gráfico. Xeon + RTX 4080 + 64GB ECC.",
    icon: <Cpu size={48} />, categoria: "Hardware", envioGratis: true,
    rating: 5, reviews: 3, gradient: "from-pink-500/15 via-rose-500/5 to-transparent"
  },
  { 
    id: 13, name: "Servidor NAS Empresarial — Almacenamiento RAID Seguro", 
    price: 650000, priceLabel: "$650.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$64.840",
    badge: "A pedido", badgeType: "pedido",
    desc: "Servidor NAS Synology con RAID 5, 4 bahías, acceso remoto seguro y respaldo automático en la nube.",
    icon: <Server size={48} />, categoria: "Hardware", envioGratis: true,
    rating: 4.7, reviews: 6, gradient: "from-slate-500/15 via-gray-500/5 to-transparent"
  },
];

const categorias = [
  { name: "Todos", icon: <Package size={16} /> },
  { name: "IA", icon: <Bot size={16} /> },
  { name: "Seguridad", icon: <Shield size={16} /> },
  { name: "Redes", icon: <Wifi size={16} /> },
  { name: "Hardware", icon: <Monitor size={16} /> },
];

type SortOption = "relevancia" | "menor" | "mayor";

// ─── COMPONENTE DE ESTRELLAS ─────────────────────────
function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="product-rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star 
          key={i} 
          size={12} 
          className={i <= Math.floor(rating) ? "text-blue-400 fill-blue-400" : "text-zinc-700"} 
        />
      ))}
      <span className="text-[11px] text-zinc-500 ml-1">({reviews})</span>
    </div>
  );
}

// ─── COMPONENTE DE BADGE ─────────────────────────────
function Badge({ text, type }: { text: string; type: string }) {
  const cls = type === "nuevo" ? "badge-nuevo" : type === "stock" ? "badge-stock" : type === "pedido" ? "badge-pedido" : "badge-pro";
  return (
    <span className={`${cls} text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md`}>
      {text}
    </span>
  );
}

// ─── PÁGINA PRINCIPAL ────────────────────────────────
export default function TiendaPage() {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [sort, setSort] = useState<SortOption>("relevancia");
  const [soloEnvioGratis, setSoloEnvioGratis] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const productosFiltrados = useMemo(() => {
    let result = productos.filter((p) => {
      const matchCategoria = filtro === "Todos" || p.categoria === filtro;
      const matchBusqueda = p.name.toLowerCase().includes(busqueda.toLowerCase()) || 
                            p.desc.toLowerCase().includes(busqueda.toLowerCase());
      const matchEnvio = !soloEnvioGratis || p.envioGratis;
      return matchCategoria && matchBusqueda && matchEnvio;
    });

    if (sort === "menor") {
      result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sort === "mayor") {
      result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return result;
  }, [filtro, busqueda, sort, soloEnvioGratis]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: productos.length };
    productos.forEach(p => {
      counts[p.categoria] = (counts[p.categoria] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] relative">
      {/* FONDOS AURA */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] right-[-20%] w-[50vw] h-[50vw] bg-blue-600/8 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/8 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-28 pb-20 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">

          {/* HEADER */}
          <header className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors text-sm mb-4">
              <ArrowLeft size={16} /> Volver al inicio
            </Link>
            
            {/* BARRA DE BÚSQUEDA PRINCIPAL (estilo ML) */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1 w-full max-w-2xl">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar productos, marcas y más..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="form-input !pl-12 !pr-4 !py-3.5 !rounded-xl !text-base !bg-white/[0.03] !border-white/10 focus:!border-blue-500 w-full"
                />
                {busqueda && (
                  <button onClick={() => setBusqueda("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                    <X size={16} />
                  </button>
                )}
              </div>
              
              {/* Botón filtros mobile */}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
              >
                <Filter size={16} /> Filtros
              </button>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mt-4 text-xs text-zinc-600">
              <Link href="/" className="hover:text-blue-400 transition-colors">Inicio</Link>
              <ChevronDown size={12} className="-rotate-90" />
              <span className="text-zinc-400">Tienda</span>
              {filtro !== "Todos" && (
                <>
                  <ChevronDown size={12} className="-rotate-90" />
                  <span className="text-blue-400">{filtro}</span>
                </>
              )}
            </div>
          </header>

          {/* LAYOUT: SIDEBAR + PRODUCTOS */}
          <div className="tienda-layout">
            
            {/* ─── SIDEBAR ─── */}
            <aside className={`tienda-sidebar glass-panel rounded-2xl p-5 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
              
              {/* Categorías */}
              <div className="sidebar-section">
                <h4>Categorías</h4>
                {categorias.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => { setFiltro(cat.name); setSidebarOpen(false); }}
                    className={`sidebar-option ${filtro === cat.name ? "active" : ""}`}
                  >
                    {cat.icon}
                    <span>{cat.name}</span>
                    <span className="count">{categoryCounts[cat.name] || 0}</span>
                  </button>
                ))}
              </div>

              {/* Envío */}
              <div className="sidebar-section">
                <h4>Envío</h4>
                <button
                  onClick={() => setSoloEnvioGratis(!soloEnvioGratis)}
                  className={`sidebar-option ${soloEnvioGratis ? "active" : ""}`}
                >
                  <Truck size={16} />
                  <span>Envío gratis</span>
                </button>
              </div>

              {/* Condición */}
              <div className="sidebar-section">
                <h4>Disponibilidad</h4>
                <button
                  onClick={() => setFiltro("Todos")}
                  className={`sidebar-option ${filtro === "Todos" ? "active" : ""}`}
                >
                  <Package size={16} />
                  <span>Ver todos</span>
                  <span className="count">{productos.length}</span>
                </button>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-[11px] text-blue-400 font-semibold mb-1">💬 ¿Necesitás ayuda?</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed">Escribinos por WhatsApp y te asesoramos con tu compra.</p>
                <a 
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hola BALUMTech, necesito ayuda con una compra.")}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-semibold mt-2 transition-colors"
                >
                  <MessageCircle size={12} /> Chatear ahora
                </a>
              </div>
            </aside>

            {/* ─── PRODUCTOS ─── */}
            <div>
              {/* Sort bar */}
              <div className="sort-bar">
                <span className="text-sm text-zinc-400">
                  <strong className="text-white">{productosFiltrados.length}</strong> resultado{productosFiltrados.length !== 1 ? "s" : ""}
                </span>
                <div className="sort-options">
                  <span className="text-xs text-zinc-600 mr-2 self-center">Ordenar:</span>
                  {([
                    { key: "relevancia" as SortOption, label: "Más relevantes" },
                    { key: "menor" as SortOption, label: "Menor precio" },
                    { key: "mayor" as SortOption, label: "Mayor precio" },
                  ]).map(s => (
                    <button 
                      key={s.key} 
                      onClick={() => setSort(s.key)}
                      className={`sort-btn ${sort === s.key ? "active" : ""}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid de productos */}
              {productosFiltrados.length === 0 ? (
                <div className="glass-panel rounded-2xl p-16 text-center mt-8">
                  <Search size={48} className="text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-400 text-lg font-medium">No hay resultados para tu búsqueda</p>
                  <p className="text-zinc-600 text-sm mt-2">Probá con otras palabras o revisá los filtros</p>
                  <button onClick={() => { setBusqueda(""); setFiltro("Todos"); setSoloEnvioGratis(false); }} className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {productosFiltrados.map((prod) => (
                    <a
                      key={prod.id}
                      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola BALUMTech, me interesa "${prod.name}" (${prod.priceLabel}). ¿Podrían darme más información?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="product-card-ml group"
                    >
                      {/* Imagen / Icono Area */}
                      <div className={`product-image-area bg-gradient-to-br ${prod.gradient} bg-[#0a0a0a]`}>
                        <div className="text-zinc-600 group-hover:text-blue-400/60 transition-colors duration-500 group-hover:scale-110 transition-transform">
                          {prod.icon}
                        </div>
                        {/* Badge flotante */}
                        <div className="absolute top-3 left-3">
                          <Badge text={prod.badge} type={prod.badgeType} />
                        </div>
                        {prod.envioGratis && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-green-500/15 text-green-400 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-green-500/20 flex items-center gap-1">
                              <Truck size={10} /> Gratis
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="product-body">
                        <div className="product-price">{prod.priceLabel}</div>
                        {prod.cuotas && (
                          <div className="product-installments">
                            en {prod.cuotas}x {prod.cuotasPrecio}
                          </div>
                        )}
                        <p className="product-name">{prod.name}</p>
                        {prod.envioGratis && (
                          <div className="product-shipping">
                            <Truck size={12} /> Envío gratis a Sarmiento
                          </div>
                        )}
                        <Stars rating={prod.rating} reviews={prod.reviews} />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA FINAL */}
          <section className="mt-20 glass-panel rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4">¿No encontrás lo que buscás?</h3>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto font-medium">
              Armamos presupuestos personalizados. Contanos qué necesitás y te asesoramos sin compromiso.
            </p>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hola BALUMTech, quiero un presupuesto personalizado para mi proyecto.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-zinc-100 text-black rounded-xl font-bold tracking-tight hover:bg-white hover:scale-105 transition-all inline-flex items-center gap-2 group shadow-xl shadow-white/10"
            >
              <MessageCircle size={18} /> Pedir Presupuesto
            </a>
          </section>

        </div>
      </main>
    </div>
  );
}
