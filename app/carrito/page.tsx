"use client";

import { useCart } from "@/context/CartContext";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { Button } from "@/components/ui/Button";
import { CartIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils";

export default function CarritoPage() {
  const { cart, isLoading } = useCart();

  if (!isLoading && cart.lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-32 text-center">
        <CartIcon className="h-12 w-12 text-tg-lavender" />
        <h1 className="font-display text-2xl font-bold text-tg-ink">Tu carrito está vacío</h1>
        <p className="text-sm text-tg-ink/60">Todavía no has añadido ninguna ganga. Vamos a encontrar una.</p>
        <Button href="/productos">Descubrir productos</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <h1 className="font-display text-3xl font-bold text-tg-ink sm:text-4xl">Tu carrito</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="divide-y divide-tg-lavender-soft border-y border-tg-lavender-soft">
          {cart.lines.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}
        </div>

        <aside className="h-fit rounded-2xl bg-tg-offwhite p-6">
          <h2 className="font-display text-lg font-semibold text-tg-ink">Resumen</h2>
          <div className="mt-4 flex items-center justify-between text-sm text-tg-ink/70">
            <span>
              Subtotal ({cart.totalQuantity} {cart.totalQuantity === 1 ? "artículo" : "artículos"})
            </span>
            <span className="font-semibold text-tg-ink">{formatPrice(cart.subtotal)}</span>
          </div>
          <Button disabled className="mt-6 w-full">
            Finalizar compra
          </Button>
          <p className="mt-3 text-xs text-tg-ink/45">
            El pago se gestionará a través de Shopify en cuanto la tienda esté conectada.
          </p>
        </aside>
      </div>
    </div>
  );
}
