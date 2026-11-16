"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { processSteps } from "@/data/process";
import SplitReveal from "@/components/SplitReveal/SplitReveal";
import styles from "./Process.module.css";

function Step({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof processSteps)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 0.6) / total;
  const opacity = useTransform(progress, [start - 0.1, start + 0.05], [0.25, 1]);
  const x = useTransform(progress, [start - 0.1, start + 0.05], [24, 0]);
  const dot = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.li className={styles.step} style={{ opacity, x }}>
      <motion.span className={styles.dot} style={{ scale: dot }} aria-hidden="true" />
      <span className={styles.number}>{step.number}</span>
      <div>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepText}>{step.description}</p>
      </div>
    </motion.li>
  );
}

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="processo" className={`section ${styles.process}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <span className="label">Processo</span>
          <SplitReveal as="h2" text="Da ideia ao que funciona." className={styles.heading} />
          <p className={styles.lead}>Um caminho simples, repetido em ciclos curtos — do papel ao protótipo.</p>
        </div>

        <ol ref={ref} className={styles.steps}>
          <span className={styles.line} aria-hidden="true">
            <motion.span style={{ scaleY: lineScale }} />
          </span>
          {processSteps.map((step, i) => (
            <Step key={step.number} step={step} index={i} total={processSteps.length} progress={scrollYProgress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
