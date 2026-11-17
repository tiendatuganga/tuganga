export type ProductCategory =
  | "Hogar"
  | "Electrónica"
  | "Salud y Cuidado Personal"
  | "Belleza"
  | "Accesorios"
  | "Herramientas";
export type ProductCondition = "Nuevo" | "Como nuevo" | "Reacondicionado";
export type ProductAvailability = "AVAILABLE" | "RESERVED" | "SOLD";
export type ExternalChannel = "WALLAPOP" | "VINTED" | "WHATSAPP";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number | null;
  compareAtPrice?: number;
  images: ProductImage[];
  featuredImage?: ProductImage;
  category: ProductCategory | null;
  subcategory?: string;
  brand?: string;
  shortDescription?: string;
  features?: string[];
  tags: string[];
  inventory: number;
  availability?: ProductAvailability;
  externalChannel?: ExternalChannel;
  externalUrl?: string;
  whatsappEnabled: boolean;
  condition: ProductCondition | null;
  reviewed?: boolean;
  location?: string;
  delivery?: string;
  featured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  title: ProductCategory;
  slug: string;
  description: string;
  image: string;
}
