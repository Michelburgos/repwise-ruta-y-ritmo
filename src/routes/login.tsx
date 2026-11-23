import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/repwise/AuthForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: seo("Inicia sesión", "Entra en Repwise y sigue con tu racha de entrenamiento.") }),
  component: () => <AuthForm mode="login" />,
});
