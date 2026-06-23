"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points } from "three";

const GRID_X = 30;
const GRID_Z = 30;
const TOTAL = GRID_X * GRID_Z;
const SPREAD_X = 12;
const SPREAD_Z = 12;

export function DottedWave() {
  const pointsRef = useRef<Points>(null);

  const { positions, colors, phaseX, phaseZ } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3);
    const colors = new Float32Array(TOTAL * 3);
    const phaseX = new Float32Array(TOTAL);
    const phaseZ = new Float32Array(TOTAL);

    for (let i = 0; i < GRID_X; i++) {
      for (let j = 0; j < GRID_Z; j++) {
        const idx = (i * GRID_Z + j) * 3;
        const dotIdx = i * GRID_Z + j;
        const x = (i / (GRID_X - 1) - 0.5) * SPREAD_X;
        const z = (j / (GRID_Z - 1) - 0.5) * SPREAD_Z;
        positions[idx] = x;
        positions[idx + 1] = 0;
        positions[idx + 2] = z;

        // Pre-compute static phase offsets
        phaseX[dotIdx] = x * 0.4;
        phaseZ[dotIdx] = z * 0.35;

        // Monochrome: white to light gray based on position
        const brightness = 0.5 + (i / GRID_X) * 0.4;
        colors[idx] = brightness;
        colors[idx + 1] = brightness;
        colors[idx + 2] = brightness;
      }
    }

    return { positions, colors, phaseX, phaseZ };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < GRID_X; i++) {
      for (let j = 0; j < GRID_Z; j++) {
        const idx = (i * GRID_Z + j) * 3;
        const dotIdx = i * GRID_Z + j;

        // Wave function: 2 wave terms for efficiency
        const y =
          Math.sin(phaseX[dotIdx] + time * 0.7) * 0.6 +
          Math.cos(phaseZ[dotIdx] + time * 0.5) * 0.5;

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
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
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
