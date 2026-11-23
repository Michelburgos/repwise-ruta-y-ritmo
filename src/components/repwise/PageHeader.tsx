import { useCanGoBack, useNavigate, useRouter, type LinkProps } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function PageHeader({
  title,
  eyebrow,
  action,
  back,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  back?: NonNullable<LinkProps["to"]>;
}) {
  return (
    <header className="px-5 pb-4 pt-6">
      {back && <BackButton fallback={back} />}
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h1 className="truncate text-[28px] font-extrabold leading-tight">{title}</h1>
        </div>
        {action}
      </div>
    </header>
  );
}

function BackButton({ fallback }: { fallback: NonNullable<LinkProps["to"]> }) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Volver"
      className="mb-4 rounded-full"
      onClick={() => (canGoBack ? router.history.back() : navigate({ to: fallback }))}
    >
      <ChevronLeft />
    </Button>
  );
}
