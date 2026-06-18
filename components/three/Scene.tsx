"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { DottedWave } from "./DottedWave";

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
      camera={{ position: [0, 4, 8], fov: 55 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      <Suspense fallback={<Loader />}>
        <DottedWave />
      </Suspense>
    </Canvas>
  );
}
