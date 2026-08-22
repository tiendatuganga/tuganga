import {
  ArrowIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

const SOCIALS = [
  {
    label: "Facebook",
    cta: "Síguenos",
    href: "https://www.facebook.com/tuganga",
    icon: FacebookIcon,
    logoClass: "text-[#1877f2]",
  },
  {
    label: "Instagram",
    cta: "Síguenos",
    href: "https://www.instagram.com/tuganga",
    icon: InstagramIcon,
    logoClass: "text-[#e1306c]",
  },
  {
    label: "YouTube",
    cta: "Suscríbete",
    href: "https://www.youtube.com/@tuganga",
    icon: YoutubeIcon,
    logoClass: "text-[#ff0000]",
  },
  {
    label: "TikTok",
    cta: "Síguenos",
    href: "https://www.tiktok.com/@tuganga",
    icon: TikTokIcon,
    logoClass: "text-tg-ink [filter:drop-shadow(1px_1px_0_#25f4ee)_drop-shadow(-1px_-1px_0_#fe2c55)]",
  },
] as const;

export function ContactSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-6 pb-12 sm:px-8 sm:pt-8 sm:pb-14" aria-labelledby="social-heading">
      <div className="mb-7 max-w-2xl sm:mb-8">
        <h2 id="social-heading" className="font-display text-2xl font-bold tracking-tight text-tg-ink sm:text-3xl">
          La próxima ganga puede aparecer aquí.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-tg-muted sm:text-base">
          Nuevos productos, oportunidades y novedades en nuestras redes.
        </p>
      </div>

      <div className="grid grid-cols-2 border-y border-tg-border sm:grid-cols-4 sm:divide-x sm:divide-tg-border">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 border-tg-border px-4 py-8 text-center max-sm:odd:border-r max-sm:[&:nth-child(-n+2)]:border-b sm:py-9"
          >
            <social.icon
              className={`h-11 w-11 sm:h-13 sm:w-13 ${social.logoClass}`}
            />
            <span>
              <span className="block font-display text-xs font-bold uppercase tracking-[0.16em] text-tg-ink sm:text-sm">
                {social.label}
              </span>
              <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-tg-muted transition-colors duration-200 group-hover:text-tg-primary">
                {social.cta}
                <ArrowIcon className="h-3 w-3 -rotate-45 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
