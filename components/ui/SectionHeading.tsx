import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/icons";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, action, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.22em] text-tg-primary">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-3xl font-bold tracking-tight text-tg-ink sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base leading-relaxed text-tg-muted">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-tg-primary"
        >
          {action.label}
          <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
