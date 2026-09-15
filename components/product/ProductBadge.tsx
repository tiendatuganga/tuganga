import { cn } from "@/lib/utils";
import { SparkleIcon, LoopIcon, StarIcon } from "@/components/ui/icons";
import type { ProductCondition } from "@/types";
import type { ComponentType, SVGProps } from "react";

const STATUS_CONFIG: Record<
  ProductCondition,
  { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; className: string }
> = {
  Nuevo: { label: "Nuevo", Icon: SparkleIcon, className: "border border-emerald-200 bg-emerald-50 text-emerald-800" },
  "Como nuevo": { label: "Como nuevo", Icon: StarIcon, className: "border border-tg-lavender bg-white text-tg-primary" },
  Reacondicionado: { label: "Reacondicionado", Icon: LoopIcon, className: "border border-orange-200 bg-orange-50 text-orange-800" },
};

export function ProductBadge({ condition, className }: { condition: ProductCondition; className?: string }) {
  const { label, Icon, className: statusClassName } = STATUS_CONFIG[condition];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide",
        statusClassName,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
