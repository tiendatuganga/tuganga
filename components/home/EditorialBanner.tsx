import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";

export function EditorialBanner() {
  return (
    <section className="relative overflow-hidden bg-tg-primary py-20 text-white">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          LAS BUENAS OPORTUNIDADES
          <br />
          NO DURAN PARA SIEMPRE.
        </h2>
        <Link
          href="/productos?filtro=ultimas-oportunidades"
          className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white"
        >
          Ver últimas oportunidades
          <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
