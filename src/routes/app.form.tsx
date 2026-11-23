import { createFileRoute } from "@tanstack/react-router";
import { Check, Flame, Play, Rabbit, ScanLine, Snail, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { IconTile } from "@/components/repwise/IconTile";
import { PageHeader } from "@/components/repwise/PageHeader";
import { Pill } from "@/components/repwise/Pill";
import { StatGrid } from "@/components/repwise/StatGrid";
import { formatDuration, rateTempo, tempoLabel } from "@/lib/format";
import { formExercise, repIntervals, type TempoRating } from "@/lib/mock-data";
import { seo } from "@/lib/seo";
import { actions } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/form")({
  head: () => ({ meta: seo("Modo técnica", "Cuenta repeticiones y corrige tu ritmo en tiempo real.") }),
  component: FormPage,
});

const feedbackCopy: Record<TempoRating, { hint: string; icon: typeof Check }> = {
  bueno: { hint: "Mantén este tempo en cada repetición.", icon: Check },
  rapido: { hint: "Baja más despacio y controla el peso.", icon: Rabbit },
  lento: { hint: "Sube con más energía, sin pausas largas.", icon: Snail },
};

function FormPage() {
  const [running, setRunning] = useState(false);
  const [reps, setReps] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [rating, setRating] = useState<TempoRating | null>(null);
  const [summary, setSummary] = useState<{ reps: number; time: number; rating: TempoRating } | null>(null);
  const startedAt = useRef(0);

  // Clock
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((Date.now() - startedAt.current) / 1000), 250);
    return () => clearInterval(t);
  }, [running]);

  // Simulated rep detection
  useEffect(() => {
    if (!running) return;
    const gap = repIntervals[reps % repIntervals.length] ?? 2.4;
    const t = setTimeout(() => {
      setReps((r) => r + 1);
      setRating(rateTempo(gap));
    }, gap * 1000);
    return () => clearTimeout(t);
  }, [running, reps]);

  function start() {
    startedAt.current = Date.now();
    setReps(0);
    setElapsed(0);
    setRating(null);
    setRunning(true);
  }

  function stop() {
    setRunning(false);
    const avg = reps > 0 ? elapsed / reps : 0;
    setSummary({ reps, time: elapsed, rating: reps > 0 ? rateTempo(avg) : "bueno" });
  }

  function save() {
    if (!summary) return;
    actions.addWorkout({
      routineId: null,
      name: formExercise.name,
      totalReps: summary.reps,
      durationMin: Math.max(1, Math.round(summary.time / 60)),
      exercises: [
        {
          name: formExercise.name,
          reps: summary.reps,
          tempo: summary.reps ? summary.time / summary.reps : 0,
          rating: summary.rating,
        },
      ],
    });
    actions.completeToday();
    setSummary(null);
    setReps(0);
    setElapsed(0);
    setRating(null);
    toast.success("Serie guardada · ¡Racha +1!");
  }

  const fb = rating ? feedbackCopy[rating] : null;
  const FbIcon = fb?.icon ?? ScanLine;

  return (
    <>
      <PageHeader
        title={formExercise.name}
        eyebrow="Modo técnica"
        action={
          <Pill tone="ink" className="mb-1.5">
            Serie {formExercise.set} de {formExercise.totalSets}
          </Pill>
        }
      />

      <div className="space-y-5 px-5">
        <div className="flex flex-col items-center pt-4">
          <div
            className={cn(
              "grid h-64 w-64 place-items-center rounded-full bg-primary shadow-glow",
              running && "animate-pulse-ring",
            )}
          >
            <div className="text-center text-primary-foreground">
              <p key={reps} className="animate-rep-pop font-display text-[120px] font-extrabold leading-none tabular">
                {reps}
              </p>
              <p className="mt-1 text-sm font-bold">de {formExercise.target} repeticiones</p>
            </div>
          </div>
          <div className="mt-7 flex gap-2">
            <Pill tone="outline" className="px-3 py-1.5 text-sm text-foreground">
              {formatDuration(elapsed)}
            </Pill>
            <Pill tone="outline" className="px-3 py-1.5 text-sm text-foreground">
              {reps > 0 ? `${(elapsed / reps).toFixed(1)} s/rep` : "-- s/rep"}
            </Pill>
          </div>
        </div>

        <div
          aria-live="polite"
          className={cn(
            "flex items-center gap-4 rounded-3xl p-4 shadow-card transition-colors",
            rating === "bueno" ? "bg-tint" : "bg-card",
          )}
        >
          <IconTile tone={rating === "bueno" ? "purple" : rating ? "ink" : "tint"} size="lg">
            <FbIcon />
          </IconTile>
          <div>
            <p className="font-display text-xl font-extrabold">
              {rating ? tempoLabel[rating] : running ? "Analizando…" : "Listo para empezar"}
            </p>
            <p className="text-sm text-muted-foreground">
              {fb?.hint ?? "Colócate de lado a la cámara y pulsa Iniciar serie."}
            </p>
          </div>
        </div>

        {running ? (
          <Button size="xl" variant="destructive" onClick={stop}>
            <Square className="fill-current" />
            Terminar serie
          </Button>
        ) : (
          <Button size="xl" onClick={start}>
            <Play className="fill-current" />
            Iniciar serie
          </Button>
        )}
      </div>

      <Sheet open={!!summary} onOpenChange={(o) => !o && setSummary(null)}>
        <SheetContent side="bottom" className="mx-auto max-w-[430px] rounded-t-[32px] border-0 px-5 pb-8 pt-7">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground">
            <Flame className="h-5 w-5 fill-card" />
            <span className="font-display text-lg font-extrabold">¡Racha +1!</span>
          </div>
          <SheetTitle className="text-center font-display text-2xl font-extrabold">Serie completada</SheetTitle>
          <SheetDescription className="mt-1 text-center">
            {formExercise.name} · serie {formExercise.set}
          </SheetDescription>
          {summary && (
            <StatGrid
              className="mt-6"
              stats={[
                { label: "reps", value: String(summary.reps), unit: "repeticiones" },
                { label: "tiempo", value: formatDuration(summary.time), unit: "tiempo" },
                { label: "ritmo", value: tempoLabel[summary.rating].replace("Muy ", ""), unit: "ritmo" },
              ]}
            />
          )}
          <Button size="xl" className="mt-6" onClick={save}>
            Guardar
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}
