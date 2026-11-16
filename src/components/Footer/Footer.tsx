"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { useLenis } from "@/components/SmoothScroll/SmoothScroll";
import styles from "./Footer.module.css";

function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Porto_Velho",
      }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const time = useLocalTime();
  const lenis = useLenis();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0 });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div className={styles.col}>
            <span className={styles.key}>Hora local</span>
            <span>{time ? `${time} — Vilhena, RO` : "Vilhena, RO"}</span>
          </div>
          <div className={styles.col}>
            <span className={styles.key}>Feito com</span>
            <span>Next.js, three.js e curiosidade</span>
          </div>
          <div className={styles.col}>
            <span className={styles.key}>Links</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
              GitHub ↗
            </a>
          </div>
          <button className={styles.top} onClick={toTop}>
            Voltar ao topo ↑
          </button>
        </div>

        <div className={styles.bigName} aria-hidden="true">
          {profile.name}
        </div>

        <div className={styles.bottom}>
          <span>© {year} {profile.fullName}</span>
        </div>
      </div>
    </footer>
  );
}
