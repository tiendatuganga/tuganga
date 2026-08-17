"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/icons";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ quantity, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-tg-lavender/70">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className="flex h-11 w-11 items-center justify-center text-tg-ink/60 transition-colors hover:text-tg-primary"
        aria-label="Reducir cantidad"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-tg-ink" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="flex h-11 w-11 items-center justify-center text-tg-ink/60 transition-colors hover:text-tg-primary"
        aria-label="Aumentar cantidad"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
