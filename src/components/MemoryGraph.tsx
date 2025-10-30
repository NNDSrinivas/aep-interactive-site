"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Node = { id: number; pos: THREE.Vector3 };
type Edge = [number, number];

function createRandomGenerator(seed = 1) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function useGraph(count = 42, radius = 2.2) {
  return useMemo(() => {
    const rand = createRandomGenerator(count * 97);
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * rand() - 1);
      const theta = rand() * Math.PI * 2;
      const r = radius * (0.6 + rand() * 0.4);
      nodes.push({
        id: i,
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.6,
          r * Math.sin(phi) * Math.sin(theta),
        ),
      });
    }

    for (let i = 0; i < count; i++) {
      const a = i;
      const b = Math.floor(rand() * count);
      if (a !== b) edges.push([a, b]);
    }

    return { nodes, edges };
  }, [count, radius]);
}

function GraphScene() {
  const { nodes, edges } = useGraph();
  const [hover, setHover] = useState<number | null>(null);
  const group = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.12;
    if (group.current) {
      group.current.rotation.y = t * 0.25;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {edges.map(([a, b], idx) => {
        const geom = new THREE.BufferGeometry().setFromPoints([
          nodes[a].pos,
          nodes[b].pos,
        ]);
        return (
          <line key={`${a}-${b}-${idx}`} geometry={geom}>
            <lineBasicMaterial
              color={hover === a || hover === b ? "#00FFD1" : "#4b5563"}
              transparent
              opacity={hover === a || hover === b ? 0.9 : 0.3}
            />
          </line>
        );
      })}

      {nodes.map((node) => (
        <mesh
          key={node.id}
          position={node.pos}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHover(node.id);
          }}
          onPointerOut={() => setHover(null)}
        >
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color={hover === node.id ? "#00FFD1" : "#a3b4c4"}
            emissive={
              hover === node.id ? new THREE.Color("#00FFD1") : new THREE.Color("#000000")
            }
            emissiveIntensity={hover === node.id ? 0.8 : 0}
          />
          {hover === node.id && (
            <Html distanceFactor={8}>
              <div className="rounded-md border border-white/10 bg-black/70 px-2 py-1 text-xs backdrop-blur">
                Node {node.id} · commits: {20 + (node.id % 7)}
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </group>
  );
}

export default function MemoryGraph() {
  return (
    <div className="relative h-[520px] w-full rounded-2xl border-card bg-card/60 backdrop-blur">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={0.6} />
        <GraphScene />
      </Canvas>
    </div>
  );
}
