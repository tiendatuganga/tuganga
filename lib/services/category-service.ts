import type { Category, ProductCategory } from "@/types";
import { mockCategories } from "@/data/mock/categories";

const LEGACY_SLUGS: Record<string, string> = {
  tecnologia: "electronica",
  ocio: "herramientas",
};

export interface CategoryService {
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getCategoryByTitle(title: ProductCategory): Promise<Category | null>;
}

class MockCategoryService implements CategoryService {
  private readonly categories: Category[] = mockCategories;

  async getAllCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const canonicalSlug = LEGACY_SLUGS[slug] ?? slug;
    return this.categories.find((category) => category.slug === canonicalSlug) ?? null;
  }

  async getCategoryByTitle(title: ProductCategory): Promise<Category | null> {
    return this.categories.find((category) => category.title === title) ?? null;
  }
}

export const categoryService: CategoryService = new MockCategoryService();
