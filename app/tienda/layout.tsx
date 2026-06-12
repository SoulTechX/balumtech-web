import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda Hardware y Soluciones IT | BALUMTech Sarmiento",
  description:
    "Kits de hardware IT pre-configurados, equipos de redes y soluciones tecnológicas para empresas en Sarmiento, Chubut y toda la Patagonia.",
  alternates: {
    canonical: "https://balumtech.site/tienda",
  },
  openGraph: {
    title: "Tienda Hardware y Soluciones IT | BALUMTech Sarmiento",
    description:
      "Kits de hardware IT pre-configurados, equipos de redes y soluciones tecnológicas para empresas en Sarmiento, Chubut y toda la Patagonia.",
    url: "https://balumtech.site/tienda",
  },
};

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
