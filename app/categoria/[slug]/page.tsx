import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categoryService } from "@/lib/services/category-service";
import { productService } from "@/lib/services/product-service";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function generateStaticParams() {
  const categories = await categoryService.getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await categoryService.getCategoryBySlug(slug);
  if (!category) return {};

  return { title: category.title, description: category.description };
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await categoryService.getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await productService.getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight text-tg-ink sm:text-4xl">{category.title}</h1>
      <p className="mt-3 max-w-xl text-base text-tg-ink/60">{category.description}</p>

      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
