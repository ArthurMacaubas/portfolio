"use client";

import dynamic from "next/dynamic";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { technologies } from "@/data/technologies";
import ScrollWords from "@/components/ScrollWords/ScrollWords";
import SplitReveal from "@/components/SplitReveal/SplitReveal";
import Counter from "@/components/Counter/Counter";
import styles from "./About.module.css";

const ChipScene = dynamic(() => import("@/components/Scene3D/ChipScene"), { ssr: false });

const published = projects.filter((p) => p.published).length;
const techCount = technologies.reduce((sum, c) => sum + c.items.length, 0);

const STATS = [
  { value: published, suffix: "", label: "projetos publicados" },
  { value: techCount, suffix: "+", label: "tecnologias no dia a dia" },
  { value: 2026, suffix: "", label: "formatura no IFRO", pad: 4 },
];

export default function About() {
  return (
    <section id="sobre" className={`section ${styles.about}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.textCol}>
          <span className="label">Sobre</span>
          <SplitReveal as="h2" text="Aprendo construindo." className={styles.heading} />
          <ScrollWords
            className={styles.paragraph}
            text={`Sou estudante do ${profile.education.course.toLowerCase()} no ${profile.education.institution}. Transito entre desenvolvimento web e automação, sempre tentando entender como software e hardware se conectam para resolver problemas reais.`}
          />

          <dl className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={styles.statValue}>
                  <Counter to={stat.value} suffix={stat.suffix} pad={stat.pad} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.visualCol}>
          <div className={styles.visual}>
            <ChipScene />
            <span className={styles.caption}>{"// software + hardware"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
