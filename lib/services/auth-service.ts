export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthResult {
  user: AuthUser | null;
  error?: string;
}

const USERS_KEY = "tuganga_users";
const SESSION_KEY = "tuganga_session";

interface StoredUser extends AuthUser {
  password: string;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

class MockAuthService {
  private readUsers(): StoredUser[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(USERS_KEY);
      return raw ? (JSON.parse(raw) as StoredUser[]) : [];
    } catch {
      return [];
    }
  }

  private writeUsers(users: StoredUser[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private readSession(): AuthUser | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }

  private writeSession(user: AuthUser | null) {
    if (typeof window === "undefined") return;
    if (user) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }

  async getSession(): Promise<AuthUser | null> {
    return this.readSession();
  }

  async signUp(name: string, email: string, password: string): Promise<AuthResult> {
    const normalized = normalizeEmail(email);
    const users = this.readUsers();
    if (users.some((user) => user.email === normalized)) {
      return { user: null, error: "Ya existe una cuenta con ese email." };
    }
    const user = { name: name.trim(), email: normalized };
    this.writeUsers([...users, { ...user, password }]);
    this.writeSession(user);
    return { user };
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    const normalized = normalizeEmail(email);
    const user = this.readUsers().find(
      (candidate) => candidate.email === normalized && candidate.password === password
    );
    if (!user) {
      return { user: null, error: "Email o contraseña incorrectos." };
    }
    const sessionUser = { name: user.name, email: user.email };
    this.writeSession(sessionUser);
    return { user: sessionUser };
  }

  async signOut(): Promise<void> {
    this.writeSession(null);
  }
}

export const authService = new MockAuthService();