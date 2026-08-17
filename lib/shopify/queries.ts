/**
 * Queries y mutations del Storefront API preparadas para cuando se conecte Shopify.
 * `product_status`, `featured` y `home_section` son metafields propios del namespace
 * "tuganga" (ver sección 18 del brief) que controlan los badges y las secciones home.
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
            { namespace: "tuganga", key: "product_status" }
            { namespace: "tuganga", key: "featured" }
            { namespace: "tuganga", key: "home_section" }
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
          { namespace: "tuganga", key: "product_status" }
          { namespace: "tuganga", key: "featured" }
          { namespace: "tuganga", key: "home_section" }
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

export const CART_CREATE_MUTATION = `#graphql
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;
