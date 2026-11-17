"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, IsotipoTG, WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleSend() {
    const text = message.trim();
    if (!text) return;
    window.open(buildWhatsAppLink(text), "_blank", "noopener,noreferrer");
    setMessage("");
    setOpen(false);
  }

  return (
    <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-label="Chat de WhatsApp con TU GANGA"
            className="w-[min(20rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-2xl border border-tg-border bg-white shadow-card"
          >
            <div className="flex items-center gap-3 bg-whatsapp px-4 py-3 text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <IsotipoTG className="h-[18px] w-auto text-tg-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">TU GANGA</p>
                <p className="truncate text-xs text-white/80">Te respondemos por WhatsApp</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
                className="-mr-1 rounded-full p-1.5 transition-colors hover:bg-white/15"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <label htmlFor="floating-whatsapp-message" className="sr-only">
                Mensaje
              </label>
              <textarea
                id="floating-whatsapp-message"
                autoFocus
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Escribe tu mensaje…"
                className="w-full resize-none rounded-xl border border-tg-border bg-tg-offwhite px-3.5 py-2.5 text-sm text-tg-ink placeholder:text-tg-muted focus:border-whatsapp focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!message.trim()}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-whatsapp-strong disabled:pointer-events-none disabled:opacity-40"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Enviar
              </button>
              <p className="mt-2 text-center text-xs text-tg-ink/45">
                Se abrirá WhatsApp con tu mensaje listo para enviar.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-card transition-colors duration-200 hover:bg-whatsapp-strong"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}
