import type { MetadataRoute } from "next";
import { productService } from "@/lib/services/product-service";
import { categoryService } from "@/lib/services/category-service";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuganga.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    productService.getAllProducts(),
    categoryService.getAllCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = ["", "/productos", "/categorias"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/producto/${product.slug}`,
    lastModified: new Date(product.createdAt),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/categoria/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
