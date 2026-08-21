import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { productService } from "@/lib/services/product-service";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBadge } from "@/components/product/ProductBadge";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ExternalProductCTA } from "@/components/product/ExternalProductCTA";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { CheckIcon, ExternalLinkIcon, WhatsAppIcon } from "@/components/ui/icons";
import {
  getAvailabilityInfo,
  getExternalChannelName,
  getProductExternalActions,
  type AvailabilityTone,
} from "@/lib/external-product";
import { cn } from "@/lib/utils";

const AVAILABILITY_STYLES: Record<AvailabilityTone, string> = {
  available: "text-emerald-700",
  urgent: "text-orange-700",
  reserved: "text-tg-deep",
  gone: "text-tg-ink/45",
};

const AVAILABILITY_DOT_STYLES: Record<AvailabilityTone, string> = {
  available: "bg-emerald-500",
  urgent: "bg-orange-500",
  reserved: "bg-tg-lavender",
  gone: "bg-tg-ink/30",
};

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
  const externalActions = getProductExternalActions(product);
  const availability = getAvailabilityInfo(product);
  const primaryAction = externalActions[0];
  const primaryChannelName = primaryAction ? getExternalChannelName(primaryAction.channel) : null;

  const channelValue = !primaryChannelName
    ? "No disponible"
    : primaryAction.channel === "WHATSAPP"
      ? "WhatsApp de TU GANGA"
      : `Disponible en ${primaryChannelName}`;

  const footnote =
    primaryAction && primaryAction.channel === "WHATSAPP"
      ? "Coordina la compra y la entrega directamente por WhatsApp."
      : primaryChannelName
        ? `La compra y el envío se gestionan en ${primaryChannelName}, con sus condiciones propias.`
        : null;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-12 sm:px-8 sm:pt-16 lg:pb-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} title={product.title} />

        <div className="flex flex-col">
          <Link
            href={product.category === "salud" ? "/salud" : `/categoria/${product.category}`}
            className="w-fit text-xs font-medium uppercase tracking-wide text-tg-ink/40 capitalize transition-colors hover:text-tg-primary"
          >
            {product.category}
          </Link>

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

          <div className="mt-6">
            <span
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium",
                AVAILABILITY_STYLES[availability.tone]
              )}
            >
              <span
                className={cn("h-2 w-2 rounded-full", AVAILABILITY_DOT_STYLES[availability.tone])}
                aria-hidden="true"
              />
              {availability.label}
            </span>
            <ProductPrice
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
              className="mt-2"
            />
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-tg-muted">{product.description}</p>

          {product.condition && (
            <p className="mt-5 text-sm text-tg-muted">
              <span className="font-semibold text-tg-ink/70">Estado:</span> {product.condition}
            </p>
          )}

          {product.reviewed && (
            <div className="mt-6 max-w-xl rounded-card border border-health-border bg-health-soft p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-health-strong">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-health text-white">
                  <CheckIcon className="h-3 w-3" />
                </span>
                Revisado por TU GANGA
              </p>
              <p className="mt-1.5 pl-7 text-sm leading-relaxed text-health-strong/75">
                Comprobamos su funcionamiento antes de publicarlo.
                {product.location && <> Revisado en {product.location}.</>}
              </p>
            </div>
          )}

          <div className="mt-8 max-w-xl">
            <ExternalProductCTA product={product} />
            {footnote && <p className="mt-3 text-center text-xs text-tg-ink/45">{footnote}</p>}
          </div>

          <dl className="mt-10 max-w-xl divide-y divide-tg-border overflow-hidden rounded-card border border-tg-border bg-white px-5 text-sm">
            <div className="flex items-center justify-between py-4">
              <dt className="text-tg-ink/60">Canal</dt>
              <dd className="text-right text-tg-ink">{channelValue}</dd>
            </div>
            {product.delivery && (
              <div className="flex items-center justify-between py-4">
                <dt className="text-tg-ink/60">Entrega</dt>
                <dd className="text-right text-tg-ink">{product.delivery}</dd>
              </div>
            )}
            {product.location && (
              <div className="flex items-center justify-between py-4">
                <dt className="text-tg-ink/60">Ubicación</dt>
                <dd className="text-right text-tg-ink">{product.location}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <RelatedProducts products={related} />

      {primaryAction && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-tg-border bg-white/95 backdrop-blur-sm lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-8">
            <div className="min-w-0">
              <p className="truncate text-xs text-tg-ink/50">{product.title}</p>
              <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
            </div>
            <a
              href={primaryAction.url}
              target="_blank"
              rel="noopener noreferrer external"
              className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-tg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tg-deep"
            >
              {primaryAction.channel === "WHATSAPP" ? (
                <>
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  Consultar
                </>
              ) : (
                <>
                  Ver en {getExternalChannelName(primaryAction.channel)}
                  <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 opacity-75" aria-hidden="true" />
                </>
              )}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
