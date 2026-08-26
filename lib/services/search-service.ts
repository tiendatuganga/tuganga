import type { Product } from "@/types";
import { normalizeText } from "@/lib/utils";

export interface SearchService {
  search(products: Product[], query: string): Product[];
}

class CatalogSearchService implements SearchService {
  search(products: Product[], query: string): Product[] {
    const normalized = normalizeText(query);
    if (!normalized) return [];

    return products.filter(
      (product) =>
        normalizeText(product.title).includes(normalized) ||
        normalizeText(product.brand ?? "").includes(normalized) ||
        normalizeText(product.category).includes(normalized) ||
        normalizeText(product.subcategory ?? "").includes(normalized)
    );
  }
}

export const searchService: SearchService = new CatalogSearchService();
