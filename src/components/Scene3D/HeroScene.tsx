"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import LazyCanvas from "./LazyCanvas";
import { useSceneEnv } from "./useSceneEnv";

/** Esfera emissiva que orbita atrás do vidro — é ela que a refração "dobra". */
function Orb({
  color,
  radius,
  speed,
  offset,
  tilt,
  size,
}: {
  color: string;
  radius: number;
  speed: number;
  offset: number;
  tilt: number;
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (!ref.current) return;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius * tilt, Math.sin(t) * radius * 0.6 - 1.4);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function Core({ small, reduced }: { small: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();

  useFrame((_, delta) => {
    if (!group.current || !knot.current) return;
    // progresso de saída da Hero (0 no topo, 1 quando a Hero saiu da tela)
    const progress = Math.min(1, window.scrollY / window.innerHeight);

    if (!reduced) {
      knot.current.rotation.x += delta * 0.15;
      knot.current.rotation.y += delta * 0.22;
      if (ring.current) ring.current.rotation.z -= delta * 0.1;
    }

    const targetX = reduced ? 0 : pointer.y * 0.35;
    const targetY = reduced ? 0 : pointer.x * 0.5;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX + progress * 1.2, 0.06);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.06);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, progress * 1.5, 0.1);
    const s = (small ? 0.55 : 0.85) * (1 - progress * 0.35);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.1));
  });

  const offsetX = small ? 0 : Math.min(viewport.width * 0.24, 2.7);

  return (
    <group position={[offsetX, small ? 0.15 : 0, 0]}>
      <group ref={group}>
        <Float speed={reduced ? 0 : 1.6} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh ref={knot}>
            <torusKnotGeometry args={[1, 0.34, small ? 160 : 260, small ? 24 : 40]} />
            <MeshTransmissionMaterial
              samples={small ? 4 : 8}
              resolution={small ? 256 : 768}
              thickness={0.9}
              roughness={0.05}
              transmission={1}
              ior={1.35}
              chromaticAberration={0.6}
              anisotropicBlur={0.15}
              distortion={0.35}
              distortionScale={0.4}
              temporalDistortion={0.12}
              backside
              backsideThickness={0.4}
              color="#f6efe6"
            />
          </mesh>
        </Float>

        <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.3, 0.006, 16, 200]} />
          <meshBasicMaterial color="#ffb454" toneMapped={false} transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, 0.4, 0]}>
          <torusGeometry args={[2.7, 0.004, 16, 200]} />
          <meshBasicMaterial color="#4fd1c5" toneMapped={false} transparent opacity={0.4} />
        </mesh>
      </group>

      <Orb color="#ffb454" radius={1.5} speed={0.5} offset={0} tilt={0.6} size={0.16} />
      <Orb color="#4fd1c5" radius={1.8} speed={0.35} offset={2.2} tilt={-0.4} size={0.12} />
      <Orb color="#ffffff" radius={1.2} speed={0.7} offset={4.1} tilt={0.9} size={0.06} />
    </group>
  );
}

export default function HeroScene() {
  const { small, reduced } = useSceneEnv();
  const sparkles = useMemo(() => (small ? 60 : 140), [small]);

  return (
    <LazyCanvas camera={{ position: [0, 0, 6.5], fov: 40 }}>
      <Core small={small} reduced={reduced} />
      <Sparkles
        count={sparkles}
        scale={[12, 7, 4]}
        size={1.6}
        speed={reduced ? 0 : 0.25}
        opacity={0.5}
        color="#f2f0eb"
      />
      {/* Ambiente de luz feito só com Lightformers: nada é baixado da internet */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} color="#ffb454" position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} color="#4fd1c5" position={[5, -1, -1]} scale={2} />
          <Lightformer form="ring" intensity={3} position={[-3, 3, 4]} scale={6} />
          <Lightformer form="rect" intensity={1} position={[0, -4, 2]} scale={[10, 1, 1]} />
        </group>
      </Environment>
    </LazyCanvas>
  );
}
