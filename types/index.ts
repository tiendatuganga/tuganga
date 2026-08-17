export type ProductStatus = "NEW" | "SECOND_LIFE" | "LIMITED" | "FEATURED" | "SALE";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  category: string;
  status: ProductStatus[];
  tags: string[];
  inventory: number;
  featured: boolean;
  secondLife: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface CartLine {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  lines: CartLine[];
  subtotal: number;
  totalQuantity: number;
}
