"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Product } from "@/types";
import { favoritesService } from "@/lib/services/favorites-service";
import { productService } from "@/lib/services/product-service";

interface FavoritesContextValue {
  products: Product[];
  favoriteCount: number;
  isFavorite: (productId: string) => boolean;
  isDrawerOpen: boolean;
  isLoading: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleFavorite: (product: Product) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const catalogRef = useRef<Product[]>([]);

  const resolveProducts = useCallback((ids: string[]): Product[] => {
    const byId = new Map(catalogRef.current.map((product) => [product.id, product]));
    return ids.map((id) => byId.get(id)).filter((product): product is Product => Boolean(product));
  }, []);

  useEffect(() => {
    Promise.all([productService.getAllProducts(), favoritesService.getIds()]).then(([all, ids]) => {
      catalogRef.current = all;
      setProductIds(ids);
      setProducts(resolveProducts(ids));
      setLoading(false);
    });
  }, [resolveProducts]);

  const isFavorite = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds]
  );

  const toggleFavorite = useCallback(
    async (product: Product) => {
      const nextIds = await favoritesService.toggle(product.id);
      setProductIds(nextIds);
      setProducts(resolveProducts(nextIds));
    },
    [resolveProducts]
  );

  const removeFavorite = useCallback(
    async (productId: string) => {
      const nextIds = await favoritesService.remove(productId);
      setProductIds(nextIds);
      setProducts(resolveProducts(nextIds));
    },
    [resolveProducts]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      products,
      favoriteCount: productIds.length,
      isFavorite,
      isDrawerOpen,
      isLoading,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      toggleFavorite,
      removeFavorite,
    }),
    [products, productIds, isFavorite, isDrawerOpen, isLoading, toggleFavorite, removeFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
}