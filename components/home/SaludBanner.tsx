import Link from "next/link";
import { ArrowIcon, HeartIcon } from "@/components/ui/icons";

export function SaludBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/salud"
        className="group flex flex-col gap-6 rounded-panel border border-health-border bg-health-soft p-7 transition-[border-color,box-shadow] duration-200 hover:border-health hover:shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-10"
      >
        <div className="flex items-start gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-health text-white">
            <HeartIcon className="h-6 w-6" />
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-health">
              Vertical Salud
            </span>
            <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-health-strong sm:text-3xl">
              Bienestar revisado a mano
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-health-strong/70">
              Presoterapia, fototerapia y estética revisadas pieza a pieza. Stock limitado, precios
              de outlet.
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-health">
          Explorar Salud
          <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
}
