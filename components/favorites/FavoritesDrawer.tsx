"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "@/components/ui/Button";
import { ExternalProductCTA } from "@/components/product/ExternalProductCTA";
import { CloseIcon, HeartIcon, TrashIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils";

export function FavoritesDrawer() {
  const { products, isDrawerOpen, closeDrawer, removeFavorite } = useFavorites();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            key="favorites-overlay"
            className="fixed inset-0 z-50 bg-tg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
          />
          <motion.aside
            key="favorites-drawer"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-tg-border bg-white shadow-card"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Tus favoritos"
          >
            <div className="flex items-center justify-between border-b border-tg-lavender-soft px-6 py-5">
              <h2 className="font-display text-lg font-semibold text-tg-ink">
                Tus favoritos {products.length > 0 && `(${products.length})`}
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Cerrar favoritos"
                className="text-tg-ink/60 transition-colors hover:text-tg-primary"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <HeartIcon className="h-10 w-10 text-tg-lavender" />
                <p className="text-sm text-tg-ink/60">Todavía no tienes favoritos.</p>
                <Button href="/productos" onClick={closeDrawer} size="sm">
                  Descubrir productos
                </Button>
              </div>
            ) : (
              <div className="flex-1 divide-y divide-tg-lavender-soft overflow-y-auto px-6">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 py-4">
                    <Link
                      href={`/producto/${product.slug}`}
                      onClick={closeDrawer}
                      className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-tg-offwhite"
                    >
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/producto/${product.slug}`}
                        onClick={closeDrawer}
                        className="block truncate text-sm font-medium text-tg-ink transition-colors hover:text-tg-primary"
                      >
                        {product.title}
                      </Link>
                      <p className="mt-0.5 text-sm font-semibold text-tg-ink">
                        {formatPrice(product.price)}
                      </p>
                      <div className="mt-2">
                        <ExternalProductCTA product={product} variant="compact" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => void removeFavorite(product.id)}
                      aria-label={`Quitar ${product.title} de favoritos`}
                      className="shrink-0 rounded-full p-2 text-tg-ink/50 transition-colors hover:bg-tg-lavender-soft hover:text-tg-primary"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
