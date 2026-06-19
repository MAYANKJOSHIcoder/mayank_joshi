"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { DottedWave } from "./DottedWave";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

export default function ThreeScene() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 4, 8], fov: 55 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        frameloop={isVisible ? "always" : "demand"}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        <Suspense fallback={<Loader />}>
          <DottedWave />
        </Suspense>
      </Canvas>
    </div>
  );
}
