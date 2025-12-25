import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAtom } from "jotai";
import { mobsAtom, recentParticipantsAtom } from "@/lib/state";

export default function ConfigDropdown() {
  const [, setMobs] = useAtom(mobsAtom);
  const [, setRecentParticipants] = useAtom(recentParticipantsAtom);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:text-orange transition-color duration-200">
        settings
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setMobs([])}>
          Clear all mobs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRecentParticipants([])}>
          Clear recent participants
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
