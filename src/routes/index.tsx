import { useMobs } from "@/lib/useMobs";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mobs } = useMobs();
  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    const id = mobs?.[mobs.length - 1]?.id;

    if (id) {
      navigate({ to: `/m/${id}` });
    }
  }, [mobs, navigate]);

  return null;
}
