import Link from "next/link";
import { LEGAL_PAGES } from "@/lib/legal";

export interface LegalTocItem {
  id: string;
  label: string;
}

interface LegalPageProps {
  title: string;
  intro?: string;
  updatedAt: string;
  toc: LegalTocItem[];
  children: React.ReactNode;
}

interface LegalSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function LegalPage({ title, intro, updatedAt, toc, children }: LegalPageProps) {
  return (
    <div className="bg-tg-offwhite">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <aside className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-10">
            <nav aria-label="Secciones de esta página">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-tg-ink/40">
                En esta página
              </h2>
              <ul className="mt-4 flex flex-col border-l border-tg-border">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-tg-ink/60 transition-colors hover:border-tg-primary hover:text-tg-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Condiciones legales">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-tg-ink/40">
                Condiciones legales
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {LEGAL_PAGES.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-sm leading-snug text-tg-ink/60 transition-colors hover:text-tg-primary"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <article className="legal-prose min-w-0 max-w-[44rem]">
          <header>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-tg-primary">
              Condiciones legales
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-tg-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-tg-muted">
              Última actualización: {updatedAt}
            </p>
            {intro && (
              <p className="mt-6 border-l-2 border-tg-lavender pl-5 text-base font-medium leading-relaxed text-tg-ink/80">
                {intro}
              </p>
            )}
          </header>

          <div className="mt-10">{children}</div>
        </article>
      </div>
    </div>
  );
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2 id={`${id}-heading`}>{title}</h2>
      {children}
    </section>
  );
}
