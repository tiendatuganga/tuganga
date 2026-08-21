import type { Metadata } from "next";
import { productService } from "@/lib/services/product-service";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryNavigation } from "@/components/ui/CategoryNavigation";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Productos",
  description: "Todos los productos de TU GANGA: nuevos, segunda vuelta, destacados y últimas oportunidades.",
};

const FILTERS = [
  { key: undefined, label: "Todos" },
  { key: "nuevos", label: "Nuevos" },
  { key: "ofertas", label: "Ofertas" },
  { key: "segunda-vuelta", label: "Segunda vuelta" },
  { key: "ultimas-oportunidades", label: "Últimas oportunidades" },
  { key: "destacados", label: "Destacados" },
] as const;

const FILTER_COPY: Record<string, { title: string; description: string }> = {
  nuevos: { title: "Nuevos", description: "Lo último que ha entrado en TU GANGA." },
  ofertas: { title: "Ofertas", description: "Gangas con descuento directo. Cuando vuelan, vuelan." },
  "segunda-vuelta": {
    title: "Segunda vuelta",
    description: "Una segunda oportunidad para productos que todavía tienen mucho que ofrecer.",
  },
  "ultimas-oportunidades": {
    title: "Últimas oportunidades",
    description: "Quedan pocas unidades. Cuando se acaban, no vuelven.",
  },
  destacados: { title: "Destacados", description: "La selección con mejor acogida en TU GANGA." },
};

async function getFilteredProducts(filtro?: string, categoria?: string): Promise<Product[]> {
  if (categoria) return productService.getProductsByCategory(categoria);

  switch (filtro) {
    case "nuevos":
      return productService.getNewProducts(48);
    case "ofertas":
      return productService.getSaleProducts(48);
    case "segunda-vuelta":
      return productService.getSecondLifeProducts(48);
    case "ultimas-oportunidades":
      return productService.getLimitedProducts(48);
    case "destacados":
      return productService.getFeaturedProducts(48);
    default:
      return productService.getAllProducts();
  }
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string; categoria?: string }>;
}) {
  const { filtro, categoria } = await searchParams;
  const products = await getFilteredProducts(filtro, categoria);
  const heading =
    filtro && FILTER_COPY[filtro]
      ? FILTER_COPY[filtro]
      : { title: "Todos los productos", description: "Explora el catálogo completo de TU GANGA." };
  const navigationItems = FILTERS.map((item) => ({
    label: item.label,
    href: item.key ? `/productos?filtro=${item.key}` : "/productos",
    active: !categoria && filtro === item.key,
  }));

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-tg-ink sm:text-4xl">{heading.title}</h1>
        <p className="mt-3 text-base text-tg-ink/60">{heading.description}</p>
      </div>

      <CategoryNavigation items={navigationItems} label="Filtrar productos" className="mt-8 rounded-2xl" />

      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
