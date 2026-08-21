"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { ProductBadge, primaryStatus } from "@/components/product/ProductBadge";
import { ProductPrice } from "@/components/product/ProductPrice";
import { FavoriteToggle } from "@/components/product/FavoriteToggle";
import { ArrowIcon } from "@/components/ui/icons";

export function ProductCard({ product }: { product: Product }) {
  const badge = primaryStatus(product.status);
  const [primaryImage, secondaryImage] = product.images;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-tg-border bg-white transition-[border-color,box-shadow] duration-200 hover:border-tg-lavender hover:shadow-card">
      <Link
        href={`/producto/${product.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Ver ${product.title}`}
      >
        <span className="sr-only">{product.title}</span>
      </Link>

      <div className="relative aspect-square overflow-hidden bg-tg-offwhite">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 33vw, 50vw"
        />
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 33vw, 50vw"
          />
        )}
        {badge && <ProductBadge status={badge} className="absolute left-4 top-4" />}
        <FavoriteToggle product={product} className="absolute right-3 top-3 z-20" />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wide text-tg-ink/40">
          {product.category}
        </span>
        <h3 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-tg-ink transition-colors group-hover:text-tg-primary">
          {product.title}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1.5">
          <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} />
          <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-tg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:inline-flex">
            Ver ganga
            <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
