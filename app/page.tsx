"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Bot, ShoppingCart } from "lucide-react"

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
      icon: <ShoppingCart size={24} color="#60C8FF" />,
      badge: "Tienda online", badgeStyle: {background:"#1A1200", color:"#FBBF24"},
      title: "Kits & Equipamiento",
      desc: "Kits de PC Gamer y seguridad prearmados. Componentes, cámaras y accesorios.",
      tags: ["Kit Gamer","Kit CCTV","Componentes"],
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
    {name:"Dahua", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Dahua_Technology_logo.svg/1920px-Dahua_Technology_logo.svg.png?_=20210324132609"},
    {name:"TP-Link", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tp-Link_logo_2016.png/1920px-Tp-Link_logo_2016.png"},
    {name:"Fortinet", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fortinet_logo.svg/1920px-Fortinet_logo.svg.png?_=20210503171524"},
    {name:"HP", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/250px-HP_logo_2012.svg.png"},
    {name:"Lenovo", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Lenovo_Global_Corporate_Logo.png/1920px-Lenovo_Global_Corporate_Logo.png"},
    {name:"Dell", url:"https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png"},
    {name:"ASUS", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/ASUS_Corporate_Logo.svg/1280px-ASUS_Corporate_Logo.svg.png"},
    {name:"n8n", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/N8n-logo-new.svg/1280px-N8n-logo-new.svg.png?_=20230204003316"},
    {name:"AMD", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/AMD_logo_pre-2013.svg/1920px-AMD_logo_pre-2013.svg.png"},
    {name:"Intel", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1920px-Intel_logo_%282006-2020%29.svg.png"},
    {name:"NVIDIA", url:"https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/960px-Nvidia_logo.svg.png?_=20150924223142"},
  ];

  return (
    <>
      {/* ESTILOS GLOBALES PARA EL CARRUSEL (SOLUCIÓN ANTI-STOP MÓVIL Y RESPONSIVIDAD) */}
      <style jsx global>{`
        @keyframes scrollServicios {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * ${servicios.length} - 1.5rem * ${servicios.length})); }
        }
        @keyframes scrollMarcas {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-160px * ${marcas.length} - 1.5rem * ${marcas.length})); }
        }
        .carousel-track-servicios {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: scrollServicios 30s linear infinite;
        }
        .carousel-track-marcas {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: scrollMarcas 45s linear infinite;
        }
        /* ELIMINAR PAUSA AL TOCAR O HACER HOVER EN MÓVILES */
        .carousel-wrapper:hover .carousel-track-servicios,
        .carousel-wrapper:active .carousel-track-servicios,
        .carousel-wrapper:hover .carousel-track-marcas,
        .carousel-wrapper:active .carousel-track-marcas {
          animation-play-state: running !important;
        }
        .carousel-card {
          width: 280px;
          flex-shrink: 0;
          background: #0D1B2A;
          border-radius: 1.25rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .marca-card {
          width: 160px;
          height: 80px;
          flex-shrink: 0;
          display: flex;
          items-center: center;
          justify-content: center;
          padding: 1rem;
          background: #0F2136;
          border-radius: 0.75rem;
          border: 1px solid #1E3A5F;
        }
        @keyframes rain-logo {
          0% { transform: rotate(-35deg) translateY(-100px); }
          100% { transform: rotate(-35deg) translateY(1000px); }
        }
        /* AJUSTES RESPONSIVOS ADICIONALES */
        @media (max-width: 768px) {
          .carousel-card { width: 260px; padding: 1.25rem; }
          .marca-card { width: 140px; height: 70px; }
        }
      `}</style>

      {/* FONDO LLUVIA LOGOS */}
      <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none", overflow:"hidden"}}>
        {[...Array(20)].map((_,i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 9.3) % 110 - 5}%`,
            top: `${(i * 17.7) % 120 - 10}%`,
            opacity: 0.03,
            transform: `rotate(-35deg) scale(${0.4 + (i % 3) * 0.2})`,
            animation: `rain-logo ${12 + (i % 5) * 3}s linear infinite`,
          }}>
            <img src="/logo.png" alt="" width={180} height={90} style={{objectFit:"contain"}} />
          </div>
        ))}
      </div>

      <div className="content relative z-10">
        {/* HERO */}
        <section className="flex flex-col items-center text-center px-6 py-24 md:py-32 gap-6">
          <div className="animate-fade-up text-[10px] md:text-xs font-semibold px-4 py-2 rounded-full"
            style={{background: "#0F2136", color: "#60C8FF", border: "1px solid #1E3A5F"}}>
            Digital Diffusion · Networks · Telecom · Security · AI · IT
          </div>

          <h1 className="animate-fade-up text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
            Soluciones tech del <span style={{color: "#60C8FF"}}>futuro,</span> hoy.
          </h1>

          <p className="animate-fade-up text-base md:text-lg max-w-xl" style={{color: "#8A9BB0"}}>
            Agentes de inteligencia artificial, ciberseguridad y equipamiento informático. Todo en un solo lugar en Sarmiento.
          </p>

          <div className="animate-fade-up flex flex-col md:flex-row gap-4 mt-2 w-full md:w-auto">
            <a href="#servicios" className="px-8 py-4 bg-[#1E3A5F] text-[#60C8FF] rounded-xl font-bold border border-[#2B7FE0] text-center">Ver servicios</a>
            <Link href="/tienda" className="px-8 py-4 border border-[#1E3A5F] text-white rounded-xl font-bold hover:bg-[#0D1B2A] text-center">Explorar tienda</Link>
          </div>

          <div className="animate-fade-up flex gap-8 md:gap-12 mt-6">
            {[{n:"+50",l:"Proyectos"},{n:"3",l:"Verticales"},{n:"24/7",l:"Soporte"}].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl md:text-3xl font-bold" style={{color: "#60C8FF"}}>{s.n}</div>
                <div className="text-[10px] md:text-sm mt-1" style={{color: "#8A9BB0"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICIOS CARRUSEL */}
        <section id="servicios" className="py-20 overflow-hidden">
          <div className="text-center mb-12 px-8">
            <div className="section-label inline-block px-3 py-1 text-[10px] font-bold rounded bg-[#1E3A5F] text-[#60C8FF] mb-4 uppercaseObserve">Nuestros servicios</div>
            <h2 className="observe text-3xl font-bold">Todo lo que necesitás en tech</h2>
          </div>

          <div className="carousel-wrapper w-full overflow-hidden">
            <div className="carousel-track-servicios">
              {[...Array(3)].map((_, repeat) =>
                servicios.map((s, i) => (
                  <div key={`${repeat}-${i}`} className="carousel-cardObserve" style={{border: s.border}}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#060F18]">
                      {s.icon}
                    </div>
                    <span className="text-[10px] font-semibold px-3 py-1 rounded-md w-fit" style={s.badgeStyle}>{s.badge}</span>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="text-xs leading-relaxed" style={{color:"#8A9BB0"}}>{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {s.tags.map(t => <span key={t} className="text-[9px] px-2 py-1 bg-[#1E3A5F]/30 text-[#60C8FF] rounded">{t}</span>)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* TIENDA PREVIEW */}
        <section className="px-6 py-20" style={{background:"#0A1520", borderTop:"1px solid #1E3A5F"}}>
          <div className="text-center mb-12">
            <div className="section-label inline-block px-3 py-1 text-[10px] font-bold rounded bg-[#1E3A5F] text-[#60C8FF] mb-4 uppercaseObserve">Tienda</div>
            <h2 className="observe text-3xl font-bold">Equipamiento Destacado</h2>
            <p className="mt-3 text-sm text-[#8A9BB0]">Kits armados y listos para usar en Sarmiento y la región.</p>
          </div>
          <div className="flex justify-center">
             <Link href="/tienda" className="px-8 py-4 bg-[#1E3A5F] text-[#60C8FF] rounded-xl font-bold border border-[#2B7FE0] hover:scale-105 transition-transform text-center">
               Ver catálogo completo
             </Link>
          </div>
        </section>

        {/* MARCAS CARRUSEL */}
        <section className="py-20 overflow-hidden" style={{background:"#060F18", borderTop:"1px solid #1E3A5F"}}>
          <div className="text-center mb-12 px-8">
            <div className="section-label inline-block px-3 py-1 text-[10px] font-bold rounded bg-[#1E3A5F] text-[#60C8FF] mb-4 uppercaseObserve">Trabajamos con</div>
            <h2 className="observe text-2xl font-bold">Marcas líderes del mercado</h2>
          </div>

          <div className="carousel-wrapper w-full overflow-hidden">
            <div className="carousel-track-marcas">
              {[...Array(3)].map((_, repeat) =>
                marcas.map((m, i) => (
                  <div key={`${repeat}-${i}`} className="marca-cardObserve flex items-center justify-center">
                    <img 
                      src={m.url} 
                      alt={m.name} 
                      style={{maxWidth:"80%", maxHeight:"60%", objectFit:"contain", filter:"grayscale(100%) brightness(1.8)", transition:"filter 0.3s"}} 
                      onMouseEnter={e => e.currentTarget.style.filter="grayscale(0%) brightness(1)"}
                      onMouseLeave={e => e.currentTarget.style.filter="grayscale(100%) brightness(1.8)"}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="contacto" className="px-6 py-24 text-center bg-[#060F18] border-t border-[#1E3A5F]">
          <h2 className="observe text-3xl font-bold mb-4">¿Tenés un proyecto en mente?</h2>
          <p className="mb-8 text-[#8A9BB0]">Contanos qué necesitás y te armamos una propuesta a medida.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://wa.me/5492974XXXXXX" className="px-8 py-3 bg-[#1E3A5F] text-[#60C8FF] rounded-lg font-bold border border-[#2B7FE0] text-center">WhatsApp</a>
            <a href="mailto:contacto@balumtech.com" className="px-8 py-3 border border-[#1E3A5F] text-white rounded-lg font-bold text-center">Email</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-8 py-10 flex flex-col md:flex-row justify-between items-center text-[10px] gap-6 border-t border-[#1E3A5F] bg-[#060F18] text-[#4A7090]">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/logo.png" alt="BALUMTech" width={120} height={50} style={{opacity: 0.8}} />
            <span>© 2026 BALUMTech — Soluciones Tecnológicas en Sarmiento.</span>
          </div>
          <div className="flex gap-6 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </footer>
      </div>
    </>
  )
}