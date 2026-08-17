"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { Button } from "@/components/ui/Button";
import { CloseIcon, CartIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            key="cart-overlay"
            className="fixed inset-0 z-50 bg-tg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
          />
          <motion.aside
            key="cart-drawer"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compra"
          >
            <div className="flex items-center justify-between border-b border-tg-lavender-soft px-6 py-5">
              <h2 className="font-display text-lg font-semibold text-tg-ink">
                Tu carrito {cart.totalQuantity > 0 && `(${cart.totalQuantity})`}
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Cerrar carrito"
                className="text-tg-ink/60 transition-colors hover:text-tg-primary"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {cart.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <CartIcon className="h-10 w-10 text-tg-lavender" />
                <p className="text-sm text-tg-ink/60">Tu carrito está vacío todavía.</p>
                <Button href="/productos" onClick={closeDrawer} size="sm">
                  Descubrir productos
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 divide-y divide-tg-lavender-soft overflow-y-auto px-6">
                  {cart.lines.map((line) => (
                    <CartLineItem key={line.id} line={line} />
                  ))}
                </div>
                <div className="border-t border-tg-lavender-soft px-6 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-tg-ink/60">Subtotal</span>
                    <span className="text-base font-semibold text-tg-ink">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <Button href="/carrito" onClick={closeDrawer} className="w-full">
                    Finalizar compra
                  </Button>
                  <p className="mt-3 text-center text-xs text-tg-ink/40">
                    Envío e impuestos calculados en el siguiente paso.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
