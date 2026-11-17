import { CheckIcon, ExternalLinkIcon, SearchIcon } from "@/components/ui/icons";

const STEPS = [
  {
    icon: SearchIcon,
    title: "Descubre",
    text: "Explora productos de distintas categorías.",
  },
  {
    icon: CheckIcon,
    title: "Compara",
    text: "Revisa precio, estado y detalles antes de decidir.",
  },
  {
    icon: ExternalLinkIcon,
    title: "Consíguelo",
    text: "Continúa directamente en Wallapop, Vinted o WhatsApp.",
  },
] as const;

export function BrandIntro() {
  return (
    <section
      aria-label="Cómo funciona TU GANGA"
      className="mx-auto max-w-7xl px-5 pb-4 pt-12 sm:px-8 sm:pb-5 sm:pt-14"
    >
      <p className="max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight text-tg-ink sm:text-3xl">
        Encuentra, compara{" "}
        <span className="text-tg-primary">y llévatelo.</span>
      </p>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-tg-muted sm:text-base">
        Descubre la ganga, revisa sus detalles y continúa en Wallapop, Vinted o WhatsApp.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.title}
            className="flex items-start gap-3 rounded-card border border-tg-border bg-tg-offwhite px-4 py-3.5 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-tg-lavender hover:bg-white motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tg-lavender-soft text-tg-primary">
              <step.icon className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-display text-sm font-bold tracking-tight text-tg-ink">
                {step.title}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-tg-muted">
                {step.text}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
