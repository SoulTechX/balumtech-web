import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CursorParticles from "@/components/CursorParticles";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ──────────────────────────────────
   SEO — Global Metadata
   ────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL("https://balumtech.site"),

  title: {
    default: "BALUMTech | Desarrollo de Software, IA y Redes en Sarmiento, Chubut",
    template: "%s | BALUMTech",
  },

  description:
    "Estudio tecnológico en Sarmiento, Chubut. Desarrollo de software a medida, automatización con IA, ciberseguridad, CCTV y redes para empresas de la Patagonia.",

  keywords: [
    "desarrollo de software a medida Chubut",
    "automatización con IA Patagonia",
    "empresa tecnología Sarmiento Chubut",
    "agentes de inteligencia artificial Argentina",
    "software para empresas Patagonia",
    "ciberseguridad Chubut",
    "CCTV industrial Comodoro Rivadavia",
    "redes empresariales Patagonia",
    "n8n automatización Argentina",
    "hardware IT Sarmiento",
    "tienda informática Chubut",
    "soporte técnico empresas Patagonia",
    "sistemas a medida pymes Argentina",
    "seguridad electrónica Chubut",
    "infraestructura IT sur Argentina",
    "consultoría tecnológica Patagonia",
    "desarrollo web Comodoro Rivadavia",
    "BALUMTech",
  ],

  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "BALUMTech",
    url: "https://balumtech.site",
    title: "BALUMTech | Tecnología, IA y Redes en Sarmiento, Chubut",
    description:
      "Software a medida, agentes de IA, ciberseguridad y redes industriales para empresas de la Patagonia argentina. Desde Sarmiento, Chubut.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BALUMTech — Tecnología desde la Patagonia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BALUMTech | Tecnología, IA y Redes en Sarmiento, Chubut",
    description:
      "Software a medida, agentes de IA, ciberseguridad y redes industriales para empresas de la Patagonia argentina.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://balumtech.site",
  },

  // Google Search Console — reemplazá XXXX con tu código real después de verificar:
  // verification: {
  //   google: "XXXX",
  // },
};

/* ──────────────────────────────────
   Viewport (Next.js 14 separate export)
   ────────────────────────────────── */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

/* ──────────────────────────────────
   Root Layout
   ────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "ProfessionalService"],
              name: "BALUMTech",
              url: "https://balumtech.site",
              logo: "https://balumtech.site/logo.png",
              image: "https://balumtech.site/logo.png",
              description:
                "Estudio tecnológico en Sarmiento, Chubut. Desarrollo de software a medida, automatización con agentes de IA, ciberseguridad, redes industriales y hardware IT para empresas de la Patagonia.",
              telephone: "+5492974779978",
              email: "contacto@balumtech.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Sarmiento",
                addressRegion: "Chubut",
                addressCountry: "AR",
                postalCode: "9020",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -45.5833,
                longitude: -69.0833,
              },
              areaServed: [
                { "@type": "State", name: "Chubut" },
                {
                  "@type": "GeoCircle",
                  geoMidpoint: {
                    "@type": "GeoCoordinates",
                    latitude: -45.5833,
                    longitude: -69.0833,
                  },
                  geoRadius: "300000",
                },
              ],
              serviceType: [
                "Desarrollo de software a medida",
                "Automatización con inteligencia artificial",
                "Agentes de IA con n8n",
                "Ciberseguridad y CCTV industrial",
                "Redes empresariales y Mesh",
                "Hardware IT pre-configurado",
                "Soporte técnico IT",
              ],
              priceRange: "$$",
              sameAs: [],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "13:00",
                },
              ],
            }),
          }}
        />

        <CursorParticles />
        {/* El Navbar vive aquí, arriba de todas las páginas */}
        <Navbar />
        {children}

        {/* Asistente Virtual (reemplaza a WhatsApp estático) */}
        <Chatbot />
      </body>
    </html>
  );
}