"use client"
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, MessageCircle, Search, Truck, Star, 
  ChevronDown, X, Filter, Package, ShoppingCart, Plus, Minus, Trash2
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
  image: string;
  categoria: string;
  envioGratis: boolean;
  rating: number;
  reviews: number;
  gradient: string;
}

interface CartItem {
  product: Producto;
  quantity: number;
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
    image: "/productos/prod-1.png", categoria: "IA", envioGratis: false,
    rating: 5, reviews: 12, gradient: "from-blue-600/20 via-indigo-600/10 to-transparent"
  },
  { 
    id: 2, name: "Auditoría y Optimización de Flujos n8n / Make", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Pro", badgeType: "pro",
    desc: "Análisis profundo, optimización de rendimiento y limpieza de workflows existentes. Reducí costos y errores.",
    image: "/productos/prod-2.png", categoria: "IA", envioGratis: false,
    rating: 4.8, reviews: 8, gradient: "from-purple-600/20 via-purple-600/5 to-transparent"
  },
  { 
    id: 3, name: "Chatbot IA Empresarial — Atención al Cliente Inteligente", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Nuevo", badgeType: "nuevo",
    desc: "Asistente virtual con IA generativa para atención 24/7. Aprende de tu negocio y responde como un humano.",
    image: "/productos/prod-3.png", categoria: "IA", envioGratis: false,
    rating: 4.9, reviews: 6, gradient: "from-cyan-600/20 via-blue-600/5 to-transparent"
  },
  { 
    id: 4, name: "Automatización de Reportes con IA — Datos en Tiempo Real", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Pro", badgeType: "pro",
    desc: "Generación automática de informes con datos actualizados. Integración con Google Sheets, CRMs y ERPs.",
    image: "/productos/prod-4.png", categoria: "IA", envioGratis: false,
    rating: 4.7, reviews: 4, gradient: "from-yellow-500/15 via-orange-500/5 to-transparent"
  },

  // Seguridad Electrónica
  { 
    id: 5, name: "Kit CCTV Hogar 4 Cámaras Dahua — Visión Nocturna", 
    price: 285000, priceLabel: "$285.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$28.420",
    badge: "Stock", badgeType: "stock",
    desc: "4 cámaras Dahua 2MP con visión nocturna, DVR 4ch, disco 1TB, cables y fuentes. Incluye instalación básica.",
    image: "/productos/cctv-hogar-4.png", categoria: "Seguridad", envioGratis: true,
    rating: 4.9, reviews: 23, gradient: "from-green-600/20 via-emerald-600/5 to-transparent"
  },
  { 
    id: 6, name: "Kit CCTV Empresa 8 Cámaras Profesional — Analytics", 
    price: 520000, priceLabel: "$520.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$51.840",
    badge: "Stock", badgeType: "stock",
    desc: "8 cámaras Hikvision 4MP, NVR 8ch con analytics, disco 2TB. Alertas inteligentes y acceso remoto.",
    image: "/productos/cctv-empresa-8.png", categoria: "Seguridad", envioGratis: true,
    rating: 5, reviews: 15, gradient: "from-green-600/20 via-teal-600/5 to-transparent"
  },
  { 
    id: 7, name: "Control de Accesos Biométrico — Cerradura Inteligente", 
    price: 180000, priceLabel: "$180.000", currency: "ARS",
    cuotas: 6, cuotasPrecio: "$33.000",
    badge: "Instalación", badgeType: "stock",
    desc: "Cerraduras inteligentes con lector biométrico, código PIN y control celular.",
    image: "/productos/acceso-biometrico.png", categoria: "Seguridad", envioGratis: true,
    rating: 4.6, reviews: 9, gradient: "from-emerald-600/15 via-green-600/5 to-transparent"
  },

  // Redes & Conectividad
  { 
    id: 8, name: "Nodo de Red Pro — Access Point Ubiquiti + Cableado", 
    price: 145000, priceLabel: "$145.000", currency: "ARS",
    cuotas: 6, cuotasPrecio: "$26.620",
    badge: "Instalación", badgeType: "stock",
    desc: "Mejora de cobertura Wi-Fi con AP Ubiquiti empresarial y cableado estructurado Cat 6.",
    image: "/productos/nodo-red-pro.png", categoria: "Redes", envioGratis: true,
    rating: 4.8, reviews: 18, gradient: "from-sky-600/20 via-blue-600/5 to-transparent"
  },
  { 
    id: 9, name: "Red Mesh Empresarial — Conectividad Industrial", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Proyecto", badgeType: "pedido",
    desc: "Solución de conectividad robusta para yacimientos y plantas. Diseño a medida.",
    image: "https://mastecnologia.com.ar/images/productos/14095.png", categoria: "Redes", envioGratis: false,
    rating: 5, reviews: 7, gradient: "from-orange-500/15 via-amber-500/5 to-transparent"
  },
  { 
    id: 10, name: "VPN & Firewall Corporativo — Cisco / MikroTik", 
    price: null, priceLabel: "Consultar", currency: "ARS",
    badge: "Pro", badgeType: "pro",
    desc: "Seguridad perimetral para oficinas distribuidas. VPN site-to-site.",
    image: "https://mastecnologia.com.ar/images/productos/14177.png", categoria: "Redes", envioGratis: false,
    rating: 4.9, reviews: 5, gradient: "from-red-500/15 via-rose-500/5 to-transparent"
  },

  // Hardware & Workstations
  { 
    id: 11, name: "PC BALUM v1 Gamer — Ryzen 7 + RTX 4060", 
    price: 820000, priceLabel: "$820.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$81.780",
    badge: "A pedido", badgeType: "pedido",
    desc: "Ryzen 7 7700X, RTX 4060 8GB, 32GB DDR5, SSD 1TB NVMe. Armada en Sarmiento.",
    image: "/productos/pc-gamer-v1.png", categoria: "Hardware", envioGratis: true,
    rating: 5, reviews: 11, gradient: "from-violet-600/20 via-purple-600/5 to-transparent"
  },
  { 
    id: 12, name: "Workstation Diseño / IA — Renderizado 3D", 
    price: 1200000, priceLabel: "$1.200.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$119.640",
    badge: "A pedido", badgeType: "pedido",
    desc: "Xeon + RTX 4080 + 64GB ECC. Optimizada para IA y renderizado profesional.",
    image: "/productos/workstation-diseno.jpg", categoria: "Hardware", envioGratis: true,
    rating: 5, reviews: 3, gradient: "from-pink-500/15 via-rose-500/5 to-transparent"
  },
  { 
    id: 13, name: "Servidor NAS Empresarial — Synology RAID", 
    price: 650000, priceLabel: "$650.000", currency: "ARS",
    cuotas: 12, cuotasPrecio: "$64.840",
    badge: "A pedido", badgeType: "pedido",
    desc: "NAS Synology RAID 5, 4 bahías, acceso remoto seguro y respaldo en nube.",
    image: "/productos/nas-qnap.png", categoria: "Hardware", envioGratis: true,
    rating: 4.7, reviews: 6, gradient: "from-slate-500/15 via-gray-500/5 to-transparent"
  },
];

const categorias = ["Todos", "IA", "Seguridad", "Redes", "Hardware"];

type SortOption = "relevancia" | "menor" | "mayor";

// ─── COMPONENTES AUXILIARES ─────────────────────────
function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="product-rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className={i <= Math.floor(rating) ? "text-blue-400 fill-blue-400" : "text-zinc-700"} />
      ))}
      <span className="text-[11px] text-zinc-500 ml-1">({reviews})</span>
    </div>
  );
}

function Badge({ text, type }: { text: string; type: string }) {
  const cls = type === "nuevo" ? "badge-nuevo" : type === "stock" ? "badge-stock" : type === "pedido" ? "badge-pedido" : "badge-pro";
  return <span className={`${cls} text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg`}>{text}</span>;
}

// ─── PÁGINA PRINCIPAL ────────────────────────────────
export default function TiendaPage() {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [sort, setSort] = useState<SortOption>("relevancia");
  const [soloEnvioGratis, setSoloEnvioGratis] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Estado del Carrito
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Funciones del Carrito
  const addToCart = (product: Producto) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(item => item.product.id !== id));

  const totalCart = cart.reduce((acc, item) => acc + ((item.product.price || 0) * item.quantity), 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    let msg = "Hola BALUMTech, quiero hacer el siguiente pedido:\n\n";
    cart.forEach(item => {
      msg += `▪ ${item.quantity}x ${item.product.name} - ${item.product.price ? `$${(item.product.price * item.quantity).toLocaleString('es-AR')}` : '(A cotizar)'}\n`;
    });
    if (totalCart > 0) {
      msg += `\n*TOTAL ESTIMADO: $${totalCart.toLocaleString('es-AR')}*`;
    }
    msg += "\n\n¿Me pueden confirmar stock y opciones de pago?";
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Filtrado de Productos
  const productosFiltrados = useMemo(() => {
    let result = productos.filter((p) => {
      const matchCategoria = filtro === "Todos" || p.categoria === filtro;
      const matchBusqueda = p.name.toLowerCase().includes(busqueda.toLowerCase()) || p.desc.toLowerCase().includes(busqueda.toLowerCase());
      const matchEnvio = !soloEnvioGratis || p.envioGratis;
      return matchCategoria && matchBusqueda && matchEnvio;
    });

    if (sort === "menor") result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    else if (sort === "mayor") result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    return result;
  }, [filtro, busqueda, sort, soloEnvioGratis]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: productos.length };
    productos.forEach(p => { counts[p.categoria] = (counts[p.categoria] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] relative overflow-x-hidden">
      {/* Botón Flotante Carrito */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-24 right-6 z-50 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-110 flex items-center justify-center"
      >
        <ShoppingCart size={24} />
        {cartItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-[var(--bg-base)]">
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* Drawer Carrito */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-[var(--bg-base)] border-l border-white/10 shadow-2xl h-full flex flex-col transform transition-transform duration-300">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart size={20} className="text-blue-400" /> Mi Pedido</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white bg-white/5 p-2 rounded-lg"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                  <Package size={64} className="opacity-20" />
                  <p>Tu carrito está vacío</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-blue-400 hover:text-blue-300 text-sm font-semibold">Explorar tienda</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5 relative group">
                    <button onClick={() => removeFromCart(item.product.id)} className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                    <div className="w-16 h-16 rounded-lg bg-black overflow-hidden relative flex-shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover opacity-80" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white line-clamp-2 leading-tight">{item.product.name}</h4>
                      <p className="text-blue-400 font-black text-sm mt-1">{item.product.priceLabel}</p>
                      <div className="flex items-center gap-3 mt-2 bg-black/40 w-fit rounded-lg border border-white/10">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1.5 text-zinc-400 hover:text-white"><Minus size={12} /></button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1.5 text-zinc-400 hover:text-white"><Plus size={12} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-zinc-400 text-sm font-medium">Total Estimado</span>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-white">${totalCart.toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-zinc-500">+ items a cotizar</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)]"
                >
                  <MessageCircle size={18} /> Enviar pedido por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FONDOS AURA */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] right-[-20%] w-[50vw] h-[50vw] bg-blue-600/8 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/8 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-10 pb-20 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">

          {/* HEADER */}
          <header className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors text-sm mb-6 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <ArrowLeft size={16} /> Volver al sitio principal
            </Link>
            
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
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
              >
                <Filter size={16} /> Filtros
              </button>
            </div>
          </header>

          {/* LAYOUT: SIDEBAR + PRODUCTOS */}
          <div className="tienda-layout">
            
            {/* SIDEBAR */}
            <aside className={`tienda-sidebar glass-panel rounded-2xl p-5 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
              <div className="sidebar-section">
                <h4>Categorías</h4>
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setFiltro(cat); setSidebarOpen(false); }}
                    className={`sidebar-option ${filtro === cat ? "active" : ""}`}
                  >
                    <span>{cat}</span>
                    <span className="count">{categoryCounts[cat] || 0}</span>
                  </button>
                ))}
              </div>

              <div className="sidebar-section">
                <h4>Envío</h4>
                <button onClick={() => setSoloEnvioGratis(!soloEnvioGratis)} className={`sidebar-option ${soloEnvioGratis ? "active" : ""}`}>
                  <Truck size={16} /> <span>Envío gratis</span>
                </button>
              </div>
            </aside>

            {/* PRODUCTOS */}
            <div>
              <div className="sort-bar">
                <span className="text-sm text-zinc-400">
                  <strong className="text-white">{productosFiltrados.length}</strong> resultados
                </span>
                <div className="sort-options">
                  <span className="text-xs text-zinc-600 mr-2 self-center">Ordenar:</span>
                  {([
                    { key: "relevancia", label: "Más relevantes" },
                    { key: "menor", label: "Menor precio" },
                    { key: "mayor", label: "Mayor precio" },
                  ] as const).map(s => (
                    <button key={s.key} onClick={() => setSort(s.key)} className={`sort-btn ${sort === s.key ? "active" : ""}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {productosFiltrados.length === 0 ? (
                <div className="glass-panel rounded-2xl p-16 text-center mt-8">
                  <Search size={48} className="text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-400 text-lg font-medium">No hay resultados</p>
                  <button onClick={() => { setBusqueda(""); setFiltro("Todos"); setSoloEnvioGratis(false); }} className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-semibold">
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {productosFiltrados.map((prod) => (
                    <div key={prod.id} className="product-card-ml group relative flex flex-col justify-between h-full">
                      <div className={`product-image-area bg-gradient-to-br ${prod.gradient} bg-[#0a0a0a] relative`}>
                        <Image 
                          src={prod.image} 
                          alt={prod.name} 
                          fill
                          className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 mix-blend-screen"
                        />
                        <div className="absolute top-3 left-3 z-10"><Badge text={prod.badge} type={prod.badgeType} /></div>
                        {prod.envioGratis && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="bg-green-500/20 backdrop-blur-md text-green-400 text-[10px] font-bold uppercase px-2 py-1 rounded border border-green-500/30 flex items-center gap-1">
                              <Truck size={10} /> Gratis
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="product-body flex-1 flex flex-col">
                        <div className="product-price">{prod.priceLabel}</div>
                        {prod.cuotas && <div className="product-installments">en {prod.cuotas}x {prod.cuotasPrecio}</div>}
                        <p className="product-name flex-1">{prod.name}</p>
                        <Stars rating={prod.rating} reviews={prod.reviews} />
                        
                        <button 
                          onClick={(e) => { e.preventDefault(); addToCart(prod); }}
                          className="mt-4 w-full py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-transparent rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={16} /> Agregar al carrito
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
