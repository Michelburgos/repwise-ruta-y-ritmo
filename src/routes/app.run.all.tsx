import { createFileRoute } from "@tanstack/react-router";
import { Footprints } from "lucide-react";
import { EmptyState } from "@/components/repwise/EmptyState";
import { RunCard } from "@/components/repwise/ListCards";
import { PageHeader } from "@/components/repwise/PageHeader";
import { seo } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/app/run/all")({
  head: () => ({ meta: seo("Todas las carreras", "Historial completo de tus carreras con GPS.") }),
  component: AllRuns,
});

function AllRuns() {
  const runs = useStore((s) => s.runs);
  const total = runs.reduce((s, r) => s + r.distanceKm, 0);
  return (
    <>
      <PageHeader title="Carreras" eyebrow={`${runs.length} carreras · ${total.toFixed(1)} km`} back="/app/run" />
      <div className="space-y-2.5 px-5">
        {runs.length === 0 ? (
          <EmptyState
            icon={<Footprints />}
            title="Aún no has corrido"
            description="Tus carreras guardadas aparecerán aquí."
          />
        ) : (
          runs.map((r) => <RunCard key={r.id} run={r} />)
        )}
      </div>
    </>
  );
}
