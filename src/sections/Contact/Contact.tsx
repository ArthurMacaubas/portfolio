"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import SplitReveal from "@/components/SplitReveal/SplitReveal";
import Magnetic from "@/components/Magnetic/Magnetic";
import styles from "./Contact.module.css";

const WaveScene = dynamic(() => import("@/components/Scene3D/WaveScene"), { ssr: false });

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contato" className={styles.contact}>
      <div className={styles.scene} aria-hidden="true">
        <WaveScene />
      </div>

      <div className={`container ${styles.inner}`}>
        <span className="label">Contato</span>
        <h2 className={styles.heading}>
          <SplitReveal text="Vamos criar" className={styles.line} />
          <SplitReveal text="algo juntos?" className={`${styles.line} ${styles.accent}`} delay={0.12} />
        </h2>

        <div className={styles.actions}>
          <Magnetic strength={0.45}>
            <a href={`mailto:${profile.email}`} className={styles.circle}>
              <span>Enviar</span>
              <span>e-mail ↗</span>
            </a>
          </Magnetic>

          <div className={styles.side}>
            <button className={styles.copy} onClick={copy} aria-live="polite">
              <span className={styles.copyEmail}>{profile.email}</span>
              <span className={styles.copyHint}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "inline-block" }}
                  >
                    {copied ? "Copiado ✓" : "Copiar"}
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.social}>
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
