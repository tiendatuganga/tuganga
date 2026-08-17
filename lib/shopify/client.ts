const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2025-01";

export function isShopifyConfigured(): boolean {
  return Boolean(STORE_DOMAIN && STOREFRONT_ACCESS_TOKEN);
}

interface ShopifyFetchParams<TVariables> {
  query: string;
  variables?: TVariables;
}

interface ShopifyGraphQLError {
  message: string;
}

/**
 * Cliente mínimo para el Shopify Storefront API (GraphQL).
 * No se usa todavía: los `ProductService`/`CategoryService`/`CartService` activos
 * son los Mock. Cuando se conecte Shopify, se implementarán
 * `ShopifyProductService` etc. sobre esta función.
 */
export async function shopifyFetch<TResponse, TVariables = Record<string, unknown>>({
  query,
  variables,
}: ShopifyFetchParams<TVariables>): Promise<TResponse> {
  if (!isShopifyConfigured()) {
    throw new Error(
      "Shopify no está configurado. Define SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN en tu .env para conectar el Storefront API."
    );
  }

  const endpoint = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront API respondió con estado ${response.status}`);
  }

  const json = (await response.json()) as { data?: TResponse; errors?: ShopifyGraphQLError[] };

  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join(", "));
  }

  return json.data as TResponse;
}
