import {
  ChevronDown,
  PauseIcon,
  PlayIcon,
  RotateCcw,
  SkipForward,
  TimerIcon,
} from "lucide-react";
import { Time } from "./time";
import { useTimer } from "@/lib/useTimer";
import { useMobs } from "@/lib/useMobs";
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
  const { participants, setDriver } = useMobs();
  const { start, pause, reset, isRunning } = useTimer();

  return (
    <div className="flex flex-col gap-2 border-1 border-zinc-800 rounded-lg py-4 px-8">
      <div className="flex flex-row gap-2 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="gap-1 flex flex-row items-center p-1 hover:shadow-[0_0_0_1px] shadow-zinc-700 rounded transition-shadow hover:bg-zinc-800">
              <TimerIcon size={28} />
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

        <button
          onClick={isRunning ? pause : start}
          className="hover:scale-[1.1] transition-transform"
        >
          {!isRunning ? (
            <PlayIcon fill="currentColor" size={32} />
          ) : (
            <PauseIcon fill="currentColor" size={32} />
          )}
        </button>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <button
          onClick={reset}
          className="flex flex-row gap-1 items-center hover:scale-[1.1] transition-transform"
        >
          <RotateCcw size={16} /> Reset
        </button>
        <button
          onClick={() => {
            if (!participants) return;
            const index = participants.findIndex((p) => p.active) + 1;
            setDriver(
              participants[index > participants.length - 1 ? 0 : index],
            );
          }}
          className="flex flex-row gap-1 items-center hover:scale-[1.1] transition-transform"
        >
          <SkipForward size={16} /> Skip
        </button>
      </div>
    </div>
  );
}
