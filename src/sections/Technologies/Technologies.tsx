"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { technologies } from "@/data/technologies";
import SplitReveal from "@/components/SplitReveal/SplitReveal";
import styles from "./Technologies.module.css";

const TechSphere = dynamic(() => import("@/components/Scene3D/TechSphere"), { ssr: false });

const allItems = technologies.flatMap((c) => c.items);

export default function Technologies() {
  return (
    <section id="tecnologias" className={`section ${styles.technologies}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.textCol}>
          <span className="label">Tecnologias</span>
          <SplitReveal as="h2" text="Ferramentas do dia a dia." className={styles.heading} />

          <div className={styles.categories}>
            {technologies.map((category, ci) => (
              <motion.div
                key={category.label}
                className={styles.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, delay: ci * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className={styles.categoryTitle}>
                  <span className={styles.categoryIndex}>0{ci + 1}</span>
                  {category.label}
                </h3>
                <ul className={styles.items}>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.sphere} data-cursor="Arraste">
          <TechSphere items={allItems} />
        </div>
      </div>
    </section>
  );
}
