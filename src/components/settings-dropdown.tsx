import { useMobs } from "@/lib/useMobs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Cog, Share, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useAnimate } from "motion/react";
import { compressToEncodedURIComponent } from "lz-string";
import { toast } from "sonner";

export function SettingsButton() {
  const params = useParams({ from: "/m/$id" });
  const navigate = useNavigate();
  const { remove, mobs, currentMob } = useMobs();

  const [trigger, animate] = useAnimate();

  // const currentMob = mobs.find((mob) => mob.id === params.id);

  const handleClick = () => {
    remove(params.id);
    navigate({ to: "/" });
  };

  function exportStorage() {
    console.log(compressToEncodedURIComponent(JSON.stringify(mobs)));
    const url = `/i/${compressToEncodedURIComponent(JSON.stringify(currentMob))}`;
    navigator.clipboard
      .writeText(window.location.origin + url)
      .then(() => {
        toast("URL copied to clipboard");
        console.log("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy URL: ", err);
      });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-4 right-4 outline-none">
        <Cog
          ref={trigger}
          onMouseOver={() =>
            animate(trigger.current, {
              rotate: 180,
              scale: 1.1,
            })
          }
          onMouseOut={() =>
            animate(trigger.current, {
              rotate: 0,
              scale: 1,
            })
          }
          className="outline-none"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[150px]">
        <DropdownMenuItem asChild>
          <button onClick={exportStorage} className="w-full">
            <Share /> Export
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            onClick={handleClick}
            className="w-full text-white hover:!text-white cursor-pointer bg-red-500 dark:bg-red-700 hover:!bg-red-800"
          >
            <Trash2 className="stroke-white" strokeWidth={1} /> Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
