import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desarrollo de Software a Medida | BALUMTech Patagonia",
  description:
    "Creamos software a medida con arquitectura enterprise para pymes y empresas de la Patagonia. Sin vendor lock-in, con soporte real.",
  alternates: {
    canonical: "https://balumtech.site/Code",
  },
  openGraph: {
    title: "Desarrollo de Software a Medida | BALUMTech Patagonia",
    description:
      "Creamos software a medida con arquitectura enterprise para pymes y empresas de la Patagonia. Sin vendor lock-in, con soporte real.",
    url: "https://balumtech.site/Code",
  },
};

export default function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
