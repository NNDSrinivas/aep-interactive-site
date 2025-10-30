"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function createRandomGenerator(seed = 1) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function Stars({
  radius = 1.8,
  depth = 2.5,
  count = 6000,
  factor = 3,
}: {
  radius?: number;
  depth?: number;
  count?: number;
  factor?: number;
}) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    const rand = createRandomGenerator(count + radius * 1000);
    for (let i = 0; i < count; i++) {
      const r = radius + rand() * depth;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      p[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = (r * Math.cos(phi)) / factor;
      p[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return p;
  }, [count, depth, factor, radius]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.06;
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 1.5;
  });

  return (
    <group rotation={[0, 0, Math.PI / 12]}>
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          transparent
          size={0.01}
          sizeAttenuation
          depthWrite={false}
          vertexColors={false}
          color={"#9ad9ff"}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function NeuralOrbit() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true }}
      >
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate
          autoRotate
          autoRotateSpeed={0.6}
        />
        <color attach="background" args={["#0C0F13"]} />
        <Stars />
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 5]} intensity={0.6} color={"#00FFD1"} />
        <pointLight position={[-3, -2, -4]} intensity={0.4} color={"#3A0CA3"} />
      </Canvas>
    </div>
  );
}
