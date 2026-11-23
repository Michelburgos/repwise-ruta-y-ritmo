import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "./Logo";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = mode === "login";

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Introduce un email válido");
      return;
    }
    if (password.length < 6) {
      toast.error("La contraseña necesita al menos 6 caracteres");
      return;
    }
    toast.success(isLogin ? "¡Hola de nuevo!" : "Cuenta creada");
    navigate({ to: "/app/routines" });
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-[430px] flex-col px-6 pb-8 pt-16">
      <div className="relative">
        <div className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-tint" />
        <div className="relative">
          <Logo size="lg" />
          <p className="mt-5 font-display text-[34px] font-extrabold leading-[1.05]">
            Entrena
            <br />
            con cabeza.
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-10 space-y-4 rounded-3xl bg-card p-5 shadow-card">
        <h1 className="text-xl font-extrabold">{isLogin ? "Inicia sesión" : "Crea tu cuenta"}</h1>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-bold">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="font-bold">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" size="xl" className="mt-2">
          {isLogin ? "Entrar" : "Crear cuenta"}
          <ArrowRight />
        </Button>
      </form>

      <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
        {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
        {isLogin ? (
          <Link to="/register" className="font-bold text-foreground underline underline-offset-4">
            Regístrate
          </Link>
        ) : (
          <Link to="/login" className="font-bold text-foreground underline underline-offset-4">
            Inicia sesión
          </Link>
        )}
      </p>
    </main>
  );
}
