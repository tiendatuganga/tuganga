/**
 * Queries y mutations del Storefront API preparadas para cuando se conecte Shopify.
 * Los metafields del namespace "custom" controlan presentación, disponibilidad
 * y el canal externo donde se completa la compra o consulta.
 */

export const PRODUCTS_QUERY = `#graphql
  query Products($first: Int = 20) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        tags
        images(first: 2) {
          nodes {
            url
            altText
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        totalInventory
        collections(first: 1) {
          nodes {
            handle
          }
        }
        metafields(
          identifiers: [
            { namespace: "custom", key: "product_status" }
            { namespace: "custom", key: "featured" }
            { namespace: "custom", key: "home_section" }
            { namespace: "custom", key: "availability" }
            { namespace: "custom", key: "sales_channel" }
            { namespace: "custom", key: "external_url" }
            { namespace: "custom", key: "whatsapp_enabled" }
            { namespace: "custom", key: "condition" }
            { namespace: "custom", key: "reviewed" }
            { namespace: "custom", key: "location" }
          ]
        ) {
          key
          value
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      tags
      images(first: 6) {
        nodes {
          url
          altText
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      totalInventory
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
      collections(first: 1) {
        nodes {
          handle
        }
      }
      metafields(
        identifiers: [
          { namespace: "custom", key: "product_status" }
          { namespace: "custom", key: "featured" }
          { namespace: "custom", key: "home_section" }
          { namespace: "custom", key: "availability" }
          { namespace: "custom", key: "sales_channel" }
          { namespace: "custom", key: "external_url" }
          { namespace: "custom", key: "whatsapp_enabled" }
          { namespace: "custom", key: "condition" }
          { namespace: "custom", key: "reviewed" }
          { namespace: "custom", key: "location" }
        ]
      ) {
        key
        value
      }
    }
  }
`;

export const COLLECTIONS_QUERY = `#graphql
  query Collections($first: Int = 20) {
    collections(first: $first) {
      nodes {
        id
        title
        handle
        description
        image {
          url
          altText
        }
      }
    }
  }
`;

export const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts($handle: String!, $first: Int = 20) {
    collection(handle: $handle) {
      title
      description
      products(first: $first) {
        nodes {
          id
          title
          handle
          images(first: 2) {
            nodes {
              url
              altText
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
