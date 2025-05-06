import { timerAtom } from "@/lib/state";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";

export function Time({ className }: { className: string }) {
  const [time] = useAtom(timerAtom);
  return (
    <span className={cn(className, "text-4xl font-bold font-mono")}>
      {String(Math.floor(time / 60000)).padStart(2, "0") +
        ":" +
        String(Math.floor((time % 60000) / 1000)).padStart(2, "0")}
    </span>
  );
}
