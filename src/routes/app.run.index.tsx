import { createFileRoute, Link } from "@tanstack/react-router";
import { Footprints, Play, Satellite, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/repwise/EmptyState";
import { RunCard } from "@/components/repwise/ListCards";
import { PageHeader } from "@/components/repwise/PageHeader";
import { Pill } from "@/components/repwise/Pill";
import { RouteMap } from "@/components/repwise/RouteMap";
import { SectionHeader, seeAllClass } from "@/components/repwise/SectionHeader";
import { StatGrid } from "@/components/repwise/StatGrid";
import { formatDuration, formatKm, formatPace } from "@/lib/format";
import { liveRoute } from "@/lib/mock-data";
import { seo } from "@/lib/seo";
import { actions, useStore } from "@/lib/store";

export const Route = createFileRoute("/app/run/")({
  head: () => ({ meta: seo("Correr", "Graba tus carreras con GPS: distancia, tiempo y ritmo.") }),
  component: RunPage,
});

/** Simulated GPS speed: ~5:10 min/km */
const KM_PER_SEC = 1 / 310;

function RunPage() {
  const runs = useStore((s) => s.runs);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((Date.now() - startedAt.current) / 1000), 1000);
    return () => clearInterval(t);
  }, [running]);

  const distance = elapsed * KM_PER_SEC;

  function start() {
    startedAt.current = Date.now();
    setElapsed(0);
    setRunning(true);
  }

  function finish() {
    setRunning(false);
    actions.addRun({ distanceKm: Math.max(distance, 0.01), durationSec: Math.max(elapsed, 1), route: liveRoute });
    setElapsed(0);
    toast.success("Carrera guardada");
  }

  return (
    <>
      <PageHeader
        title="Correr"
        eyebrow="GPS"
        action={
          <Pill tone={running ? "ink" : "tint"} className="mb-1.5">
            <Satellite />
            {running ? "Grabando" : "GPS listo"}
          </Pill>
        }
      />
      <div className="space-y-5 px-5">
        <RouteMap points={liveRoute} progress={running ? Math.min(1, elapsed / 120) : 0} live={running} />

        <StatGrid
          stats={[
            { label: "km", value: formatKm(distance), unit: "km" },
            { label: "tiempo", value: formatDuration(elapsed), unit: "tiempo" },
            { label: "ritmo", value: formatPace(distance, elapsed), unit: "ritmo /km" },
          ]}
        />

        {running ? (
          <Button size="xl" variant="destructive" onClick={finish}>
            <Square className="fill-current" />
            Terminar y guardar
          </Button>
        ) : (
          <Button size="xl" onClick={start}>
            <Play className="fill-current" />
            Iniciar carrera
          </Button>
        )}

        <section className="pt-2">
          <SectionHeader
            title="Carreras recientes"
            action={
              runs.length > 0 && (
                <Link to="/app/run/all" className={seeAllClass}>
                  Ver todas
                </Link>
              )
            }
          />
          {runs.length === 0 ? (
            <EmptyState
              icon={<Footprints />}
              title="Aún no has corrido"
              description="Pulsa Iniciar carrera y tu recorrido aparecerá aquí."
            />
          ) : (
            <div className="space-y-2.5">
              {runs.slice(0, 4).map((r) => (
                <RunCard key={r.id} run={r} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
