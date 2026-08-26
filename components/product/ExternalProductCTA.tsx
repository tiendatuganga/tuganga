import type { Product } from "@/types";
import { ExternalLinkIcon, WhatsAppIcon } from "@/components/ui/icons";
import {
  CHANNEL_BUTTON_STYLES,
  getAvailabilityInfo,
  getProductExternalActions,
  isProductAvailable,
} from "@/lib/external-product";
import { cn } from "@/lib/utils";
import { WhatsAppProductLink } from "@/components/product/WhatsAppProductLink";

interface ExternalProductCTAProps {
  product: Product;
  variant?: "primary" | "compact";
  className?: string;
}

export function ExternalProductCTA({ product, variant = "primary", className }: ExternalProductCTAProps) {
  const actions = getProductExternalActions(product);

  if (actions.length === 0) {
    const availability = getAvailabilityInfo(product);
    const fallbackLabel =
      availability.tone === "gone" && availability.label === "Vendido"
        ? "Producto vendido"
        : availability.tone === "reserved"
          ? "Producto reservado"
          : isProductAvailable(product)
            ? "Canal no configurado"
            : "Producto no disponible";

    return (
      <span
        className={cn(
          variant === "compact"
            ? "block w-full rounded-full bg-tg-ink/10 px-4 py-2.5 text-center text-xs font-semibold text-tg-ink/40"
            : "inline-flex w-full items-center justify-center rounded-full bg-tg-ink/10 px-6 py-3.5 text-sm font-semibold text-tg-ink/45",
          className
        )}
      >
        {fallbackLabel}
      </span>
    );
  }

  return (
    <div className={cn("flex w-full flex-col gap-2.5", className)}>
      {actions.map((action) => {
        const isWhatsApp = action.channel === "WHATSAPP";
        const content = (
          <>
            {isWhatsApp && <WhatsAppIcon className="h-4 w-4 shrink-0" />}
            {action.label}
            {!isWhatsApp && <ExternalLinkIcon className="h-4 w-4 shrink-0 opacity-75" aria-hidden="true" />}
          </>
        );
        const linkProps = {
          target: "_blank",
          rel: "noopener noreferrer external",
          "aria-label": `${action.label}: ${product.title}. Se abre fuera de TU GANGA`,
          className: cn(
            "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors",
            variant === "compact" ? "px-4 py-2.5 text-xs" : "px-6 py-3.5 text-sm",
            action.secondary && !isWhatsApp
              ? "border border-tg-border bg-white text-tg-primary hover:border-tg-primary hover:bg-tg-lavender-soft"
              : CHANNEL_BUTTON_STYLES[action.channel]
          ),
        };

        return isWhatsApp ? (
          <WhatsAppProductLink
            key={`${action.channel}-${action.label}`}
            productTitle={product.title}
            {...linkProps}
          >
            {content}
          </WhatsAppProductLink>
        ) : (
          <a key={`${action.channel}-${action.label}`} href={action.url} {...linkProps}>
            {content}
          </a>
        );
      })}
    </div>
  );
}
