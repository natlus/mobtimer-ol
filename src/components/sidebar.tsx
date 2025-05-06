import { useMobs } from "@/lib/useMobs";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ListIcon } from "lucide-react";

export function Sidebar({ className }: { className?: string }) {
  const { mobs, currentMob } = useMobs();

  return (
    <aside className={cn("pr-10 pl-0 pt-4 flex justify-end", className)}>
      <div className="flex flex-col gap-2">
        {mobs.length > 0 && (
          <div className="flex flex-row items-center gap-2 ml-auto">
            <ListIcon />
            <h2 className="text-xl">Mobs</h2>
          </div>
        )}
        {mobs.map((mob) => (
          <Link
            key={mob.id}
            to="/m/$id"
            params={{ id: mob.id }}
            className={cn(
              "hover:underline text-right",
              mob.id === currentMob?.id && "font-bold",
            )}
          >
            {mob.id}
          </Link>
        ))}
      </div>
    </aside>
  );
}
