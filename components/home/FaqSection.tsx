"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { ArrowIcon, ChevronDownIcon } from "@/components/ui/icons";

const FAQS = [
  {
    question: "¿De dónde vienen los productos de TU GANGA?",
    answer:
      "Son artículos de devolución de Amazon y grandes superficies: productos que un cliente compró y devolvió (a veces sin usar, a veces abiertos) y que las tiendas ya no pueden vender como nuevos. Nosotros los compramos por lotes, los revisamos uno a uno y solo publicamos los que funcionan al 100%.",
  },
  {
    question: "¿Los productos son nuevos o de segunda mano?",
    answer:
      "Depende del artículo, y siempre te lo indicamos en la ficha: puede tratarse de un producto «como nuevo» (sin apenas uso, con caja) o de una unidad con señales de uso normales. Nunca decimos que algo es nuevo si no lo es.",
  },
  {
    question: "¿Cómo sé que el producto funciona antes de comprarlo?",
    answer:
      "Cada unidad se prueba personalmente antes de publicarse: la encendemos, comprobamos que hace lo que tiene que hacer y solo entonces la subimos a la web o a Wallapop/Vinted. Si algo falla, no se vende.",
  },
  {
    question: "¿Puedo devolver un producto si no me convence?",
    answer:
      "Si compras a través de Wallapop o Vinted, cuentas con su periodo de protección al comprador (normalmente 48h para comprobar el artículo antes de confirmar la recepción). Si prefieres comprar y recoger en persona en Berja, puedes revisar el producto delante de nosotros antes de pagar.",
  },
  {
    question: "¿Hacéis envíos o solo venta en persona?",
    answer:
      "Ambas cosas. Hacemos entrega en mano en Berja, Almería capital y Málaga, y también enviamos a toda España a través de Wallapop y Vinted, donde tu compra queda protegida durante el envío.",
  },
  {
    question: "¿Por qué los precios son tan bajos comparados con la tienda original?",
    answer:
      "Porque aunque el producto en sí es nuevo, ya no puede venderse como «nuevo de fábrica» una vez que ha pasado por una devolución: alguien lo compró y, sin haberlo usado, cambió de opinión, no era su talla o simplemente ya no lo quería, y en muchos casos ni siquiera llegó a abrir la caja. Las grandes tiendas no pueden revenderlo como nuevo aunque esté intacto, así que lo liquidan por lotes a un precio mucho menor, y ese ahorro es el que te trasladamos directamente a ti.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="mx-auto max-w-7xl px-5 pt-8 pb-9 sm:px-8 sm:pt-10 sm:pb-11"
      aria-labelledby="faq-heading"
    >
      <div className="flex flex-col gap-y-10 lg:grid lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] lg:items-start lg:gap-x-16 lg:gap-y-8">
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <h2 id="faq-heading" className="font-display text-2xl font-bold tracking-tight text-tg-ink sm:text-3xl">
            ¿Te queda alguna duda?
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-tg-muted sm:text-base">
            Todo lo que necesitas saber antes de encontrar tu próxima ganga.
          </p>
        </div>

        <div className="order-3 border-t border-tg-border lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="divide-y divide-tg-border">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="group">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full cursor-pointer items-center gap-4 py-5 text-left"
                  >
                    <span
                      className={`w-7 shrink-0 font-display text-xs font-bold tabular-nums transition-colors duration-200 group-hover:text-tg-primary ${
                        isOpen ? "text-tg-primary" : "text-tg-primary/50"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-sm font-semibold transition-colors duration-200 group-hover:text-tg-primary sm:text-base ${
                        isOpen ? "text-tg-primary" : "text-tg-ink"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-tg-primary/10 ${
                        isOpen ? "bg-tg-primary text-white" : "bg-tg-lavender-soft text-tg-primary"
                      }`}
                    >
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <p
                      id={`faq-panel-${index}`}
                      className="faq-answer pb-5 pl-11 pr-9 text-sm leading-relaxed text-tg-muted"
                    >
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
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
