import React from 'react';

// Datos organizados por el modelo de negocio BALUMTech
const categorias = [
  {
    titulo: "IA & Automatización",
    productos: [
      { id: 1, name: "Agente IA Inmobiliario", price: "Consultar", badge: "Especialidad", desc: "Automatización de leads y agenda 24/7 con n8n." },
      { id: 2, name: "Auditoría de Flujos", price: "Consultar", badge: "Pro", desc: "Optimización y limpieza de workflows existentes." }
    ]
  },
  {
    titulo: "Seguridad Electrónica",
    productos: [
      { id: 3, name: "Kit CCTV Hogar (4 Cams)", price: "$285.000", badge: "Stock Regional", desc: "Cámaras con visión nocturna y acceso móvil." },
      { id: 4, name: "Nodo de Red Pro", price: "$145.000", badge: "Instalación Inc.", desc: "Mejora de Wi-Fi y cableado estructurado." }
    ]
  },
  {
    titulo: "Hardware & Workstations",
    productos: [
      { id: 5, name: "PC BALUM v1 Gamer", price: "$820.000", badge: "A Pedido", desc: "Configurada para máximo rendimiento en Sarmiento." }
    ]
  }
];

export default function TiendaPage() {
  return (
    <main className="content pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="section-label">Catálogo Oficial</span>
          <h1 className="text-5xl font-bold glow-text mt-2">Tienda BALUMTech</h1>
          <p className="text-[#8A9BB0] mt-4 max-w-2xl text-lg">
            Equipamiento técnico seleccionado con soporte local. 
            Entrega directa en Sarmiento y Comodoro Rivadavia.
          </p>
        </header>

        {categorias.map((cat, idx) => (
          <section key={idx} className="mb-20">
            <h2 className="text-2xl font-semibold border-l-4 border-[#60C8FF] pl-4 mb-8">
              {cat.titulo}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cat.productos.map((prod) => (
                <div key={prod.id} className="kit-card p-6 flex flex-col justify-between">
                  <div>
                    <span className="tag mb-4 inline-block">{prod.badge}</span>
                    <h3 className="text-xl font-bold mb-2">{prod.name}</h3>
                    <p className="text-[#8A9BB0] text-sm mb-6">{prod.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-[#60C8FF]">{prod.price}</span>
                    <button className="btn-outline !py-2 !px-4 text-sm">
                      Consultar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}