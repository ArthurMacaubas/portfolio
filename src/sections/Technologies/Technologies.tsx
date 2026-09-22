import RevealOnScroll from "@/components/RevealOnScroll/RevealOnScroll";
import TechBadge from "@/components/TechBadge/TechBadge";
import { technologies } from "@/data/technologies";
import styles from "./Technologies.module.css";

export default function Technologies() {
  return (
    <section id="tecnologias" className={`section ${styles.tech}`}>
      <div className="container">
        <RevealOnScroll>
          <div className={styles.header}>
            <span className={styles.label}>Tecnologias</span>
            <h2 className={styles.heading}>Com o que eu trabalho</h2>
          </div>
        </RevealOnScroll>

        <div className={styles.categories}>
          {technologies.map((category, index) => (
            <RevealOnScroll key={category.label} delay={Math.min(index * 0.06, 0.24)}>
              <div className={styles.category}>
                <span className={styles.categoryLabel}>{category.label}</span>
                <div className={styles.badges}>
                  {category.items.map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
