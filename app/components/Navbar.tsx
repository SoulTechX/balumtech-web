"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav style={{
      borderBottom: "1px solid #1E3A5F", 
      backdropFilter: "blur(12px)", 
      background: "rgba(13,27,42,0.85)", 
      position: "fixed", // Cambiado a fixed para que flote sobre el contenido
      top: 0, 
      width: "100%",
      zIndex: 100
    }}
      className="flex items-center justify-between px-8 py-4">
      
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src="/logo.png" alt="BALUMTech" width={140} height={60} style={{objectFit: "contain", cursor: "pointer"}} />
        </Link>
      </div>

      <div className="flex gap-8 text-sm font-medium">
        <Link href="/" className="hover:text-[#60C8FF] transition-colors">Inicio</Link>
        <Link href="/#servicios" className="hover:text-[#60C8FF] transition-colors">Servicios</Link>
        <Link href="/tienda" className="hover:text-[#60C8FF] transition-colors">Tienda</Link>
        <Link href="/#contacto" className="hover:text-[#60C8FF] transition-colors">Contacto</Link>
      </div>

      <Link href="/#contacto" className="px-4 py-2 text-sm rounded-lg font-semibold" 
        style={{background: "#1E3A5F", color: "#60C8FF", border: "1px solid #2B7FE0", transition: "all 0.3s"}}>
        Cotizar proyecto
      </Link>
    </nav>
  );
}