"use client"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Shield, Bot, ShoppingCart, ArrowRight, Terminal, Cpu, Zap } from "lucide-react"

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal-active");
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: "50px" }
    );
    
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 selection:bg-blue-500/30 font-sans antialiased overflow-x-hidden relative">
      <style jsx global>{`
        ::selection { background: rgba(59, 130, 246, 0.3); color: white; }
        
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px) scale(0.98); filter: blur(12px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .reveal { opacity: 0; }
        .reveal-active { animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        
        .app-icon {
          background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.05);
        }

        /* CARRUSEL INFINITO */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        /* CONTENEDOR DE LOGO UNIFICADO */
        .logo-wrapper {
          width: 180px; /* Ancho del cuadro invisible */
          height: 80px; /* Alto del cuadro invisible */
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden; /* Para que si lo estiramos mucho no rompa nada */
        }

        .logo-item {
          filter: grayscale(100%) brightness(0.9) opacity(0.4);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          object-fit: contain; /* Esto asegura que se vea todo el logo sin cortarse */
        }
        .logo-wrapper:hover .logo-item {
          filter: grayscale(0%) brightness(1.1) opacity(1);
          transform: scale(1.1);
        }
      `}</style>

      {/* FONDOS AURA */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* HERO SECTION */}
      <main className="relative pt-44 pb-24 md:pt-52 md:pb-32 flex flex-col items-center justify-center min-h-[90vh] z-10 text-center px-6">
        <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <Zap size={14} className="text-blue-400" />
          <span>Sarmiento, Chubut • Automatizaciones de IA e Infraestructura IT</span>
        </div>

        <h1 className="reveal delay-100 text-6xl md:text-[5.5rem] font-black tracking-tighter leading-[0.9] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
          BALUM Tech OS.
        </h1>

        <p className="reveal delay-200 text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl leading-relaxed tracking-tight font-medium">
          Tu ecosistema técnico unificado. Seguridad electrónica, automatización con IA y redes industriales diseñadas para correr sin fricción.
        </p>

        <div className="reveal delay-300 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="https://wa.me/5492974779978" className="px-8 py-4 bg-zinc-100 text-black rounded-xl font-bold tracking-tight hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/10">
            Instalar Solución <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link href="/tienda" className="px-8 py-4 glass-panel text-white rounded-xl font-semibold tracking-tight hover:bg-white/5 transition-all flex items-center justify-center">
            Explorar Apps
          </Link>
        </div>
      </main>

      {/* SERVICIOS SECTION */}
      <section id="servicios" className="py-24 px-6 md:px-8 relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">Aplicaciones & Core.</h2>
          <p className="text-zinc-400 text-lg max-w-xl font-medium tracking-tight">Hardware y software diseñado para operaciones exigentes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="reveal md:col-span-2 group glass-panel p-8 md:p-10 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
             <div className="relative z-10">
              <div className="w-16 h-16 app-icon rounded-[1.2rem] flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                <Bot className="text-blue-300 drop-shadow-[0_0_10px_rgba(147,197,253,0.5)]" size={30} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-white">Inteligencia Artificial</h3>
              <p className="text-zinc-400 text-sm max-w-md mb-8 leading-relaxed font-medium">Flujos automatizados con n8n y agentes de IA. Tu negocio en piloto automático.</p>
             </div>
             <div className="relative z-10 flex gap-3">
                <span className="px-4 py-2 border border-white/10 bg-black/40 text-[11px] font-bold uppercase tracking-wider rounded-lg text-zinc-300 backdrop-blur-md">Agentic AI</span>
             </div>
             <Terminal className="absolute -bottom-10 -right-10 text-white/[0.02] group-hover:text-blue-500/[0.05] transition-colors duration-500" size={240} />
          </div>

          <div className="reveal delay-100 group glass-panel p-8 md:p-10 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="w-16 h-16 app-icon rounded-[1.2rem] flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                <Shield className="text-zinc-200" size={30} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-white">Seguridad</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">CCTV industrial y protección perimetral encriptada.</p>
            </div>
          </div>

          <div className="reveal delay-200 group glass-panel p-8 md:p-10 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="w-16 h-16 app-icon rounded-[1.2rem] flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                <ShoppingCart className="text-zinc-200" size={30} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-white">Hardware</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium mb-8">Kits premium pre-configurados para empresas.</p>
            </div>
          </div>

          <div className="reveal delay-300 md:col-span-2 group glass-panel p-8 md:p-10 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 flex flex-col md:flex-row gap-10 items-center justify-between min-h-[340px]">
             <div className="flex-1 w-full">
              <div className="w-16 h-16 app-icon rounded-[1.2rem] flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                <Cpu className="text-zinc-200" size={30} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-white">Redes a gran escala</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">Conectividad robusta para yacimientos y entornos Mesh.</p>
             </div>
             <div className="w-full md:w-1/2 bg-[#050505] border border-white/10 rounded-[1.2rem] p-5 font-mono text-xs text-zinc-500 relative overflow-hidden h-40 flex flex-col justify-center shadow-inner shadow-black">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent" />
                <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> balum_TECH@root</p>
                <p className="mt-3 text-zinc-400">Initiating uplink sequence...</p>
                <p className="mt-1 text-green-400">Status: ALL SYSTEMS ONLINE.</p>
             </div>
          </div>
        </div>
      </section>

      {/* MARCAS SECTION - CORRECCIÓN DE TAMAÑO PARA REBELDES */}
      <section className="py-24 relative z-10 overflow-hidden border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-500 mb-2">Infraestructura Certificada</h3>
          <p className="text-zinc-500 text-sm font-medium">Estándares de nivel industrial.</p>
        </div>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee flex items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4">
                <div className="logo-wrapper"><img src="/logos/amd.png" alt="AMD" className="max-h-9 w-auto logo-item" /></div>
                <div className="logo-wrapper"><img src="/logos/asus.png" alt="ASUS" className="max-h-7 w-auto logo-item" /></div>
                <div className="logo-wrapper"><img src="/logos/cisco.png" alt="Cisco" className="max-h-11 w-auto logo-item" /></div>
                <div className="logo-wrapper"><img src="/logos/dell.png" alt="Dell" className="max-h-10 w-auto logo-item" /></div>
                <div className="logo-wrapper"><img src="/logos/hp.png" alt="HP" className="max-h-11 w-auto logo-item" /></div>
                <div className="logo-wrapper"><img src="/logos/intel.png" alt="Intel" className="max-h-10 w-auto logo-item" /></div>
                
                {/* n8n CORREGIDO: Le subimos la altura máxima drásticamente porque tiene mucho aire transparente */}
                <div className="logo-wrapper"><img src="/logos/n8n.png" alt="n8n" className="max-h-20 w-auto logo-item" /></div>
                
                {/* Nvidia CORREGIDO: Es súper bajito, le subimos la altura para compensar */}
                <div className="logo-wrapper"><img src="/logos/nvidia.png" alt="Nvidia" className="max-h-12 w-auto logo-item" /></div>
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-24 pb-12 px-6 md:px-8 border-t border-white/[0.05] relative z-10 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Image src="/logo.png" alt="BALUM" width={120} height={30} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
          <div className="flex gap-6 text-xs font-semibold tracking-wider text-zinc-600 uppercase">
            <span>© {new Date().getFullYear()} BALUMTech</span>
            <span className="hidden md:inline">•</span>
            <span>Tu Sistema Operativo Físico</span>
          </div>
        </div>
      </footer>
    </div>
  )
}