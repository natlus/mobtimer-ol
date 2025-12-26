import { useMobs } from "@/lib/useMobs";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { ListIcon } from "lucide-react";
import { CreateMob } from "./create-mob";
import { useHotkeys } from "react-hotkeys-hook";

export default function Header({ className }: { className?: string }) {
  const { mobs, currentMob } = useMobs();
  const navigate = useNavigate({ from: "/" });

  const navigateTo = (index: number) => {
    if (index > mobs.length) return;
    navigate({ to: `/m/${mobs[index - 1].id}` });
  };

  useHotkeys("1", () => navigateTo(1));
  useHotkeys("2", () => navigateTo(2));
  useHotkeys("3", () => navigateTo(3));
  useHotkeys("4", () => navigateTo(4));
  useHotkeys("5", () => navigateTo(5));
  useHotkeys("6", () => navigateTo(6));
  useHotkeys("7", () => navigateTo(7));
  useHotkeys("8", () => navigateTo(8));
  useHotkeys("9", () => navigateTo(9));

  return (
    <header className={cn("px-4 py-2", className)}>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        {mobs.length > 0 && (
          <div className="border-primary/30 flex flex-row items-center gap-2 border-r pr-2">
            <ListIcon size={16} />
            <h2 className="text-xl">mobs</h2>
          </div>
        )}
        <div className="relative flex flex-row items-center gap-4 overflow-scroll px-4">
          {mobs.map((mob, index) => (
            <Link
              key={mob.id}
              to="/m/$id"
              params={{ id: mob.id }}
              className={cn(
                "hover:text-orange transition-color relative my-2 whitespace-nowrap duration-200",
                mob.id === currentMob?.id && "text-peppermint",
              )}
            >
              {mob.id} {index + 1 < 10 && `[${index + 1}]`}
            </Link>
          ))}
        </div>

        <CreateMob />
      </div>
    </header>
  );
}
