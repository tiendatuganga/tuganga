/**
 * Configuración legal centralizada de TU GANGA.
 *
 * Los valores marcados con LEGAL_PENDING son PLACEHOLDERS: no son datos reales.
 * Sustitúyelos aquí (y solo aquí) cuando estén disponibles los datos del responsable.
 */
export const LEGAL_PENDING = "[DATOS DEL RESPONSABLE PENDIENTES]";

export const legalInfo = {
  siteName: "TU GANGA",
  /** Nombre o razón social del responsable */
  ownerName: LEGAL_PENDING,
  /** NIF / NIE / CIF cuando corresponda */
  taxId: LEGAL_PENDING,
  /** Domicilio del responsable */
  address: LEGAL_PENDING,
  /** Email de contacto legal */
  email: LEGAL_PENDING,
  /** Datos registrales, solo si fueran aplicables */
  registryInfo: LEGAL_PENDING,
} as const;

/** Fecha de última actualización compartida por los documentos legales. */
export const legalLastUpdated = "22 de agosto de 2026";

export interface LegalPageLink {
  href: string;
  label: string;
}

/** Documentos legales publicados. "Configuración de cookies" no va aquí: es un panel, no una página. */
export const LEGAL_PAGES: LegalPageLink[] = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/condiciones-de-uso", label: "Condiciones de uso" },
  { href: "/legal/como-funciona", label: "Cómo funciona TU GANGA" },
  { href: "/legal/compras-externas", label: "Enlaces y compras externas" },
  { href: "/legal/privacidad", label: "Política de privacidad" },
  { href: "/legal/cookies", label: "Política de cookies" },
];
