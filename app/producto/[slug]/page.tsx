import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productService } from "@/lib/services/product-service";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBadge } from "@/components/product/ProductBadge";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductActions } from "@/components/product/ProductActions";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export async function generateStaticParams() {
  const products = await productService.getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.map((image) => ({ url: image.url, alt: image.alt })),
    },
  };
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);
  if (!product) notFound();

  const related = await productService.getRelatedProducts(product, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />

        <div className="flex flex-col">
          <span className="text-xs font-medium capitalize tracking-wide text-tg-ink/40">{product.category}</span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-tg-ink sm:text-4xl">
            {product.title}
          </h1>

          {product.status.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.status.map((status) => (
                <ProductBadge key={status} status={status} />
              ))}
            </div>
          )}

          <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} size="lg" className="mt-6" />

          <p className="mt-6 max-w-xl text-base leading-relaxed text-tg-ink/70">{product.description}</p>

          <div className="mt-8">
            <ProductActions product={product} />
          </div>

          <p className="mt-4 text-xs text-tg-ink/45">
            {product.inventory > 0 ? `${product.inventory} unidades disponibles` : "Sin stock por ahora"}
          </p>

          <dl className="mt-10 divide-y divide-tg-lavender-soft border-y border-tg-lavender-soft text-sm">
            <div className="flex items-center justify-between py-4">
              <dt className="text-tg-ink/60">Envío</dt>
              <dd className="text-tg-ink">Entrega en 2-4 días laborables</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-tg-ink/60">Devoluciones</dt>
              <dd className="text-tg-ink">30 días para cambios de opinión</dd>
            </div>
          </dl>
        </div>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
