"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

export function ProductGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-tg-offwhite">
        <Image
          src={current.url}
          alt={current.alt || title}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ver imagen ${index + 1} de ${title}`}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors",
                index === active ? "border-tg-primary" : "border-transparent hover:border-tg-lavender"
              )}
            >
              <Image src={image.url} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
