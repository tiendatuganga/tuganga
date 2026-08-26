import type { Product } from "@/types";

const DEFAULT_WHATSAPP_NUMBER = "34614826697";

/** Normaliza cualquier formato (+34 614 82 66 97, 614-826-697…) a dígitos para wa.me. */
function sanitizeNumber(value: string | undefined): string {
  const digits = value?.replace(/\D/g, "") ?? "";
  return digits.length >= 8 ? digits : DEFAULT_WHATSAPP_NUMBER;
}

export function getWhatsAppNumber() {
  return sanitizeNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
}

export function buildWhatsAppLink(message?: string) {
  const baseUrl = `https://wa.me/${getWhatsAppNumber()}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

export function buildWhatsAppProductMessage(product: Pick<Product, "title">, pageUrl: string) {
  const lines = [
    "Hola 👋 Me interesa este producto:",
    "",
    product.title,
    "",
    pageUrl,
    "",
    "¿Sigue disponible?",
  ];
  return lines.join("\n");
}
