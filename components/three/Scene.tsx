"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { FloatingShapes } from "./FloatingShapes";
import { ParticleField } from "./ParticleField";
import { GlowingSphere } from "./GlowingSphere";

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[5, -5, -5]} intensity={0.3} color="#cccccc" />

      <Suspense fallback={<Loader />}>
        <GlowingSphere />
        <FloatingShapes />
        <ParticleField />
      </Suspense>
    </Canvas>
  );
}
