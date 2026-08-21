import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CategoryNavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

interface CategoryNavigationProps {
  items: CategoryNavigationItem[];
  label?: string;
  tone?: "brand" | "accent";
  className?: string;
}

export function CategoryNavigation({
  items,
  label = "Explorar",
  tone = "brand",
  className,
}: CategoryNavigationProps) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "overflow-x-auto border-y border-tg-border bg-tg-offwhite [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2.5 whitespace-nowrap px-5 py-5 sm:px-8">
        <span className="mr-2 hidden text-[11px] font-bold uppercase tracking-[0.18em] text-tg-muted sm:inline">
          {label}
        </span>
        {items.map((item) => (
          <Link
            key={`${item.href}-${item.label}`}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200",
              item.active
                ? tone === "accent"
                  ? "border-tg-accent bg-tg-accent text-white"
                  : "border-tg-primary bg-tg-primary text-white"
                : tone === "accent"
                  ? "border-tg-border bg-white text-tg-ink/75 hover:border-tg-accent hover:bg-tg-accent-soft hover:text-tg-accent-strong"
                  : "border-tg-border bg-white text-tg-ink/75 hover:border-tg-lavender hover:bg-tg-lavender-soft hover:text-tg-primary"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
