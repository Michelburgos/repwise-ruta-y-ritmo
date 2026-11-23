import { createFileRoute } from "@tanstack/react-router";
import { Camera, Images } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/repwise/EmptyState";
import { PageHeader } from "@/components/repwise/PageHeader";
import { PhotoPlaceholder } from "@/components/repwise/PhotoPlaceholder";
import { SectionHeader } from "@/components/repwise/SectionHeader";
import { formatDate, formatShortDate } from "@/lib/format";
import { seo } from "@/lib/seo";
import { actions, useStore } from "@/lib/store";

export const Route = createFileRoute("/app/progress")({
  head: () => ({ meta: seo("Progreso", "Compara tus fotos de progreso: antes y ahora.") }),
  component: ProgressPage,
});

type Slot = "antes" | "ahora";

function ProgressPage() {
  const photos = useStore((s) => s.photos);
  const [slot, setSlot] = useState<Slot>("ahora");
  const [beforeId, setBeforeId] = useState<string | undefined>(photos[0]?.id);
  const [afterId, setAfterId] = useState<string | undefined>(photos[photos.length - 1]?.id);

  const before = photos.find((p) => p.id === beforeId);
  const after = photos.find((p) => p.id === afterId);
  const timeline = [...photos].reverse();

  function takePhoto() {
    const p = actions.addPhoto();
    setAfterId(p.id);
    toast.success("Foto de hoy guardada");
  }

  function pick(id: string) {
    if (slot === "antes") setBeforeId(id);
    else setAfterId(id);
  }

  return (
    <>
      <PageHeader title="Progreso" eyebrow={`${photos.length} fotos`} />
      <div className="space-y-6 px-5">
        <Button size="xl" onClick={takePhoto}>
          <Camera />
          Tomar foto de hoy
        </Button>

        <section>
          <div className="grid grid-cols-2 gap-3">
            <PhotoPlaceholder
              label="ANTES"
              caption={before ? formatDate(before.date) : "Sin foto"}
              selected={slot === "antes"}
              onClick={() => setSlot("antes")}
            />
            <PhotoPlaceholder
              label="AHORA"
              caption={after ? formatDate(after.date) : "Sin foto"}
              selected={slot === "ahora"}
              onClick={() => setSlot("ahora")}
            />
          </div>
          {photos.length > 0 && (
            <>
              <p className="mt-3 px-1 text-sm text-muted-foreground">
                Elige la foto de <span className="font-bold text-foreground">{slot.toUpperCase()}</span>:
              </p>
              <div className="no-scrollbar -mx-5 mt-2 flex gap-2 overflow-x-auto px-5 pb-1">
                {timeline.map((p) => (
                  <div key={p.id} className="w-16 shrink-0 text-center">
                    <PhotoPlaceholder
                      size="sm"
                      selected={p.id === (slot === "antes" ? beforeId : afterId)}
                      onClick={() => pick(p.id)}
                    />
                    <p className="mt-1 text-[11px] font-bold text-muted-foreground">{formatShortDate(p.date)}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <section>
          <SectionHeader title="Línea de tiempo" />
          {photos.length === 0 ? (
            <EmptyState
              icon={<Images />}
              title="Sin fotos todavía"
              description="Toma tu primera foto hoy para ver tu progreso con el tiempo."
            />
          ) : (
            <div className="grid grid-cols-3 gap-2.5">
              {timeline.map((p) => (
                <PhotoPlaceholder key={p.id} size="md" caption={formatShortDate(p.date)} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
