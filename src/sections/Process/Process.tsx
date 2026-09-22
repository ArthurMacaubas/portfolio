import RevealOnScroll from "@/components/RevealOnScroll/RevealOnScroll";
import { processSteps } from "@/data/process";
import styles from "./Process.module.css";

export default function Process() {
  return (
    <section className={`section ${styles.process}`}>
      <div className="container">
        <RevealOnScroll>
          <div className={styles.header}>
            <span className={styles.label}>Como eu trabalho</span>
            <h2 className={styles.heading}>Do problema ao código</h2>
          </div>
        </RevealOnScroll>

        <div className={styles.timeline}>
          {processSteps.map((step, index) => (
            <RevealOnScroll key={step.number} delay={Math.min(index * 0.07, 0.28)}>
              <div className={styles.step}>
                <span className={styles.number}>{step.number}</span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
