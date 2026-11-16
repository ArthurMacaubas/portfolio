"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LazyCanvas from "./LazyCanvas";
import { useSceneEnv } from "./useSceneEnv";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vHeight;
  void main() {
    vec3 p = position;
    float d = distance(p.xz, uMouse * vec2(9.0, 5.0));
    float wave = sin(p.x * 0.6 + uTime * 0.8) * 0.35
               + cos(p.z * 0.9 + uTime * 0.6) * 0.25
               + sin((p.x + p.z) * 0.35 + uTime) * 0.2;
    float ripple = exp(-d * 0.6) * sin(d * 2.5 - uTime * 3.0) * 0.5;
    p.y += wave + ripple;
    vHeight = p.y;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (2.2 + vHeight * 1.2) * (12.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vHeight;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float mixer = smoothstep(-0.5, 0.8, vHeight);
    vec3 color = mix(uColorA, uColorB, mixer);
    gl_FragColor = vec4(color, (1.0 - d * 2.0) * (0.35 + mixer * 0.65));
  }
`;

function Wave({ reduced, small }: { reduced: boolean; small: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const cols = small ? 70 : 140;
    const rows = small ? 40 : 70;
    const positions = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        positions[i++] = (x / (cols - 1) - 0.5) * 22;
        positions[i++] = 0;
        positions[i++] = (z / (rows - 1) - 0.5) * 12;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [small]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#2a2a33") },
      uColorB: { value: new THREE.Color("#ffb454") },
    }),
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (!material.current) return;
    if (!reduced) material.current.uniforms.uTime.value = clock.getElapsedTime();
    const mouse = material.current.uniforms.uMouse.value as THREE.Vector2;
    mouse.lerp(new THREE.Vector2(pointer.x, -pointer.y), 0.05);
  });

  return (
    <points geometry={geometry} rotation={[0.15, 0, 0]}>
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function WaveScene() {
  const { reduced, small } = useSceneEnv();
  return (
    <LazyCanvas camera={{ position: [0, 3.2, 8], fov: 50 }} onCreated={({ camera }) => camera.lookAt(0, 0, 0)}>
      <Wave reduced={reduced} small={small} />
    </LazyCanvas>
  );
}
