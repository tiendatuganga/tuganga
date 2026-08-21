"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { searchService } from "@/lib/services/search-service";
import { formatPrice } from "@/lib/utils";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import type { Product } from "@/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  function handleClose() {
    setQuery("");
    onClose();
  }

  useEffect(() => {
    const handle = window.setTimeout(() => {
      searchService.search(query).then(setResults);
    }, 150);
    return () => window.clearTimeout(handle);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Buscar productos"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-8 sm:py-16">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-tg-primary">Buscar</span>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar búsqueda"
                className="text-tg-ink/60 transition-colors hover:text-tg-primary"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-tg-border bg-tg-offwhite px-5 py-4 transition-colors focus-within:border-tg-primary focus-within:bg-white">
              <SearchIcon className="h-5 w-5 shrink-0 text-tg-ink/40" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                placeholder="¿Qué estás buscando?"
                className="w-full bg-transparent font-display text-xl font-medium text-tg-ink placeholder:text-tg-muted focus:outline-none sm:text-3xl"
              />
            </div>

            <div className="mt-8 flex-1">
              {query.trim() === "" ? (
                <p className="text-sm text-tg-ink/45">Prueba con &ldquo;lámpara&rdquo;, &ldquo;mochila&rdquo; o &ldquo;segunda vuelta&rdquo;.</p>
              ) : results.length === 0 ? (
                <p className="text-sm text-tg-ink/45">No hemos encontrado resultados para &ldquo;{query}&rdquo;.</p>
              ) : (
                <ul className="divide-y divide-tg-lavender-soft">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/producto/${product.slug}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 py-4"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-tg-offwhite">
                          <Image
                            src={product.images[0].url}
                            alt={product.images[0].alt}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-tg-ink">{product.title}</p>
                          <p className="text-xs capitalize text-tg-ink/45">{product.category}</p>
                        </div>
                        <span className="text-sm font-semibold text-tg-ink">{formatPrice(product.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
