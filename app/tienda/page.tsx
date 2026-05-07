"use client"
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Bot, Shield, Cpu, Monitor, Wifi, Search, SlidersHorizontal, ShoppingBag, Zap, Server, Camera, Router } from "lucide-react";

interface Producto {
  id: number;
  name: string;
  price: string;
  badge: string;
  desc: string;
  icon: React.ReactNode;
  categoria: string;
  destacado?: boolean;
}

const waNumber = "5492974779978";

const productos: Producto[] = [
  // IA & Automatización
  { id: 1, name: "Agente IA Inmobiliario", price: "Consultar", badge: "Especialidad", desc: "Automatización de leads, agenda y seguimiento 24/7 con n8n. Ideal para inmobiliarias y corredores.", icon: <Bot size={24} />, categoria: "IA", destacado: true },
  { id: 2, name: "Auditoría de Flujos", price: "Consultar", badge: "Pro", desc: "Análisis, optimización y limpieza de workflows existentes en n8n o Make.", icon: <SlidersHorizontal size={24} />, categoria: "IA" },
  { id: 3, name: "Chatbot IA Empresarial", price: "Consultar", badge: "Nuevo", desc: "Asistente virtual inteligente para atención al cliente con IA generativa.", icon: <MessageCircle size={24} />, categoria: "IA" },
  { id: 4, name: "Automatización de Reportes", price: "Consultar", badge: "Pro", desc: "Generación automática de informes con datos en tiempo real.", icon: <Zap size={24} />, categoria: "IA" },

  // Seguridad Electrónica
  { id: 5, name: "Kit CCTV Hogar (4 Cams)", price: "$285.000", badge: "Stock Regional", desc: "Cámaras Dahua con visión nocturna, acceso móvil y grabación en la nube.", icon: <Camera size={24} />, categoria: "Seguridad", destacado: true },
  { id: 6, name: "Kit CCTV Empresa (8 Cams)", price: "$520.000", badge: "Stock Regional", desc: "Sistema de vigilancia profesional con analytics de movimiento y alertas.", icon: <Camera size={24} />, categoria: "Seguridad" },
  { id: 7, name: "Control de Accesos", price: "$180.000", badge: "Instalación Inc.", desc: "Cerraduras inteligentes, lectores biométricos y control remoto.", icon: <Shield size={24} />, categoria: "Seguridad" },

  // Redes & Conectividad
  { id: 8, name: "Nodo de Red Pro", price: "$145.000", badge: "Instalación Inc.", desc: "Mejora de Wi-Fi con access points Ubiquiti y cableado estructurado Cat6.", icon: <Wifi size={24} />, categoria: "Redes" },
  { id: 9, name: "Red Mesh Empresarial", price: "Consultar", badge: "Proyecto", desc: "Conectividad robusta para yacimientos, campos y plantas industriales.", icon: <Router size={24} />, categoria: "Redes" },
  { id: 10, name: "VPN & Firewall Corporativo", price: "Consultar", badge: "Pro", desc: "Infraestructura segura con Cisco/MikroTik para oficinas distribuidas.", icon: <Server size={24} />, categoria: "Redes" },

  // Hardware & Workstations
  { id: 11, name: "PC BALUM v1 Gamer", price: "$820.000", badge: "A Pedido", desc: "Configurada para máximo rendimiento. Ryzen 7 + RTX 4060 + 32GB RAM.", icon: <Monitor size={24} />, categoria: "Hardware", destacado: true },
  { id: 12, name: "Workstation Diseño/IA", price: "$1.200.000", badge: "A Pedido", desc: "Estación de trabajo para renderizado 3D, IA y diseño gráfico profesional.", icon: <Cpu size={24} />, categoria: "Hardware" },
  { id: 13, name: "Servidor NAS Empresarial", price: "$650.000", badge: "A Pedido", desc: "Almacenamiento centralizado con respaldo RAID y acceso remoto seguro.", icon: <Server size={24} />, categoria: "Hardware" },
];

const categorias = ["Todos", "IA", "Seguridad", "Redes", "Hardware"];

export default function TiendaPage() {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((p) => {
    const matchCategoria = filtro === "Todos" || p.categoria === filtro;
    const matchBusqueda = p.name.toLowerCase().includes(busqueda.toLowerCase()) || 
                          p.desc.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-base)] relative">
      {/* FONDOS AURA */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] right-[-20%] w-[50vw] h-[50vw] bg-blue-600/8 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/8 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <header className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors text-sm mb-6">
              <ArrowLeft size={16} /> Volver al inicio
            </Link>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-wider uppercase mb-4">
                  <ShoppingBag size={12} /> Catálogo Oficial
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
                  Tienda
                </h1>
                <p className="text-zinc-500 mt-4 max-w-xl text-lg font-medium tracking-tight">
                  Equipamiento técnico seleccionado con soporte local. 
                  Entrega directa en Sarmiento y Comodoro Rivadavia.
                </p>
              </div>

              {/* STATS */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{productos.length}</p>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Productos</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{categorias.length - 1}</p>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Categorías</p>
                </div>
              </div>
            </div>
          </header>

          {/* FILTROS + BÚSQUEDA */}
          <div className="glass-panel rounded-2xl p-4 md:p-6 mb-12 flex flex-col md:flex-row gap-4 items-center">
            {/* Barra de búsqueda */}
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="form-input !pl-11 !rounded-xl"
              />
            </div>

            {/* Filtros de categoría */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltro(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    filtro === cat
                      ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCTOS DESTACADOS */}
          {filtro === "Todos" && busqueda === "" && (
            <section className="mb-16">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-500 mb-6">Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {productos.filter(p => p.destacado).map((prod) => (
                  <div key={prod.id} className="group glass-panel rounded-[1.5rem] p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-300 border border-blue-500/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent" />
                    <div className="w-14 h-14 app-icon rounded-[1rem] flex items-center justify-center mb-6 text-blue-300 group-hover:scale-110 transition-transform">
                      {prod.icon}
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
                      {prod.badge}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-white">{prod.name}</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{prod.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-white">{prod.price}</span>
                      <a
                        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola BALUMTech, me interesa "${prod.name}" (${prod.price}). ¿Podrían darme más información?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                      >
                        <MessageCircle size={14} /> Consultar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* GRID DE PRODUCTOS */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-500">
                {filtro === "Todos" ? "Todos los Productos" : filtro}
              </h2>
              <span className="text-xs text-zinc-600 font-medium">{productosFiltrados.length} resultado{productosFiltrados.length !== 1 ? "s" : ""}</span>
            </div>

            {productosFiltrados.length === 0 ? (
              <div className="glass-panel rounded-2xl p-16 text-center">
                <Search size={48} className="text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-500 text-lg font-medium">No se encontraron productos</p>
                <p className="text-zinc-600 text-sm mt-2">Probá con otra búsqueda o categoría</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productosFiltrados.map((prod) => (
                  <div key={prod.id} className="group kit-card p-6 flex flex-col justify-between hover:border-blue-500/30">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                          {prod.icon}
                        </div>
                        <span className="tag">{prod.badge}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white">{prod.name}</h3>
                      <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{prod.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xl font-black text-blue-400">{prod.price}</span>
                      <a
                        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola BALUMTech, me interesa "${prod.name}" (${prod.price}). ¿Podrían darme más información?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline !py-2 !px-4 text-xs inline-flex items-center gap-2"
                      >
                        <MessageCircle size={14} /> Consultar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

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
              <MessageCircle size={18} /> Pedir Presupuesto <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
            </a>
          </section>

        </div>
      </main>
    </div>
  );
}
