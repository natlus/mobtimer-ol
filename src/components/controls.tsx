import { useMobs } from "@/lib/useMobs";
import { useTimer } from "@/lib/useTimer";
import { PauseIcon, PlayIcon, RotateCcw, SkipForward } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "./ui/button";

export default function Controls() {
  const { participants, setDriver } = useMobs();
  const { start, pause, reset, isRunning } = useTimer();

  const nextDriver = () => {
    if (!participants) return;
    const index = participants.findIndex((p) => p.active) + 1;
    setDriver(participants[index > participants.length - 1 ? 0 : index]);
  };

  useHotkeys(
    "space",
    participants?.length ? (isRunning ? pause : start) : () => {},
  );
  useHotkeys(
    "n",
    participants && participants.length > 1 ? nextDriver : () => {},
  );
  useHotkeys("r", reset);

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-6">
        <Button
          variant="outline"
          onClick={reset}
          className="flex flex-row items-center gap-1"
        >
          <RotateCcw size={16} /> reset [r]
        </Button>

        <Button
          variant="outline"
          onClick={isRunning ? pause : start}
          className="flex items-center justify-center gap-1"
          disabled={!participants?.length}
        >
          {!isRunning ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
          {isRunning ? "pause" : "start"} [space]
        </Button>

        <Button
          variant="outline"
          onClick={nextDriver}
          className="flex flex-row items-center gap-1"
          disabled={!participants || participants.length < 2}
        >
          <SkipForward size={16} /> next [n]
        </Button>
      </div>
    </>
  );
}
