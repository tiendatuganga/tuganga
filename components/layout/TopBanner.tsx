import Link from "next/link";
import { BoltIcon } from "@/components/ui/icons";

export function TopBanner() {
  return (
    <div className="bg-tg-dark text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center sm:px-8">
        <p className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/85 sm:text-sm">
          <BoltIcon className="h-3.5 w-3.5 shrink-0 text-tg-lavender" aria-hidden="true" />
          Nuevas gangas cada semana. Las buenas vuelan.
        </p>
        <Link
          href="/productos?filtro=nuevos"
          className="group inline-flex items-center gap-1 text-xs font-semibold text-tg-lavender transition-colors hover:text-white sm:text-sm"
        >
          Ver las nuevas
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
