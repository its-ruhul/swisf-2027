import { useEffect, useState } from 'react';

export type TimeLeft = { days: number; hours: number; minutes: number; done: boolean };

function timeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    done: diff === 0,
  };
}

/** Days / hours / minutes until an ISO date, refreshed every 20 seconds. */
export function useCountdown(isoDate: string): TimeLeft {
  const target = new Date(isoDate).getTime();
  const [left, setLeft] = useState<TimeLeft>(() => timeLeft(target));

  useEffect(() => {
    setLeft(timeLeft(target));
    const id = window.setInterval(() => setLeft(timeLeft(target)), 20_000);
    return () => window.clearInterval(id);
  }, [target]);

  return left;
}
