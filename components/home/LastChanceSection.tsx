import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ArrowIcon, BoltIcon } from "@/components/ui/icons";
import type { Product } from "@/types";

export function LastChanceSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-tg-dark py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              <BoltIcon className="h-3.5 w-3.5" />
              Últimas oportunidades
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Quedan pocas unidades
            </h2>
            <p className="mt-3 text-sm text-white/55">Cuando se acaban, se acaban. No vuelven.</p>
          </div>
          <Link
            href="/productos?filtro=ultimas-oportunidades"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white"
          >
            Ver todas
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-10 rounded-3xl bg-tg-offwhite p-6 sm:p-8">
          <ProductGrid products={products} columns={4} />
        </div>
      </div>
    </section>
  );
}
