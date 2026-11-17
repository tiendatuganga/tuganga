"use client";

import type { Product } from "@/types";
import { useFavorites } from "@/context/FavoritesContext";
import { HeartIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface FavoriteToggleProps {
  product: Product;
  className?: string;
}

export function FavoriteToggle({ product, className }: FavoriteToggleProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const active = isFavorite(product.id);

  return (
    <button
      type="button"
      aria-label={active ? "Quitar de favoritos" : "Añadir a favoritos"}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void toggleFavorite(product);
      }}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-tg-border bg-white text-tg-ink/60 shadow-soft transition-colors duration-200 hover:border-tg-lavender hover:text-tg-primary",
        active && "text-tg-primary",
        className
      )}
    >
      <HeartIcon className={cn("h-5 w-5", active && "fill-current")} />
    </button>
  );
}
