import { cn, discountPercent, formatPrice } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses: Record<NonNullable<ProductPriceProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl sm:text-3xl",
};

export function ProductPrice({ price, compareAtPrice, size = "md", className }: ProductPriceProps) {
  const discount = discountPercent(price, compareAtPrice);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className={cn("font-bold text-tg-ink", sizeClasses[size])}>{formatPrice(price)}</span>
      {discount && (
        <>
          <span className="text-tg-ink/35 line-through">{formatPrice(compareAtPrice as number)}</span>
          <span className="rounded-full bg-tg-lavender-soft px-2 py-0.5 text-xs font-semibold text-tg-deep">
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}
