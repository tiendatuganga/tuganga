import type {
  ExternalChannel,
  Product,
  ProductAvailability,
  ProductCategory,
  ProductCondition,
  ProductImage,
} from "@/types";
import { getProductFallbackImage } from "@/lib/product-images";
import { normalizeText } from "@/lib/utils";
import { extractPhotoUrls, type SheetRow } from "@/lib/catalog/google-sheet";

const CATEGORY_ALIASES: Record<string, ProductCategory> = {
  hogar: "Hogar",
  electronica: "Electrónica",
  tecnologia: "Electrónica",
  "salud y cuidado personal": "Salud y Cuidado Personal",
  salud: "Salud y Cuidado Personal",
  belleza: "Belleza",
  accesorios: "Accesorios",
  herramientas: "Herramientas",
  ocio: "Herramientas",
};

export interface MappedSheetProduct {
  product: Product;
  published: boolean;
}

function warn(row: SheetRow, message: string) {
  const reference = row.ID?.trim() || row.Slug?.trim() || "fila sin identificar";
  console.warn(`[catálogo Google Sheets] ${reference}: ${message}`);
}

function isYes(value: string | undefined) {
  return normalizeText(value ?? "") === "si";
}

function parseNumber(value: string | undefined, row: SheetRow, field: string): number | null {
  const raw = value?.trim();
  if (!raw) return null;

  const normalized = raw
    .replace(/\s/g, "")
    .replace(/€/g, "")
    .replace(/\.(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    warn(row, `${field} inválido`);
    return null;
  }

  return parsed;
}

function parseInteger(value: string | undefined, row: SheetRow, field: string): number | null {
  const parsed = parseNumber(value, row, field);
  if (parsed === null || !Number.isInteger(parsed) || parsed < 0) {
    if (parsed !== null) warn(row, `${field} debe ser un entero positivo`);
    return null;
  }
  return parsed;
}

export function extractGoogleDriveFileId(value: string): string | null {
  try {
    const url = new URL(value.trim());
    if (url.hostname !== "drive.google.com") return null;

    const pathMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
    const id = pathMatch?.[1] ?? url.searchParams.get("id");
    return id && /^[\w-]+$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function normalizeGoogleDriveImageUrl(value: string): string | null {
  const fileId = extractGoogleDriveFileId(value);
  return fileId ? `/api/catalog-image?id=${encodeURIComponent(fileId)}` : null;
}

function mapCategory(row: SheetRow): ProductCategory | null {
  const raw = row["Categoría"]?.trim();
  if (!raw) {
    warn(row, "categoría vacía");
    return null;
  }

  const category = CATEGORY_ALIASES[normalizeText(raw)];
  if (!category) warn(row, `categoría no reconocida: ${raw}`);
  return category ?? null;
}

function mapImages(row: SheetRow, title: string): ProductImage[] {
  const rawImages = extractPhotoUrls(row);
  const images = rawImages.flatMap((value) => {
    const normalized = normalizeGoogleDriveImageUrl(value);
    if (!normalized) {
      warn(row, "URL de foto inválida o no compatible con Google Drive");
      return [];
    }
    return [{ url: normalized, alt: title }];
  });

  return images;
}

function mapCondition(row: SheetRow): ProductCondition | null {
  const raw = row.Estado?.trim();
  if (!raw) {
    warn(row, "estado vacío");
    return null;
  }

  const normalized = normalizeText(raw);
  if (normalized === "nuevo") return "Nuevo";
  if (normalized === "como nuevo") return "Como nuevo";
  if (normalized === "reacondicionado") return "Reacondicionado";

  warn(row, `estado no reconocido: ${raw}`);
  return null;
}

function mapExternalChannels(value: string | undefined, row: SheetRow): ExternalChannel[] {
  const channels = new Set<ExternalChannel>();
  const values = value?.split(/[|,;/]+/).map(normalizeText).filter(Boolean) ?? [];

  for (const channel of values) {
    if (channel === "wallapop") channels.add("WALLAPOP");
    else if (channel === "vinted") channels.add("VINTED");
    else if (channel === "whatsapp") channels.add("WHATSAPP");
    else warn(row, `canal de venta no reconocido: ${channel}`);
  }

  return [...channels];
}

function validExternalUrl(value: string | undefined, row: SheetRow, required: boolean) {
  const raw = value?.trim();
  if (!raw) {
    if (required) warn(row, "URL de venta vacía para un canal externo");
    return undefined;
  }
  try {
    const url = new URL(raw);
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
  } catch {
    // Se registra abajo sin exponer el valor recibido.
  }
  warn(row, "URL de venta inválida");
  return undefined;
}

export function mapSheetRow(row: SheetRow): MappedSheetProduct | null {
  const id = row.ID?.trim();
  const slug = row.Slug?.trim();
  const title = row["Título"]?.trim();

  if (!id) warn(row, "ID vacío");
  if (!slug) warn(row, "slug vacío");
  if (!id || !slug || !title) {
    if (!title) warn(row, "título vacío");
    return null;
  }

  const category = mapCategory(row);
  const price = parseNumber(row["Precio (€)"], row, "precio");
  const rawCompareAtPrice = parseNumber(row["Precio anterior (€)"], row, "precio anterior");
  const compareAtPrice =
    price !== null && rawCompareAtPrice !== null && rawCompareAtPrice > price
      ? rawCompareAtPrice
      : undefined;
  const inventory = parseInteger(row.Stock, row, "stock") ?? 0;
  const condition = mapCondition(row);
  const availability: ProductAvailability = inventory === 0 ? "SOLD" : "AVAILABLE";
  const externalChannels = mapExternalChannels(row["Canal de venta"], row);
  const marketplaceChannels = externalChannels.filter(
    (channel) => channel === "WALLAPOP" || channel === "VINTED"
  );
  if (marketplaceChannels.length > 1) {
    warn(row, "solo se puede asociar una URL a Wallapop o Vinted; se usará el primer canal");
  }
  const externalChannel = marketplaceChannels[0] ?? externalChannels[0];
  const usesExternalUrl = externalChannel === "WALLAPOP" || externalChannel === "VINTED";
  const externalUrl = usesExternalUrl
    ? validExternalUrl(row["URL de venta"], row, true)
    : undefined;
  const features = [row["Característica 1"], row["Característica 2"]]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));
  const images = mapImages(row, title);
  const featured = isYes(row.Destacado);
  const fallbackImage = getProductFallbackImage({ title, category });

  return {
    published: isYes(row.Publicado),
    product: {
      id,
      slug,
      title,
      brand: row.Marca?.trim() || undefined,
      category,
      subcategory: row["Subcategoría"]?.trim() || undefined,
      shortDescription: row["Descripción corta"]?.trim() || undefined,
      description:
        row["Descripción completa"]?.trim() || row["Descripción corta"]?.trim() || "",
      features,
      price,
      compareAtPrice,
      images,
      featuredImage: images[0] ?? fallbackImage,
      tags: [row.Marca, category, row["Subcategoría"]]
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
      inventory,
      availability,
      externalChannel,
      externalUrl,
      whatsappEnabled: externalChannels.includes("WHATSAPP"),
      condition,
      reviewed: condition === "Reacondicionado",
      featured,
      createdAt: "1970-01-01T00:00:00.000Z",
    },
  };
}
