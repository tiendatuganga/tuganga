"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BoltIcon, WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function NewsletterSection() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
  }

  return (
    <section className="mx-auto max-w-4xl px-5 pt-5 pb-16 text-center sm:px-8 sm:pt-6 sm:pb-24">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-tg-lavender/50 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-tg-primary">
          <BoltIcon className="h-3.5 w-3.5" />
          Se agotan rápido
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-tg-ink sm:text-4xl">
          Las buenas gangas vuelan.
        </h2>
        <p className="mt-3 text-base text-tg-ink/60">
          Recibe las nuevas oportunidades antes de que desaparezcan.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-md flex-col gap-4">
        <a
          href={buildWhatsAppLink("¡Hola! Quiero recibir las nuevas gangas de TU GANGA por WhatsApp.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-whatsapp-strong"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Recibir gangas por WhatsApp
        </a>

        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-tg-lavender" />
          <span className="text-xs uppercase tracking-wider text-tg-ink/40">o por email</span>
          <span className="h-px flex-1 bg-tg-lavender" />
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.p
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-full bg-tg-lavender-soft px-5 py-3.5 text-sm font-semibold text-tg-primary"
            >
              ¡Listo! Te avisamos en cuanto entre algo bueno.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                required
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-full border border-tg-border bg-white px-5 py-3 text-sm text-tg-ink placeholder:text-tg-muted focus:border-tg-primary focus:outline-none"
              />
              <Button type="submit" variant="secondary">
                Avisarme
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-xs text-tg-ink/40">Sin spam. Solo cuando entra algo que merece la pena.</p>
      </div>
    </section>
  );
}
