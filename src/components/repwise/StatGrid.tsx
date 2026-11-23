import { cn } from "@/lib/utils";

export type Stat = { label: string; value: string; unit?: string };

export function StatGrid({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-3 gap-2", className)}>
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl bg-card px-3 py-3 text-center shadow-card">
          <p className="font-display text-2xl font-extrabold leading-none tabular">{s.value}</p>
          <p className="mt-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {s.unit ?? s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
