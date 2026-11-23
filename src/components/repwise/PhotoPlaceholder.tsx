import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export function PhotoPlaceholder({
  label,
  caption,
  selected,
  size = "lg",
  onClick,
}: {
  label?: string;
  caption?: string;
  selected?: boolean;
  size?: "lg" | "sm" | "md";
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden border-2 bg-tint text-muted-foreground transition-all",
        size === "lg" && "aspect-[3/4] gap-2 rounded-3xl",
        size === "md" && "aspect-[3/4] gap-1 rounded-2xl",
        size === "sm" && "aspect-square rounded-2xl",
        selected ? "border-ink ring-4 ring-primary" : "border-dashed border-border",
        onClick && "cursor-pointer",
      )}
    >
      {label && (
        <span className="absolute left-2.5 top-2.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-ink-foreground">
          {label}
        </span>
      )}
      <Camera className={size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-8 w-8"} />
      {caption && (
        <span className={cn("font-bold", size === "lg" ? "text-sm text-foreground" : "text-[11px]")}>
          {caption}
        </span>
      )}
    </Comp>
  );
}
