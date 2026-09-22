"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll/RevealOnScroll";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { projects, type Project } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Projects.module.css";

const filters = ["Todos", "Web", "Frontend", "Backend", "Full Stack", "Hardware", "Automação", "Acadêmico", "Experimentos"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!selectedProject) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedProject]);
  const visibleProjects = projects.filter(
    (project) => project.published && (activeFilter === "Todos" || project.category.includes(activeFilter)),
  );
  const featuredProject = visibleProjects.find((project) => project.featured) ?? visibleProjects[0];
  const secondaryProjects = visibleProjects.filter((project) => project.slug !== featuredProject?.slug);

  return (
    <section id="projetos" className={`section ${styles.projects}`}>
      <div className="container">
        <RevealOnScroll>
          <div className={styles.header}>
            <div>
              <span className={styles.label}>Projetos</span>
              <h2 className={styles.heading}>Projetos</h2>
            </div>
            <p className={styles.subtitle}>Projetos que desenvolvi, experimentei e continuo aprimorando.</p>
          </div>
        </RevealOnScroll>

        <div className={styles.filters} role="tablist" aria-label="Filtrar projetos por categoria">
          {filters.map((filter) => (
            <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} className={activeFilter === filter ? styles.filterActive : styles.filter} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <div className={styles.showcase} key={activeFilter}>
            {featuredProject && (
              <motion.div layout initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <ProjectCard project={featuredProject} featured onOpen={() => setSelectedProject(featuredProject)} />
              </motion.div>
            )}
            <div className={styles.grid}>
              {secondaryProjects.map((project, index) => (
                <motion.div key={project.slug} layout initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} animate={{ opacity: 1, y: 0, transition: { delay: reducedMotion ? 0 : index * 0.06 } }} exit={{ opacity: 0 }}>
                  <ProjectCard project={project} onOpen={() => setSelectedProject(project)} />
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatePresence>

        <AnimatePresence>
          {selectedProject && (
            <motion.div className={styles.modalBackdrop} role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setSelectedProject(null)}>
              <motion.div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.stopPropagation()}>
                <button type="button" className={styles.close} aria-label="Fechar detalhes" onClick={() => setSelectedProject(null)}>Fechar</button>
                <span className={styles.label}>{selectedProject.category.join(" / ")}</span>
                <h3 id="project-dialog-title">{selectedProject.title}</h3>
                <p className={styles.modalDescription}>{selectedProject.longDescription ?? selectedProject.description}</p>
                {selectedProject.status && <div className={styles.detail}><strong>Status</strong><p>{selectedProject.status}</p></div>}
                {selectedProject.objective && <div className={styles.detail}><strong>Objetivo</strong><p>{selectedProject.objective}</p></div>}
                <div className={styles.detail}><strong>Tecnologias</strong><div className={styles.tech}>{selectedProject.technologies.map((tech) => <span key={tech} className={styles.tag}>{tech}</span>)}</div></div>
                <div className={styles.modalActions}>
                  {selectedProject.github && <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>Ver codigo</a>}
                  {selectedProject.demo && <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className={styles.secondaryAction}>Abrir demo</a>}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
