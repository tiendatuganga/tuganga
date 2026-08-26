import "server-only";

import { mockProducts } from "@/data/mock/products";
import { fetchGoogleSheetRows } from "@/lib/catalog/google-sheet";
import { mapSheetRow } from "@/lib/catalog/product-mapper";
import type { Product } from "@/types";

export async function getCatalogProducts(): Promise<Product[]> {
  try {
    const mapped = (await fetchGoogleSheetRows()).flatMap((row) => {
      try {
        const result = mapSheetRow(row);
        return result ? [result] : [];
      } catch {
        console.warn("[catálogo Google Sheets] fila descartada por datos inválidos");
        return [];
      }
    });

    return mapped
      .filter(({ published, product }) => published && product.availability !== "SOLD")
      .sort((left, right) => (left.order ?? Number.POSITIVE_INFINITY) - (right.order ?? Number.POSITIVE_INFINITY))
      .map(({ product }) => product);
  } catch (error) {
    console.error(
      "[catálogo Google Sheets] no se pudo cargar el catálogo",
      error instanceof Error ? error.message : "error desconocido"
    );

    if (process.env.NODE_ENV === "development") {
      console.warn("[catálogo Google Sheets] usando catálogo mock temporal en desarrollo");
      return mockProducts;
    }

    return [];
  }
}
