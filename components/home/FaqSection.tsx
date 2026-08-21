"use client";

import { buildWhatsAppLink } from "@/lib/whatsapp";
import { ArrowIcon, ChevronDownIcon } from "@/components/ui/icons";

const FAQS = [
  {
    question: "¿Cómo compro un producto?",
    answer:
      "Escríbenos por WhatsApp desde la ficha del producto y cerramos la venta en el acto, o cómpralo directamente en Wallapop o Vinted y benefíciate de sus 48h de garantía.",
  },
  {
    question: "¿De dónde salen los productos?",
    answer:
      "Son devoluciones de Amazon y grandes superficies que recuperamos, probamos y publicamos a precio de outlet. Siempre te decimos el estado real de cada unidad.",
  },
  {
    question: "¿Qué significa que estén revisados?",
    answer:
      "Cada equipo se prueba uno a uno en Berja antes de publicarse. Si no funciona al 100%, no se vende. Por eso podemos garantizar que llega operativo.",
  },
  {
    question: "¿Hacéis envíos?",
    answer:
      "Sí. Puedes recogerlo en mano en Berja (Almería), quedarnos en Almería o Málaga capital, o recibirlo en casa con envío a toda España.",
  },
  {
    question: "¿Puedo probar el producto antes de pagarlo?",
    answer:
      "En la entrega en mano, sí: lo enciendes, lo pruebas y decides ahí mismo. Sin compromiso.",
  },
] as const;

export function FaqSection() {
  return (
    <section
      className="mx-auto max-w-7xl px-5 pt-5 pb-9 sm:px-8 sm:pt-6 sm:pb-11"
      aria-labelledby="faq-heading"
    >
      <div className="flex flex-col gap-y-10 rounded-panel border border-tg-lavender/40 bg-tg-lavender-soft p-6 sm:p-10 lg:grid lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] lg:items-start lg:gap-x-16 lg:gap-y-8">
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-tg-primary">
            Preguntas frecuentes
          </span>
          <h2 id="faq-heading" className="mt-1.5 font-display text-2xl font-bold tracking-tight text-tg-ink sm:text-3xl">
            ¿Te queda alguna duda?
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-tg-muted sm:text-base">
            Todo lo que necesitas saber antes de encontrar tu próxima ganga.
          </p>
        </div>

        <div className="order-3 border-t border-tg-lavender/60 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="divide-y divide-tg-lavender/60">
            {FAQS.map((faq, index) => (
              <details key={faq.question} className="group">
                <summary className="-mx-3 flex cursor-pointer list-none items-center gap-4 rounded-xl px-3 py-5 transition-colors duration-200 hover:bg-white/60 [&::-webkit-details-marker]:hidden">
                  <span className="w-7 shrink-0 font-display text-xs font-bold tabular-nums text-tg-primary/50 transition-colors duration-200 group-hover:text-tg-primary group-open:text-tg-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-tg-ink transition-colors duration-200 group-hover:text-tg-primary sm:text-base">
                    {faq.question}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-tg-primary shadow-soft transition-colors duration-200 group-hover:bg-tg-primary/10 group-open:bg-tg-primary group-open:text-white">
                    <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
                  </span>
                </summary>
                <p className="faq-answer pb-5 pl-11 pr-9 text-sm leading-relaxed text-tg-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <a
            href={buildWhatsAppLink("¡Hola! Tengo una pregunta sobre TU GANGA.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-tg-primary transition-colors duration-200 hover:text-tg-deep lg:hidden"
          >
            ¿No está aquí? Pregúntanos
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>

        <p className="order-2 hidden lg:col-start-1 lg:row-start-2 lg:block">
          <a
            href={buildWhatsAppLink("¡Hola! Tengo una pregunta sobre TU GANGA.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-tg-primary transition-colors duration-200 hover:text-tg-deep"
          >
            ¿No está aquí? Pregúntanos
            <ArrowIcon className="h-4 w-4" />
          </a>
        </p>
      </div>
    </section>
  );
}
