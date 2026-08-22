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
    <article className="group relative flex h-full flex-col">
      <Link
        href={`/producto/${product.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Ver ${product.title}`}
      >
        <span className="sr-only">{product.title}</span>
      </Link>

      <div className="relative aspect-square overflow-hidden rounded-card bg-tg-offwhite">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 33vw, 50vw"
        />
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 33vw, 50vw"
          />
        )}
        {badge && <ProductBadge status={badge} className="absolute left-3 top-3" />}
        <FavoriteToggle product={product} className="absolute right-2.5 top-2.5 z-20" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 z-10 hidden translate-y-1 items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-tg-primary opacity-0 shadow-soft backdrop-blur transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-opacity motion-reduce:group-hover:translate-y-0 lg:inline-flex"
        >
          Ver producto
          <ArrowIcon className="h-3 w-3" />
        </span>
      </div>

      <div className="flex flex-col pt-3">
        <span className="text-[11px] font-medium uppercase tracking-wide text-tg-ink/40">
          {product.category}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-tg-ink transition-colors duration-200 group-hover:text-tg-primary">
          {product.title}
        </h3>
        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          className="mt-3 text-xs"
        />
      </div>
    </article>
  );
}
