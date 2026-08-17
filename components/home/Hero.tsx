"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MonogramTG, SparkleIcon } from "@/components/ui/icons";
import { ProductPrice } from "@/components/product/ProductPrice";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const FLOAT_POSITIONS = [
  "left-0 top-2 -rotate-[4deg]",
  "right-0 top-28 rotate-[3deg]",
  "left-20 bottom-0 -rotate-[2deg]",
];

export function Hero({ products }: { products: Product[] }) {
  const floating = products.slice(0, 3);

  return (
    <section className="relative overflow-hidden">
      <MonogramTG className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 text-tg-primary/5" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-tg-lavender-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-tg-primary">
            <SparkleIcon className="h-3.5 w-3.5" />
            Nueva selección cada semana
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-tg-ink sm:text-5xl lg:text-6xl">
            ENCUENTRA TU
            <br />
            PRÓXIMA GANGA.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-tg-ink/65 sm:text-lg">
            Productos nuevos, segundas oportunidades y ofertas de última hora. Descubrir en TU GANGA
            es casi tan bueno como comprar.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/productos">Descubrir productos</Button>
            <Button href="/productos?filtro=ultimas-oportunidades" variant="secondary">
              Últimas oportunidades
            </Button>
          </div>
        </motion.div>

        {floating.length > 0 && (
          <>
            <div className="relative hidden h-[420px] lg:block">
              {floating.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className={cn(
                    "absolute w-48 rounded-2xl bg-white p-3 shadow-xl shadow-tg-primary/10",
                    FLOAT_POSITIONS[index]
                  )}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-tg-offwhite">
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                  <p className="mt-3 truncate text-xs font-medium text-tg-ink">{product.title}</p>
                  <ProductPrice
                    price={product.price}
                    compareAtPrice={product.compareAtPrice}
                    size="sm"
                    className="mt-1"
                  />
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 lg:hidden">
              {floating.slice(0, 2).map((product) => (
                <div key={product.id} className="rounded-2xl bg-white p-3 shadow-sm">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-tg-offwhite">
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                  <p className="mt-3 truncate text-xs font-medium text-tg-ink">{product.title}</p>
                  <ProductPrice
                    price={product.price}
                    compareAtPrice={product.compareAtPrice}
                    size="sm"
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
