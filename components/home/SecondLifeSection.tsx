import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ArrowIcon, LoopIcon } from "@/components/ui/icons";
import type { Product } from "@/types";

export function SecondLifeSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-tg-lavender-soft py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-tg-deep">
              <LoopIcon className="h-3.5 w-3.5" />
              Segunda vuelta
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-tg-ink sm:text-4xl">
              Una segunda oportunidad para productos
              <br className="hidden sm:block" /> que todavía tienen mucho que ofrecer.
            </h2>
          </div>
          <Link
            href="/productos?filtro=segunda-vuelta"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-tg-deep"
          >
            Ver todos
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} columns={4} />
        </div>
      </div>
    </section>
  );
}
