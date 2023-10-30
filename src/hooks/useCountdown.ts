import { useState, useEffect } from "react";

interface RCountdown {
  runCountdown: () => void;
  currentCount: number;
  isRunning: boolean;
}

export function useCountdown(time: number, action: any): RCountdown {
  const [currentCount, setCount] = useState(time);
  const [isRunning, setIsRunning] = useState(false);

  function runCountdown() {
    setIsRunning(true);
  }

  useEffect(() => {
    let interval: any;
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

  return { runCountdown, currentCount, isRunning };
}
