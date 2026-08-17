import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-tg-primary text-white hover:bg-tg-deep",
  secondary: "border border-tg-primary/40 text-tg-primary hover:border-tg-primary hover:bg-tg-primary hover:text-white",
  ghost: "text-tg-ink hover:text-tg-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3",
};

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  onClick,
  disabled,
  className,
  children,
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
