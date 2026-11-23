import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, ListPlus, LogOut, Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/repwise/EmptyState";
import { RoutineCard, WorkoutCard } from "@/components/repwise/ListCards";
import { PageHeader } from "@/components/repwise/PageHeader";
import { Panel } from "@/components/repwise/Panel";
import { SectionHeader, seeAllClass } from "@/components/repwise/SectionHeader";
import { StreakCard } from "@/components/repwise/StreakCard";
import { seo } from "@/lib/seo";
import { actions, useStore } from "@/lib/store";

export const Route = createFileRoute("/app/routines/")({
  head: () => ({ meta: seo("Mis rutinas", "Tu racha, tus rutinas y tus entrenamientos anteriores.") }),
  component: RoutinesPage,
});

function RoutinesPage() {
  const routines = useStore((s) => s.routines);
  const workouts = useStore((s) => s.workouts);
  const streak = useStore((s) => s.streak);

  return (
    <>
      <PageHeader
        title="Mis rutinas"
        eyebrow="Hola, Lucía"
        action={
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link to="/login">
              <LogOut />
              Salir
            </Link>
          </Button>
        }
      />
      <div className="space-y-6 px-5">
        <StreakCard streak={streak} />
        <CreateRoutineCard />

        <section>
          <SectionHeader title={`Rutinas (${routines.length})`} />
          {routines.length === 0 ? (
            <EmptyState
              icon={<ListPlus />}
              title="Aún no tienes rutinas"
              description="Crea tu primera rutina arriba y empieza a sumar días de racha."
            />
          ) : (
            <div className="space-y-2.5">
              {routines.map((r) => (
                <RoutineCard
                  key={r.id}
                  routine={r}
                  onDelete={() => {
                    actions.deleteRoutine(r.id);
                    toast("Rutina eliminada");
                  }}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <SectionHeader
            title="Entrenamientos anteriores"
            action={
              workouts.length > 0 && (
                <Link to="/app/history" className={seeAllClass}>
                  Ver todos
                </Link>
              )
            }
          />
          {workouts.length === 0 ? (
            <EmptyState
              icon={<Dumbbell />}
              title="Sin entrenamientos"
              description="Termina una serie en modo técnica y aparecerá aquí."
            />
          ) : (
            <div className="space-y-2.5">
              {workouts.slice(0, 4).map((w) => (
                <WorkoutCard key={w.id} workout={w} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function CreateRoutineCard() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Ponle un nombre a la rutina");
      return;
    }
    actions.addRoutine(name, text);
    setName("");
    setText("");
    toast.success("Rutina guardada");
  }

  return (
    <Panel>
      <form onSubmit={submit} className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" strokeWidth={3} />
          </span>
          <h2 className="text-lg font-extrabold">Nueva rutina</h2>
        </div>
        <Input
          aria-label="Nombre de la rutina"
          placeholder="Nombre, p. ej. Pierna fuerte"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          aria-label="Ejercicios"
          placeholder={"Un ejercicio por línea\nSentadilla 4x10"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" size="xl">
          Guardar rutina
        </Button>
      </form>
    </Panel>
  );
}
