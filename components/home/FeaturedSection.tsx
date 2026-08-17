import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types";

export function FeaturedSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Los favoritos"
        title="Productos destacados"
        description="La selección con mejor acogida en TU GANGA."
      />
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
