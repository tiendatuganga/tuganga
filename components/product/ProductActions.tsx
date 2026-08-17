"use client";

import { useState } from "react";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import type { Product } from "@/types";

export function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <QuantitySelector quantity={quantity} onChange={setQuantity} max={Math.max(1, product.inventory)} />
      <AddToCartButton product={product} quantity={quantity} className="sm:flex-1" />
    </div>
  );
}
