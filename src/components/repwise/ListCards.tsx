import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Dumbbell, Repeat, Trash2 } from "lucide-react";
import type { Routine, Run, Workout } from "@/lib/mock-data";
import { formatDate, formatDuration, formatKm, formatPace } from "@/lib/format";
import { IconTile } from "./IconTile";
import { Pill } from "./Pill";
import { RouteMap } from "./RouteMap";

const rowClass =
  "flex items-center gap-3 rounded-3xl bg-card p-3 pr-4 shadow-card transition-transform active:scale-[0.99]";

export function RoutineCard({ routine, onDelete }: { routine: Routine; onDelete: () => void }) {
  const n = routine.exercises.length;
  return (
    <div className={rowClass}>
      <Link
        to="/app/routines/$id"
        params={{ id: routine.id }}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        <IconTile tone="tint" className="font-display text-lg font-extrabold">
          {routine.name.charAt(0).toUpperCase()}
        </IconTile>
        <div className="min-w-0">
          <p className="truncate font-bold">{routine.name}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {n} {n === 1 ? "ejercicio" : "ejercicios"} · {formatDate(routine.createdAt)}
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={onDelete}
        aria-label={`Eliminar ${routine.name}`}
        className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl text-destructive transition-colors hover:bg-destructive/10"
      >
        <Trash2 className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link to="/app/history/$id" params={{ id: workout.id }} className={rowClass}>
      <IconTile>
        <Dumbbell />
      </IconTile>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-bold">{workout.name}</p>
          <p className="shrink-0 text-xs text-muted-foreground">{formatDate(workout.date)}</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Pill>
            <Repeat />
            {workout.totalReps} repeticiones
          </Pill>
          <Pill>
            <Clock />
            {workout.durationMin} min
          </Pill>
        </div>
      </div>
    </Link>
  );
}

export function RunCard({ run }: { run: Run }) {
  return (
    <Link to="/app/run/$id" params={{ id: run.id }} className={rowClass}>
      <RouteMap points={run.route} variant="tile" />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{formatDate(run.date)}</p>
        <p className="font-display text-xl font-extrabold tabular">{formatKm(run.distanceKm)} km</p>
        <p className="text-sm text-muted-foreground tabular">
          {formatDuration(run.durationSec)} · {formatPace(run.distanceKm, run.durationSec)} /km
        </p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
  );
}
