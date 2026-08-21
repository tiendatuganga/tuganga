import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Explora"
        title="Categorías"
        description="Todo TU GANGA organizado a tu manera."
        action={{ label: "Ver todas", href: "/categorias" }}
      />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={category.slug === "salud" ? "/salud" : `/categoria/${category.slug}`}
            className={cn(
              "group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl",
              index === 0 && "col-span-2 aspect-[8/5] sm:col-span-1 sm:aspect-[4/5] lg:col-span-2 lg:aspect-[8/5]"
            )}
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tg-ink/75 via-tg-ink/5 to-transparent" />
            <div className="relative p-5">
              <h3 className="font-display text-lg font-semibold text-white">{category.title}</h3>
              <p className="mt-1 text-xs text-white/75">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
