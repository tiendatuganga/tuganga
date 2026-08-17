import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-sm text-tg-ink/50">No hay productos disponibles todavía.</p>;
  }

  const gridColsClass = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 ${gridColsClass}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
