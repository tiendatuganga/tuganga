import type { Product, ProductCondition } from "@/types";
import { getCatalogProducts } from "@/lib/catalog/products";
import { categoryService } from "@/lib/services/category-service";
import { normalizeText } from "@/lib/utils";

export interface ProductService {
  getAllProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getNewProducts(limit?: number): Promise<Product[]>;
  getProductsByCondition(condition: ProductCondition, limit?: number): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getLimitedProducts(limit?: number): Promise<Product[]>;
  getSaleProducts(limit?: number): Promise<Product[]>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  getRelatedProducts(product: Product, limit?: number): Promise<Product[]>;
}

class CatalogProductService implements ProductService {
  async getAllProducts(): Promise<Product[]> {
    return getCatalogProducts();
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return (await this.getAllProducts()).find((product) => product.slug === slug) ?? null;
  }

  async getNewProducts(limit = 8): Promise<Product[]> {
    return this.getProductsByCondition("Nuevo", limit);
  }

  async getProductsByCondition(condition: ProductCondition, limit = 8): Promise<Product[]> {
    return (await this.getAllProducts()).filter((product) => product.condition === condition).slice(0, limit);
  }

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    return (await this.getAllProducts()).filter((product) => product.featured).slice(0, limit);
  }

  async getLimitedProducts(limit = 8): Promise<Product[]> {
    return (await this.getAllProducts()).filter((product) => product.inventory === 1).slice(0, limit);
  }

  async getSaleProducts(limit = 8): Promise<Product[]> {
    return (await this.getAllProducts())
      .filter(
        (product) =>
          product.price !== null &&
          product.compareAtPrice !== undefined &&
          product.compareAtPrice > product.price
      )
      .slice(0, limit);
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    const category = await categoryService.getCategoryBySlug(categorySlug);
    if (!category) return [];
    return (await this.getAllProducts()).filter((product) => product.category === category.title);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const normalized = normalizeText(query);
    if (!normalized) return [];
    return (await this.getAllProducts()).filter(
      (product) =>
        normalizeText(product.title).includes(normalized) ||
        normalizeText(product.brand ?? "").includes(normalized) ||
        normalizeText(product.category ?? "").includes(normalized) ||
        normalizeText(product.subcategory ?? "").includes(normalized) ||
        product.tags.some((tag) => normalizeText(tag).includes(normalized))
    );
  }

  async getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
    if (!product.category) return [];
    return (await this.getAllProducts())
      .filter((candidate) => candidate.id !== product.id && candidate.category === product.category)
      .slice(0, limit);
  }
}

export const productService: ProductService = new CatalogProductService();
