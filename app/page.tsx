"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Bot, ShoppingCart, ArrowRight, Terminal, Cpu, Zap } from "lucide-react"

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("opacity-100", "translate-y-0");
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const marcas = [
    "Hikvision", "Dahua", "TP-Link", "Fortinet", "n8n", "Intel", "NVIDIA", "Dell", "HP"
  ];

  return (
    <div className="min-h-screen bg-[#020609] text-[#F8FAFC] selection:bg-[#60C8FF]/30 font-sans">
      <style jsx global>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .grid-bg {
          background-image: radial-gradient(circle at 2px 2px, rgba(96, 200, 255, 0.05) 1px, transparent 0);
          background-size: 40px 40px;
        }
      `}</style>

      {/* HEADER TIPO RAILWAY */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#020609]/80 backdrop-blur-md border-[#1E3A5F]/50 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#60C8FF] rounded flex items-center justify-center font-bold text-[#020609]">B</div>
            <span className="text-xl font-bold tracking-tighter uppercase">BALUM<span className="text-[#60C8FF]">Tech</span></span>
          </div>
          <div className="hidden md:flex gap-10 text-sm font-medium text-[#8A9BB0]">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </div>
          <Link href="/tienda" className="px-5 py-2 bg-[#F8FAFC] text-[#020609] rounded-md text-xs font-bold hover:bg-[#60C8FF] transition-all">
            Explorar Catálogo
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative pt-32 pb-20 overflow-hidden grid-bg">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#60C8FF]/10 blur-[120px] rounded-full pointer-events-none" />

        <section className="max-w-7xl mx-auto px-8 relative">
          <div className="max-w-3xl">
            <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A5F]/20 border border-[#1E3A5F]/50 text-[#60C8FF] text-[10px] font-bold uppercase tracking-widest mb-8">
              <Zap size={12} /> Despliegue industrial en Sarmiento
            </div>
            <h1 className="reveal text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              Infraestructura <br />
              <span className="text-[#60C8FF]">sin límites.</span>
            </h1>
            <p className="reveal text-lg md:text-xl text-[#8A9BB0] mb-10 max-w-xl leading-relaxed">
              Soluciones de IA, ciberseguridad y redes diseñadas para escalar empresas en la Patagonia. Desplegá tu potencial con BALUMTech.
            </p>
            <div className="reveal flex flex-wrap gap-4">
              <a href="#servicios" className="px-8 py-4 bg-[#1E3A5F] text-[#60C8FF] rounded-lg font-bold border border-[#2B7FE0] flex items-center gap-2 group">
                Comenzar proyecto <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/tienda" className="px-8 py-4 bg-transparent border border-[#1E3A5F] text-white rounded-lg font-bold hover:bg-[#0D1B2A] transition-all">
                Ver Catálogo
              </Link>
            </div>
          </div>
        </section>

        {/* LOGOS MARCAS - TIPO TICKER RAILWAY */}
        <div className="mt-32 border-y border-[#1E3A5F]/20 bg-[#020609]/50 py-10">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-[10px] font-bold text-[#4A7090] uppercase tracking-[0.3em] mb-8">Tecnología certificada por líderes</p>
            <div className="flex flex-wrap gap-12 items-center opacity-30 grayscale pointer-events-none">
               {marcas.map(m => <span key={m} className="text-xl font-bold tracking-tighter">{m}</span>)}
            </div>
          </div>
        </div>
      </main>

      {/* SERVICIOS - BENTO GRID DESIGN */}
      <section id="servicios" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Soluciones Integrales</h2>
            <p className="text-[#8A9BB0]">Todo lo que tu infraestructura necesita para operar en el siglo XXI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: IA */}
            <div className="reveal md:col-span-2 group p-8 rounded-2xl bg-[#0D1B2A]/30 border border-[#1E3A5F]/50 hover:border-[#60C8FF]/50 transition-all relative overflow-hidden">
               <div className="relative z-10">
                <Bot className="text-[#60C8FF] mb-6" size={32} />
                <h3 className="text-2xl font-bold mb-3">Inteligencia Artificial</h3>
                <p className="text-[#8A9BB0] text-sm max-w-sm mb-6">Automatización de flujos con n8n, agentes conversacionales y modelos LLM personalizados para tu negocio.</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-[#1E3A5F] text-[10px] rounded text-[#60C8FF]">n8n Expert</span>
                  <span className="px-2 py-1 bg-[#1E3A5F] text-[10px] rounded text-[#60C8FF]">Automatización</span>
                </div>
               </div>
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal size={120} />
               </div>
            </div>

            {/* Card 2: Ciberseguridad */}
            <div className="reveal group p-8 rounded-2xl bg-[#0D1B2A]/30 border border-[#1E3A5F]/50 hover:border-[#60C8FF]/50 transition-all">
              <Shield className="text-[#60C8FF] mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-3">Seguridad</h3>
              <p className="text-[#8A9BB0] text-sm mb-6">Auditorías de red y CCTV industrial de alta definición.</p>
              <div className="w-full h-1 bg-[#1E3A5F] rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[#60C8FF]" />
              </div>
            </div>

            {/* Card 3: Tienda */}
            <div className="reveal group p-8 rounded-2xl bg-[#0D1B2A]/30 border border-[#1E3A5F]/50 hover:border-[#60C8FF]/50 transition-all">
              <ShoppingCart className="text-[#60C8FF] mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-3">Kits Tech</h3>
              <p className="text-[#8A9BB0] text-sm mb-6">Hardware seleccionado y pre-configurado para despliegue inmediato.</p>
              <Link href="/tienda" className="text-xs font-bold text-[#60C8FF] flex items-center gap-1 group-hover:gap-2 transition-all">
                Ir a la Tienda <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 4: Redes */}
            <div className="reveal md:col-span-2 group p-8 rounded-2xl bg-gradient-to-br from-[#0D1B2A]/50 to-transparent border border-[#1E3A5F]/50 hover:border-[#60C8FF]/50 transition-all flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1">
                <Cpu className="text-[#60C8FF] mb-6" size={32} />
                <h3 className="text-2xl font-bold mb-3">Infraestructura & Redes</h3>
                <p className="text-[#8A9BB0] text-sm">Despliegue de redes robustas, fibra y conectividad para zonas remotas y yacimientos.</p>
               </div>
               <div className="w-full md:w-1/3 aspect-video bg-[#020609] rounded-lg border border-[#1E3A5F] flex items-center justify-center">
                  <div className="text-[10px] font-mono text-[#4A7090]"># CONFIG_OK</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - TIPO FOOTER RAILWAY */}
      <section id="contacto" className="py-40 px-8 border-t border-[#1E3A5F]/20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#60C8FF] to-transparent opacity-20" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10">¿Listo para subir de nivel?</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="https://wa.me/5492974XXXXXX" className="px-10 py-5 bg-[#F8FAFC] text-[#020609] rounded-xl font-bold hover:bg-[#60C8FF] transition-all w-full md:w-auto">
              Contactar Consultoría
            </a>
            <a href="mailto:contacto@balumtech.com" className="px-10 py-5 border border-[#1E3A5F] text-[#8A9BB0] rounded-xl font-bold hover:text-white transition-all w-full md:w-auto">
              Enviar Correo
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER MINIMALISTA */}
      <footer className="py-20 px-8 text-[#4A7090]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="text-xl font-bold text-white tracking-tighter mb-4 uppercase">BALUM<span className="text-[#60C8FF]">Tech</span></div>
            <p className="text-xs leading-relaxed">Operando desde Sarmiento, Chubut. Proveedor líder de soluciones técnicas industriales en la Patagonia.</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
              <span className="text-white">Explorar</span>
              <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
              <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
            </div>
            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
              <span className="text-white">Social</span>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#1E3A5F]/10 flex flex-col md:flex-row justify-between gap-4 text-[10px]">
          <span>© 2026 BALUMTECH CORP. TODOS LOS DERECHOS RESERVADOS.</span>
          <div className="flex gap-8">
            <a href="#">SISTEMAS OPERATIVOS</a>
            <a href="#">ESTADO DEL SERVICIO</a>
          </div>
        </div>
      </footer>
    </div>
  )
}