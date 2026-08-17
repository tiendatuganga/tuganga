"use client";

import { useState, type MouseEvent } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: "primary" | "compact";
  className?: string;
}

export function AddToCartButton({ product, quantity = 1, variant = "primary", className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const outOfStock = product.inventory <= 0;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // Las cards de producto envuelven este botón en un <Link>; evitamos que el
    // click de "añadir" también dispare la navegación a la página del producto.
    event.preventDefault();
    event.stopPropagation();
    if (outOfStock) return;
    addItem(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={outOfStock}
        className={cn(
          "w-full rounded-full bg-white/95 px-4 py-2.5 text-xs font-semibold text-tg-ink shadow-md transition-colors hover:bg-tg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
      >
        {outOfStock ? "Agotado" : justAdded ? "Añadido" : "Añadir al carrito"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={outOfStock}
      className={cn(
        "inline-flex w-full items-center justify-center rounded-full bg-tg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-tg-deep disabled:cursor-not-allowed disabled:bg-tg-ink/20",
        className
      )}
    >
      {outOfStock ? "Sin stock" : justAdded ? "Añadido al carrito" : "Añadir al carrito"}
    </button>
  );
}
