import type { Category } from "@/types";
import { mockCategories } from "@/data/mock/categories";

export interface CategoryService {
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
}

class MockCategoryService implements CategoryService {
  private readonly categories: Category[] = mockCategories;

  async getAllCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return this.categories.find((category) => category.slug === slug) ?? null;
  }
}

export const categoryService: CategoryService = new MockCategoryService();
