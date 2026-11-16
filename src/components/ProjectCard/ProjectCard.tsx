"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

type Props = {
  project: Project;
  index: number;
  total: number;
};

const HUES = ["#ffb454", "#4fd1c5", "#c9a7ff", "#ff7a59", "#8fd16a"];

/**
 * Card de projeto com inclinação 3D e um "holofote" que segue o mouse.
 * Sem imagem própria, ele gera uma arte abstrata a partir do índice.
 */
export default function ProjectCard({ project, index, total }: Props) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 });
  const artX = useTransform(mx, [0, 1], ["-4%", "4%"]);
  const artY = useTransform(my, [0, 1], ["-4%", "4%"]);

  const hue = HUES[index % HUES.length];
  const link = project.demo ?? project.github;

  const onMove = (event: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    mx.set(x);
    my.set(y);
    ref.current.style.setProperty("--mx", `${x * 100}%`);
    ref.current.style.setProperty("--my", `${y * 100}%`);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      style={{ rotateX, rotateY, ["--hue" as string]: hue }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={link ? (project.demo ? "Abrir" : "Código") : undefined}
    >
      <div className={styles.art} aria-hidden="true">
        <motion.div className={styles.artInner} style={{ x: artX, y: artY }}>
          <span className={styles.blob} />
          <span className={styles.ringA} />
          <span className={styles.ringB} />
          <span className={styles.bigNumber}>{String(index + 1).padStart(2, "0")}</span>
        </motion.div>
        <span className={styles.artGrid} />
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <span className={styles.counter}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {project.status && <span className={styles.status}>{project.status}</span>}
        </div>

        <h3 className={styles.title}>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className={styles.description}>{project.description}</p>

        <ul className={styles.tags} aria-label="Tecnologias">
          {project.technologies.slice(0, 5).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className={styles.links}>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              Ver online ↗
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              Código ↗
            </a>
          )}
        </div>
      </div>

      <span className={styles.spotlight} aria-hidden="true" />
    </motion.article>
  );
}
