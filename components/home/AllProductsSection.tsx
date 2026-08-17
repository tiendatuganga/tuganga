import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types";

export function AllProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Catálogo completo"
        title="Todos los productos"
        description="Productos nuevos, segundas oportunidades y ofertas mezclados. Usa las píldoras para filtrar."
      />
      <div className="mt-10">
        <ProductGrid products={products} columns={5} />
      </div>
    </section>
  );
}