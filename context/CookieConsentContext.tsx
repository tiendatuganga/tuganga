"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
}

interface ConsentSnapshot extends CookiePreferences {
  /** true cuando el usuario ya guardó una elección alguna vez */
  stored: boolean;
}

const STORAGE_KEY = "tg-cookie-consent-v1";
const SERVER_SNAPSHOT: ConsentSnapshot = { analytics: false, marketing: false, stored: false };

/* Store externo sobre localStorage, leído con useSyncExternalStore para evitar
   desajustes de hidratación y sincronizar entre pestañas. */
let cached: ConsentSnapshot | null = null;
const listeners = new Set<() => void>();

function readSnapshot(): ConsentSnapshot {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: Partial<CookiePreferences> = raw ? JSON.parse(raw) : {};
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      stored: Boolean(raw),
    };
  } catch {
    return { analytics: false, marketing: false, stored: false };
  }
}

function getSnapshot(): ConsentSnapshot {
  if (!cached) cached = readSnapshot();
  return cached;
}

function emitChange() {
  cached = null;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = () => emitChange();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

interface CookieConsentContextValue {
  preferences: CookiePreferences;
  hasStoredConsent: boolean;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  savePreferences: (next: CookiePreferences) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
  const [isPanelOpen, setPanelOpen] = useState(false);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);

  const savePreferences = useCallback((next: CookiePreferences) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Almacenamiento no disponible: la elección solo vive en memoria.
    }
    emitChange();
    setPanelOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      preferences: { analytics: snapshot.analytics, marketing: snapshot.marketing },
      hasStoredConsent: snapshot.stored,
      isPanelOpen,
      openPanel,
      closePanel,
      savePreferences,
    }),
    [snapshot.analytics, snapshot.marketing, snapshot.stored, isPanelOpen, openPanel, closePanel, savePreferences]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent debe usarse dentro de CookieConsentProvider");
  }
  return context;
}
