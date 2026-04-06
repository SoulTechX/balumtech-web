"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Bot, ShoppingCart, MousePointer2 } from "lucide-react"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Lógica de Barra de Progreso y Mouse Parallax
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };

    // 2. Intersection Observer para animaciones y contadores
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            // Si es un número, podríamos disparar una función de conteo aquí
          }
        });
      },
      { threshold: 0.1 }
    );

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll(".observe").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const servicios = [
    { icon: <Bot size={24} color="#60C8FF" />, title: "IA & Automatización", badge: "Agentes", desc: "Sistemas autónomos con n8n y modelos avanzados para tu empresa.", border: "1px solid #1E3A5F" },
    { icon: <Shield size={24} color="#60C8FF" />, title: "Seguridad Integral", badge: "Pro", desc: "CCTV, auditorías de red y protección de activos críticos.", border: "2px solid #2B7FE0" },
    { icon: <ShoppingCart size={24} color="#60C8FF" />, title: "Tienda Tech", badge: "Kits", desc: "Hardware seleccionado y configurado para máximo rendimiento.", border: "1px solid #1E3A5F" },
    { icon: <Shield size={24} color="#60C8FF" />, title: "Ciberseguridad", badge: "Auditoría", desc: "Pentesting y defensa perimetral en entornos industriales.", border: "1px solid #1E3A5F" },
  ];

  const marcas = [
    { name: "Hikvision", url: "https://smartlink.pk/wp-content/uploads/2021/12/Hikvision-logo2.png" },
    { name: "Dahua", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Dahua_Technology_logo.svg/1920px-Dahua_Technology_logo.svg.png" },
    { name: "TP-Link", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tp-Link_logo_2016.png/1920px-Tp-Link_logo_2016.png" },
    { name: "n8n", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/N8n-logo-new.svg/1280px-N8n-logo-new.svg.png" },
    { name: "Intel", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1920px-Intel_logo_%282006-2020%29.svg.png" },
    { name: "NVIDIA", url: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/960px-Nvidia_logo.svg.png" },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-280px * 4 - 1.5rem * 4)); } }
        .carousel-track { display: flex; gap: 1.5rem; width: max-content; animation: scroll 25s linear infinite; }
        .carousel-container:hover .carousel-track, .carousel-container:active .carousel-track { animation-play-state: running !important; }
        @keyframes rain-logo { 0% { transform: rotate(-35deg) translateY(-100px); } 100% { transform: rotate(-35deg) translateY(1000px); } }
      `}</style>

      {/* BARRA DE PROGRESO (JS) */}
      <div 
        className="fixed top-0 left-0 h-1 z-[100] bg-[#60C8FF] transition-all duration-150 shadow-[0_0_10px_#60C8FF]" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* FONDO INTERACTIVO (JS PARALLAX) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#060F18]">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute transition-transform duration-1000 ease-out"
            style={{
              left: `${(i * 15) % 110 - 5}%`,
              top: `${(i * 25) % 120 - 10}%`,
              opacity: 0.04,
              transform: `rotate(-35deg) translate(${mousePos.x * (i * 10)}px, ${mousePos.y * (i * 10)}px)`,
              animation: `rain-logo ${20 + (i % 5) * 5}s linear infinite`,
            }}
          >
            <Image src="/logo.png" alt="" width={150} height={70} className="object-contain" />
          </div>
        ))}
      </div>

      <div className="content relative z-10">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center px-6 py-28 md:py-40 gap-6">
          <div className="observe animate-fade-up text-[10px] font-bold tracking-[0.2em] px-4 py-2 rounded-full border border-[#1E3A5F] bg-[#0F2136] text-[#60C8FF] uppercase">
            Sarmiento · Chubut · Tech Hub
          </div>
          <h1 className="observe animate-fade-up text-5xl md:text-7xl font-bold leading-tight max-w-4xl tracking-tighter">
            BALUM<span className="text-[#60C8FF]">Tech</span>
          </h1>
          <p className="observe animate-fade-up text-lg md:text-xl max-w-xl text-[#8A9BB0] font-light">
            Infraestructura digital y automatización de procesos para la industria moderna.
          </p>
          <div className="observe animate-fade-up flex flex-col md:flex-row gap-4 mt-4">
            <a href="#servicios" className="px-10 py-4 bg-[#1E3A5F] text-[#60C8FF] rounded-xl font-bold border border-[#2B7FE0] hover:shadow-[0_0_20px_rgba(96,200,255,0.3)] transition-all">
              Ver Servicios
            </a>
            <Link href="/tienda" className="px-10 py-4 border border-[#1E3A5F] text-white rounded-xl font-bold hover:bg-[#0D1B2A] transition-all">
              Explorar Tienda
            </Link>
          </div>
        </section>

        {/* SERVICIOS CARRUSEL */}
        <section id="servicios" className="py-24 overflow-hidden border-y border-[#1E3A5F]/30 bg-[#060F18]/50 backdrop-blur-sm">
          <div className="carousel-container w-full overflow-hidden">
            <div className="carousel-track">
              {[...Array(3)].map((_, repeat) =>
                servicios.map((s, i) => (
                  <div key={`${repeat}-${i}`} className="w-[280px] flex-shrink-0 bg-[#0D1B2A] rounded-3xl p-8 flex flex-col gap-5 border border-[#1E3A5F] hover:border-[#60C8FF] transition-colors group">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#060F18] group-hover:scale-110 transition-transform">
                      {s.icon}
                    </div>
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="text-xs text-[#8A9BB0] leading-relaxed">{s.desc}</p>
                    <div className="mt-auto pt-4 border-t border-[#1E3A5F] flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#60C8FF]">{s.badge}</span>
                      <MousePointer2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#60C8FF]"/>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* MARCAS SECTION */}
        <section className="py-20 px-8">
           <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              {marcas.map((m, i) => (
                <img key={i} src={m.url} alt={m.name} className="h-8 md:h-10 object-contain hover:opacity-100" />
              ))}
           </div>
        </section>

        {/* CTA SECTION */}
        <section id="contacto" className="px-6 py-32 text-center">
          <div className="max-w-2xl mx-auto p-12 rounded-[3rem] bg-gradient-to-b from-[#0D1B2A] to-transparent border border-[#1E3A5F]">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Impulsamos tu proyecto?</h2>
            <p className="text-[#8A9BB0] mb-10">Agendá una consultoría técnica para optimizar tu infraestructura en Sarmiento.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://wa.me/5492974XXXXXX" className="px-8 py-4 bg-[#1E3A5F] text-[#60C8FF] rounded-2xl font-bold border border-[#2B7FE0]">WhatsApp</a>
              <a href="mailto:contacto@balumtech.com" className="px-8 py-4 border border-[#1E3A5F] text-white rounded-2xl font-bold">Email</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-10 py-12 flex flex-col md:flex-row justify-between items-center text-[10px] gap-8 border-t border-[#1E3A5F] text-[#4A7090] uppercase tracking-widest">
            <span>© 2026 BALUMTech — Soluciones Industriales</span>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
        </footer>
      </div>
    </>
  )
}