"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowIcon, StarIcon } from "@/components/ui/icons";

const REVIEWS = [
  {
    name: "Marta G.",
    location: "Berja, Almería",
    text: "Las botas de presoterapia llegaron revisadas y con todo funcionando. Me las probé en mano antes de pagar. Repetiré seguro.",
  },
  {
    name: "Antonio R.",
    location: "Almería",
    text: "Compré la lámpara de luz roja y funciona perfecta. Me enseñaron que estaba probada antes de comprarla. Muy recomendable.",
  },
  {
    name: "Lucía P.",
    location: "Málaga",
    text: "Pedí por envío y llegó en 48h tal cual lo describían. Estado impecable para ser outlet, con su caja y accesorios.",
  },
  {
    name: "Javier M.",
    location: "Roquetas de Mar",
    text: "Atención de 10 por WhatsApp. Resolvieron todas mis dudas antes de cerrar la compra. Todo transparente.",
  },
  {
    name: "Carmen S.",
    location: "El Ejido",
    text: "Ya es mi segunda compra. Esta vez un difusor para regalar y estaba como nuevo. Confianza total.",
  },
] as const;

function ReviewCard({ name, location, text, index }: (typeof REVIEWS)[number] & { index: number }) {
  return (
    <article
      className="reveal-item w-[280px] shrink-0 snap-start rounded-card border border-tg-border bg-white p-6 sm:w-[320px]"
      style={{ "--reveal-index": index } as CSSProperties}
    >
      <div className="flex gap-1" aria-label="5 de 5 estrellas">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} className="h-4 w-4 fill-current text-[#f5a623]" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-tg-ink/80">“{text}”</p>
      <footer className="mt-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tg-lavender-soft font-display text-sm font-bold text-tg-primary">
          {name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-semibold text-tg-ink">{name}</p>
          <p className="text-xs text-tg-ink/50">{location}</p>
        </div>
      </footer>
    </article>
  );
}

const AVERAGE_RATING = 4.9;

function RatingSummary({ rating }: { rating: number }) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="font-display text-lg font-bold leading-none text-tg-ink">
        {rating.toFixed(1).replace(".", ",")}
      </span>
      <span
        className="relative inline-flex"
        role="img"
        aria-label={`Valoración media: ${rating.toFixed(1).replace(".", ",")} sobre 5`}
      >
        <span className="flex gap-0.5 text-tg-lavender" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} className="h-4 w-4 fill-current" />
          ))}
        </span>
        <span
          className="absolute inset-0 flex gap-0.5 overflow-hidden text-[#f5a623]"
          aria-hidden="true"
          style={{ width: `${(rating / 5) * 100}%` }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} className="h-4 w-4 shrink-0 fill-current" />
          ))}
        </span>
      </span>
    </div>
  );
}

export function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          node.setAttribute("data-reveal", entry.isIntersecting ? "done" : "pending");
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function scrollByCard(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * 344, behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      data-reveal="pending"
      className="reveal-group pt-5 pb-8 sm:pt-6 sm:pb-10"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="reviews-heading" className="font-display text-2xl font-bold tracking-tight text-tg-ink sm:text-3xl">
              Lo que dicen los clientes
            </h2>
            <RatingSummary rating={AVERAGE_RATING} />
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Reseñas anteriores"
              className="grid h-10 w-10 place-items-center rounded-full border border-tg-border bg-white text-tg-ink transition-colors hover:border-tg-primary hover:bg-tg-lavender-soft"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Siguientes reseñas"
              className="grid h-10 w-10 place-items-center rounded-full border border-tg-border bg-white text-tg-ink transition-colors hover:border-tg-primary hover:bg-tg-lavender-soft"
            >
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scroll-padding-inline:1.25rem] [scrollbar-width:none] sm:px-8 sm:[scroll-padding-inline:2rem] lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:[scroll-padding-inline:max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {REVIEWS.map((review, index) => (
          <ReviewCard key={review.name} index={index} {...review} />
        ))}
      </div>
    </section>
  );
}
