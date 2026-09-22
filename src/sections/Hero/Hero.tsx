"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import SplineScene from "@/components/SplineScene/SplineScene";
import styles from "./Hero.module.css";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section id="hero" className={`container ${styles.hero}`}>
      <motion.div initial="hidden" animate="visible" variants={container}>
        <motion.span className={styles.eyebrow} variants={item}>
          {profile.location}
        </motion.span>

        <motion.h1 className={styles.title} variants={item}>
          <span className={styles.titleLine}>Olá, eu sou {profile.name}.</span>
          <span className={styles.titleLine}>{profile.role}.</span>
        </motion.h1>

        <motion.p className={styles.subtitle} variants={item}>
          {profile.bio}
        </motion.p>

        <motion.div className={styles.actions} variants={item}>
          <a href="#projetos" className={styles.primary}>
            Ver meus projetos
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
            GitHub
          </a>
        </motion.div>

        <motion.div className={styles.scrollHint} variants={item}>
          <span className={styles.scrollLine} />
          role para explorar
        </motion.div>
      </motion.div>

      <div className={styles.visual}>
        <SplineScene />
      </div>
    </section>
  );
}
