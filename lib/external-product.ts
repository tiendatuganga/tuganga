import type { ExternalChannel, Product } from "@/types";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export interface ExternalProductAction {
  channel: ExternalChannel;
  url: string;
  label: string;
  secondary: boolean;
}

const CHANNEL_LABELS: Record<ExternalChannel, string> = {
  WALLAPOP: "Ver en Wallapop",
  VINTED: "Ver en Vinted",
  WHATSAPP: "Consultar por WhatsApp",
};

export function isProductAvailable(product: Product): boolean {
  if (product.availability) return product.availability === "AVAILABLE";
  return product.inventory > 0;
}

export type AvailabilityTone = "available" | "urgent" | "reserved" | "gone";

export interface AvailabilityInfo {
  label: string;
  tone: AvailabilityTone;
}

/** Estado natural de una unidad individual: nada de conteos de inventario abstractos. */
export function getAvailabilityInfo(product: Product): AvailabilityInfo {
  const availability = product.availability ?? (product.inventory > 0 ? "AVAILABLE" : "SOLD");

  if (availability === "SOLD") return { label: "Vendido", tone: "gone" };
  if (availability === "RESERVED") return { label: "Reservado", tone: "reserved" };
  if (product.inventory === 1) return { label: "Última unidad", tone: "urgent" };
  return { label: "Disponible", tone: "available" };
}

function parseExternalUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function getExternalChannelName(channel: ExternalChannel): string {
  return channel === "WALLAPOP" ? "Wallapop" : channel === "VINTED" ? "Vinted" : "WhatsApp";
}

/** Colores de marca por canal para botones CTA. */
export const CHANNEL_BUTTON_STYLES: Record<ExternalChannel, string> = {
  WHATSAPP: "bg-whatsapp text-white hover:bg-whatsapp-strong",
  WALLAPOP: "bg-wallapop text-white hover:bg-wallapop-strong",
  VINTED: "bg-vinted text-white hover:bg-vinted-strong",
};

export function getProductExternalActions(product: Product): ExternalProductAction[] {
  if (!isProductAvailable(product)) return [];

  const actions: ExternalProductAction[] = [];
  const channel = product.externalChannel;
  const configuredUrl = parseExternalUrl(product.externalUrl);

  if (channel === "WHATSAPP" && product.whatsappEnabled) {
    actions.push({
      channel,
      url: buildWhatsAppLink(),
      label: CHANNEL_LABELS.WHATSAPP,
      secondary: false,
    });
  } else if (channel && configuredUrl) {
    actions.push({ channel, url: configuredUrl, label: CHANNEL_LABELS[channel], secondary: false });
  }

  if (product.whatsappEnabled && channel !== "WHATSAPP") {
    actions.push({
      channel: "WHATSAPP",
      url: buildWhatsAppLink(),
      label: "Preguntar por WhatsApp",
      secondary: actions.length > 0,
    });
  }

  return actions;
}
