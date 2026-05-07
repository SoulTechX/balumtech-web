"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Ocultar Navbar en la página de tienda
  if (pathname === '/tienda') return null;

  const navItems = [
    { label: "INICIO", href: "/" },
    { label: "TIENDA", href: "/tienda" },
    { label: "SOPORTE", href: "#contacto" },
  ];

  return (
    <>
      <nav 
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 flex items-center justify-between px-6 py-2 rounded-2xl transition-all duration-500 shadow-2xl"
        style={{ 
          backdropFilter: "blur(20px)", 
          background: "rgba(10, 25, 47, 0.7)", 
          border: "1px solid rgba(255, 255, 255, 0.05)" 
        }}
      >
        {/* LOGO */}
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

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-blue-400 transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA BUTTON (desktop) */}
        <div className="flex-1 flex justify-end">
          <Link 
            href="#contacto" 
            className="hidden md:inline-flex px-4 py-1.5 text-[10px] font-black rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] uppercase tracking-wider"
          >
            Contactar
          </Link>

          {/* HAMBURGER BUTTON (mobile) */}
          <button
            className="md:hidden text-zinc-400 hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button 
          className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
        >
          <X size={28} />
        </button>

        <Image src="/logo.png" alt="BALUM" width={160} height={40} className="object-contain mb-8 opacity-70" />

        {navItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href} 
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        <Link 
          href="#contacto" 
          onClick={() => setMenuOpen(false)}
          className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm tracking-wider transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        >
          Contactar
        </Link>
      </div>
    </>
  );
}