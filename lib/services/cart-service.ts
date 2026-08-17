import type { Cart, CartLine, Product } from "@/types";

const STORAGE_KEY = "tuganga_cart";

export interface CartService {
  getCart(): Promise<Cart>;
  addLine(product: Product, quantity?: number): Promise<Cart>;
  updateLineQuantity(lineId: string, quantity: number): Promise<Cart>;
  removeLine(lineId: string): Promise<Cart>;
  clearCart(): Promise<Cart>;
}

function computeTotals(lines: CartLine[]): Pick<Cart, "subtotal" | "totalQuantity"> {
  return {
    subtotal: lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
  };
}

class MockCartService implements CartService {
  private readLines(): CartLine[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartLine[]) : [];
    } catch {
      return [];
    }
  }

  private writeLines(lines: CartLine[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }

  private toCart(lines: CartLine[]): Cart {
    return { lines, ...computeTotals(lines) };
  }

  async getCart(): Promise<Cart> {
    return this.toCart(this.readLines());
  }

  async addLine(product: Product, quantity = 1): Promise<Cart> {
    const lines = this.readLines();
    const existing = lines.find((line) => line.product.id === product.id);
    const nextLines = existing
      ? lines.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line
        )
      : [...lines, { id: product.id, product, quantity }];
    this.writeLines(nextLines);
    return this.toCart(nextLines);
  }

  async updateLineQuantity(lineId: string, quantity: number): Promise<Cart> {
    const lines = this.readLines();
    const nextLines =
      quantity <= 0
        ? lines.filter((line) => line.id !== lineId)
        : lines.map((line) => (line.id === lineId ? { ...line, quantity } : line));
    this.writeLines(nextLines);
    return this.toCart(nextLines);
  }

  async removeLine(lineId: string): Promise<Cart> {
    const nextLines = this.readLines().filter((line) => line.id !== lineId);
    this.writeLines(nextLines);
    return this.toCart(nextLines);
  }

  async clearCart(): Promise<Cart> {
    this.writeLines([]);
    return this.toCart([]);
  }
}

export const cartService: CartService = new MockCartService();
