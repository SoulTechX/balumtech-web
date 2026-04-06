"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Bot, ShoppingCart, Cpu, Camera, Globe } from "lucide-react"

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("animate-fade-up")
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll(".observe").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const servicios = [
    {
      icon: <Bot size={24} color="#60C8FF" />,
      badge: "Agentes de IA", badgeStyle: {background:"#0D2137", color:"#60C8FF"},
      title: "Inteligencia Artificial",
      desc: "Automatizá procesos y mejorá la productividad con agentes n8n.",
      tags: ["Chatbots","n8n"],
      border: "1px solid #1E3A5F"
    },
    {
      icon: <Shield size={24} color="#60C8FF" />,
      badge: "Pro", badgeStyle: {background:"#0A3020", color:"#4ADE80"},
      title: "Seguridad Integral",
      desc: "CCTV, alarmas y auditorías de red para activos críticos.",
      tags: ["Cámaras","Alarmas"],
      border: "2px solid #2B7FE0"
    },
    {
      icon: <ShoppingCart size={24} color="#60C8FF" />,
      badge: "Tienda", badgeStyle: {background:"#1A1200", color:"#FBBF24"},
      title: "Kits & Hardware",
      desc: "Equipamiento seleccionado con soporte directo en Sarmiento.",
      tags: ["PC Gamer","CCTV"],
      border: "1px solid #1E3A5F"
    },
    {
      icon: <Shield size={24} color="#60C8FF" />,
      badge: "Auditoría", badgeStyle: {background:"#0D2137", color:"#60C8FF"},
      title: "Ciberseguridad",
      desc: "Protección perimetral y detección de vulnerabilidades.",
      tags: ["Pentesting","VPN"],
      border: "1px solid #1E3A5F"
    }
  ]

  const marcas = [
    {name:"Hikvision", url:"https://smartlink.pk/wp-content/uploads/2021/12/Hikvision-logo2.png"},
    {name:"Dahua", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Dahua_Technology_logo.svg/1920px-Dahua_Technology_logo.svg.png"},
    {name:"TP-Link", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tp-Link_logo_2016.png/1920px-Tp-Link_logo_2016.png"},
    {name:"Fortinet", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fortinet_logo.svg/1920px-Fortinet_logo.svg.png"},
    {name:"n8n", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/N8n-logo-new.svg/1280px-N8n-logo-new.svg.png"},
    {name:"Intel", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1920px-Intel_logo_%282006-2020%29.svg.png"},
    {name:"NVIDIA", url:"https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/960px-Nvidia_logo.svg.png"},
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes scrollServicios {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-300px * ${servicios.length} - 2rem * ${servicios.length})); }
        }
        @keyframes scrollMarcas {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-160px * ${marcas.length} - 3rem * ${marcas.length})); }
        }
        .carousel-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scrollServicios 30s linear infinite;
        }
        .brands-track {
          display: flex;
          gap: 3rem;
          width: max-content;
          animation: scrollMarcas 40s linear infinite;
        }
        .carousel-wrapper:hover .carousel-track, .carousel-wrapper:active .carousel-track,
        .brands-wrapper:hover .brands-track, .brands-wrapper:active .brands-track {
          animation-play-state: running !important;
        }
        @keyframes rain-logo {
          0% { transform: rotate(-35deg) translateY(-100px); }
          100% { transform: rotate(-35deg) translateY(1000px); }
        }
      `}</style>

      {/* FONDO INTERACTIVO REFINADO */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#060F18]">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute opacity-[0.03]" style={{
            left: `${(i * 12) % 110 - 5}%`,
            top: `${(i * 18) % 120 - 10}%`,
            transform: "rotate(-35deg)",
            animation: `rain-logo ${15 + (i % 5) * 5}s linear infinite`,
          }}>
            <Image src="/logo.png" alt="" width={160} height={80} className="object-contain" />
          </div>
        ))}
      </div>

      <div className="content relative z-10">
        {/* HERO - ESPACIADO ORIGINAL */}
        <section className="flex flex-col items-center text-center px-6 py-32 md:py-48 gap-8">
          <div className="observe text-[10px] font-bold tracking-[0.3em] px-5 py-2 rounded-full border border-[#1E3A5F] bg-[#0F2136] text-[#60C8FF] uppercase">
            Sarmiento · Chubut · Tech Hub
          </div>
          <h1 className="observe text-5xl md:text-8xl font-bold tracking-tighter">
            BALUM<span className="text-[#60C8FF]">Tech</span>
          </h1>
          <p className="observe text-lg md:text-xl max-w-2xl text-[#8A9BB0] font-light">
            Infraestructura digital y automatización de procesos para la industria moderna.
          </p>
          <div className="observe flex flex-col md:flex-row gap-5 mt-4">
            <a href="#servicios" className="px-10 py-4 bg-[#1E3A5F] text-[#60C8FF] rounded-xl font-bold border border-[#2B7FE0] hover:bg-[#2B7FE0] hover:text-white transition-all">Ver Servicios</a>
            <Link href="/tienda" className="px-10 py-4 border border-[#1E3A5F] text-white rounded-xl font-bold hover:bg-[#0D1B2A] transition-all">Explorar Tienda</Link>
          </div>
        </section>

        {/* SERVICIOS - CARRUSEL INDEPENDIENTE */}
        <section id="servicios" className="py-24 overflow-hidden border-t border-[#1E3A5F]/30 bg-[#060F18]/40 backdrop-blur-md">
          <div className="carousel-wrapper w-full overflow-hidden">
            <div className="carousel-track">
              {[...Array(3)].map((_, repeat) =>
                servicios.map((s, i) => (
                  <div key={`${repeat}-${i}`} className="w-[300px] flex-shrink-0 bg-[#0D1B2A] rounded-3xl p-8 flex flex-col gap-5 border border-[#1E3A5F] transition-all" style={{border: s.border}}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#060F18]">{s.icon}</div>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full w-fit" style={s.badgeStyle}>{s.badge}</span>
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="text-xs text-[#8A9BB0] leading-relaxed">{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {s.tags.map(t => <span key={t} className="text-[9px] px-2 py-1 bg-[#1E3A5F]/40 text-[#60C8FF] rounded-lg">{t}</span>)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* SECCIÓN KITS - DISEÑO LIMPIO */}
        <section className="py-28 px-8 bg-[#0A1520] border-y border-[#1E3A5F]/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <h2 className="text-4xl font-bold mb-6">Equipamiento <span className="text-[#60C8FF]">Destacado</span></h2>
              <p className="text-[#8A9BB0] mb-8">Kits pre-armados para seguridad y workstations de alto rendimiento listos para entregar.</p>
              <Link href="/tienda" className="inline-flex items-center gap-3 text-[#60C8FF] font-bold hover:underline">Ir a la tienda oficial <ShoppingCart size={20}/></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-[#0D1B2A] border border-[#1E3A5F] rounded-2xl flex flex-col gap-3"><Camera color="#60C8FF"/><span className="text-sm font-bold">Kit CCTV</span></div>
              <div className="p-6 bg-[#0D1B2A] border border-[#1E3A5F] rounded-2xl flex flex-col gap-3"><Cpu color="#60C8FF"/><span className="text-sm font-bold">Workstation</span></div>
              <div className="p-6 bg-[#0D1B2A] border border-[#1E3A5F] rounded-2xl flex flex-col gap-3"><Globe color="#60C8FF"/><span className="text-sm font-bold">Redes Pro</span></div>
              <div className="p-6 bg-[#1E3A5F] border border-[#2B7FE0] rounded-2xl flex flex-col gap-3 justify-center text-center"><span className="text-xs font-bold text-[#60C8FF]">Ver más</span></div>
            </div>
          </div>
        </section>

        {/* MARCAS - CARRUSEL INDEPENDIENTE RESTAURADO */}
        <section className="py-20 overflow-hidden bg-[#060F18]">
          <div className="brands-wrapper w-full overflow-hidden opacity-40 hover:opacity-80 transition-opacity">
            <div className="brands-track">
              {[...Array(3)].map((_, repeat) =>
                marcas.map((m, i) => (
                  <div key={`${repeat}-${i}`} className="w-[160px] flex-shrink-0 flex items-center justify-center grayscale">
                    <img src={m.url} alt={m.name} className="h-8 object-contain" />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-8 py-12 flex flex-col md:flex-row justify-between items-center text-[10px] gap-8 border-t border-[#1E3A5F]/30 bg-[#060F18] text-[#4A7090] uppercase tracking-widest">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-bold text-white text-sm">BALUMTech</span>
              <span>Sarmiento, Chubut — Argentina</span>
            </div>
            <div className="flex gap-8 font-bold">
              <a href="#" className="hover:text-[#60C8FF]">Privacidad</a>
              <a href="#" className="hover:text-[#60C8FF]">Términos</a>
              <span>© 2026</span>
            </div>
        </footer>
      </div>
    </>
  )
}
