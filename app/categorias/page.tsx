import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { categoryService } from "@/lib/services/category-service";

export const metadata: Metadata = {
  title: "Categorías",
  description: "Explora todas las categorías de TU GANGA.",
};

export default async function CategoriasPage() {
  const categories = await categoryService.getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight text-tg-ink sm:text-4xl">Categorías</h1>
      <p className="mt-3 max-w-xl text-base text-tg-ink/60">Todo TU GANGA organizado a tu manera.</p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.slug === "salud" ? "/salud" : `/categoria/${category.slug}`}
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl"
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
              <h2 className="font-display text-lg font-semibold text-white">{category.title}</h2>
              <p className="mt-1 text-xs text-white/75">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
