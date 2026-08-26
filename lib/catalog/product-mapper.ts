import type {
  ExternalChannel,
  Product,
  ProductAvailability,
  ProductImage,
  ProductStatus,
} from "@/types";
import { normalizeText } from "@/lib/utils";
import type { SheetRow } from "@/lib/catalog/google-sheet";

const CATEGORY_PLACEHOLDERS = new Set([
  "accesorios",
  "belleza",
  "gadgets",
  "hogar",
  "mascotas",
  "ocio",
  "salud",
  "tecnologia",
]);

export interface MappedSheetProduct {
  product: Product;
  published: boolean;
  order: number | null;
}

function warn(row: SheetRow, message: string) {
  const reference = row.ID?.trim() || row.Slug?.trim() || "fila sin identificar";
  console.warn(`[catálogo Google Sheets] ${reference}: ${message}`);
}

function isYes(value: string | undefined) {
  return normalizeText(value ?? "") === "si";
}

function slugify(value: string) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function placeholderFor(category: string) {
  const slug = CATEGORY_PLACEHOLDERS.has(category) ? category : "gadgets";
  return `/categories/${slug}.svg`;
}

function mapImages(row: SheetRow, title: string, category: string): ProductImage[] {
  const rawImages = row.Fotos?.split("|").map((value) => value.trim()).filter(Boolean) ?? [];
  const images = rawImages.flatMap((value) => {
    const normalized = normalizeGoogleDriveImageUrl(value);
    if (!normalized) {
      warn(row, "URL de foto inválida o no compatible con Google Drive");
      return [];
    }
    return [{ url: normalized, alt: title }];
  });

  return images.length > 0 ? images : [{ url: placeholderFor(category), alt: title }];
}

function mapStatus(row: SheetRow): {
  status: ProductStatus[];
  availability: ProductAvailability;
  reviewed: boolean;
} {
  const values = row.Estado?.split(/[|,;/]+/).map(normalizeText).filter(Boolean) ?? [];
  const status = new Set<ProductStatus>();
  let availability: ProductAvailability = "AVAILABLE";
  let reviewed = false;

  for (const value of values) {
    if (value === "nuevo") status.add("NEW");
    else if (value === "oferta") status.add("SALE");
    else if (value === "destacado") status.add("FEATURED");
    else if (value === "segunda vuelta") status.add("SECOND_LIFE");
    else if (value === "ultimas unidades") status.add("LIMITED");
    else if (value === "revisado") reviewed = true;
    else if (value === "vendido") availability = "SOLD";
    else warn(row, `estado no reconocido: ${value}`);
  }

  if (isYes(row.Destacado)) status.add("FEATURED");
  return { status: [...status], availability, reviewed };
}

function mapExternalChannel(value: string | undefined): ExternalChannel | undefined {
  const normalized = normalizeText(value ?? "");
  if (normalized === "wallapop") return "WALLAPOP";
  if (normalized === "vinted") return "VINTED";
  if (normalized === "whatsapp") return "WHATSAPP";
  return undefined;
}

function validExternalUrl(value: string | undefined, row: SheetRow) {
  const raw = value?.trim();
  if (!raw) return undefined;
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

  const category = slugify(row["Categoría"] ?? "");
  const price = parseNumber(row["Precio (€)"], row, "precio");
  const rawCompareAtPrice = parseNumber(row["Precio anterior (€)"], row, "precio anterior");
  const compareAtPrice =
    price !== null && rawCompareAtPrice !== null && rawCompareAtPrice > price
      ? rawCompareAtPrice
      : undefined;
  const inventory = parseInteger(row.Stock, row, "stock") ?? 0;
  const order = parseInteger(row.Orden, row, "orden");
  const { status, availability: stateAvailability, reviewed } = mapStatus(row);
  const availability = stateAvailability === "SOLD" || inventory === 0 ? "SOLD" : stateAvailability;
  const externalChannel = mapExternalChannel(row["Canal de venta"]);
  const externalUrl = validExternalUrl(row["URL de venta"], row);
  const features = [row["Característica 1"], row["Característica 2"]]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));
  const images = mapImages(row, title, category);
  const featured = isYes(row.Destacado) || status.includes("FEATURED");
  const secondLife = status.includes("SECOND_LIFE");

  return {
    published: isYes(row.Publicado),
    order,
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
      featuredImage: images[0],
      status,
      tags: [row.Marca, row["Categoría"], row["Subcategoría"]]
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
      inventory,
      availability,
      externalChannel,
      externalUrl,
      whatsappEnabled: externalChannel === "WHATSAPP",
      condition: row.Estado?.trim() || undefined,
      reviewed: reviewed || secondLife,
      featured,
      secondLife,
      order: order ?? undefined,
      createdAt: "1970-01-01T00:00:00.000Z",
    },
  };
}
