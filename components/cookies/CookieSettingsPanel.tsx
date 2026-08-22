"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/components/ui/icons";
import { useCookieConsent, type CookiePreferences } from "@/context/CookieConsentContext";

function Switch({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-tg-primary" : "bg-tg-lavender"
      } ${disabled ? "cursor-not-allowed opacity-60" : "hover:bg-tg-deep"} motion-reduce:transition-none`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-[1.375rem]" : "translate-x-0.5"
        } motion-reduce:transition-none`}
      />
    </button>
  );
}

export function CookieSettingsPanel() {
  const { isPanelOpen, closePanel, savePreferences, preferences, hasStoredConsent } = useCookieConsent();

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Cerrar configuración de cookies"
            onClick={closePanel}
            className="absolute inset-0 bg-tg-ink/45 backdrop-blur-[2px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-panel-heading"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-tg-border bg-white shadow-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <PanelBody
              key="cookie-panel-body"
              preferences={preferences}
              hasStoredConsent={hasStoredConsent}
              onClose={closePanel}
              onSave={savePreferences}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PanelBody({
  preferences,
  hasStoredConsent,
  onClose,
  onSave,
}: {
  preferences: CookiePreferences;
  hasStoredConsent: boolean;
  onClose: () => void;
  onSave: (next: CookiePreferences) => void;
}) {
  const [draft, setDraft] = useState<CookiePreferences>(preferences);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div>
            <div className="flex items-start justify-between gap-4 border-b border-tg-border px-6 py-5">
              <div>
                <h2 id="cookie-panel-heading" className="font-display text-lg font-bold tracking-tight text-tg-ink">
                  Configuración de cookies
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-tg-muted">
                  Ahora mismo TU GANGA no utiliza cookies de analítica ni marketing.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="-mr-1 rounded-full p-1.5 text-tg-ink/60 transition-colors hover:bg-tg-lavender-soft hover:text-tg-primary"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-5 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-tg-ink">Técnicas y necesarias</p>
                  <p className="mt-1 text-xs leading-relaxed text-tg-muted">
                    Imprescindibles para que la web funcione (por ejemplo, recordar tus favoritos). Siempre activas.
                  </p>
                </div>
                <Switch checked onChange={() => {}} disabled label="Cookies técnicas (siempre activas)" />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-tg-ink">Analítica</p>
                  <p className="mt-1 text-xs leading-relaxed text-tg-muted">
                    No se utilizan actualmente. Si en el futuro se añaden, solo se activarán con tu consentimiento.
                  </p>
                </div>
                <Switch
                  checked={draft.analytics}
                  onChange={(analytics) => setDraft((prev) => ({ ...prev, analytics }))}
                  label="Cookies analíticas"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-tg-ink">Marketing</p>
                  <p className="mt-1 text-xs leading-relaxed text-tg-muted">
                    No se utilizan actualmente. Categoría preparada por si se añaden en el futuro.
                  </p>
                </div>
                <Switch
                  checked={draft.marketing}
                  onChange={(marketing) => setDraft((prev) => ({ ...prev, marketing }))}
                  label="Cookies de marketing"
                />
              </div>

              {!hasStoredConsent && (
                <p className="rounded-xl bg-tg-offwhite px-4 py-3 text-xs leading-relaxed text-tg-muted">
                  Puedes cambiar tu elección en cualquier momento desde el enlace «Configuración de cookies» del pie
                  de página.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-tg-border px-6 py-4 sm:flex-row-reverse sm:items-center">
              <button
                type="button"
                onClick={() => onSave(draft)}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-tg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-tg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tg-primary"
              >
                Guardar preferencias
              </button>
              <Link
                href="/legal/cookies"
                onClick={onClose}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold text-tg-ink/70 transition-colors hover:bg-tg-lavender-soft hover:text-tg-primary"
              >
                Política de cookies
              </Link>
            </div>
    </div>
  );
}

/** Botón reutilizable que abre el panel de configuración de cookies. */
export function CookieSettingsButton({
  className = "",
  children = "Configuración de cookies",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openPanel } = useCookieConsent();
  return (
    <button type="button" onClick={openPanel} className={className}>
      {children}
    </button>
  );
}
