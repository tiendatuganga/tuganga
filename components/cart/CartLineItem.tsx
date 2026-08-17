"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { TrashIcon } from "@/components/ui/icons";
import type { CartLine } from "@/types";

export function CartLineItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeItem } = useCart();
  const image = line.product.images[0];

  return (
    <div className="flex gap-4 py-5">
      <Link
        href={`/producto/${line.product.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-tg-offwhite"
      >
        {image && <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="96px" />}
      </Link>
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/producto/${line.product.slug}`}
              className="text-sm font-medium text-tg-ink hover:text-tg-primary"
            >
              {line.product.title}
            </Link>
            <p className="mt-1 text-xs capitalize text-tg-ink/45">{line.product.category}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            aria-label={`Eliminar ${line.product.title} del carrito`}
            className="text-tg-ink/40 transition-colors hover:text-tg-primary"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={line.quantity}
            onChange={(value) => updateQuantity(line.id, value)}
            max={Math.max(1, line.product.inventory)}
          />
          <span className="text-sm font-semibold text-tg-ink">
            {formatPrice(line.product.price * line.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
