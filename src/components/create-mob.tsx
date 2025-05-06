import { useMobs } from "@/lib/useMobs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function CreateMob() {
  const { create } = useMobs();
  const navigate = useNavigate({ from: "/" });

  const handleClick = () => {
    const id = create();
    navigate({ to: `/m/${id}` });
  };

  return (
    <Button className="self-center" onClick={handleClick}>
      Create mob
    </Button>
  );
}
