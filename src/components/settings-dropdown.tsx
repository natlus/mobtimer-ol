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
import { compressToEncodedURIComponent } from "lz-string";
import { toast } from "sonner";
import { useHotkeys } from "react-hotkeys-hook";

export function SettingsButton() {
  const params = useParams({ from: "/m/$id" });
  const navigate = useNavigate();
  const { remove, mobs, currentMob } = useMobs();

  const deleteMob = () => {
    remove(params.id);
    navigate({ to: "/" });
  };

  useHotkeys("shift+d", deleteMob);
  useHotkeys("e", exportStorage);

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
      <DropdownMenuTrigger className="hover:text-orange transition-color ml-auto flex flex-row items-center gap-1 duration-200 outline-none">
        <Cog size={16} className="outline-none" />
        settings
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[150px]">
        <DropdownMenuItem asChild>
          <button onClick={exportStorage} className="w-full">
            <Share /> export [e]
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            onClick={deleteMob}
            className="w-full cursor-pointer bg-red-500 text-white hover:!bg-red-800 hover:!text-white dark:bg-red-700"
          >
            <Trash2 className="stroke-white" strokeWidth={1} /> delete [D]
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
