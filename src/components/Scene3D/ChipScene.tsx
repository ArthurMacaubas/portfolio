"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Grid, Lightformer, Line, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import LazyCanvas from "./LazyCanvas";
import { useSceneEnv } from "./useSceneEnv";

const PINS_PER_SIDE = 8;
const CHIP = 1.6;

type Trace = { points: [number, number, number][]; color: string; speed: number };

/** Gera trilhas de circuito que saem dos pinos com curvas em 90°/45°. */
function buildTraces(): Trace[] {
  const traces: Trace[] = [];
  const half = CHIP / 2;
  const step = CHIP / (PINS_PER_SIDE + 1);
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  for (let side = 0; side < 4; side++) {
    for (let i = 1; i <= PINS_PER_SIDE; i++) {
      if (rand() < 0.35) continue;
      const along = -half + i * step;
      const out1 = half + 0.25 + rand() * 0.6;
      const bend = (rand() - 0.5) * 1.4;
      const out2 = out1 + 0.6 + rand() * 1.8;
      // trilha descrita no eixo +X e depois girada para cada lado
      const local: [number, number][] = [
        [half + 0.12, along],
        [out1, along],
        [out1 + Math.abs(bend), along + bend],
        [out2, along + bend],
      ];
      const angle = (side * Math.PI) / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      traces.push({
        points: local.map(([x, z]) => [x * cos - z * sin, -0.149, x * sin + z * cos]),
        color: rand() > 0.5 ? "#ffb454" : "#4fd1c5",
        speed: 0.4 + rand() * 0.8,
      });
    }
  }
  return traces;
}

function Pins() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = PINS_PER_SIDE * 4;

  useLayoutEffect(() => {
    if (!ref.current) return;
    const dummy = new THREE.Object3D();
    const step = CHIP / (PINS_PER_SIDE + 1);
    let n = 0;
    for (let side = 0; side < 4; side++) {
      for (let i = 1; i <= PINS_PER_SIDE; i++) {
        const along = -CHIP / 2 + i * step;
        const angle = (side * Math.PI) / 2;
        const x = CHIP / 2 + 0.06;
        dummy.position.set(x * Math.cos(angle) - along * Math.sin(angle), -0.1, x * Math.sin(angle) + along * Math.cos(angle));
        dummy.rotation.set(0, -angle, 0);
        dummy.updateMatrix();
        ref.current.setMatrixAt(n++, dummy.matrix);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.16, 0.05, 0.07]} />
      <meshStandardMaterial color="#d9b77a" metalness={1} roughness={0.25} />
    </instancedMesh>
  );
}

function FlowingTrace({ trace, reduced }: { trace: Trace; reduced: boolean }) {
  const ref = useRef<any>(null);
  useFrame((_, delta) => {
    if (reduced || !ref.current?.material) return;
    ref.current.material.dashOffset -= delta * trace.speed;
  });
  return (
    <group>
      <Line points={trace.points} color="#2a2c33" lineWidth={1.2} />
      <Line
        ref={ref}
        points={trace.points}
        color={trace.color}
        lineWidth={2}
        dashed
        dashSize={0.18}
        gapSize={1.4}
        toneMapped={false}
        position={[0, 0.002, 0]}
      />
    </group>
  );
}

function Chip({ reduced, small }: { reduced: boolean; small: boolean }) {
  const group = useRef<THREE.Group>(null);
  const die = useRef<THREE.MeshStandardMaterial>(null);
  const { gl, pointer } = useThree();
  const traces = useMemo(buildTraces, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const rect = gl.domElement.getBoundingClientRect();
    // -1 quando entra por baixo, 1 quando sai por cima
    const p = THREE.MathUtils.clamp(1 - (rect.top + rect.height) / (window.innerHeight + rect.height) * 2, -1, 1);
    const targetX = 0.75 + p * 0.35 + (reduced ? 0 : pointer.y * 0.12);
    const targetY = p * Math.PI * 0.5 + (reduced ? 0 : pointer.x * 0.25);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.08);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.08);
    if (die.current && !reduced) {
      die.current.emissiveIntensity = 0.18 + Math.sin(clock.getElapsedTime() * 2) * 0.12;
    }
  });

  return (
    <group ref={group} scale={small ? 0.8 : 1}>
      <RoundedBox args={[CHIP, 0.22, CHIP]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#141418" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.112, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshStandardMaterial
          ref={die}
          color="#1b1b20"
          emissive="#ffb454"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[-0.55, 0.112, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.05, 24]} />
        <meshBasicMaterial color="#3a3a42" />
      </mesh>
      <Pins />
      {traces.map((trace, i) => (
        <FlowingTrace key={i} trace={trace} reduced={reduced} />
      ))}
      <Grid
        position={[0, -0.15, 0]}
        args={[12, 12]}
        cellSize={0.25}
        cellThickness={0.5}
        cellColor="#1d1e24"
        sectionSize={1.5}
        sectionThickness={0.8}
        sectionColor="#2a2b33"
        fadeDistance={7}
        fadeStrength={2}
      />
    </group>
  );
}

export default function ChipScene() {
  const { reduced, small } = useSceneEnv();
  return (
    <LazyCanvas camera={{ position: [0, 2.2, 4.4], fov: 38 }}>
      <Chip reduced={reduced} small={small} />
      <ambientLight intensity={0.2} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 2]} scale={[6, 2, 1]} />
        <Lightformer form="circle" intensity={2} color="#ffb454" position={[-4, 1, 0]} scale={2} />
        <Lightformer form="circle" intensity={1.5} color="#4fd1c5" position={[4, 1, -2]} scale={2} />
      </Environment>
    </LazyCanvas>
  );
}
