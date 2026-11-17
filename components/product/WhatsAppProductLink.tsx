"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { buildWhatsAppLink, buildWhatsAppProductMessage } from "@/lib/whatsapp";

interface WhatsAppProductLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  productTitle: string;
  children: ReactNode;
}

export function WhatsAppProductLink({
  productTitle,
  children,
  onClick,
  ...props
}: WhatsAppProductLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    event.preventDefault();
    const currentUrl = window.location.href;
    const whatsappUrl = buildWhatsAppLink(
      buildWhatsAppProductMessage({ title: productTitle }, currentUrl)
    );
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <a href={buildWhatsAppLink()} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
