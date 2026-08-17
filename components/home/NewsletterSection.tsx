"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SparkleIcon } from "@/components/ui/icons";

export function NewsletterSection() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
      <SparkleIcon className="mx-auto h-6 w-6 text-tg-primary" />
      <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-tg-ink sm:text-4xl">
        Entérate antes que nadie.
      </h2>
      <p className="mt-3 text-base text-tg-ink/60">
        Nuevos productos y últimas oportunidades directamente en tu correo.
      </p>

      {status === "success" ? (
        <p className="mt-8 text-sm font-semibold text-tg-primary">¡Gracias! Ya formas parte de TU GANGA.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            required
            type="email"
            placeholder="tu@email.com"
            className="w-full rounded-full border border-tg-lavender bg-white px-5 py-3 text-sm text-tg-ink placeholder:text-tg-ink/40 focus:border-tg-primary focus:outline-none"
          />
          <Button type="submit">Suscribirme</Button>
        </form>
      )}
    </section>
  );
}
