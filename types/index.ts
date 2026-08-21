export type ProductStatus = "NEW" | "SECOND_LIFE" | "LIMITED" | "FEATURED" | "SALE";
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
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  category: string;
  status: ProductStatus[];
  tags: string[];
  inventory: number;
  availability?: ProductAvailability;
  externalChannel?: ExternalChannel;
  externalUrl?: string;
  whatsappEnabled: boolean;
  condition?: string;
  reviewed?: boolean;
  location?: string;
  delivery?: string;
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
