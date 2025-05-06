import { useAtom } from "jotai";
import { defaultTimerAtom, timerAtom } from "./state";

import { useEffect, useState, useRef } from "react";
import { useMobs } from "./useMobs";
import { toast } from "sonner";

export const useTimer = () => {
  const [timer, setTimer] = useAtom(timerAtom);
  const [defaultTimer] = useAtom(defaultTimerAtom);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const { setDriver, participants } = useMobs();

  useEffect(() => {
    resetTimer();
  }, [defaultTimer]);

  useEffect(() => {
    if (timer === 0 && participants) {
      toast(`Time's up!`);
      const nextIndex = participants.findIndex((p) => p.active) + 1;
      setDriver(
        participants[nextIndex > participants.length - 1 ? 0 : nextIndex],
      );
      resetTimer();
    }
  }, [timer]);

  const startTimer = () => {
    setIsRunning(true);
    intervalIdRef.current = setInterval(() => {
      setTimer((currentTime) => {
        if (currentTime <= 0) {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
          setIsRunning(false);
          return 0;
        }
        return currentTime - 1000;
      });
    }, 1000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  };

  const pauseTimer = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTimer(defaultTimer);
  };

  return {
    isRunning,
    timer,
    setTimer,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  };
};
