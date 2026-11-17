import type {
  Category,
  ExternalChannel,
  Product,
  ProductAvailability,
  ProductCategory,
  ProductCondition,
} from "@/types";
import { normalizeText } from "@/lib/utils";

interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

interface ShopifyMetafield {
  key: string;
  value: string;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  tags: string[];
  images: { nodes: { url: string; altText: string | null }[] };
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange?: { minVariantPrice: ShopifyMoney };
  totalInventory: number | null;
  collections?: { nodes: { handle: string }[] };
  metafields?: (ShopifyMetafield | null)[];
}

export interface ShopifyCollectionNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: { url: string; altText: string | null } | null;
}

const VALID_AVAILABILITY: ProductAvailability[] = ["AVAILABLE", "RESERVED", "SOLD"];
const VALID_CHANNELS: ExternalChannel[] = ["WALLAPOP", "VINTED", "WHATSAPP"];
const VALID_CATEGORIES: Record<string, ProductCategory> = {
  hogar: "Hogar",
  electronica: "Electrónica",
  tecnologia: "Electrónica",
  salud: "Salud y Cuidado Personal",
  "salud y cuidado personal": "Salud y Cuidado Personal",
  belleza: "Belleza",
  accesorios: "Accesorios",
  herramientas: "Herramientas",
  ocio: "Herramientas",
};

function readMetafield(metafields: (ShopifyMetafield | null)[] | undefined, key: string) {
  return metafields?.find((field) => field?.key === key)?.value;
}

/** Convierte un producto de Shopify Storefront API al tipo `Product` interno de la web. */
export function mapShopifyProduct(node: ShopifyProductNode): Product {
  const price = Number(node.priceRange.minVariantPrice.amount);
  const compareAtPrice = node.compareAtPriceRange
    ? Number(node.compareAtPriceRange.minVariantPrice.amount)
    : undefined;

  const featuredMetafield = readMetafield(node.metafields, "featured");
  const availabilityMetafield = readMetafield(node.metafields, "availability")?.toUpperCase();
  const externalChannelMetafield = readMetafield(node.metafields, "sales_channel")?.toUpperCase();
  const externalUrl = readMetafield(node.metafields, "external_url");
  const whatsappEnabled = readMetafield(node.metafields, "whatsapp_enabled") === "true";
  const rawCondition = normalizeText(readMetafield(node.metafields, "condition") ?? "");
  const condition: ProductCondition | null =
    rawCondition === "nuevo"
      ? "Nuevo"
      : rawCondition === "como nuevo"
        ? "Como nuevo"
        : rawCondition === "reacondicionado"
          ? "Reacondicionado"
          : null;
  const reviewedMetafield = readMetafield(node.metafields, "reviewed");
  const location = readMetafield(node.metafields, "location");
  const delivery = readMetafield(node.metafields, "delivery");
  const availability = VALID_AVAILABILITY.includes(availabilityMetafield as ProductAvailability)
    ? (availabilityMetafield as ProductAvailability)
    : node.totalInventory === 0
      ? "SOLD"
      : "AVAILABLE";
  const externalChannel = VALID_CHANNELS.includes(externalChannelMetafield as ExternalChannel)
    ? (externalChannelMetafield as ExternalChannel)
    : undefined;

  return {
    id: node.id,
    title: node.title,
    slug: node.handle,
    description: node.description,
    price,
    compareAtPrice: compareAtPrice && compareAtPrice > price ? compareAtPrice : undefined,
    images: node.images.nodes.map((image) => ({ url: image.url, alt: image.altText ?? node.title })),
    category: VALID_CATEGORIES[normalizeText(node.collections?.nodes[0]?.handle ?? "")] ?? null,
    tags: node.tags,
    inventory: node.totalInventory ?? 0,
    availability,
    externalChannel,
    externalUrl: externalUrl || undefined,
    whatsappEnabled,
    condition,
    reviewed: reviewedMetafield ? reviewedMetafield === "true" : undefined,
    location: location || undefined,
    delivery: delivery || undefined,
    featured: featuredMetafield === "true",
    createdAt: new Date().toISOString(),
  };
}

/** Convierte una Collection de Shopify al tipo `Category` interno de la web. */
export function mapShopifyCollection(node: ShopifyCollectionNode): Category | null {
  const title =
    VALID_CATEGORIES[normalizeText(node.handle)] ?? VALID_CATEGORIES[normalizeText(node.title)];
  if (!title) return null;

  return {
    id: node.id,
    title,
    slug: node.handle,
    description: node.description,
    image: node.image?.url ?? "",
  };
}
