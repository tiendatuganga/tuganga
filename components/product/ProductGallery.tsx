"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

export function ProductGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = images[active] ?? images[0];

  function moveTo(index: number) {
    const next = (index + images.length) % images.length;
    setActive(next);
    thumbRefs.current[next]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (images.length < 2) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTo(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveTo(images.length - 1);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-panel border border-tg-border bg-tg-offwhite">
        <Image
          src={current.url}
          alt={current.alt || title}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        {images.length > 1 && (
          <span className="absolute bottom-4 right-4 rounded-full bg-tg-ink/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {active + 1} / {images.length}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div
          role="group"
          aria-label={`Imágenes de ${title}`}
          onKeyDown={handleKeyDown}
          className="flex flex-wrap gap-3"
        >
          {images.map((image, index) => (
            <button
              key={image.url}
              ref={(element) => {
                thumbRefs.current[index] = element;
              }}
              type="button"
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              tabIndex={index === active ? 0 : -1}
              aria-label={`Ver imagen ${index + 1} de ${title}`}
              aria-current={index === active}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all duration-200 sm:h-24 sm:w-24",
                index === active
                  ? "border-tg-primary opacity-100 ring-2 ring-tg-primary/20"
                  : "border-transparent opacity-75 hover:border-tg-lavender hover:opacity-100 focus-visible:border-tg-lavender focus-visible:opacity-100"
              )}
            >
              <Image src={image.url} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
