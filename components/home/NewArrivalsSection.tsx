import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types";

export function NewArrivalsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Recién llegados"
        title="Nuevos"
        description="Lo último que ha entrado en TU GANGA, seleccionado esta semana."
        action={{ label: "Ver todos", href: "/productos?filtro=nuevos" }}
      />
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
