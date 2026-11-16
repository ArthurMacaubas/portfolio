"use client";

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";

type Props = Omit<CanvasProps, "children"> & {
  children: ReactNode;
  className?: string;
};

/**
 * Canvas do three.js que só é criado quando chega perto da tela e
 * pausa o loop de renderização quando sai dela — várias cenas na
 * mesma página sem gastar GPU à toa.
 */
export default function LazyCanvas({ children, className, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ position: "absolute", inset: 0 }}>
      {mounted && (
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop={visible ? "always" : "never"}
          {...props}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      )}
    </div>
  );
}
