import Link from "next/link";
import { QUICK_PILLS } from "@/components/layout/nav-links";
import {
  ArrowIcon,
  BoltIcon,
  ChevronDownIcon,
  LoopIcon,
  SparkleIcon,
  StarIcon,
} from "@/components/ui/icons";
import { mockCategories } from "@/data/mock/categories";
import { cn } from "@/lib/utils";

const PILL_ICONS = {
  star: StarIcon,
  bolt: BoltIcon,
  loop: LoopIcon,
  sparkle: SparkleIcon,
} as const;

const PILL_GRADIENTS: Record<string, string> = {
  Destacados: "tg-pill-destacados border-amber-300",
  Ofertas: "tg-pill-ofertas border-purple-300",
  "Segunda vuelta": "tg-pill-segunda-vuelta border-orange-300",
  Nuevos: "tg-pill-nuevos border-emerald-300",
};

const pillBase =
  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-tg-deep shadow-[0_1px_2px_rgba(23,19,26,0.04)] transition-all duration-300 hover:scale-105 hover:ring-1 hover:ring-white/60";

export function SubNav() {
  return (
    <div className="bg-tg-offwhite">
      <div className="mx-auto hidden max-w-7xl items-center gap-5 px-5 py-7 sm:px-8 lg:flex">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-tg-ink/35">
          Explorar
        </span>
        <div className="group relative">
          <button
            type="button"
            aria-haspopup="true"
            className="tg-pill-ofertas inline-flex items-center gap-1.5 rounded-full border border-purple-300 px-4 py-2 text-sm font-semibold text-tg-deep shadow-[0_1px_2px_rgba(23,19,26,0.04)] transition-all duration-300 hover:scale-105 hover:ring-1 hover:ring-white/60"
          >
            Categorías
            <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
          </button>

          <div className="invisible absolute left-0 top-full z-30 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <div className="w-64 rounded-2xl border border-tg-lavender-soft bg-white p-2 shadow-xl shadow-tg-primary/10">
              {mockCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categoria/${category.slug}`}
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

        <div className="flex items-center gap-2.5">
          {QUICK_PILLS.map((pill) => {
            const Icon = PILL_ICONS[pill.icon];
            return (
              <Link
                key={pill.label}
                href={pill.href}
                className={cn(pillBase, PILL_GRADIENTS[pill.label])}
              >
                <Icon className={cn("h-4 w-4", pill.iconClass)} />
                {pill.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto px-5 py-5 sm:px-8 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {QUICK_PILLS.map((pill) => {
          const Icon = PILL_ICONS[pill.icon];
          return (
            <Link
              key={pill.label}
              href={pill.href}
              className={cn(pillBase, PILL_GRADIENTS[pill.label], "shrink-0 whitespace-nowrap")}
            >
              <Icon className={cn("h-4 w-4", pill.iconClass)} />
              {pill.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}