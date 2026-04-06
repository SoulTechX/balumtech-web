"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link" // Importante para la navegación rápida
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
      tags: ["Chatbots","Automatización","Consultoría IA"],
      border: "1px solid #1E3A5F"
    },
    {
      icon: <Shield size={24} color="#60C8FF" />,
      badge: "Más solicitado", badgeStyle: {background:"#0A3020", color:"#4ADE80"},
      title: "Seguridad Integral",
      desc: "Electrónica, informática, CCTV, alarmas, auditorías de red y protección de infraestructura.",
      tags: ["Cámaras","Alarmas","Ciberseguridad","Auditoría"],
      border: "2px solid #2B7FE0"
    },
    {
      icon: <ShoppingCart size={24} color="#60C8FF" />,
      badge: "Tienda online", badgeStyle: {background:"#1A1200", color:"#FBBF24"},
      title: "Kits & Equipamiento",
      desc: "Kits de PC Gamer y seguridad prearmados. Componentes, cámaras, routers y accesorios.",
      tags: ["Kit Gamer","Kit CCTV","Componentes"],
      border: "1px solid #1E3A5F"
    },
    {
      icon: <Shield size={24} color="#60C8FF" />,
      badge: "Ciberseguridad", badgeStyle: {background:"#0D2137", color:"#60C8FF"},
      title: "Auditoría de Redes",
      desc: "Analizamos tu infraestructura y detectamos vulnerabilidades antes que los atacantes.",
      tags: ["Pentesting","Firewall","VPN"],
      border: "1px solid #1E3A5F"
    },
    {
      icon: <Bot size={24} color="#60C8FF" />,
      badge: "IA Avanzada", badgeStyle: {background:"#0D2137", color:"#60C8FF"},
      title: "Automatización Empresarial",
      desc: "Integramos agentes de IA en tus flujos de trabajo para maximizar la eficiencia.",
      tags: ["n8n","Make","APIs"],
      border: "1px solid #1E3A5F"
    },
    {
      icon: <ShoppingCart size={24} color="#60C8FF" />,
      badge: "PC Gamer", badgeStyle: {background:"#1A1200", color:"#FBBF24"},
      title: "Armado de PC",
      desc: "PC Gamer y workstations a medida. Seleccionamos los mejores componentes para tu presupuesto.",
      tags: ["Gaming","Workstation","Upgrades"],
      border: "1px solid #1E3A5F"
    },
    {
      icon: <Shield size={24} color="#60C8FF" />,
      badge: "Redes & Conectividad", badgeStyle: {background:"#0D2137", color:"#60C8FF"},
      title: "Redes para Empresas",
      desc: "Diseñamos e instalamos redes corporativas para inmobiliarias, estudios jurídicos, contables y pymes. WiFi, switching, VPN y soporte continuo.",
      tags: ["WiFi Corporativo","VPN","Switching","Soporte"],
      border: "1px solid #1E3A5F"
    },
  ]

  return (
    <>
      {/* FONDO LLUVIA DIAGONAL DE LOGOS */}
      <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none", overflow:"hidden"}}>
        {[...Array(40)].map((_,i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 7.3) % 110 - 10}%`,
            top: `${(i * 13.7) % 120 - 20}%`,
            opacity: 0.04 + (i % 5) * 0.015,
            transform: `rotate(-35deg) scale(${0.4 + (i % 4) * 0.15})`,
            animation: `rain-logo ${8 + (i % 6) * 2}s linear ${(i * 0.4) % 6}s infinite`,
          }}>
            <img src="/logo.png" alt="" width={240} height={120} style={{objectFit:"contain"}} />
          </div>
        ))}
      </div>

      <div className="content">
        {/* HERO */}
        <section className="flex flex-col items-center text-center px-8 py-32 gap-6">
          <div className="animate-fade-up delay-100 text-xs font-semibold px-4 py-2 rounded-full"
            style={{background: "#0F2136", color: "#60C8FF", border: "1px solid #1E3A5F"}}>
            Digital Diffusion · Networks · Telecom · Security · AI · IT
          </div>

          <h1 className="animate-fade-up delay-200 text-5xl font-bold leading-tight max-w-3xl">
            Soluciones tech del <span style={{color: "#60C8FF"}} className="glow-text">futuro,</span> hoy.
          </h1>

          <p className="animate-fade-up delay-300 text-lg max-w-xl" style={{color: "#8A9BB0"}}>
            Agentes de inteligencia artificial, ciberseguridad, seguridad electrónica y equipamiento informático. Todo en un solo lugar.
          </p>

          <div className="animate-fade-up delay-400 flex gap-4 mt-2">
            <a href="#servicios" className="btn-primary">Ver servicios</a>
            <Link href="/tienda" className="btn-outline">Explorar tienda</Link>
          </div>

          <div className="animate-fade-up delay-500 flex gap-12 mt-6">
            {[{n:"+50",l:"Proyectos"},{n:"3",l:"Verticales"},{n:"24/7",l:"Soporte"}].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-bold glow-text" style={{color: "#60C8FF"}}>{s.n}</div>
                <div className="text-sm mt-1" style={{color: "#8A9BB0"}}>{s.l}</div>
              </div>
            ))}
          </div>

          <div className="animate-fade-up delay-500 mt-8" style={{animation: "float 3s ease-in-out infinite"}}>
            <Image src="/tech.jpg" alt="BALUMTech Banner" width={700} height={300}
              style={{borderRadius: 20, border: "1px solid #1E3A5F", boxShadow: "0 0 60px rgba(96,200,255,0.1)"}} />
          </div>
        </section>

        {/* SERVICIOS CARRUSEL */}
        <section id="servicios" className="py-20">
          <div className="text-center mb-12 px-8">
            <div className="section-label">Nuestros servicios</div>
            <h2 className="observe text-3xl font-bold">Todo lo que necesitás en tech</h2>
          </div>

          <div className="carousel-wrapper">
            <div className="carousel-track">
              {[...Array(2)].map((_, repeat) =>
                servicios.map((s, i) => (
                  <div
                    key={`${repeat}-${i}`}
                    className="carousel-card"
                    style={{border: s.border}}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background:"#0D1B2A"}}>
                      {s.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-md w-fit" style={s.badgeStyle}>{s.badge}</span>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="text-sm" style={{color:"#8A9BB0"}}>{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* KITS PREVIEW (Opcional, redirige a la tienda) */}
        <section className="px-8 py-20" style={{background:"#0A1520"}}>
          <div className="text-center mb-12">
            <div className="section-label">Tienda</div>
            <h2 className="observe text-3xl font-bold">Equipamiento Destacado</h2>
            <p className="mt-3 text-sm" style={{color:"#8A9BB0"}}>Kits armados y listos para usar en Sarmiento y la región.</p>
          </div>
          <div className="flex justify-center">
             <Link href="/tienda" className="btn-primary">Ver catálogo completo de productos</Link>
          </div>
        </section>

        {/* MARCAS */}
        <section className="py-16 px-8" style={{background:"#060F18", borderTop:"1px solid #1E3A5F"}}>
          <div className="text-center mb-10">
            <div className="section-label">Trabajamos con</div>
            <h2 className="text-2xl font-bold">Marcas líderes del mercado</h2>
          </div>
          <div className="carousel-wrapper">
            <div className="carousel-track" style={{animationDuration:"30s"}}>
              {[...Array(2)].map((_,repeat) =>
                [
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
                ].map((m,i) => (
                  <div key={`${repeat}-${i}`}
                    className="flex-shrink-0 flex items-center justify-center px-6"
                    style={{width:160, height:80, background:"#0F2136", borderRadius:12, border:"1px solid #1E3A5F"}}
                  >
                    <img src={m.url} alt={m.name} style={{maxWidth:100, maxHeight:50, objectFit:"contain", filter:"grayscale(100%) brightness(1.8)"}} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contacto" className="px-8 py-24 text-center" style={{background:"#060F18"}}>
          <div className="observe">
            <h2 className="text-3xl font-bold mb-4">¿Tenés un proyecto en mente?</h2>
            <p className="mb-8" style={{color:"#8A9BB0"}}>Contanos qué necesitás y te armamos una propuesta a medida.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://wa.me/5492615XXXXXX" className="btn-primary">Escribinos por WhatsApp</a>
              <a href="mailto:contacto@balumtech.com" className="btn-outline">Enviar email</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-8 py-6 flex justify-between items-center text-xs flex-wrap gap-4"
          style={{borderTop:"1px solid #1E3A5F", color:"#4A7090", background:"#060F18"}}>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="BALUMTech" width={100} height={40} style={{objectFit: "contain"}} />
            <span>© 2025 BALUMTech — Todos los derechos reservados</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </footer>
      </div>
    </>
  )
}