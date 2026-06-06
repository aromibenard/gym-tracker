"use client";

import { useEffect, useState } from "react";

export function useElapsedTime(startIso: string) {
  const start = Date.parse(startIso);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000); // 1sec tick 

    return () => clearInterval(id);
  }, []);

  const elapsedMs = Math.max(0, now - start);

  return { elapsedMs };
}