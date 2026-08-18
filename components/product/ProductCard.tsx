import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { ProductBadge, primaryStatus } from "@/components/product/ProductBadge";
import { ProductPrice } from "@/components/product/ProductPrice";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { FavoriteToggle } from "@/components/product/FavoriteToggle";

export function ProductCard({ product }: { product: Product }) {
  const badge = primaryStatus(product.status);
  const [primaryImage, secondaryImage] = product.images;

  return (
    <div className="group flex flex-col">
      <Link
        href={`/producto/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-2xl bg-tg-offwhite"
      >
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
        <FavoriteToggle product={product} className="absolute right-3 top-3" />
        <div className="absolute bottom-3 right-3 translate-y-1 scale-75 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <AddToCartButton product={product} variant="floating" />
        </div>
      </Link>
      <div className="mt-4 flex flex-col gap-1">
        <span className="text-[11px] font-medium uppercase tracking-wide text-tg-ink/40">{product.category}</span>
        <Link
          href={`/producto/${product.slug}`}
          className="text-sm font-medium text-tg-ink transition-colors hover:text-tg-primary"
        >
          {product.title}
        </Link>
        <div className="mt-1 min-h-7">
          <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
      </div>
    </div>
  );
}
