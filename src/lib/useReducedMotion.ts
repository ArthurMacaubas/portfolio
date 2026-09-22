"use client";

import { useEffect, useState } from "react";

/**
 * Retorna true quando o usuário pediu menos movimento no sistema.
 * Usado para desativar/simplificar animações no lugar de apenas
 * confiar no CSS (necessário para lógica condicional no Framer Motion).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
