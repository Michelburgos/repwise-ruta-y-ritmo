import { createFileRoute, Link } from "@tanstack/react-router";
import { ListX, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/repwise/EmptyState";
import { IconTile } from "@/components/repwise/IconTile";
import { PageHeader } from "@/components/repwise/PageHeader";
import { Pill } from "@/components/repwise/Pill";
import { formatDate } from "@/lib/format";
import { seo } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/app/routines/$id")({
  head: () => ({ meta: seo("Rutina", "Ejercicios, series y repeticiones de tu rutina.") }),
  component: RoutineDetail,
});

function RoutineDetail() {
  const { id } = Route.useParams();
  const routine = useStore((s) => s.routines.find((r) => r.id === id));

  if (!routine) {
    return (
      <>
        <PageHeader title="Rutina" back="/app/routines" />
        <div className="px-5">
          <EmptyState
            icon={<ListX />}
            title="Rutina no encontrada"
            description="Puede que la hayas eliminado."
          />
        </div>
      </>
    );
  }

  const n = routine.exercises.length;
  return (
    <>
      <PageHeader
        title={routine.name}
        eyebrow={`${n} ${n === 1 ? "ejercicio" : "ejercicios"} · ${formatDate(routine.createdAt)}`}
        back="/app/routines"
      />
      <div className="space-y-5 px-5">
        {routine.description && (
          <p className="text-[15px] leading-relaxed text-muted-foreground">{routine.description}</p>
        )}

        {n === 0 ? (
          <EmptyState
            icon={<ListX />}
            title="Sin ejercicios"
            description="Esta rutina todavía no tiene ejercicios."
          />
        ) : (
          <ol className="space-y-2.5">
            {routine.exercises.map((ex, i) => (
              <li
                key={ex.id}
                className="flex items-center gap-3 rounded-3xl bg-card p-3 pr-4 shadow-card"
              >
                <IconTile tone="tint" className="font-display text-lg font-extrabold">
                  {i + 1}
                </IconTile>
                <p className="min-w-0 flex-1 truncate font-bold">{ex.name}</p>
                <Pill tone="purple" className="text-sm">
                  {ex.sets}x{ex.reps}
                </Pill>
              </li>
            ))}
          </ol>
        )}

        <Button asChild size="xl">
          <Link to="/app/form">
            <ScanLine />
            Practicar técnica
          </Link>
        </Button>
      </div>
    </>
  );
}
