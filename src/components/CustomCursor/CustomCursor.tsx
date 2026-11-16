"use client";

import { useEffect, useRef, useState } from "react";
import { isTouchDevice } from "@/lib/isTouchDevice";
import styles from "./CustomCursor.module.css";

/**
 * Cursor em duas camadas: um ponto que segue o mouse na hora e um anel
 * que segue com atraso (interpolação). Sobre links ele cresce; sobre
 * elementos com `data-cursor="texto"` vira um círculo com o rótulo.
 * Desativado em telas de toque e com movimento reduzido.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<{ mode: "default" | "link" | "label"; label?: string }>({
    mode: "default",
  });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouchDevice() || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let frame = 0;

    const move = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      setHidden(false);
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setState({ mode: "label", label: labelled.dataset.cursor });
      } else if (target.closest("a, button")) {
        setState({ mode: "link" });
      } else {
        setState({ mode: "default" });
      }
    };

    const leave = () => setHidden(true);

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className={`${styles.ringWrap} ${hidden ? styles.hidden : ""}`} aria-hidden="true">
        <div className={`${styles.ring} ${styles[state.mode]}`}>
          {state.mode === "label" && <span className={styles.text}>{state.label}</span>}
        </div>
      </div>
      <div ref={dotRef} className={`${styles.dotWrap} ${hidden ? styles.hidden : ""}`} aria-hidden="true">
        <div className={`${styles.dot} ${state.mode !== "default" ? styles.dotHidden : ""}`} />
      </div>
    </>
  );
}
