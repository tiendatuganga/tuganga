import Link from "next/link";
import { ArrowIcon, HeartIcon } from "@/components/ui/icons";

export function SaludBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-10 pb-12 sm:px-8 sm:pt-12 sm:pb-14">
      <Link
        href="/salud"
        className="group flex flex-col gap-6 rounded-panel bg-health p-7 shadow-card transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-health-strong motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:flex-row sm:items-center sm:justify-between sm:p-10"
      >
        <div className="flex items-start gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
            <HeartIcon className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Bienestar revisado a mano
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
              Presoterapia, fototerapia y estética revisadas pieza a pieza. Stock limitado, precios
              de outlet.
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white">
          Explorar Salud
          <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
}
