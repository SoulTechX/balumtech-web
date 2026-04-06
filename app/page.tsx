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
      desc: "Automatizá procesos, creá asistentes inteligentes y mejorá la productividad de tu empresa.",
      tags: ["Chatbots","n8n","Automatización"],
      border: "1px solid #1E3A5F"
    },
    {
      icon: <Shield size={24} color="#60C8FF" />,
      badge: "Más solicitado", badgeStyle: {background:"#0A3020", color:"#4ADE80"},
      title: "Seguridad Integral",
      desc: "Electrónica, informática, CCTV, alarmas, auditorías de red y protección de infraestructura.",
      tags: ["Cámaras","Alarmas","Ciberseguridad"],
      border: "2px solid #2B7FE0"
    },
    {
      icon: <Globe size={24} color="#60C8FF" />,
      badge: "Infraestructura", badgeStyle: {background:"#1A1A1A", color:"#A5B4FC"},
      title: "Redes & Conectividad",
      desc: "Instalación de fibra, radioenlaces y optimización de Wi-Fi para empresas y campos.",
      tags: ["Ubiquiti","Mikrotik","WiFi 6"],
      border: "1px solid #1E3A5F"
    },
    {
      icon: <Shield size={24} color="#60C8FF" />,
      badge: "Ciberseguridad", badgeStyle: {background:"#0D2137", color:"#60C8FF"},
      title: "Auditoría de Redes",
      desc: "Analizamos tu infraestructura y detectamos vulnerabilidades en Sarmiento y la región.",
      tags: ["Pentesting","Firewall","VPN"],
      border: "1px solid #1E3A5F"
    }
  ]

  const marcas = [
    {name:"Hikvision", url:"https://smartlink.pk/wp-content/uploads/2021/12/Hikvision-logo2.png"},
    {name:"Dahua", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Dahua_Technology_logo.svg/1920px-Dahua_Technology_logo.svg.png"},
    {name:"TP-Link", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tp-Link_logo_2016.png/1920px-Tp-Link_logo_2016.png"},
    {name:"Fortinet", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fortinet_logo.svg/1920px-Fortinet_logo.svg.png"},
    {name:"HP", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/250px-HP_logo_2012.svg.png"},
    {name:"n8n", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/N8n-logo-new.svg/1280px-N8n-logo-new.svg.png"},
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes scrollServicios {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * ${servicios.length} - 2rem * ${servicios.length})); }
        }
        @keyframes scrollMarcas {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * ${marcas.length} - 2rem * ${marcas.length})); }
        }
        .carousel-track-servicios {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scrollServicios 35s linear infinite;
        }
        .carousel-track-marcas {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scrollMarcas 45s linear infinite;
        }
        /* PAUSA SOLO EN PC PARA PODER LEER */
        @media (min-width: 1024px) {
          .carousel-wrapper:hover .carousel-track-servicios,
          .carousel-wrapper:hover .carousel-track-marcas {
            animation-play-state: paused;
          }
        }
        .carousel-card {
          width: 320px !important;
          height: 360px !important;
          flex-shrink: 0;
          background: #0D1B2A;
          border-radius: 1.5rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .marca-card {
          width: 200px !important;
          height: 100px !important;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0F2136;
          border-radius: 1rem;
          border: 1px solid #1E3A5F;
        }
      `}</style>

      <div className="content relative z-10" style={{background: "#060F18"}}>
        {/* HERO */}
        <section className="flex flex-col items-center text-center px-8 py-24 md:py-40 gap-8">
          <div className="animate-fade-up text-[10px] md:text-xs font-bold tracking-widest px-5 py-2 rounded-full"
            style={{background: "#0F2136", color: "#60C8FF", border: "1px solid #1E3A5F"}}>
            BALUMTECH · DIGITAL EVOLUTION
          </div>
          <h1 className="animate-fade-up text-5xl md:text-7xl font-extrabold leading-tight max-w-5xl">
            Tecnología <span style={{color: "#60C8FF"}}>industrial</span> para tu empresa.
          </h1>
          <p className="animate-fade-up text-lg md:text-xl max-w-2xl text-[#8A9BB0]">
            Desde Sarmiento hacia toda la región. Expertos en IA, ciberseguridad e infraestructura técnica de alto rendimiento.
          </p>
          <div className="animate-fade-up flex flex-col md:flex-row gap-5 mt-4">
            <a href="#servicios" className="px-10 py-5 bg-[#1E3A5F] text-[#60C8FF] rounded-2xl font-bold border border-[#2B7FE0] hover:scale-105 transition-transform text-center">Nuestros Servicios</a>
            <Link href="/tienda" className="px-10 py-5 border border-[#1E3A5F] text-white rounded-2xl font-bold hover:bg-[#0D1B2A] transition-colors text-center">Explorar Tienda</Link>
          </div>
        </section>

        {/* SERVICIOS CARRUSEL */}
        <section id="servicios" className="py-24 overflow-hidden border-t border-[#1E3A5F]/30">
          <div className="px-8 max-w-7xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Soluciones <span style={{color: "#60C8FF"}}>360°</span></h2>
            <p className="text-[#8A9BB0]">Deslizá para conocer cómo podemos potenciar tu negocio.</p>
          </div>
          <div className="carousel-wrapper w-full overflow-hidden px-8">
            <div className="carousel-track-servicios">
              {[...Array(3)].map((_, repeat) =>
                servicios.map((s, i) => (
                  <div key={`${repeat}-${i}`} className="carousel-card" style={{border: s.border}}>
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#060F18] mb-6">
                        {s.icon}
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full mb-4 inline-block" style={s.badgeStyle}>{s.badge}</span>
                      <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-[#8A9BB0]">{s.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map(t => <span key={t} className="text-[10px] px-2 py-1 bg-[#1E3A5F]/40 text-[#60C8FF] rounded-lg border border-[#1E3A5F]">{t}</span>)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* SECCIÓN KITS (RESTAURADA Y MEJORADA) */}
        <section className="py-24 px-8 bg-[#0A1520] border-y border-[#1E3A5F]/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-bold mb-4">Kits de <span style={{color: "#60C8FF"}}>Equipamiento</span></h2>
                <p className="text-[#8A9BB0] max-w-md">Equipos preconfigurados con soporte técnico local en Sarmiento y Comodoro.</p>
              </div>
              <Link href="/tienda" className="text-[#60C8FF] font-bold flex items-center gap-2 hover:underline">
                Ver todo el catálogo <ShoppingCart size={18}/>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {t:"Kit CCTV Hogar", d:"Seguridad 24/7 con acceso remoto.", i:<Camera size={32} color="#60C8FF"/>},
                {t:"Workstation Pro", d:"Armado a medida para diseño e ingeniería.", i:<Cpu size={32} color="#60C8FF"/>},
                {t:"Nodo de Red", d:"WiFi de alta potencia para locales.", i:<Globe size={32} color="#60C8FF"/>}
              ].map((k, i) => (
                <div key={i} className="p-8 rounded-3xl bg-[#0D1B2A] border border-[#1E3A5F] hover:border-[#60C8FF] transition-all group">
                  <div className="mb-6 group-hover:scale-110 transition-transform">{k.i}</div>
                  <h3 className="text-xl font-bold mb-2">{k.t}</h3>
                  <p className="text-sm text-[#8A9BB0] mb-6">{k.d}</p>
                  <Link href="/tienda" className="text-xs font-bold uppercase tracking-widest text-[#60C8FF]">Consultar Stock</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARCAS */}
        <section className="py-24 overflow-hidden">
          <div className="text-center mb-16 px-8">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-[#4A7090]">Partners Tecnológicos</h2>
          </div>
          <div className="carousel-wrapper w-full overflow-hidden px-8">
            <div className="carousel-track-marcas">
              {[...Array(3)].map((_, repeat) =>
                marcas.map((m, i) => (
                  <div key={`${repeat}-${i}`} className="marca-card">
                    <img src={m.url} alt={m.name} style={{maxWidth:"65%", maxHeight:"50%", objectFit:"contain", filter:"grayscale(100%) brightness(1.5)"}} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="contacto" className="px-8 py-32 text-center bg-[#060F18] border-t border-[#1E3A5F]/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para dar el <span style={{color: "#60C8FF"}}>siguiente paso?</span></h2>
            <p className="mb-12 text-lg text-[#8A9BB0]">Contactanos hoy para una auditoría gratuita de tu infraestructura técnica.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://wa.me/5492974XXXXXX" className="px-10 py-4 bg-[#1E3A5F] text-[#60C8FF] rounded-2xl font-bold border border-[#2B7FE0] hover:bg-[#2B7FE0] hover:text-white transition-all">WhatsApp</a>
              <a href="mailto:contacto@balumtech.com" className="px-10 py-4 border border-[#1E3A5F] text-white rounded-2xl font-bold hover:bg-[#0D1B2A] transition-all">Enviar Email</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-8 py-12 flex flex-col md:flex-row justify-between items-center text-[11px] gap-8 border-t border-[#1E3A5F]/30 bg-[#060F18] text-[#4A7090]">
           <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-white text-sm">BALUMTech</span>
            <span>Sarmiento, Chubut — Argentina.</span>
           </div>
           <div className="flex gap-8 uppercase font-bold tracking-widest">
            <a href="#" className="hover:text-[#60C8FF]">Privacidad</a>
            <a href="#" className="hover:text-[#60C8FF]">Términos</a>
            <span>© 2026</span>
          </div>
        </footer>
      </div>
    </>
  )
}