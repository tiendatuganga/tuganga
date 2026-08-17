"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, MonogramTG } from "@/components/ui/icons";
import { NAV_LINKS } from "@/components/layout/nav-links";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-white px-6 py-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="flex items-center justify-between">
            <Link href="/" onClick={onClose} className="flex items-center gap-2 text-tg-ink">
              <MonogramTG className="h-6 w-6 text-tg-primary" />
              <span className="font-display text-lg font-bold tracking-tight">TU GANGA</span>
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
          <nav className="mt-12 flex flex-col">
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
