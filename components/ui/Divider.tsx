import { SparkleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-tg-lavender", className)}>
      <span className="h-px w-16 bg-tg-lavender/60" />
      <SparkleIcon className="h-3.5 w-3.5 text-tg-primary/50" />
      <span className="h-px w-16 bg-tg-lavender/60" />
    </div>
  );
}
