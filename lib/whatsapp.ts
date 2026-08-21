import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

const DEFAULT_WHATSAPP_NUMBER = "34614826697";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuganga.es";
}

export function getWhatsAppNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER;
}

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppProductMessage(product: Product) {
  return `¡Hola! Me interesa este producto:\n\n• ${product.title} — ${formatPrice(
    product.price
  )}\n${getSiteUrl()}/producto/${product.slug}\n\n¿Sigue disponible?`;
}
