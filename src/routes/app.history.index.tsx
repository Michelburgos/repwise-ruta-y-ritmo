import { createFileRoute } from "@tanstack/react-router";
import { Dumbbell } from "lucide-react";
import { EmptyState } from "@/components/repwise/EmptyState";
import { WorkoutCard } from "@/components/repwise/ListCards";
import { PageHeader } from "@/components/repwise/PageHeader";
import { seo } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/app/history/")({
  head: () => ({ meta: seo("Historial", "Todos tus entrenamientos anteriores.") }),
  component: HistoryPage,
});

function HistoryPage() {
  const workouts = useStore((s) => s.workouts);
  return (
    <>
      <PageHeader title="Historial" eyebrow={`${workouts.length} entrenamientos`} back="/app/routines" />
      <div className="space-y-2.5 px-5">
        {workouts.length === 0 ? (
          <EmptyState
            icon={<Dumbbell />}
            title="Sin entrenamientos"
            description="Termina una serie en modo técnica y aparecerá aquí."
          />
        ) : (
          workouts.map((w) => <WorkoutCard key={w.id} workout={w} />)
        )}
      </div>
    </>
  );
}
