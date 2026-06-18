"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points } from "three";

const GRID_X = 60;
const GRID_Z = 60;
const TOTAL = GRID_X * GRID_Z;
const SPREAD_X = 12;
const SPREAD_Z = 12;

export function DottedWave() {
  const pointsRef = useRef<Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3);
    const colors = new Float32Array(TOTAL * 3);

    for (let i = 0; i < GRID_X; i++) {
      for (let j = 0; j < GRID_Z; j++) {
        const idx = (i * GRID_Z + j) * 3;
        positions[idx] = (i / (GRID_X - 1) - 0.5) * SPREAD_X;
        positions[idx + 1] = 0;
        positions[idx + 2] = (j / (GRID_Z - 1) - 0.5) * SPREAD_Z;

        // Monochrome: white to light gray based on position
        const brightness = 0.5 + (i / GRID_X) * 0.4;
        colors[idx] = brightness;
        colors[idx + 1] = brightness;
        colors[idx + 2] = brightness;
      }
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < GRID_X; i++) {
      for (let j = 0; j < GRID_Z; j++) {
        const idx = (i * GRID_Z + j) * 3;
        const x = positions[idx];
        const z = positions[idx + 2];

        // Wave function: combination of sine and cosine for organic ripple
        const y =
          Math.sin(x * 0.4 + time * 0.7) * 0.6 +
          Math.cos(z * 0.35 + time * 0.5) * 0.5 +
          Math.sin((x + z) * 0.25 + time * 0.4) * 0.3;

        posArray[idx + 1] = y;
      }
    }

    posAttr.needsUpdate = true;

    // Gentle rotation for depth
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.08) * 0.1 - 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={TOTAL}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={TOTAL}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
