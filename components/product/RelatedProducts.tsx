import type { Product } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 sm:mt-24">
      <SectionHeading eyebrow="También te puede interesar" title="Productos relacionados" />
      <div className="mt-8">
        <ProductGrid products={products} columns={4} />
      </div>
    </section>
  );
}
