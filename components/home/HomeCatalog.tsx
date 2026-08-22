"use client";

import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  ArrowIcon,
  BoltIcon,
  ChevronDownIcon,
  GridIcon,
  LoopIcon,
  SparkleIcon,
} from "@/components/ui/icons";
import { mockCategories } from "@/data/mock/categories";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type CatalogFilter = "todos" | "nuevos" | "ofertas" | "segunda-vuelta";

interface FilterPill {
  key: CatalogFilter;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  inactive: string;
  active: string;
}

const FILTERS: FilterPill[] = [
  {
    key: "todos",
    label: "Todos",
    Icon: GridIcon,
    inactive: "tg-nav-pill",
    active: "border-tg-primary bg-tg-primary text-white",
  },
  {
    key: "nuevos",
    label: "Nuevos",
    Icon: SparkleIcon,
    inactive: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-100",
    active: "border-emerald-600 bg-emerald-600 text-white",
  },
  {
    key: "ofertas",
    label: "Ofertas",
    Icon: BoltIcon,
    inactive: "border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100",
    active: "border-red-600 bg-red-600 text-white",
  },
  {
    key: "segunda-vuelta",
    label: "Segunda vuelta",
    Icon: LoopIcon,
    inactive: "border-orange-200 bg-orange-50 text-orange-800 hover:border-orange-300 hover:bg-orange-100",
    active: "border-orange-500 bg-orange-500 text-white",
  },
];

const FILTER_META: Record<CatalogFilter, { title: string; description: string }> = {
  todos: {
    title: "Todas las gangas",
    description: "Novedades, ofertas y segunda vuelta mezcladas. Usa las píldoras para filtrar.",
  },
  nuevos: {
    title: "Nuevos",
    description: "Lo último que ha entrado en TU GANGA, seleccionado esta semana.",
  },
  ofertas: {
    title: "Ofertas",
    description: "Gangas con descuento directo. Cuando vuelan, vuelan.",
  },
  "segunda-vuelta": {
    title: "Segunda vuelta",
    description: "Productos revisados que todavía tienen mucho que ofrecer.",
  },
};

const pillBase =
  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-soft transition-colors duration-200";

export function HomeCatalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<CatalogFilter>("todos");

  const visible = useMemo(() => {
    switch (filter) {
      case "nuevos":
        return products.filter((product) => product.status.includes("NEW"));
      case "ofertas":
        return products.filter((product) => product.status.includes("SALE"));
      case "segunda-vuelta":
        return products.filter((product) => product.secondLife || product.status.includes("SECOND_LIFE"));
      default:
        return products;
    }
  }, [products, filter]);

  const meta = FILTER_META[filter];
  const columns = visible.length === 2 ? 2 : 5;

  function renderPills(className?: string) {
    return (
      <div role="group" aria-label="Filtrar catálogo" className={cn("flex items-center gap-2.5", className)}>
        {FILTERS.map(({ key, label, Icon, inactive, active }) => {
          const isActive = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={isActive}
              className={cn(pillBase, isActive ? active : inactive, "shrink-0 whitespace-nowrap")}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="bg-tg-offwhite">
        <div className="mx-auto hidden max-w-7xl items-center gap-5 px-5 py-6 sm:px-8 lg:flex">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-tg-ink/35">Explorar</span>

          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className="tg-nav-pill inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold shadow-soft transition-colors duration-200"
            >
              Categorías
              <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </button>

            <div className="invisible absolute left-0 top-full z-30 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-64 rounded-2xl border border-tg-border bg-white p-2 shadow-card">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.slug === "salud" ? "/salud" : `/categoria/${category.slug}`}
                    className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-tg-ink/80 transition-colors hover:bg-tg-lavender-soft hover:text-tg-primary"
                  >
                    {category.title}
                    <ArrowIcon className="h-3.5 w-3.5 text-tg-ink/25 transition-colors group-hover/item:text-tg-primary" />
                  </Link>
                ))}
                <Link
                  href="/categorias"
                  className="mt-1 flex items-center justify-between rounded-xl border-t border-tg-lavender-soft px-3 py-2.5 text-sm font-semibold text-tg-primary transition-colors hover:bg-tg-lavender-soft"
                >
                  Ver todas las categorías
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {renderPills()}
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto px-5 py-5 sm:px-8 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {renderPills()}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-6 pt-10 sm:px-8 sm:pb-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-tg-ink sm:text-4xl">{meta.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-tg-muted">{meta.description}</p>
          </div>
          <span className="shrink-0 text-sm font-medium text-tg-ink/40">
            {visible.length} {visible.length === 1 ? "ganga" : "gangas"}
          </span>
        </div>

        <div className="mt-8 sm:mt-10">
          <ProductGrid products={visible} columns={columns} />
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/productos"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-tg-primary transition-colors duration-200 hover:text-tg-deep"
          >
            Ver más gangas
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </Link>
        </div>
      </section>
    </>
  );
}
