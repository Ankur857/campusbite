"use client";

import { useEffect, useState } from "react";

export default function useTimer(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    timeLeft,
    formatted: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
  };
}