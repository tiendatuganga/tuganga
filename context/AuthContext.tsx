"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthUser } from "@/lib/services/auth-service";
import { authService } from "@/lib/services/auth-service";

interface AuthContextValue {
  user: AuthUser | null;
  isDrawerOpen: boolean;
  isLoading: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    authService.getSession().then((session) => {
      setUser(session);
      setLoading(false);
    });
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const result = await authService.signUp(name, email, password);
    if (result.error) return result.error;
    setUser(result.user);
    setDrawerOpen(false);
    return null;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    if (result.error) return result.error;
    setUser(result.user);
    setDrawerOpen(false);
    return null;
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
    setDrawerOpen(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isDrawerOpen,
      isLoading,
      openAuth: () => setDrawerOpen(true),
      closeAuth: () => setDrawerOpen(false),
      signUp,
      signIn,
      signOut,
    }),
    [user, isDrawerOpen, isLoading, signUp, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}