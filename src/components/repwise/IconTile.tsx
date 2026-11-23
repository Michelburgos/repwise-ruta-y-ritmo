import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tileVariants = cva("grid shrink-0 place-items-center", {
  variants: {
    tone: {
      purple: "bg-primary text-primary-foreground",
      tint: "bg-tint text-foreground",
      ink: "bg-ink text-ink-foreground",
    },
    size: {
      sm: "h-9 w-9 rounded-xl [&_svg]:size-4",
      md: "h-12 w-12 rounded-2xl [&_svg]:size-5",
      lg: "h-14 w-14 rounded-2xl [&_svg]:size-6",
    },
  },
  defaultVariants: { tone: "purple", size: "md" },
});

export function IconTile({
  children,
  className,
  tone,
  size,
}: { children: ReactNode; className?: string } & VariantProps<typeof tileVariants>) {
  return <div className={cn(tileVariants({ tone, size }), className)}>{children}</div>;
}
