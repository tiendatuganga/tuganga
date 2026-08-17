"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GradientWave } from "@/components/ui/gradient-wave";
import { Button } from "@/components/ui/Button";
import { SparkleIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils";

const FLOATING_PRODUCTS = [
  {
    href: "/producto/lampara-luna-led",
    src: "https://images.unsplash.com/photo-1632712535563-c30adb9a9e2e?q=80&w=600&auto=format&fit=crop",
    alt: "Lámpara Luna LED",
    price: 24.99,
  },
  {
    href: "/producto/altavoz-mini-bluetooth",
    src: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
    alt: "Altavoz Mini Bluetooth",
    price: 22.9,
  },
  {
    href: "/producto/soporte-magnetico",
    src: "https://images.unsplash.com/photo-1536825591064-574efec257f2?q=80&w=600&auto=format&fit=crop",
    alt: "Soporte Magnético",
    price: 12.5,
  },
  {
    href: "/producto/mochila-urbana",
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    alt: "Mochila Urbana",
    price: 29.99,
  },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#2e1065]">
      <div className="absolute inset-0">
        <GradientWave />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-12 text-center sm:px-8 sm:py-16 sm:text-left lg:mx-10 lg:items-start lg:py-24"
      >
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-inset ring-white/30">
            <SparkleIcon className="h-3.5 w-3.5" />
            Nueva selección cada semana
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            ENCUENTRA TU
            <br />
            PRÓXIMA GANGA.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Productos nuevos, segundas oportunidades y ofertas de última hora. Descubrir en TU GANGA
            es casi tan bueno como comprar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
            <Button
              href="/productos"
              className="bg-white text-tg-primary hover:bg-tg-lavender-soft"
            >
              Descubrir productos
            </Button>
            <Button
              href="/productos?filtro=ultimas-oportunidades"
              variant="secondary"
              className="border-white/40 text-white hover:border-white hover:bg-white hover:text-tg-primary"
            >
              Últimas oportunidades
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="absolute right-64 top-1/2 z-10 hidden -translate-y-1/2 grid-cols-2 gap-5 xl:grid">
        {FLOATING_PRODUCTS.map((product, index) => (
          <motion.div
            key={product.href}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: "easeOut" }}
          >
            <Link
              href={product.href}
              className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/25 shadow-2xl shadow-black/40 transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={product.src}
                alt={product.alt}
                width={240}
                height={240}
                className="h-32 w-32 object-cover transition-transform duration-500 ease-out group-hover:scale-110 xl:h-36 xl:w-36"
              />
              <span className="absolute bottom-2 right-2 rounded-full bg-tg-primary/90 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                {formatPrice(product.price)}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}