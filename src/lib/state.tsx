import { atomWithStorage } from "jotai/utils";
import { Mob } from "@/types";
import ms from "ms";

export const mobsAtom = atomWithStorage<Mob[]>("mobs", []);

export const recentParticipantsAtom = atomWithStorage<string[]>(
  "recentParticipants",
  [],
);

export const TIMER_OPTIONS = [5, 10, 15, 30];

export const timerAtom = atomWithStorage<(typeof TIMER_OPTIONS)[number]>(
  "timer",
  Number(ms("10m")),
);

export const defaultTimerAtom = atomWithStorage<(typeof TIMER_OPTIONS)[number]>(
  "timer",
  Number(ms("10m")),
);

export const themeAtom = atomWithStorage("theme", "dark");
