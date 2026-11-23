import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/repwise/AuthForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: seo("Crea tu cuenta", "Regístrate en Repwise: rutinas, técnica y carreras con GPS.") }),
  component: () => <AuthForm mode="register" />,
});
