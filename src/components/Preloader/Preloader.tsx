"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { markPreloaderDone } from "@/lib/usePreloader";
import styles from "./Preloader.module.css";

const DURATION = 1600;

/**
 * Tela de entrada: contador de 0 a 100 e uma cortina que sobe.
 * É renderizada já no HTML do servidor para não piscar a página;
 * se o JS falhar, uma animação CSS a esconde sozinha.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setVisible(false);
      markPreloaderDone();
      return;
    }

    root.classList.add("is-loading");
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          root.classList.remove("is-loading");
          markPreloaderDone();
        }, 250);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("is-loading");
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.preloader}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className={styles.top}>
            <span>Arthur Pietro</span>
            <span>Portfólio — {new Date().getFullYear()}</span>
          </div>
          <div className={styles.bar}>
            <span className={styles.barFill} style={{ transform: `scaleX(${count / 100})` }} />
          </div>
          <div className={styles.count}>{String(count).padStart(3, "0")}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
