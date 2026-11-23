import { cn } from "@/lib/utils";

export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative grid place-items-center rounded-2xl bg-primary text-primary-foreground",
          lg ? "h-16 w-16 rounded-3xl" : "h-10 w-10",
        )}
      >
        <span className={cn("font-display font-extrabold", lg ? "text-4xl" : "text-2xl")}>R</span>
        <span
          className={cn(
            "absolute rounded-full bg-ink",
            lg ? "right-3 top-3 h-2.5 w-2.5" : "right-2 top-2 h-1.5 w-1.5",
          )}
        />
      </div>
      <span className={cn("font-display font-extrabold", lg ? "text-4xl" : "text-xl")}>
        Repwise
      </span>
    </div>
  );
}
