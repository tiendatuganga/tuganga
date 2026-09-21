import type { Product, ProductCategory, ProductImage } from "@/types";

const CATEGORY_PLACEHOLDERS: Record<ProductCategory, string> = {
  Hogar: "/categories/hogar.svg",
  Electrónica: "/categories/tecnologia.svg",
  "Salud y Cuidado Personal": "/categories/salud.svg",
  Belleza: "/categories/belleza.svg",
  Accesorios: "/categories/accesorios.svg",
  Herramientas: "/categories/ocio.svg",
};

export function getProductFallbackImage(
  product: Pick<Product, "title" | "category">
): ProductImage {
  return {
    url: product.category ? CATEGORY_PLACEHOLDERS[product.category] : "/categories/hogar.svg",
    alt: product.title,
  };
}

export function getProductDisplayImages(
  product: Pick<Product, "title" | "category" | "images" | "featuredImage">
): ProductImage[] {
  if (product.images.length > 0) return product.images;
  return [product.featuredImage ?? getProductFallbackImage(product)];
}

export function getProductPrimaryImage(
  product: Pick<Product, "title" | "category" | "images" | "featuredImage">
): ProductImage {
  return getProductDisplayImages(product)[0];
}
