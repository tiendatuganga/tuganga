import type { Product } from "@/types";
import { productService } from "@/lib/services/product-service";

export interface SearchService {
  search(query: string): Promise<Product[]>;
}

class MockSearchService implements SearchService {
  async search(query: string): Promise<Product[]> {
    return productService.searchProducts(query);
  }
}

export const searchService: SearchService = new MockSearchService();
