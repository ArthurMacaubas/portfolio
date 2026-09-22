"use client";

import { useEffect, useRef, useState } from "react";
import { isTouchDevice } from "@/lib/isTouchDevice";
import styles from "./CustomCursor.module.css";

/**
 * Cursor discreto para desktop. Fica desativado em telas de toque
 * e some automaticamente se o usuário prefere menos movimento.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouchDevice() || reducedMotion) return;
    setEnabled(true);

    const move = (event: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = `${event.clientX}px`;
        ref.current.style.top = `${event.clientY}px`;
      }
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setActive(!!target.closest("a, button"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!enabled) return null;

  return <div ref={ref} className={`${styles.cursor} ${active ? styles.cursorActive : ""}`} />;
}
