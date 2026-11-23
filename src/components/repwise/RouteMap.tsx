import type { Point } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function toPath(points: Point[], yScale: number) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y * yScale}`).join(" ");
}

/** Map placeholder: tinted grid with abstract streets and the route drawn on top. */
export function RouteMap({
  points,
  progress = 1,
  variant = "full",
  className,
  live = false,
}: {
  points: Point[];
  progress?: number;
  variant?: "full" | "tile";
  className?: string;
  live?: boolean;
}) {
  const tile = variant === "tile";
  const visible = Math.max(0, Math.min(1, progress)) * 100;
  const end = pointAt(points, progress);
  const start = points[0];
  // Full map is 4:3, so the 100x100 route box is squashed to 100x75 to keep strokes uniform.
  const yScale = tile ? 1 : 0.75;
  const d = toPath(points, yScale);

  return (
    <div
      className={cn(
        "map-grid relative overflow-hidden",
        tile ? "h-14 w-14 rounded-2xl" : "aspect-[4/3] w-full rounded-3xl",
        className,
      )}
      role="img"
      aria-label="Mapa del recorrido"
    >
      <svg viewBox={`0 0 100 ${100 * yScale}`} className="absolute inset-0 h-full w-full">
        {!tile && (
          <g className="stroke-card" strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path d="M-5 22 Q 40 30 105 14" />
            <path d="M30 -5 Q 38 38 22 80" />
            <path d="M-5 54 Q 50 45 105 62" />
            <path d="M70 -5 Q 62 38 82 80" />
          </g>
        )}
        <path
          d={d}
          fill="none"
          className="stroke-ink/15"
          strokeWidth={tile ? 4 : 1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={d}
          fill="none"
          pathLength={100}
          strokeDasharray={`${visible} 100`}
          className="stroke-ink"
          strokeWidth={tile ? 4.5 : 1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke-dasharray 0.9s linear" }}
        />
      </svg>
      {!tile && start && (
        <Dot x={start[0]} y={start[1]} className="h-3 w-3 border-2 border-ink bg-card" />
      )}
      {!tile && end && progress > 0 && (
        <Dot
          x={end[0]}
          y={end[1]}
          className={cn("h-5 w-5 border-[3px] border-ink bg-primary", live && "animate-pulse-ring")}
        />
      )}
    </div>
  );
}

function Dot({ x, y, className }: { x: number; y: number; className?: string }) {
  return (
    <span
      className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-full", className)}
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  );
}

function pointAt(points: Point[], t: number): Point | undefined {
  if (points.length < 2) return points[0];
  const segs = points.slice(1).map((p, i) => {
    const a = points[i]!;
    return { a, b: p, len: Math.hypot(p[0] - a[0], p[1] - a[1]) };
  });
  const total = segs.reduce((s, x) => s + x.len, 0);
  let target = Math.max(0, Math.min(1, t)) * total;
  for (const s of segs) {
    if (target <= s.len) {
      const k = s.len === 0 ? 0 : target / s.len;
      return [s.a[0] + (s.b[0] - s.a[0]) * k, s.a[1] + (s.b[1] - s.a[1]) * k];
    }
    target -= s.len;
  }
  return points[points.length - 1];
}
