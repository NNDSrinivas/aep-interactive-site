"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef, useState, useCallback } from "react";
import * as THREE from "three";

function createRandomGenerator(seed = 1) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

interface NodeData {
  position: THREE.Vector3;
  connections: number[];
  activity: number;
}

function InteractiveNodes({
  radius = 2.5,
  count = 50,
  mousePosition,
}: {
  radius?: number;
  count?: number;
  mousePosition: THREE.Vector2;
}) {
  const nodesRef = useRef<THREE.InstancedMesh>(null!);
  const connectionsRef = useRef<THREE.BufferGeometry>(null!);
  const [nodes] = useState<NodeData[]>(() => {
    const rand = createRandomGenerator(42);
    return Array.from({ length: count }, () => {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = radius + rand() * 0.5;
      
      return {
        position: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.3,
          r * Math.sin(phi) * Math.sin(theta)
        ),
        connections: [],
        activity: rand()
      };
    });
  });

  // Generate connections between nearby nodes
  useMemo(() => {
    nodes.forEach((node, i) => {
      node.connections = [];
      nodes.forEach((otherNode, j) => {
        if (i !== j && node.position.distanceTo(otherNode.position) < 1.2) {
          node.connections.push(j);
        }
      });
    });
  }, [nodes]);

  const connectionPositions = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach((node, i) => {
      node.connections.forEach(connectionIndex => {
        if (i < connectionIndex) { // Avoid duplicate connections
          const targetNode = nodes[connectionIndex];
          positions.push(
            node.position.x, node.position.y, node.position.z,
            targetNode.position.x, targetNode.position.y, targetNode.position.z
          );
        }
      });
    });
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Update nodes with mouse influence and time-based animation
    nodes.forEach((node, i) => {
      const matrix = new THREE.Matrix4();
      const position = node.position.clone();
      
      // Mouse influence
      const mouseInfluence = new THREE.Vector3(
        mousePosition.x * 2,
        mousePosition.y * 2,
        0
      );
      const distance = position.distanceTo(mouseInfluence);
      const influence = Math.max(0, 1 - distance / 3);
      
      position.add(mouseInfluence.clone().sub(position).multiplyScalar(influence * 0.1));
      
      // Time-based wobble
      position.add(new THREE.Vector3(
        Math.sin(t + i * 0.1) * 0.02,
        Math.cos(t + i * 0.15) * 0.02,
        Math.sin(t + i * 0.2) * 0.02
      ));
      
      // Scale based on activity and mouse proximity
      const scale = 0.02 + influence * 0.03 + Math.sin(t + node.activity * 10) * 0.005;
      
      matrix.setPosition(position);
      matrix.scale(new THREE.Vector3(scale, scale, scale));
      nodesRef.current.setMatrixAt(i, matrix);
    });
    
    nodesRef.current.instanceMatrix.needsUpdate = true;
    
    // Update connection line geometry
    if (connectionsRef.current) {
      connectionsRef.current.setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3));
    }
  });

  return (
    <group>
      {/* Nodes */}
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, nodes.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial 
          color="#00FFD1" 
          transparent 
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
      
      {/* Connections */}
      <primitive object={new THREE.Line(
        new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3)),
        new THREE.LineBasicMaterial({ 
          color: "#4b5563", 
          transparent: true, 
          opacity: 0.3,
          blending: THREE.AdditiveBlending
        })
      )} />
    </group>
  );
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
    const t = state.clock.getElapsedTime() * 0.03;
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 1.2;
  });

  return (
    <group rotation={[0, 0, Math.PI / 12]}>
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          transparent
          size={0.008}
          sizeAttenuation
          depthWrite={false}
          vertexColors={false}
          color={"#9ad9ff"}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function NeuralOrbit() {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2());

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 2 - 1;
    const y = -(event.clientY - rect.top) / rect.height * 2 + 1;
    setMousePosition(new THREE.Vector2(x, y));
  }, []);

  return (
    <div 
      className="absolute inset-0 -z-10"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true }}
      >
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate
          autoRotate
          autoRotateSpeed={0.3}
        />
        <color attach="background" args={["#0C0F13"]} />
        
        <Stars />
        <InteractiveNodes mousePosition={mousePosition} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[4, 3, 5]} intensity={0.8} color={"#00FFD1"} />
        <pointLight position={[-3, -2, -4]} intensity={0.6} color={"#3A0CA3"} />
        
        {/* Add subtle bloom effect */}
        <EffectComposer>
          <Bloom 
            intensity={0.3}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
