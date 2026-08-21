import { buildWhatsAppLink } from "@/lib/whatsapp";
import { InstagramIcon, MailIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@tuganga",
    href: "https://www.instagram.com/tuganga",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    handle: "@tuganga",
    href: "https://www.tiktok.com/@tuganga",
    icon: TikTokIcon,
  },
] as const;

export function ContactSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20" aria-labelledby="contact-heading">
      <div className="rounded-panel border border-tg-border bg-white p-7 sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-tg-primary">
            Contacto
          </span>
          <h2 id="contact-heading" className="mt-1.5 font-display text-2xl font-bold tracking-tight text-tg-ink sm:text-3xl">
            Hablemos
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-tg-muted">
            ¿Dudas sobre un producto? ¿Buscas algo concreto? Escríbenos y te respondemos en el día.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={buildWhatsAppLink("¡Hola! Tengo una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-card border border-tg-border bg-tg-offwhite px-4 py-4 transition-colors duration-200 hover:border-whatsapp hover:bg-whatsapp/5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-tg-ink">WhatsApp</span>
              <span className="block text-xs text-tg-muted">Respuesta rápida</span>
            </span>
          </a>

          <a
            href="mailto:hola@tuganga.es"
            className="flex items-center gap-3 rounded-card border border-tg-border bg-tg-offwhite px-4 py-4 transition-colors duration-200 hover:border-tg-primary hover:bg-tg-lavender-soft"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tg-primary text-white">
              <MailIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-tg-ink">Email</span>
              <span className="block text-xs text-tg-muted">hola@tuganga.es</span>
            </span>
          </a>

          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-card border border-tg-border bg-tg-offwhite px-4 py-4 transition-colors duration-200 hover:border-tg-primary hover:bg-tg-lavender-soft"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tg-primary text-white">
                <social.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-tg-ink">{social.label}</span>
                <span className="block text-xs text-tg-muted">{social.handle}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
