import { cn } from "@/lib/utils";
import { SparkleIcon, LoopIcon, BoltIcon, StarIcon, TagIcon } from "@/components/ui/icons";
import type { ProductStatus } from "@/types";
import type { ComponentType, SVGProps } from "react";

const STATUS_CONFIG: Record<
  ProductStatus,
  { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; className: string }
> = {
  NEW: { label: "Nuevo", Icon: SparkleIcon, className: "bg-emerald-500 text-white" },
  SECOND_LIFE: { label: "Segunda vuelta", Icon: LoopIcon, className: "bg-orange-500 text-white" },
  LIMITED: { label: "Últimas unidades", Icon: BoltIcon, className: "bg-tg-dark text-white" },
  FEATURED: { label: "Destacado", Icon: StarIcon, className: "bg-white text-tg-primary ring-1 ring-inset ring-tg-primary/25" },
  SALE: { label: "Oferta", Icon: TagIcon, className: "bg-tg-purple text-white" },
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
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm backdrop-blur-sm",
        statusClassName,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
