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
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-tg-ink/60 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:text-tg-primary",
        active && "text-tg-primary",
        className
      )}
    >
      <HeartIcon className={cn("h-5 w-5", active && "fill-current")} />
    </button>
  );
}