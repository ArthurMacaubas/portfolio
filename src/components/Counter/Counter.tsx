"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/** Número que conta de 0 até `to` quando aparece na tela. */
export default function Counter({ to, suffix = "", pad = 2 }: { to: number; suffix?: string; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      {String(value).padStart(pad, "0")}
      {suffix}
    </span>
  );
}
