"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { profile } from "@/data/profile";
import { useLenis } from "@/components/SmoothScroll/SmoothScroll";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

/** Texto que "rola" para cima no hover: a cópia de baixo substitui a de cima. */
function RollText({ children }: { children: string }) {
  return (
    <span className={styles.roll}>
      <span className={styles.rollInner} data-text={children}>
        {children}
      </span>
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setScrolled(y > 40);
  });

  // trava o scroll da página com o menu mobile aberto
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  return (
    <>
      <motion.header
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.inner}>
          <a href="#hero" className={styles.logo} aria-label={`${profile.name}, voltar ao início`}>
            <span className={styles.logoMark}>AP</span>
            <span className={styles.logoText}>{profile.name}</span>
          </a>

          <nav className={styles.links} aria-label="Navegação principal">
            {NAV_ITEMS.map((item, i) => (
              <a key={item.href} href={item.href} className={styles.link}>
                <span className={styles.index}>0{i + 1}</span>
                <RollText>{item.label}</RollText>
              </a>
            ))}
          </nav>

          <button
            className={`${styles.menuButton} ${open ? styles.menuOpen : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className={styles.mobileLinks} aria-label="Navegação mobile">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.href} className={styles.mobileMask}>
                  <motion.a
                    href={item.href}
                    className={styles.mobileLink}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className={styles.index}>0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className={styles.mobileFooter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
