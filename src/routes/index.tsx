import { CreateMob } from "@/components/create-mob";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateMob />;
}
