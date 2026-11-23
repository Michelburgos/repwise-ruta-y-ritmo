import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomTabs } from "@/components/repwise/BottomTabs";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <main className="mx-auto min-h-dvh max-w-[430px] pb-32">
        <Outlet />
      </main>
      <BottomTabs />
    </>
  );
}
