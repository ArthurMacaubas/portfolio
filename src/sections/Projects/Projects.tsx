"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import SplitReveal from "@/components/SplitReveal/SplitReveal";
import styles from "./Projects.module.css";

const visible = projects.filter((p) => p.published !== false);

/**
 * No desktop a seção fica presa na tela e o scroll vertical move os
 * cards na horizontal. Em telas pequenas vira uma lista vertical comum.
 */
export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const measure = () => {
      const enabled = window.innerWidth > 900;
      setHorizontal(enabled);
      if (enabled && track.current) {
        setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="projetos"
      ref={section}
      className={styles.projects}
      style={horizontal ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={horizontal ? styles.sticky : styles.static}>
        <div className={`container ${styles.header}`}>
          <div>
            <span className="label">Projetos selecionados</span>
            <SplitReveal as="h2" text="Coisas que construí." className={styles.heading} />
          </div>
          {horizontal && (
            <div className={styles.progress} aria-hidden="true">
              <motion.span style={{ width: progressWidth }} />
            </div>
          )}
        </div>

        <motion.div ref={track} className={styles.track} style={horizontal ? { x } : undefined}>
          {visible.map((project, i) => (
            <motion.div
              key={project.slug}
              className={styles.slot}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.9, delay: horizontal ? i * 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={i} total={visible.length} />
            </motion.div>
          ))}
          <div className={styles.endSlot}>
            <p>Mais experimentos e código no GitHub.</p>
            <a href="https://github.com/ArthurMacaubas" target="_blank" rel="noopener noreferrer" className={styles.endLink}>
              Ver tudo ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
