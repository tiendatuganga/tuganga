"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { CloseIcon, UserIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup";

const inputClasses =
  "w-full rounded-xl border border-tg-lavender/50 bg-tg-offwhite px-4 py-2.5 text-sm text-tg-ink placeholder:text-tg-ink/35 focus:border-tg-primary focus:outline-none";

export function AccountDrawer() {
  const { user, isDrawerOpen, closeAuth, signUp, signIn, signOut, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  function switchMode(next: AuthMode) {
    setMode(next);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const resultError =
      mode === "signup" ? await signUp(name, email, password) : await signIn(email, password);
    setSubmitting(false);
    if (resultError) {
      setError(resultError);
    } else {
      setPassword("");
    }
  }

  async function handleSignOut() {
    await signOut();
    setMode("signin");
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            key="account-overlay"
            className="fixed inset-0 z-50 bg-tg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeAuth}
          />
          <motion.aside
            key="account-drawer"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Tu cuenta"
          >
            <div className="flex items-center justify-between border-b border-tg-lavender-soft px-6 py-5">
              <h2 className="font-display text-lg font-semibold text-tg-ink">Tu cuenta</h2>
              <button
                type="button"
                onClick={closeAuth}
                aria-label="Cerrar cuenta"
                className="text-tg-ink/60 transition-colors hover:text-tg-primary"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-1 items-center justify-center" aria-live="polite">
                <UserIcon className="h-10 w-10 animate-pulse text-tg-lavender" />
              </div>
            ) : user ? (
              <div className="flex flex-1 flex-col px-6 py-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tg-primary font-display text-xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-semibold text-tg-ink">{user.name}</p>
                    <p className="truncate text-sm text-tg-ink/50">{user.email}</p>
                  </div>
                </div>
                <p className="mt-6 rounded-xl bg-tg-lavender-soft px-4 py-3 text-xs leading-relaxed text-tg-ink/60">
                  Esta es una cuenta de demostración: tus datos se guardan solo en este navegador.
                </p>
                <div className="mt-auto pt-8">
                  <Button variant="secondary" className="w-full" onClick={() => void handleSignOut()}>
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="grid grid-cols-2 gap-2 rounded-full bg-tg-lavender-soft p-1">
                  {(["signin", "signup"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => switchMode(option)}
                      aria-pressed={mode === option}
                      className={cn(
                        "rounded-full py-2 text-sm font-medium transition-colors",
                        mode === option
                          ? "bg-white text-tg-primary shadow-sm"
                          : "text-tg-ink/55 hover:text-tg-ink"
                      )}
                    >
                      {option === "signin" ? "Iniciar sesión" : "Crear cuenta"}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                  {mode === "signup" && (
                    <label className="flex flex-col gap-1.5 text-sm font-medium text-tg-ink">
                      Nombre
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Tu nombre"
                        className={inputClasses}
                      />
                    </label>
                  )}
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-tg-ink">
                    Email
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="tucorreo@ejemplo.com"
                      className={inputClasses}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-tg-ink">
                    Contraseña
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className={inputClasses}
                    />
                  </label>

                  {error && (
                    <p role="alert" className="rounded-xl bg-tg-lavender-soft px-4 py-2.5 text-sm text-tg-primary">
                      {error}
                    </p>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Un momento..." : mode === "signin" ? "Entrar" : "Crear mi cuenta"}
                  </Button>
                </form>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}