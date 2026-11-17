import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: {
    nodes: {
      id: string;
      title: string;
      price: { amount: string; currencyCode: string };
      availableForSale: boolean;
    }[];
  };
}

const TEST_QUERY = `#graphql
  query TestProducts($first: Int = 5) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        availableForSale
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 20) {
          nodes {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const data = await shopifyFetch<{ products: { nodes: ShopifyProductNode[] } }>({
      query: TEST_QUERY,
      variables: { first: 5 },
    });
    const products = data.products.nodes;
    return NextResponse.json({
      ok: true,
      count: products.length,
      products: products.map((product) => ({
        title: product.title,
        handle: product.handle,
        price: product.priceRange.minVariantPrice,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}