"use client";

import { motion } from "framer-motion";
import styles from "./SplineScene.module.css";

/**
 * PLACEHOLDER para a cena 3D do Spline.
 *
 * Como adicionar a cena real:
 * 1. Exporte a cena no Spline e copie a URL pública (algo como
 *    https://prod.spline.design/XXXXXXXX/scene.splinecode).
 * 2. Instale o runtime:  npm install @splinetool/react-spline
 * 3. Troque o conteúdo deste arquivo por:
 *
 *    "use client";
 *    import Spline from "@splinetool/react-spline";
 *
 *    export default function SplineScene() {
 *      return (
 *        <div className={styles.wrapper}>
 *          <Spline scene="https://prod.spline.design/XXXXXXXX/scene.splinecode" />
 *        </div>
 *      );
 *    }
 *
 * 4. Carregue com next/dynamic e ssr:false na Hero para não pesar
 *    o carregamento inicial:
 *    const SplineScene = dynamic(() => import("@/components/SplineScene/SplineScene"), { ssr: false });
 *
 * Enquanto isso, este placeholder mostra uma "grade de circuito"
 * leve, sem custo de performance, mantendo o espaço reservado.
 */
export default function SplineScene() {
  return (
    <div className={styles.wrapper} role="img" aria-label="Espaço reservado para cena 3D">
      <motion.span
        className={styles.dot}
        style={{ top: "30%", left: "35%" }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={styles.dot}
        style={{ top: "62%", left: "58%" }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <span className={styles.label}>
        {"// cena 3D (Spline)"}
        <br />
        espaço reservado
      </span>
    </div>
  );
}
