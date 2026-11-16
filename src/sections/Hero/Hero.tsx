"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import SplitReveal from "@/components/SplitReveal/SplitReveal";
import Magnetic from "@/components/Magnetic/Magnetic";
import { usePreloaderDone } from "@/lib/usePreloader";
import styles from "./Hero.module.css";

const HeroScene = dynamic(() => import("@/components/Scene3D/HeroScene"), { ssr: false });

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = usePreloaderDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneOpacity = useTransform(scrollYProgress, [0.4, 1], [1, 0]);

  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="hero" ref={ref} className={styles.hero}>
      <motion.div className={styles.scene} style={{ opacity: sceneOpacity }}>
        <HeroScene />
      </motion.div>
      <div className={styles.vignette} aria-hidden="true" />

      <motion.div className={styles.content} style={{ y: textY, opacity: textOpacity }}>
        <div className={styles.top}>
          <motion.span className="label" {...fade(0.2)} animate={ready ? { opacity: 1, y: 0 } : undefined}>
            Disponível para projetos
          </motion.span>
          <motion.p className={styles.intro} {...fade(0.35)} animate={ready ? { opacity: 1, y: 0 } : undefined}>
            {profile.bio}
          </motion.p>
        </div>

        <h1 className={styles.title}>
          <SplitReveal text={first} className={styles.line} play={ready} delay={0.1} />
          <SplitReveal
            text={rest.join(" ")}
            className={`${styles.line} ${styles.lineOutline}`}
            play={ready}
            delay={0.22}
          />
        </h1>

        <div className={styles.bottom}>
          <motion.div className={styles.meta} {...fade(0.6)} animate={ready ? { opacity: 1, y: 0 } : undefined}>
            <span>{profile.role}</span>
            <span className={styles.metaFaint}>{profile.location}</span>
          </motion.div>

          <motion.div {...fade(0.7)} animate={ready ? { opacity: 1, y: 0 } : undefined}>
            <Magnetic>
              <a href="#projetos" className={styles.cta}>
                <span>Ver projetos</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  ↓
                </span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className={styles.scrollHint} {...fade(0.8)} animate={ready ? { opacity: 1, y: 0 } : undefined}>
            <span className={styles.scrollTrack}>
              <span className={styles.scrollThumb} />
            </span>
            role
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
