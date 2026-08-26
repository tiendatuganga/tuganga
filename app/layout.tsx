import type { Metadata } from "next";
import { Instrument_Serif, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { TopBanner } from "@/components/layout/TopBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FavoritesDrawer } from "@/components/favorites/FavoritesDrawer";
import { CookieSettingsPanel } from "@/components/cookies/CookieSettingsPanel";
import { FloatingWhatsApp } from "@/components/whatsapp/FloatingWhatsApp";
import { productService } from "@/lib/services/product-service";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuganga.es";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TU GANGA — Encuentra tu próxima ganga",
    template: "%s | TU GANGA",
  },
  description:
    "TU GANGA es un catálogo para descubrir productos, oportunidades de última hora y artículos de segunda vuelta.",
  openGraph: {
    title: "TU GANGA — Encuentra tu próxima ganga",
    description:
      "Descubre productos, últimas oportunidades y artículos de segunda vuelta en TU GANGA.",
    url: siteUrl,
    siteName: "TU GANGA",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const products = await productService.getAllProducts();

  return (
    <html lang="es" className={`${inter.variable} ${jakarta.variable} ${instrument.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-tg-offwhite text-tg-ink">
        <CookieConsentProvider>
          <FavoritesProvider catalog={products}>
            <TopBanner />
            <Header products={products} />
            <main className="flex-1">{children}</main>
            <Footer />
            <FavoritesDrawer />
            <FloatingWhatsApp />
            <CookieSettingsPanel />
          </FavoritesProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
