import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/repwise/EmptyState";
import { PageHeader } from "@/components/repwise/PageHeader";
import { Pill } from "@/components/repwise/Pill";
import { StatGrid } from "@/components/repwise/StatGrid";
import { formatDate, tempoLabel } from "@/lib/format";
import { seo } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/app/history/$id")({
  head: () => ({ meta: seo("Entrenamiento", "Repeticiones y ritmo de cada ejercicio.") }),
  component: WorkoutDetail,
});

function WorkoutDetail() {
  const { id } = Route.useParams();
  const workout = useStore((s) => s.workouts.find((w) => w.id === id));

  if (!workout) {
    return (
      <>
        <PageHeader title="Entrenamiento" back="/app/history" />
        <div className="px-5">
          <EmptyState icon={<Dumbbell />} title="No encontrado" description="Este entrenamiento ya no existe." />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title={workout.name} eyebrow={formatDate(workout.date)} back="/app/history" />
      <div className="space-y-5 px-5">
        <StatGrid
          stats={[
            { label: "Reps", value: String(workout.totalReps), unit: "repeticiones" },
            { label: "Min", value: String(workout.durationMin), unit: "minutos" },
            { label: "Ej", value: String(workout.exercises.length), unit: "ejercicios" },
          ]}
        />

        <ul className="space-y-2.5">
          {workout.exercises.map((ex) => (
            <li key={ex.name} className="rounded-3xl bg-card p-4 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-bold">{ex.name}</p>
                <Pill tone={ex.rating === "bueno" ? "purple" : "outline"}>{tempoLabel[ex.rating]}</Pill>
              </div>
              <div className="mt-3 flex gap-6">
                <div>
                  <p className="font-display text-2xl font-extrabold tabular">{ex.reps}</p>
                  <p className="text-xs font-bold text-muted-foreground">repeticiones</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold tabular">
                    {ex.tempo.toFixed(1)}
                    <span className="ml-0.5 text-sm">s</span>
                  </p>
                  <p className="text-xs font-bold text-muted-foreground">tempo por rep</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Button asChild size="xl">
          <Link to="/app/form">
            <Repeat />
            Repetir rutina
          </Link>
        </Button>
      </div>
    </>
  );
}
