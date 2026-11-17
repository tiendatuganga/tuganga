"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type Ref,
} from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowIcon, StarIcon } from "@/components/ui/icons";

const REVIEWS = [
  {
    name: "comprasana14",
    platform: "VINTED",
    rating: 5,
    text: "Artículos perfectos, muy buena comunicación, envío rápido y protegido, muy recomendable ⭐🌟⭐🌟⭐🌟❣️❣️❣️❣️❣️",
    widthClass: "sm:w-[25rem]",
  },
  {
    name: "aitoritoss",
    platform: "VINTED",
    rating: 5,
    text: "Todo perfecto y súper rápido",
    widthClass: "sm:w-[18rem]",
  },
  {
    name: "Wonderment",
    platform: "WALLAPOP",
    rating: 5,
    text: "todo bien",
    widthClass: "sm:w-[17rem]",
  },
  {
    name: "Carmen C.",
    platform: "WALLAPOP",
    rating: 5,
    text: "Estupendo vendedor, rapido amable y cordial 👍 💯",
    widthClass: "sm:w-[21rem]",
  },
  {
    name: "Juan M.",
    platform: "WALLAPOP",
    rating: 5,
    text: "Producto tal cual estaba en la descripción, vendedor muy recomendable. Gracias",
    widthClass: "sm:w-[23rem]",
  },
] as const;

type Review = (typeof REVIEWS)[number];

const PLATFORM_STYLES = {
  VINTED: "border-[#007782]/20 bg-[#007782]/8 text-[#006b74]",
  WALLAPOP: "border-[#13c1ac]/25 bg-[#13c1ac]/10 text-[#087f73]",
} as const;

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const platformName = review.platform === "VINTED" ? "Vinted" : "Wallapop";

  return (
    <article
      data-review-card
      className={`reveal-item flex min-h-[15rem] w-[82vw] max-w-[22rem] shrink-0 snap-start flex-col rounded-card border border-tg-border bg-white p-6 transition-[transform,border-color] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-tg-primary/35 sm:max-w-none ${review.widthClass}`}
      style={{ "--reveal-index": index * 0.55 + 1 } as CSSProperties}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-1" role="img" aria-label={`${review.rating} de 5 estrellas`}>
          {Array.from({ length: review.rating }).map((_, starIndex) => (
            <StarIcon key={starIndex} aria-hidden="true" className="h-4 w-4 fill-current text-[#f5a623]" />
          ))}
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] ${PLATFORM_STYLES[review.platform]}`}
        >
          {review.platform}
        </span>
      </div>

      <blockquote data-review-copy className="mt-5 flex-1 cursor-text select-text text-sm leading-relaxed text-tg-ink/80">
        {review.text}
      </blockquote>

      <footer data-review-copy className="mt-6 flex cursor-text select-text items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tg-lavender-soft font-display text-sm font-bold text-tg-primary"
        >
          {review.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-semibold text-tg-ink">{review.name}</p>
          <p className="text-xs text-tg-ink/50">Reseña en {platformName}</p>
        </div>
      </footer>
    </article>
  );
}

function ReviewGroup({
  groupRef,
  hiddenFromAssistiveTechnology = false,
}: {
  groupRef?: Ref<HTMLDivElement>;
  hiddenFromAssistiveTechnology?: boolean;
}) {
  return (
    <div
      ref={groupRef}
      className="flex shrink-0 items-stretch gap-4"
      aria-hidden={hiddenFromAssistiveTechnology || undefined}
    >
      {REVIEWS.map((review, index) => (
        <ReviewCard key={review.name} review={review} index={index} />
      ))}
    </div>
  );
}

type DragState = {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
  dragging: boolean;
};

const INTERACTION_PAUSE_MS = 2400;
const AUTOPLAY_DELAY_MS = 900;
const AUTOPLAY_SPEED_PX_PER_MS = 0.016;

export function ReviewsSection() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const primaryGroupRef = useRef<HTMLDivElement>(null);
  const loopDistanceRef = useRef(0);
  const revealedAtRef = useRef<number | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const pausesRef = useRef({ hover: false, focus: false, interaction: false });
  const [isDragging, setIsDragging] = useState(false);

  const beginInteraction = useCallback(() => {
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    pausesRef.current.interaction = true;
  }, []);

  const resumeAfterInteraction = useCallback(() => {
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      pausesRef.current.interaction = false;
      resumeTimerRef.current = null;
    }, INTERACTION_PAUSE_MS);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (prefersReducedMotion) {
      node.setAttribute("data-reveal", "done");
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      node.setAttribute("data-reveal", "done");
      revealedAtRef.current = performance.now();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.setAttribute("data-reveal", "done");
        revealedAtRef.current = performance.now();
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    const primaryGroup = primaryGroupRef.current;
    if (!viewport || !firstGroup || !primaryGroup) return;

    const updateLoopMetrics = () => {
      const previousDistance = loopDistanceRef.current;
      const nextDistance = primaryGroup.offsetLeft - firstGroup.offsetLeft;
      if (nextDistance <= 0) return;

      const relativePosition = previousDistance > 0 ? viewport.scrollLeft / previousDistance : 1;
      loopDistanceRef.current = nextDistance;
      viewport.scrollLeft = nextDistance * relativePosition;
    };

    updateLoopMetrics();
    const resizeObserver = new ResizeObserver(updateLoopMetrics);
    resizeObserver.observe(viewport);
    resizeObserver.observe(firstGroup);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const desktopViewport = window.matchMedia("(min-width: 768px)");
    let animationFrame = 0;
    let previousTime = 0;
    let scrollPosition = viewportRef.current?.scrollLeft ?? 0;
    const moveRail = (time: number) => {
      const viewport = viewportRef.current;
      const revealedAt = revealedAtRef.current;
      if (viewport && desktopViewport.matches && revealedAt !== null && time - revealedAt >= AUTOPLAY_DELAY_MS) {
        const elapsed = previousTime === 0 ? 0 : Math.min(time - previousTime, 50);
        const pauses = pausesRef.current;
        if (!pauses.hover && !pauses.focus && !pauses.interaction) {
          if (Math.abs(viewport.scrollLeft - scrollPosition) > 2) scrollPosition = viewport.scrollLeft;
          scrollPosition += elapsed * AUTOPLAY_SPEED_PX_PER_MS;

          const loopDistance = loopDistanceRef.current;
          if (loopDistance > 0 && scrollPosition >= loopDistance * 2) scrollPosition -= loopDistance;
          if (loopDistance > 0 && scrollPosition <= 0) scrollPosition += loopDistance;
          viewport.scrollLeft = scrollPosition;
        } else {
          scrollPosition = viewport.scrollLeft;
        }
      }
      previousTime = time;
      animationFrame = window.requestAnimationFrame(moveRail);
    };

    animationFrame = window.requestAnimationFrame(moveRail);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [prefersReducedMotion]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    },
    [],
  );

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-review-card]"));
      const viewportLeft = viewport.getBoundingClientRect().left;
      const paddingLeft = Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;
      const alignmentPoint = viewportLeft + paddingLeft;
      const currentIndex = cards.reduce((closestIndex, card, index) => {
        const currentDistance = Math.abs(cards[closestIndex].getBoundingClientRect().left - alignmentPoint);
        const nextDistance = Math.abs(card.getBoundingClientRect().left - alignmentPoint);
        return nextDistance < currentDistance ? index : closestIndex;
      }, 0);
      const targetIndex = Math.min(cards.length - 1, Math.max(0, currentIndex + direction));
      const distance = cards[targetIndex].getBoundingClientRect().left - cards[currentIndex].getBoundingClientRect().left;

      beginInteraction();
      viewport.scrollBy({ left: distance, behavior: prefersReducedMotion ? "auto" : "smooth" });
      resumeAfterInteraction();
    },
    [beginInteraction, prefersReducedMotion, resumeAfterInteraction],
  );

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    beginInteraction();

    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if ((event.target as HTMLElement).closest("[data-review-copy]")) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      dragging: false,
    };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const distance = event.clientX - dragState.startX;
    if (!dragState.dragging && Math.abs(distance) < 6) return;

    if (!dragState.dragging) {
      dragState.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }

    event.preventDefault();
    event.currentTarget.scrollLeft = dragState.startScrollLeft - distance;
  }

  function finishPointerInteraction(event: ReactPointerEvent<HTMLDivElement>) {
    const dragState = dragStateRef.current;
    if (dragState?.pointerId === event.pointerId) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      dragStateRef.current = null;
      setIsDragging(false);
    }
    resumeAfterInteraction();
  }

  return (
    <section
      ref={sectionRef}
      data-reveal="pending"
      className="reveal-group overflow-x-clip pt-5 pb-8 sm:pt-6 sm:pb-10"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="reveal-item" style={{ "--reveal-index": 0 } as CSSProperties}>
            <h2 id="reviews-heading" className="font-display text-2xl font-bold tracking-tight text-tg-ink sm:text-3xl">
              Lo que dicen los clientes
            </h2>
            <p className="mt-2 text-sm text-tg-ink/60">Opiniones reales de compradores en Wallapop y Vinted.</p>
          </div>
          <div className="reveal-item hidden gap-2 sm:flex" style={{ "--reveal-index": 1 } as CSSProperties}>
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Mostrar la reseña anterior"
              className="grid h-10 w-10 place-items-center rounded-full border border-tg-border bg-white text-tg-ink transition-colors hover:border-tg-primary hover:bg-tg-lavender-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tg-primary"
            >
              <ArrowIcon aria-hidden="true" className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Mostrar la siguiente reseña"
              className="grid h-10 w-10 place-items-center rounded-full border border-tg-border bg-white text-tg-ink transition-colors hover:border-tg-primary hover:bg-tg-lavender-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tg-primary"
            >
              <ArrowIcon aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={viewportRef}
          role="region"
          aria-label="Opiniones de compradores"
          tabIndex={0}
          data-dragging={isDragging}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            scrollByCard(event.key === "ArrowLeft" ? -1 : 1);
          }}
          onMouseEnter={() => {
            pausesRef.current.hover = true;
          }}
          onMouseLeave={() => {
            pausesRef.current.hover = false;
          }}
          onFocus={() => {
            pausesRef.current.focus = true;
          }}
          onBlur={() => {
            pausesRef.current.focus = false;
          }}
          onWheel={() => {
            beginInteraction();
            resumeAfterInteraction();
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointerInteraction}
          onPointerCancel={finishPointerInteraction}
          onPointerLeave={(event) => {
            if (dragStateRef.current && !dragStateRef.current.dragging) finishPointerInteraction(event);
          }}
          className="mt-8 cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-5 pb-2 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-tg-primary data-[dragging=true]:cursor-grabbing data-[dragging=true]:select-none [scroll-padding-inline:1.25rem] [scrollbar-width:none] sm:px-8 sm:[scroll-padding-inline:2rem] md:snap-none lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:[scroll-padding-inline:max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-stretch gap-4">
            <ReviewGroup groupRef={firstGroupRef} hiddenFromAssistiveTechnology />
            <ReviewGroup groupRef={primaryGroupRef} />
            <ReviewGroup hiddenFromAssistiveTechnology />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-tg-offwhite sm:w-8 lg:w-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        />
      </div>
    </section>
  );
}
