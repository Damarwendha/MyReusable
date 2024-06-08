import { useEffect, useState } from "react";

interface RCountdown {
  runCountdown: () => void;
  currentCount: number;
  isRunning: boolean;
}

export function useCountdown(
  time: number,
  actionWhenCountZero?: () => void
): RCountdown {
  const [currentCount, setCount] = useState(time);
  const [isRunning, setIsRunning] = useState(false);

  function runCountdown() {
    setIsRunning(true);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any;
    if (isRunning && currentCount > 0) {
      interval = setInterval(() => {
        setCount((c) => c - 1);
      }, 1000);
    }

    if (currentCount === 0) {
      actionWhenCountZero?.();
      setIsRunning(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentCount, isRunning, actionWhenCountZero]);

  return { runCountdown, currentCount, isRunning };
}
