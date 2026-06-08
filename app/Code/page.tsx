"use client"
import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, MessageCircle, Mail, Code2, Terminal } from "lucide-react"

/* ——————————————————————————————————
   DATA
   —————————————————————————————————— */

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Entendemos tu negocio",
    header: "primer-contacto.sh",
    lines: [
      { type: "cmd", text: "balum escuchar --cliente=vos" },
      { type: "log", text: "Analizando puntos de dolor..." },
      { type: "ok", text: "Requerimientos claros." },
    ],
    description: "Te hacemos las preguntas correctas. No asumimos nada. Hasta no entender tu negocio, no arrancamos.",
    entregable: "Propuesta técnica detallada",
  },
  {
    step: "02",
    title: "Diseñamos la solución",
    header: "prototipo.ts",
    lines: [
      { type: "cmd", text: "balum diseñar --foco=tu-operacion" },
      { type: "log", text: "Estructurando UI/UX..." },
      { type: "ok", text: "Prototipo interactivo generado." },
    ],
    description: "Te mostramos cómo va a verse y funcionar. Lo revisamos juntos, lo ajustamos, y recién ahí arrancamos a codear.",
    entregable: "Prototipo funcional aprobado",
  },
  {
    step: "03",
    title: "Despliegue y marcha",
    header: "deploy.yml",
    lines: [
      { type: "cmd", text: "balum entregar --estado=produccion" },
      { type: "log", text: "Desplegando en infraestructura cloud..." },
      { type: "ok", text: "Sistema en línea. Latencia < 50ms." },
    ],
    description: "Lo instalamos, capacitamos a tu equipo y aseguramos su estabilidad a largo plazo. Tu negocio no para.",
    entregable: "Infraestructura cloud operativa",
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
    color: "text-[#3ECF8E] border-[#3ECF8E]/20 bg-[#3ECF8E]/[0.03]",
    items: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  {
    category: "Backend",
    color: "text-zinc-300 border-white/10 bg-white/[0.02]",
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL"],
  },
  {
    category: "IA & Automatización",
    color: "text-[#3ECF8E] border-[#3ECF8E]/20 bg-[#3ECF8E]/[0.03]",
    items: ["n8n", "OpenAI API", "LangChain"],
  },
  {
    category: "Infraestructura",
    color: "text-zinc-300 border-white/10 bg-white/[0.02]",
    items: ["Linux", "Docker", "Traefik", "VPS Cloud"],
  },
]

const WA_NUMBER = "5492974779978"

/* ——————————————————————————————————
   REUSABLE COMPONENTS
   —————————————————————————————————— */

function CodeBlockCard({ header, lines, className = "" }: {
  header: string
  lines: { type: string; text: string }[]
  className?: string
}) {
  return (
    <div className={`bg-black border border-white/[0.08] rounded-xl overflow-hidden group relative transition-colors hover:border-[#3ECF8E]/30 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#3ECF8E]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="bg-white/[0.01] border-b border-white/[0.05] px-4 py-3 flex items-center gap-3">
        <Terminal size={14} className="text-zinc-600" />
        <span className="text-[11px] text-zinc-400 font-mono tracking-wide">{header}</span>
      </div>
      <div className="p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed space-y-2">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`terminal-line-animate ${
              line.type === "cmd"
                ? "text-zinc-200"
                : line.type === "ok"
                  ? "text-[#3ECF8E]"
                  : "text-zinc-500"
            }`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {line.type === "cmd" && <span className="text-[#3ECF8E] mr-3">~</span>}
            {line.type === "log" && <span className="text-zinc-700 mr-3">›</span>}
            {line.type === "ok" && <span className="text-[#3ECF8E] mr-3">✓</span>}
            {line.text}
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
    <div className="w-full min-h-screen bg-black text-zinc-50 font-sans antialiased overflow-x-hidden relative selection:bg-[#3ECF8E]/30">
      
      {/* GLOWS (SUTIL ESFERA ESTILO SUPABASE) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#3ECF8E]/[0.07] blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* BACK BUTTON */}
      <Link 
        href="/"
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group text-xs font-mono tracking-widest bg-black/80 backdrop-blur-md px-4 py-2 rounded-md border border-white/[0.08]"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Volver
      </Link>

      {/* ======================================
          SECTION 1 — HERO
          ====================================== */}
      <section className="w-full relative flex flex-col items-center justify-center min-h-screen py-24 z-10 text-center px-6">
        <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[#3ECF8E] text-xs font-mono tracking-wide mb-8">
          <Code2 size={14} />
          <span>DevTools para Negocios</span>
        </div>

        <h1 className="reveal delay-100 text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.1] mb-6 text-white max-w-4xl">
          Construimos el sistema que tu operación necesita.
        </h1>

        <p className="reveal delay-200 text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl leading-relaxed tracking-tight">
          Desarrollo de software a medida y agentes de Inteligencia Artificial para automatizar y escalar procesos sin fricción.
        </p>

        <div className="reveal delay-300 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola BALUMTech, quiero desarrollar un producto de software.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#3ECF8E] hover:bg-[#34b27b] text-black rounded-md font-medium tracking-tight transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(62,207,142,0.2)]"
          >
            Iniciar proyecto <ArrowRight size={16} />
          </a>
          <a
            href="#proceso"
            className="px-6 py-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-white rounded-md font-medium tracking-tight transition-all flex items-center justify-center"
          >
            Ver arquitectura
          </a>
        </div>
      </section>

      {/* ======================================
          SECTION 2 — PROCESS
          ====================================== */}
      <section id="proceso" className="w-full py-32 px-6 relative z-10 border-t border-white/[0.05]">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="reveal mb-24 md:mb-32">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-4 text-white">Metodología de despliegue.</h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto tracking-tight">
              Un pipeline predecible y transparente desde el día uno.
            </p>
          </div>

          <div className="flex flex-col gap-24 w-full">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.step} className={`reveal delay-100 flex flex-col items-center text-center gap-8`}>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                    Fase {step.step}
                  </span>
                  <h3 className="text-white font-semibold tracking-tight text-2xl md:text-3xl">{step.title}</h3>
                </div>

                <div className="w-full max-w-2xl text-left">
                  <CodeBlockCard header={step.header} lines={step.lines} />
                </div>

                <p className="text-zinc-400 text-base max-w-xl leading-relaxed">
                  {step.description}
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-zinc-300 text-xs font-mono tracking-wide">
                  Output: <span className="text-[#3ECF8E]">{step.entregable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          SECTION 3 — SUCCESS CASES
          ====================================== */}
      <section className="w-full py-32 px-6 relative z-10 border-t border-white/[0.05] bg-white/[0.01]">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="reveal mb-24">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-4 text-white">Producción comprobada.</h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto tracking-tight">
              Métricas reales de operaciones optimizadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="reveal delay-100 bg-black border border-white/[0.08] rounded-xl p-8 hover:border-white/20 transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" />
                  <span className="text-xs text-zinc-500 font-mono tracking-wider">STATUS: 200 OK</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-8 flex-1 italic">
                  {t.text}
                </p>
                <div className="pt-6 border-t border-white/[0.05]">
                  <p className="text-zinc-500 text-xs mb-2">{t.client}</p>
                  <p className="text-xs font-mono text-[#3ECF8E]">Metric: {t.resultado}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          SECTION 4 — TECH STACK
          ====================================== */}
      <section className="w-full py-32 px-6 relative z-10 border-t border-white/[0.05]">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="reveal mb-20">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-4 text-white">
              Arquitectura Enterprise.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto tracking-tight">
              Construimos sobre los estándares abiertos más robustos del mercado, garantizando escalabilidad y nulo vendor lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {TECH_STACK.map((group, i) => (
              <div
                key={group.category}
                className="reveal delay-100 bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 flex flex-col items-start text-left hover:bg-white/[0.03] transition-colors"
              >
                <h3 className="text-sm font-medium text-white mb-6">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`px-3 py-1 rounded-md border text-xs font-mono ${group.color}`}
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
      <section className="w-full py-32 px-6 relative z-10 border-t border-white/[0.05]">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="reveal mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-6 text-white">
              Iniciá la migración.
            </h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto tracking-tight">
              Agenda una llamada técnica. Sin fricción.
            </p>
          </div>

          <div className="reveal delay-100 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola BALUMTech, busco agendar una llamada técnica.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#3ECF8E] hover:bg-[#34b27b] text-black rounded-md font-medium tracking-tight transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(62,207,142,0.2)]"
            >
              Contactar equipo técnico
            </a>
            <a
              href="mailto:contacto@balumtech.com"
              className="px-8 py-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-zinc-300 rounded-md font-medium tracking-tight transition-all flex items-center justify-center gap-2"
            >
              <Mail size={16} className="text-zinc-500" />
              contacto@balumtech.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-8 px-6 border-t border-white/[0.05] bg-black relative z-10">
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-zinc-500 font-mono text-[11px] tracking-wide">
            balum_CODE // Enterprise Software
          </div>
          <div className="text-zinc-600 text-[11px] tracking-wide">
            © {new Date().getFullYear()} BALUMTech • Patagonia Argentina
          </div>
        </div>
      </footer>
    </div>
  )
}
