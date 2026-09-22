import RevealOnScroll from "@/components/RevealOnScroll/RevealOnScroll";
import { profile } from "@/data/profile";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contato" className={`section ${styles.contact}`}>
      <div className={`container ${styles.inner}`}>
        <RevealOnScroll>
          <h2 className={styles.heading}>Vamos criar algo?</h2>
          <p className={styles.text}>
            Estou aberto a projetos, trocas de ideia e oportunidades de aprender junto.
          </p>
          <div className={styles.links}>
            <a href={`mailto:${profile.email}`} className={styles.primary}>
              Enviar e-mail
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
              {profile.github.replace("https://", "")}
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
