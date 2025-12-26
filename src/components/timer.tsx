import { ChevronDown } from "lucide-react";
import { Time } from "./time";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TIMER_OPTIONS, defaultTimerAtom } from "@/lib/state";
import { useAtom } from "jotai";
import ms from "ms";

export function Timer() {
  const [, setDefaultTimer] = useAtom(defaultTimerAtom);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-orange flex flex-row items-center gap-1 p-1">
              <Time className="text-4xl" />
              <ChevronDown size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {TIMER_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setDefaultTimer(ms(`${option}m`))}
              >
                {`${option} minutes`}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
