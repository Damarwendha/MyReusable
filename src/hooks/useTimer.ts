import { useState, useEffect } from "react";

let interval;

interface TtimerReturn {
  runTimer: void,
  currentCount: number,
  isRunning: boolean
}

export function useTimer(time: number, action: (any) => any): TtimerReturn {
  const [currentCount, setCount] = useState(time);
  const [isRunning, setIsRunning] = useState(false);

  function runTimer() {
    setIsRunning(true);
  }

  useEffect(() => {
    if (isRunning && currentCount > 0) {
      interval = setInterval(() => {
        setCount((c) => c - 1);
      }, 1000);
    }

    if (currentCount === 0) {
      action();
      setIsRunning(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentCount, isRunning, action]);

  return { runTimer, currentCount, isRunning };
}