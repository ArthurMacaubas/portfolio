import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
  onOpen: () => void;
};

export default function ProjectCard({ project, featured = false, onOpen }: ProjectCardProps) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <button type="button" className={styles.preview} aria-label={`Ver detalhes de ${project.title}`} onClick={onOpen}>
        <span className={styles.previewGrid} aria-hidden="true" />
        <span className={styles.previewMark}>{featured ? "Projeto em destaque" : project.status}</span>
        <span className={styles.previewArrow} aria-hidden="true">↗</span>
      </button>
      <div className={styles.cardContent}>
        <span className={styles.category}>{project.category.join(" / ")}</span>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

      <div className={styles.tech}>
        {project.technologies.map((tech) => (
          <span key={tech} className={styles.tag}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.links}>
        <button type="button" className={styles.detailsButton} onClick={onOpen}>Ver detalhes</button>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            Código
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            Demonstração
          </a>
        )}
      </div>
      </div>
    </article>
  );
}
