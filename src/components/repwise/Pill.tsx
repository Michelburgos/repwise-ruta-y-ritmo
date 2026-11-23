import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold tabular [&_svg]:size-3.5",
  {
    variants: {
      tone: {
        tint: "bg-tint text-foreground",
        purple: "bg-primary text-primary-foreground",
        ink: "bg-ink text-ink-foreground",
        outline: "border border-border bg-card text-muted-foreground",
      },
    },
    defaultVariants: { tone: "tint" },
  },
);

export function Pill({
  children,
  tone,
  className,
}: { children: ReactNode; className?: string } & VariantProps<typeof pillVariants>) {
  return <span className={cn(pillVariants({ tone }), className)}>{children}</span>;
}
