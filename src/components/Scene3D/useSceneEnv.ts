"use client";

import { useEffect, useState } from "react";

/** Informações de ambiente úteis para ajustar qualidade/movimento das cenas. */
export function useSceneEnv() {
  const [env, setEnv] = useState({ reduced: false, touch: false, small: false });

  useEffect(() => {
    setEnv({
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      touch: window.matchMedia("(pointer: coarse)").matches,
      small: window.innerWidth < 768,
    });
  }, []);

  return env;
}
