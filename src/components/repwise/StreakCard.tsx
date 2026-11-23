import { Check, Flame } from "lucide-react";
import type { Streak } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function StreakCard({ streak }: { streak: Streak }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-card p-5 shadow-card">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-tint" />
      <div className="relative flex items-center gap-4">
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-tint">
          <Flame
            className="animate-flame h-16 w-16 fill-primary text-ink"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>
        <div>
          <p className="font-display text-[44px] font-extrabold leading-none tabular">
            {streak.current}
          </p>
          <p className="mt-1 text-base font-bold">días de racha</p>
        </div>
      </div>

      <ol className="relative mt-5 flex justify-between" aria-label="Semana actual">
        {streak.week.map((d) => (
          <li key={d.label} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full",
                d.status === "done" && "bg-primary text-primary-foreground",
                d.status === "today" && "border-[2.5px] border-ink bg-card",
                d.status === "pending" && "bg-tint",
              )}
            >
              {d.status === "done" && <Check className="h-4 w-4" strokeWidth={3} />}
            </span>
            <span
              className={cn(
                "text-xs font-bold",
                d.status === "today" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {d.label}
            </span>
          </li>
        ))}
      </ol>

      <p className="relative mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
        Mejor racha: <span className="font-bold text-foreground">{streak.best} días</span>
      </p>
    </section>
  );
}
