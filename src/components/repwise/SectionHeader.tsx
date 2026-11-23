import type { ReactNode } from "react";

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between px-1">
      <h2 className="text-lg font-extrabold">{title}</h2>
      {action}
    </div>
  );
}

export const seeAllClass =
  "rounded-full px-3 py-1 text-sm font-bold text-muted-foreground transition-colors hover:bg-tint hover:text-foreground";
