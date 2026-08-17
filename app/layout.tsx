import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuganga.es";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TU GANGA — Encuentra tu próxima ganga",
    template: "%s | TU GANGA",
  },
  description:
    "TU GANGA es una tienda online española con nuevos productos, oportunidades de última hora y una segunda vuelta para artículos que todavía tienen mucho que ofrecer.",
  openGraph: {
    title: "TU GANGA — Encuentra tu próxima ganga",
    description:
      "Descubre nuevos productos, últimas oportunidades y la segunda vuelta de TU GANGA, la tienda española donde comprar es divertido.",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-tg-offwhite text-tg-ink">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
