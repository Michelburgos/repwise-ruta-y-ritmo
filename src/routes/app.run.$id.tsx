import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Footprints, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/repwise/EmptyState";
import { PageHeader } from "@/components/repwise/PageHeader";
import { RouteMap } from "@/components/repwise/RouteMap";
import { StatGrid } from "@/components/repwise/StatGrid";
import { formatDate, formatDuration, formatKm, formatPace } from "@/lib/format";
import { seo } from "@/lib/seo";
import { actions, useStore } from "@/lib/store";

export const Route = createFileRoute("/app/run/$id")({
  head: () => ({ meta: seo("Carrera", "Recorrido, distancia, tiempo y ritmo de tu carrera.") }),
  component: RunDetail,
});

function RunDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const run = useStore((s) => s.runs.find((r) => r.id === id));

  if (!run) {
    return (
      <>
        <PageHeader title="Carrera" back="/app/run" />
        <div className="px-5">
          <EmptyState icon={<Footprints />} title="Carrera no encontrada" description="Puede que la hayas eliminado." />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title={`${formatKm(run.distanceKm)} km`} eyebrow={formatDate(run.date)} back="/app/run" />
      <div className="space-y-5 px-5">
        <RouteMap points={run.route} />
        <StatGrid
          stats={[
            { label: "km", value: formatKm(run.distanceKm), unit: "km" },
            { label: "tiempo", value: formatDuration(run.durationSec), unit: "tiempo" },
            { label: "ritmo", value: formatPace(run.distanceKm, run.durationSec), unit: "ritmo /km" },
          ]}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="xl" variant="destructive-outline">
              <Trash2 />
              Eliminar carrera
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[350px] rounded-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar esta carrera?</AlertDialogTitle>
              <AlertDialogDescription>
                Se borrarán el recorrido y las estadísticas. No se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={buttonVariants({ variant: "outline" })}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({ variant: "destructive" })}
                onClick={() => {
                  actions.deleteRun(run.id);
                  toast("Carrera eliminada");
                  navigate({ to: "/app/run" });
                }}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
