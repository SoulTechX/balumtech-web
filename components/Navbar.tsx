import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav 
  className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 flex items-center justify-between px-6 py-2 rounded-2xl transition-all duration-500 shadow-2xl"
  style={{ 
    backdropFilter: "blur(20px)", 
    background: "rgba(10, 25, 47, 0.7)", 
    border: "1px solid rgba(255, 255, 255, 0.05)" 
  }}
>
  {/* LADO IZQUIERDO: LOGO */}
  <div className="flex-1 flex justify-start">
    <Link href="/">
      <Image 
        src="/logo.png" 
        alt="BALUM" 
        width={180} 
        height={40} 
        className="object-contain hover:opacity-80 transition-opacity" 
      />
    </Link>
  </div>

  {/* CENTRO: MENÚ (INICIO - SERVICIOS - SOPORTE) */}
  <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">
    <Link href="#servicios" className="hover:text-blue-400 transition-colors">INICIO</Link>
    <Link href="/tienda" className="hover:text-blue-400 transition-colors">SERVICIOS</Link>
    <Link href="#contacto" className="hover:text-blue-400 transition-colors">SOPORTE</Link>
  </div>

  {/* LADO DERECHO: BOTÓN */}
  <div className="flex-1 flex justify-end">
    <Link 
      href="#contacto" 
      className="px-4 py-1.5 text-[10px] font-black rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] uppercase tracking-wider"
    >
      Contactar
    </Link>
  </div>
</nav>
  );
}