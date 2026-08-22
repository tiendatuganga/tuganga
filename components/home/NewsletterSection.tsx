"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowIcon, IsotipoTG } from "@/components/ui/icons";

export function NewsletterSection() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden bg-gradient-to-br from-tg-primary to-tg-deep"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-44 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.13),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-24 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(198,174,202,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-11 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            <IsotipoTG className="h-3.5 w-auto" />
            Promo exclusiva
          </span>
          <h2 id="newsletter-heading" className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Las buenas gangas vuelan.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
            Registra tu correo y consigue envío gratis en nuestros productos de Wallapop.
          </p>
        </div>

        <div>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-full bg-white/15 px-5 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/30"
              >
                ¡Listo! Tu envío gratis en Wallapop va camino a tu bandeja de entrada.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onSubmit={handleSubmit}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="newsletter-email"
                    required
                    type="email"
                    placeholder="tu@email.com"
                    className="h-12 w-full rounded-full border-0 bg-white px-5 text-sm text-tg-ink placeholder:text-tg-muted focus:outline-none focus:ring-4 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-sm font-semibold text-tg-primary shadow-card transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    Conseguir envío gratis
                    <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-3.5 text-xs text-white/60">Sin spam · Date de baja cuando quieras</p>
        </div>
      </div>
    </section>
  );
}
