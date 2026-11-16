"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment, type ElementType } from "react";
import styles from "./SplitReveal.module.css";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Quando definido, controla a animação manualmente (ex.: após o preloader). */
  play?: boolean;
};

const word: Variants = {
  hidden: { y: "110%", rotate: 4 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: i },
  }),
};

/**
 * Divide o texto em palavras e revela cada uma subindo de dentro
 * de uma máscara. O texto inteiro continua acessível via aria-label.
 */
export default function SplitReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.06,
  play,
}: Props) {
  const words = text.split(" ");
  const controlled = play !== undefined;

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        className={styles.wrap}
        initial="hidden"
        {...(controlled
          ? { animate: play ? "visible" : "hidden" }
          : { whileInView: "visible", viewport: { once: true, margin: "-10% 0px" } })}
        aria-hidden="true"
      >
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <span className={styles.mask}>
              <motion.span className={styles.word} variants={word} custom={delay + i * stagger}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
