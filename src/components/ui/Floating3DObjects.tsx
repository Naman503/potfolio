"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 3D Models
const RobotModel = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      group.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} scale={0.5} position={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#61dafb" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const PikachuModel = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      group.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.7) * 0.1;
    }
  });

  return (
    <group ref={group} scale={0.4} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FFDE00" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 1.2]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>
    </group>
  );
};

const FloatingObject = ({
  position,
  type,
  scale = 1,
}: {
  position: [number, number, number];
  type: string;
  scale?: number;
}) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {type === "cube" && <boxGeometry args={[1, 1, 1]} />}
      {type === "sphere" && <sphereGeometry args={[0.5, 32, 32]} />}
      {type === "torus" && <torusGeometry args={[0.6, 0.2, 16, 32]} />}
      <meshStandardMaterial
        color={
          type === "cube"
            ? "#61dafb"
            : type === "sphere"
            ? "#f0db4f"
            : "#ff6b6b"
        }
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

export const Floating3DObjects = () => {
  const objects = useMemo(
    () => [
      { position: [2, 1, 0], type: "cube" as const, scale: 0.6 },
      { position: [-1, -1, 1], type: "sphere" as const, scale: 0.7 },
      { position: [0, 1.5, -1], type: "torus" as const, scale: 0.5 },
    ],
    []
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <RobotModel />
        <PikachuModel />

        {objects.map((obj, i) => (
          <FloatingObject
            key={i}
            position={obj.position as [number, number, number]}
            type={obj.type}
            scale={obj.scale}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Floating3DObjects;
