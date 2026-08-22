import Link from "next/link";
import { TugangaWordmark } from "@/components/ui/icons";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsPanel";
import { LEGAL_PAGES } from "@/lib/legal";

const FOOTER_LINKS = [
  {
    title: "Descubrir",
    links: [
      { label: "Nuevos", href: "/productos?filtro=nuevos" },
      { label: "Segunda vuelta", href: "/productos?filtro=segunda-vuelta" },
      { label: "Últimas oportunidades", href: "/productos?filtro=ultimas-oportunidades" },
      { label: "Categorías", href: "/categorias" },
    ],
  },
  {
    title: "Información",
    links: [
      { label: "Cómo funciona", href: "/legal/como-funciona" },
      { label: "Canales de compra", href: "/" },
      { label: "Contacto", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-tg-border bg-tg-offwhite">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center text-tg-primary">
              <TugangaWordmark className="h-6 w-auto" />
              <span className="sr-only">TU GANGA</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-tg-ink/60">
              Aquí encuentras cosas que realmente son una ganga. Descubrimiento, buenos precios y una
              segunda oportunidad para lo que todavía tiene mucho que ofrecer.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-tg-ink/40">{group.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-tg-ink/70 transition-colors hover:text-tg-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-tg-ink/40">Condiciones legales</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {LEGAL_PAGES.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="text-sm text-tg-ink/70 transition-colors hover:text-tg-primary">
                    {page.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="text-left text-sm text-tg-ink/70 transition-colors hover:text-tg-primary" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-tg-border pt-8 text-xs text-tg-muted sm:flex-row">
          <p>© {new Date().getFullYear()} TU GANGA. Todos los derechos reservados.</p>
          <p>Hecho en España.</p>
        </div>
      </div>
    </footer>
  );
}
