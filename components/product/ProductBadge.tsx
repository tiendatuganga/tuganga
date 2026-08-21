import { cn } from "@/lib/utils";
import { SparkleIcon, LoopIcon, BoltIcon, StarIcon, TagIcon } from "@/components/ui/icons";
import type { ProductStatus } from "@/types";
import type { ComponentType, SVGProps } from "react";

const STATUS_CONFIG: Record<
  ProductStatus,
  { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; className: string }
> = {
  NEW: { label: "Nuevo", Icon: SparkleIcon, className: "border border-emerald-200 bg-emerald-50 text-emerald-800" },
  SECOND_LIFE: { label: "Segunda vuelta", Icon: LoopIcon, className: "border border-orange-200 bg-orange-50 text-orange-800" },
  LIMITED: { label: "Últimas unidades", Icon: BoltIcon, className: "border border-tg-dark bg-tg-dark text-white" },
  FEATURED: { label: "Destacado", Icon: StarIcon, className: "border border-tg-lavender bg-white text-tg-primary" },
  SALE: { label: "Oferta", Icon: TagIcon, className: "border border-tg-purple bg-tg-lavender-soft text-tg-purple" },
};

const PRIORITY: ProductStatus[] = ["SECOND_LIFE", "LIMITED", "NEW", "FEATURED", "SALE"];

export function primaryStatus(statuses: ProductStatus[]): ProductStatus | null {
  for (const status of PRIORITY) {
    if (statuses.includes(status)) return status;
  }
  return statuses[0] ?? null;
}

export function ProductBadge({ status, className }: { status: ProductStatus; className?: string }) {
  const { label, Icon, className: statusClassName } = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
        statusClassName,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
