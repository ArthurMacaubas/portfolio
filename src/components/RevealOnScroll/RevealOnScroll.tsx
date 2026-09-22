"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/**
 * Revela o conteúdo suavemente quando entra no viewport.
 * Usa `whileInView` (Intersection Observer por baixo dos panos)
 * e respeita `prefers-reduced-motion` via CSS global.
 */
export default function RevealOnScroll({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
