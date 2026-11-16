"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import LazyCanvas from "./LazyCanvas";
import { useSceneEnv } from "./useSceneEnv";
import styles from "./TechSphere.module.css";

const RADIUS = 2.1;

/** Distribui pontos de forma uniforme numa esfera (espiral de Fibonacci). */
function fibonacciSphere(n: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS));
  }
  return points;
}

function Label({ text, position }: { text: string; position: THREE.Vector3 }) {
  const ref = useRef<HTMLDivElement>(null);
  const world = useMemo(() => new THREE.Vector3(), []);
  const anchor = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current || !anchor.current) return;
    anchor.current.getWorldPosition(world);
    // z vai de -RADIUS (atrás) a +RADIUS (frente)
    const depth = (world.z + RADIUS) / (RADIUS * 2);
    ref.current.style.opacity = String(0.12 + depth * 0.88);
    ref.current.style.transform = `scale(${0.7 + depth * 0.45})`;
    ref.current.style.filter = depth < 0.35 ? "blur(1px)" : "none";
  });

  return (
    <group ref={anchor} position={position}>
      <Html center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div ref={ref} className={styles.label}>
          {text}
        </div>
      </Html>
    </group>
  );
}

function Sphere({ items, reduced }: { items: string[]; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => fibonacciSphere(items.length), [items.length]);
  const dots = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(fibonacciSphere(220));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group} rotation={[0.3, 0, 0.1]}>
      <points geometry={dots} scale={0.96}>
        <pointsMaterial size={0.025} color="#5a5a64" sizeAttenuation transparent opacity={0.8} />
      </points>
      <mesh>
        <icosahedronGeometry args={[RADIUS * 0.55, 1]} />
        <meshBasicMaterial color="#ffb454" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.07, 32, 32]} />
        <meshBasicMaterial color="#ffb454" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.16, 32, 32]} />
        <meshBasicMaterial color="#ffb454" transparent opacity={0.12} depthWrite={false} />
      </mesh>
      {items.map((item, i) => (
        <Label key={item} text={item} position={points[i]} />
      ))}
    </group>
  );
}

export default function TechSphere({ items }: { items: string[] }) {
  const { reduced, touch } = useSceneEnv();
  return (
    <LazyCanvas camera={{ position: [0, 0, 7.4], fov: 42 }}>
      <Sphere items={items} reduced={reduced} />
      {/* Arrastar para girar só no desktop: no celular o gesto é do scroll */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!touch}
        rotateSpeed={0.5}
        enableDamping
      />
    </LazyCanvas>
  );
}
