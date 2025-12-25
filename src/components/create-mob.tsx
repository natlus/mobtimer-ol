import { useMobs } from "@/lib/useMobs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";

export function CreateMob() {
  const { create } = useMobs();
  const navigate = useNavigate({ from: "/" });

  const createNewMob = () => {
    const id = create();
    navigate({ to: `/m/${id}` });
  };

  useHotkeys("c", createNewMob);

  return (
    <Button variant="outline" className="self-center" onClick={createNewMob}>
      create mob [c]
    </Button>
  );
}
