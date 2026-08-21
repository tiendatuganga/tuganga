import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

const DEFAULT_WHATSAPP_NUMBER = "34614826697";

/** Normaliza cualquier formato (+34 614 82 66 97, 614-826-697…) a dígitos para wa.me. */
function sanitizeNumber(value: string | undefined): string {
  const digits = value?.replace(/\D/g, "") ?? "";
  return digits.length >= 8 ? digits : DEFAULT_WHATSAPP_NUMBER;
}

export function getWhatsAppNumber() {
  return sanitizeNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
}

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

/** Enlace real de la ficha del producto en la web (el mismo que genera el sitemap). */
export function getProductPageUrl(product: Pick<Product, "slug">) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuganga.es").replace(/\/+$/, "");
  return `${siteUrl}/producto/${product.slug}`;
}

export function buildWhatsAppProductMessage(product: Product) {
  const lines = [
    "¡Hola! Me interesa este producto:",
    "",
    `• ${product.title} — ${formatPrice(product.price)}`,
    "",
    getProductPageUrl(product),
    "",
    "¿Sigue disponible?",
  ];
  return lines.join("\n");
}
