"use client";

import { useEffect, useState } from "react";

const EVENT = "preloader:done";

declare global {
  interface Window {
    __preloaderDone?: boolean;
  }
}

export function markPreloaderDone() {
  window.__preloaderDone = true;
  window.dispatchEvent(new Event(EVENT));
}

/** true quando o preloader terminou — usado para disparar a entrada da Hero. */
export function usePreloaderDone(): boolean {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.__preloaderDone) {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener(EVENT, onDone);
    return () => window.removeEventListener(EVENT, onDone);
  }, []);

  return done;
}
