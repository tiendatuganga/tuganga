"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Cart, Product } from "@/types";
import { cartService } from "@/lib/services/cart-service";

interface CartContextValue {
  cart: Cart;
  isDrawerOpen: boolean;
  isLoading: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const EMPTY_CART: Cart = { lines: [], subtotal: 0, totalQuantity: 0 };

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    cartService.getCart().then((initialCart) => {
      setCart(initialCart);
      setLoading(false);
    });
  }, []);

  const addItem = useCallback(async (product: Product, quantity = 1) => {
    const nextCart = await cartService.addLine(product, quantity);
    setCart(nextCart);
    setDrawerOpen(true);
  }, []);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    const nextCart = await cartService.updateLineQuantity(lineId, quantity);
    setCart(nextCart);
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    const nextCart = await cartService.removeLine(lineId);
    setCart(nextCart);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isDrawerOpen,
      isLoading,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem,
      updateQuantity,
      removeItem,
    }),
    [cart, isDrawerOpen, isLoading, addItem, updateQuantity, removeItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
