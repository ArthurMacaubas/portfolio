import RevealOnScroll from "@/components/RevealOnScroll/RevealOnScroll";
import { profile } from "@/data/profile";
import styles from "./About.module.css";

const HIGHLIGHTS = [
  "Técnico em Informática — IFRO",
  "Desenvolvimento web",
  "Programação",
  "Hardware",
  "Arduino / ESP32",
  "Sempre aprendendo algo novo",
];

export default function About() {
  return (
    <section id="sobre" className={`section ${styles.about}`}>
      <div className={`container ${styles.grid}`}>
        <RevealOnScroll>
          <span className={styles.label}>Sobre</span>
          <h2 className={styles.heading}>Estudante que aprende construindo.</h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className={styles.text}>
            Sou estudante do {profile.education.course.toLowerCase()} no{" "}
            {profile.education.institution} ({profile.education.period}). No dia a dia, transito
            entre desenvolvimento web e projetos de automação — sempre buscando entender como
            software e hardware se conectam para resolver problemas reais.
          </p>
          <ul className={styles.list}>
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
