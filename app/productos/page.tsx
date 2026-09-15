import type { Metadata } from "next";
import { productService } from "@/lib/services/product-service";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryNavigation } from "@/components/ui/CategoryNavigation";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Productos",
  description: "Todos los productos de TU GANGA: nuevos, como nuevos, reacondicionados, destacados y ofertas.",
};

const FILTERS = [
  { key: undefined, label: "Todos" },
  { key: "nuevo", label: "Nuevo" },
  { key: "como-nuevo", label: "Como nuevo" },
  { key: "reacondicionado", label: "Reacondicionado" },
  { key: "ofertas", label: "Ofertas" },
  { key: "ultimas-oportunidades", label: "Últimas oportunidades" },
  { key: "destacados", label: "Destacados" },
] as const;

const FILTER_COPY: Record<string, { title: string; description: string }> = {
  nuevo: { title: "Nuevo", description: "Productos nuevos disponibles en TU GANGA." },
  "como-nuevo": {
    title: "Como nuevo",
    description: "Productos en un estado excelente, tal como se indica en su ficha.",
  },
  reacondicionado: {
    title: "Reacondicionado",
    description: "Productos reacondicionados y comprobados antes de publicarse.",
  },
  ofertas: { title: "Ofertas", description: "Gangas con descuento directo. Cuando vuelan, vuelan." },
  "ultimas-oportunidades": {
    title: "Últimas oportunidades",
    description: "Quedan pocas unidades. Cuando se acaban, no vuelven.",
  },
  destacados: { title: "Destacados", description: "La selección con mejor acogida en TU GANGA." },
};

async function getFilteredProducts(filtro?: string, categoria?: string): Promise<Product[]> {
  if (categoria) return productService.getProductsByCategory(categoria);

  switch (filtro) {
    case "nuevo":
      return productService.getNewProducts(48);
    case "como-nuevo":
      return productService.getProductsByCondition("Como nuevo", 48);
    case "reacondicionado":
      return productService.getProductsByCondition("Reacondicionado", 48);
    case "ofertas":
      return productService.getSaleProducts(48);
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
