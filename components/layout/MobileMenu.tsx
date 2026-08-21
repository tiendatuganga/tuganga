"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, BoltIcon, LoopIcon, SparkleIcon } from "@/components/ui/icons";
import { NAV_LINKS, PRIMARY_NAV, QUICK_PILLS } from "@/components/layout/nav-links";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const PILL_ICONS = {
  bolt: BoltIcon,
  loop: LoopIcon,
  sparkle: SparkleIcon,
} as const;

const sectionLabel = "text-xs font-semibold uppercase tracking-[0.2em] text-tg-primary";

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white px-6 py-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="flex items-center justify-between">
            <Link href="/" onClick={onClose} aria-label="TU GANGA — Inicio">
              <Image
                src="/logo.png"
                alt="TU GANGA"
                width={4284}
                height={678}
                priority
                className="h-5 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="text-tg-ink/60 transition-colors hover:text-tg-primary"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <p className={cn(sectionLabel, "mt-10")}>Explora</p>
          <nav className="mt-3 flex flex-col">
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="border-b border-tg-lavender-soft py-4 font-display text-2xl font-semibold text-tg-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className={cn(sectionLabel, "mt-8")}>Lo más buscado</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_PILLS.map((pill) => {
              const Icon = PILL_ICONS[pill.icon];
              return (
                <Link
                  key={pill.label}
                  href={pill.href}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-full border border-tg-lavender/40 bg-white px-3.5 py-1.5 text-xs font-semibold text-tg-deep transition-colors hover:border-tg-lavender hover:bg-tg-lavender-soft"
                >
                  <Icon className={cn("h-3.5 w-3.5", pill.iconClass)} />
                  {pill.label}
                </Link>
              );
            })}
          </div>

          <p className={cn(sectionLabel, "mt-8")}>Colecciones</p>
          <nav className="mt-3 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="border-b border-tg-lavender-soft py-4 font-display text-2xl font-semibold text-tg-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
