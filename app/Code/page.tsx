"use client"
import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, MessageCircle, Mail, Code2 } from "lucide-react"

/* ——————————————————————————————————
   DATA
   —————————————————————————————————— */

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Entendemos tu negocio",
    header: "balum_CHARLA@root — primer-contacto.sh",
    lines: [
      { type: "cmd", text: "$ balum escuchar --cliente=vos" },
      { type: "log", text: "▸ ¿Qué te consume más tiempo?" },
      { type: "ok", text: "✓ Sabemos qué construir" },
    ],
    description: "Te hacemos las preguntas correctas. No asumimos nada. Hasta no entender tu negocio, no arrancamos.",
    entregable: "Propuesta con tiempos y precio",
  },
  {
    step: "02",
    title: "Diseñamos cómo va a funcionar",
    header: "balum_DISEÑO@root — prototipo.sh",
    lines: [
      { type: "cmd", text: "$ balum diseñar --foco=tu-operacion" },
      { type: "log", text: "▸ Armando las pantallas..." },
      { type: "ok", text: "✓ Vos aprobás antes de empezar" },
    ],
    description: "Te mostramos cómo va a verse y funcionar. Lo revisamos juntos, lo ajustamos, y recién ahí arrancamos.",
    entregable: "Prototipo aprobado por vos",
  },
  {
    step: "03",
    title: "Lo ponemos en marcha",
    header: "balum_ENTREGA@root — en-marcha.sh",
    lines: [
      { type: "cmd", text: "$ balum entregar --estado=listo" },
      { type: "log", text: "▸ Sistema instalado y funcionando..." },
      { type: "ok", text: "✓ Tu negocio no para" },
    ],
    description: "Lo instalamos, te explicamos cómo usarlo y seguimos disponibles. No te dejamos solo después de la entrega.",
    entregable: "Sistema en marcha + soporte",
  },
]

const TESTIMONIALS = [
  {
    text: `"Antes manejábamos todo en papel y WhatsApp.\nAhora tenemos un panel donde vemos todo\nen tiempo real."`,
    client: "Empresa de logística, Chubut",
    resultado: "-40% tiempo operativo",
  },
  {
    text: `"Reemplazamos tres planillas de Excel\ncon un solo sistema. Simple y rápido."`,
    client: "Comercio mayorista, Comodoro Rivadavia",
    resultado: "3 herramientas reemplazadas",
  },
  {
    text: `"Lo que antes nos tomaba dos horas\nahora lo hace el sistema solo."`,
    client: "Empresa de servicios, Patagonia",
    resultado: "2hs diarias recuperadas",
  },
]

const TECH_STACK = [
  {
    category: "Frontend",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    items: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  {
    category: "Backend",
    color: "text-green-400 border-green-500/30 bg-green-500/10",
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL"],
  },
  {
    category: "IA & Automatización",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    items: ["n8n", "OpenAI API", "LangChain"],
  },
  {
    category: "Infraestructura",
    color: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    items: ["VPS Linux", "Docker", "Nginx", "SSL"],
  },
]

const WA_NUMBER = "5492974779978"

/* ——————————————————————————————————
   REUSABLE COMPONENTS
   —————————————————————————————————— */

function TerminalCard({ header, lines, className = "" }: {
  header: string
  lines: { type: string; text: string }[]
  className?: string
}) {
  return (
    <div className={`bg-[#050505] border border-white/10 rounded-2xl overflow-hidden group relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
      <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 text-[10px] text-zinc-500 font-mono tracking-wider">{header}</span>
      </div>
      <div className="p-5 md:p-6 font-mono text-xs md:text-sm space-y-1.5">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`terminal-line-animate ${
              line.type === "cmd"
                ? "text-white"
                : line.type === "ok"
                  ? "text-green-400"
                  : "text-zinc-500 pl-1"
            }`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {line.type === "cmd" && <span className="text-green-400">$ </span>}
            {line.text.replace("$ ", "")}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ——————————————————————————————————
   PAGE COMPONENT
   —————————————————————————————————— */

export default function CodePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-active")
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.1, rootMargin: "50px" }
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-zinc-50 font-sans antialiased overflow-x-hidden relative">
      {/* AURA BACKGROUNDS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] md:w-[500px] h-[60vw] md:h-[500px] bg-green-600/15 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[70vw] md:w-[600px] h-[70vw] md:h-[600px] bg-emerald-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* ======================================
          SECTION 1 — HERO
          ====================================== */}
      <section className="relative flex flex-col items-center justify-center min-h-screen py-20 z-10 text-center px-6">
        <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-xs font-mono font-semibold tracking-wide mb-10">
          <Code2 size={14} />
          <span>### para-tu-negocio</span>
        </div>

        <h1 className="reveal delay-100 text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
          Tu negocio necesita un sistema.<br />Nosotros lo construimos.
        </h1>

        <p className="reveal delay-200 text-lg md:text-xl text-zinc-400 mb-16 max-w-xl leading-relaxed tracking-tight font-medium">
          Desarrollado a medida, funcionando desde el primer día.
        </p>

        <div className="reveal delay-300 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola BALUMTech, quiero desarrollar mi producto con Balum CODE.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black rounded-xl font-bold tracking-tight hover:scale-105 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-green-500/20"
          >
            Contanos qué necesitás <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#proceso"
            className="px-8 py-4 glass-panel text-white rounded-xl font-semibold tracking-tight hover:bg-white/5 transition-all flex items-center justify-center"
          >
            Ver cómo trabajamos
          </a>
        </div>
      </section>

      {/* ======================================
          SECTION 2 — PROCESS
          ====================================== */}
      <section id="proceso" className="py-32 md:py-40 px-6 md:px-8 relative z-10 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-20 md:mb-24 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-mono font-semibold tracking-wide mb-6">
              ### como-trabajamos
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">Tres pasos. Sin vueltas.</h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto font-medium tracking-tight">
              De la primera charla a tu sistema funcionando.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.step} className={`reveal delay-${(i + 1) * 100} flex flex-col gap-6`}>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 font-mono text-xs font-bold">[{step.step}]</span>
                  <span className="text-white font-bold text-lg">{step.title}</span>
                </div>

                <TerminalCard header={step.header} lines={step.lines} />

                <p className="text-zinc-400 text-sm leading-relaxed font-medium">{step.description}</p>

                <span className="inline-flex self-start items-center gap-1.5 px-3 py-1.5 rounded-lg border border-green-500/20 bg-green-500/5 text-green-400 text-[10px] font-mono font-semibold tracking-wide">
                  ✓ {step.entregable}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          SECTION 3 — SUCCESS CASES
          ====================================== */}
      <section className="py-32 md:py-40 px-6 md:px-8 relative z-10 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-20 md:mb-24 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-mono font-semibold tracking-wide mb-6">
              ### casos-de-exito
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">Resultados reales.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`reveal delay-${(i + 1) * 100} bg-[#050505] border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/20 transition-all duration-500`}
              >
                <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="ml-2 text-[10px] text-zinc-500 font-mono tracking-wider">
                    balum_CLIENTE@root — resultado.log
                  </span>
                </div>
                <div className="p-6 md:p-8 font-mono text-xs space-y-5">
                  <p className="text-zinc-300 whitespace-pre-line leading-relaxed">{t.text}</p>
                  <p className="text-zinc-500">— {t.client}</p>
                  <div className="pt-4 border-t border-white/5 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 pulse-green" />
                      <span className="text-green-400 text-[11px]">STATUS: SISTEMA EN USO ✓</span>
                    </div>
                    <p className="text-zinc-500 text-[11px]">RESULTADO: {t.resultado}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          SECTION 4 — TECH STACK
          ====================================== */}
      <section className="py-32 md:py-40 px-6 md:px-8 relative z-10 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <div className="reveal mb-16 md:mb-20 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-mono font-semibold tracking-wide mb-6">
              ### con-que-lo-construimos
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6 text-white">
              Vos no necesitás entender la tecnología — nosotros sí.
            </h2>
            <p className="text-zinc-500 text-base max-w-lg mx-auto font-medium tracking-tight">
              Usamos las mismas herramientas que las empresas más grandes del mundo.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TECH_STACK.map((group, i) => (
              <div
                key={group.category}
                className={`reveal delay-${(i + 1) * 100} glass-panel rounded-2xl p-5 md:p-6`}
              >
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`px-2.5 py-1 rounded-md border text-[10px] font-mono font-semibold ${group.color}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          SECTION 5 — FINAL CTA
          ====================================== */}
      <section className="py-32 md:py-44 px-6 md:px-8 relative z-10 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="reveal mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-mono font-semibold tracking-wide mb-6">
              ### empeza-hoy
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">
              El primer paso es una charla.
            </h2>
            <p className="text-zinc-400 text-lg max-w-md mx-auto font-medium tracking-tight">
              Sin costo, sin compromiso. Respondemos en menos de 24hs.
            </p>
          </div>

          <div className="reveal delay-100 w-full max-w-md mx-auto mb-14">
            <TerminalCard
              header="balum_CODE@root — primer-contacto.sh"
              lines={[
                { type: "cmd", text: "$ balum disponibilidad --check" },
                { type: "log", text: "▸ Equipo disponible: SÍ" },
                { type: "log", text: "▸ Lugares este mes: 2 proyectos" },
                { type: "ok", text: "✓ LISTO PARA ESCUCHARTE" },
              ]}
            />
          </div>

          <div className="reveal delay-200 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola BALUMTech, quiero iniciar un proyecto con Balum CODE.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black rounded-xl font-bold tracking-tight hover:scale-105 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-green-500/20"
            >
              <MessageCircle size={18} />
              Escribinos por WhatsApp
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="mailto:contacto@balumtech.com"
              className="px-8 py-4 glass-panel text-zinc-300 rounded-xl font-semibold tracking-tight hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Mail size={18} />
              contacto@balumtech.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-16 pb-12 px-6 md:px-8 border-t border-white/[0.05] relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-600 font-mono text-xs">
            balum_CODE — Sistemas a medida para empresas reales
          </div>
          <div className="flex gap-6 text-xs font-semibold tracking-wider text-zinc-600 uppercase">
            <span>© {new Date().getFullYear()} BALUMTech</span>
            <span className="hidden md:inline">•</span>
            <span>Sarmiento, Chubut 🇦🇷</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
