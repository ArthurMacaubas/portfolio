"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import styles from "./Marquee.module.css";

type Props = {
  items: string[];
  baseVelocity?: number;
};

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * Faixa de texto infinita. Acelera e inverte de direção conforme a
 * velocidade e o sentido do scroll.
 */
export default function Marquee({ items, baseVelocity = -2 }: Props) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const row = (
    <>
      {items.map((item) => (
        <span key={item} className={styles.item}>
          {item}
          <span className={styles.star} aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className={styles.marquee} aria-label={items.join(", ")}>
      <motion.div className={styles.track} style={{ x }} aria-hidden="true">
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
