const STORAGE_KEY = "tuganga_favorites";

export interface FavoritesService {
  getIds(): Promise<string[]>;
  toggle(id: string): Promise<string[]>;
  remove(id: string): Promise<string[]>;
  clear(): Promise<string[]>;
}

class MockFavoritesService implements FavoritesService {
  private readIds(): string[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  private writeIds(ids: string[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }

  async getIds(): Promise<string[]> {
    return this.readIds();
  }

  async toggle(id: string): Promise<string[]> {
    const ids = this.readIds();
    const next = ids.includes(id) ? ids.filter((stored) => stored !== id) : [...ids, id];
    this.writeIds(next);
    return next;
  }

  async remove(id: string): Promise<string[]> {
    const next = this.readIds().filter((stored) => stored !== id);
    this.writeIds(next);
    return next;
  }

  async clear(): Promise<string[]> {
    this.writeIds([]);
    return [];
  }
}

export const favoritesService: FavoritesService = new MockFavoritesService();