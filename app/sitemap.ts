import type { MetadataRoute } from "next";
import { productService } from "@/lib/services/product-service";
import { categoryService } from "@/lib/services/category-service";
import { LEGAL_PAGES } from "@/lib/legal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuganga.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    productService.getAllProducts(),
    categoryService.getAllCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = ["", "/productos", "/categorias", "/salud"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const legalRoutes: MetadataRoute.Sitemap = LEGAL_PAGES.map((page) => ({
    url: `${siteUrl}${page.href}`,
    lastModified: new Date(),
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/producto/${product.slug}`,
    lastModified: new Date(product.createdAt),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.filter((category) => category.slug !== "salud").map((category) => ({
    url: `${siteUrl}/categoria/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...legalRoutes, ...productRoutes, ...categoryRoutes];
}
