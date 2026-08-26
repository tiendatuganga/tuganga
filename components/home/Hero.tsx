"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeartIcon, SparkleIcon } from "@/components/ui/icons";
import { cn, formatPrice } from "@/lib/utils";

const AUTOPLAY_MS = 4000;

const HEALTH_BG_SRC =
  "https://images.pexels.com/photos/7216285/pexels-photo-7216285.jpeg?auto=compress&cs=tinysrgb&w=2000";

const SLIDE_LABELS = ["Salud y bienestar", "Encuentra tu próxima ganga"];

const FLOATING_PRODUCTS = [
  {
    href: "/producto/lampara-luna-led",
    src: "https://images.unsplash.com/photo-1632712535563-c30adb9a9e2e?q=80&w=600&auto=format&fit=crop",
    alt: "Lámpara Luna LED",
    price: 24.99,
  },
  {
    href: "/producto/altavoz-mini-bluetooth",
    src: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
    alt: "Altavoz Mini Bluetooth",
    price: 22.9,
  },
  {
    href: "/producto/soporte-magnetico",
    src: "https://images.unsplash.com/photo-1536825591064-574efec257f2?q=80&w=600&auto=format&fit=crop",
    alt: "Soporte Magnético",
    price: 12.5,
  },
  {
    href: "/producto/mochila-urbana",
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    alt: "Mochila Urbana",
    price: 29.99,
  },
] as const;

function HeroSlide({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("absolute inset-0", !active && "pointer-events-none")}
      inert={!active}
      aria-hidden={!active}
    >
      {children}
    </motion.div>
  );
}

const slideContentClasses =
  "relative z-10 mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center px-5 py-10 text-center sm:px-8 sm:text-left lg:mx-10 lg:items-start xl:py-14";

function MobileProductCarousel({ active }: { active: boolean }) {
  return (
    <div
      className="mt-6 w-full max-w-md xl:hidden"
      aria-label="Productos destacados"
    >
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FLOATING_PRODUCTS.map((product) => (
          <Link
            key={product.href}
            href={product.href}
            tabIndex={active ? 0 : -1}
            className="group relative aspect-square w-[36%] shrink-0 snap-start overflow-hidden rounded-card border border-white/20 shadow-card transition-transform duration-150 active:scale-[0.98] motion-reduce:transition-none"
          >
            <Image
              src={product.src}
              alt={product.alt}
              fill
              sizes="(max-width: 1279px) 36vw, 1px"
              className="object-cover"
            />
            <span className="absolute bottom-2 right-2 rounded-full bg-tg-primary px-2.5 py-1 text-xs font-bold text-white">
              {formatPrice(product.price)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [navCount, setNavCount] = useState(0);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDE_LABELS.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, navCount]);

  const goTo = (index: number) => {
    setActive(index);
    setNavCount((count) => count + 1);
  };

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Destacados de TU GANGA"
      className="relative min-h-[620px] overflow-hidden bg-tg-dark sm:min-h-[640px] xl:min-h-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-1000 ease-out",
          active === 0 ? "opacity-100" : "opacity-0"
        )}
      >
        <Image
          src={HEALTH_BG_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -scale-x-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <HeroSlide active={active === 0}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={slideContentClasses}
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-health/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
              <HeartIcon className="h-3.5 w-3.5" />
              Vertical Salud · Revisado en Berja
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:mt-6">
              TU SALUD TAMBIÉN
              <br />
              TIENE GANGA.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg xl:mt-6">
              Presoterapia, fototerapia y estética profesional revisadas pieza a pieza.
              Funcionamiento comprobado y precios de outlet.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-4 sm:justify-start xl:mt-8">
              <Button
                href="/salud"
                className="bg-health text-white hover:bg-health-strong"
              >
                Ver productos de salud
              </Button>
            </div>
          </div>
        </motion.div>
      </HeroSlide>

      <HeroSlide active={active === 1}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: active === 1 ? 1 : 0, y: active === 1 ? 0 : 12 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={slideContentClasses}
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
              <SparkleIcon className="h-3.5 w-3.5" />
              Selección renovada cada semana
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:mt-6">
              ENCUENTRA TU
              <br />
              PRÓXIMA GANGA.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg xl:mt-6">
              Productos nuevos, segunda vuelta y oportunidades seleccionadas para ti. Encuentra el
              tuyo y elige dónde comprarlo.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-4 sm:justify-start xl:mt-8">
              <Button
                href="/productos"
                className="bg-white text-tg-primary hover:bg-tg-lavender-soft"
              >
                Descubrir productos
              </Button>
              <Button
                href="/productos?filtro=segunda-vuelta"
                variant="secondary"
                className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-tg-primary"
              >
                Segunda vuelta
              </Button>
            </div>
            <MobileProductCarousel active={active === 1} />
          </div>
        </motion.div>
        <div className="absolute right-64 top-1/2 z-10 hidden -translate-y-1/2 grid-cols-2 gap-5 xl:grid">
          {FLOATING_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.href}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: active === 1 ? 1 : 0, x: active === 1 ? 0 : 24 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.15 + index * 0.1, ease: "easeOut" }}
            >
              <Link
                href={product.href}
                tabIndex={active === 1 ? 0 : -1}
                className="group relative block overflow-hidden rounded-card border border-white/20 shadow-card transition-colors duration-200 hover:border-white/40"
              >
                <Image
                  src={product.src}
                  alt={product.alt}
                  width={240}
                  height={240}
                  className="h-32 w-32 object-cover transition-transform duration-500 ease-out group-hover:scale-110 xl:h-36 xl:w-36"
                />
                <span className="absolute bottom-2 right-2 rounded-full bg-tg-primary px-2.5 py-1 text-xs font-bold text-white">
                  {formatPrice(product.price)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </HeroSlide>

      <div className="absolute inset-x-0 bottom-4 z-20 xl:bottom-6">
        <div className="mx-auto flex w-full max-w-4xl justify-center px-5 sm:px-8 lg:mx-10 lg:justify-start">
          <div className="flex items-center gap-2" role="tablist" aria-label="Elegir diapositiva del hero">
            {SLIDE_LABELS.map((label, index) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Diapositiva ${index + 1}: ${label}`}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full outline-offset-4 transition-all duration-300",
                  active === index
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70 focus-visible:bg-white/70"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
