import { createFileRoute, redirect } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({ meta: seo("Entrena con cabeza", "Rutinas, técnica, carreras y progreso en una sola app.") }),
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
});
