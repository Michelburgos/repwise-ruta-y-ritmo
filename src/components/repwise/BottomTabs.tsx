import { Link, useLocation } from "@tanstack/react-router";
import { Dumbbell, Footprints, ScanLine, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/app/routines", label: "Rutinas", icon: Dumbbell, match: ["/app/routines", "/app/history"] },
  { to: "/app/form", label: "Técnica", icon: ScanLine, match: ["/app/form"] },
  { to: "/app/run", label: "Correr", icon: Footprints, match: ["/app/run"] },
  { to: "/app/progress", label: "Progreso", icon: TrendingUp, match: ["/app/progress"] },
] as const;

export function BottomTabs() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[430px] px-4 pb-4"
    >
      <ul className="flex items-center justify-between rounded-[28px] bg-ink px-3 py-2.5 shadow-float">
        {tabs.map(({ to, label, icon: Icon, match }) => {
          const active = match.some((m) => pathname.startsWith(m));
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-full transition-colors",
                    active ? "bg-primary text-primary-foreground" : "text-ink-muted",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                </span>
                <span
                  className={cn(
                    "text-[11px] font-bold",
                    active ? "text-ink-foreground" : "text-ink-muted",
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
