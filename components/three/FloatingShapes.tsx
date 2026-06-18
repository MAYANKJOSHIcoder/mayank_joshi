"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: "torus" | "icosahedron" | "octahedron" | "dodecahedron";
  color: string;
  emissive: string;
  speed: number;
  scale: number;
}

function FloatingShape({ position, geometry, color, emissive, speed, scale }: FloatingShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.5;
    }
  });

  const GeometryComponent = useMemo(() => {
    switch (geometry) {
      case "torus":
        return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.4, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.4, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.35, 0]} />;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {GeometryComponent}
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.15}
        roughness={0.3}
        metalness={0.8}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export function FloatingShapes() {
  const shapes: FloatingShapeProps[] = useMemo(
    () => [
      { position: [-3, 1.5, -2], geometry: "torus" as const, color: "#e0e0e0", emissive: "#ffffff", speed: 0.8, scale: 1.2 },
      { position: [3, -1, -3], geometry: "icosahedron" as const, color: "#b0b0b0", emissive: "#cccccc", speed: 0.6, scale: 1 },
      { position: [-2, -2, -1], geometry: "octahedron" as const, color: "#c8c8c8", emissive: "#dddddd", speed: 1, scale: 0.8 },
      { position: [2.5, 2, -2], geometry: "dodecahedron" as const, color: "#a0a0a0", emissive: "#bbbbbb", speed: 0.7, scale: 1.1 },
      { position: [0, 3, -4], geometry: "torus" as const, color: "#d0d0d0", emissive: "#eeeeee", speed: 0.5, scale: 0.9 },
      { position: [-4, 0, -3], geometry: "icosahedron" as const, color: "#909090", emissive: "#aaaaaa", speed: 0.9, scale: 0.7 },
    ],
    []
  );

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </group>
  );
}
