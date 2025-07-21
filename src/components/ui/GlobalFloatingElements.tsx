"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingElementProps {
  color: string;
  shape: "box" | "sphere" | "torus" | "cone" | "tetrahedron";
  size?: number;
  speed?: number;
  viewport: { width: number; height: number; dpr: number };
}

const FloatingElement = ({
  color,
  shape,
  size = 0.5,
  speed = 1,
  viewport,
}: FloatingElementProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [initialized, setInitialized] = useState(false);

  // Calculate random position within viewport space
  const position = useMemo(() => {
    const aspect = viewport.width / viewport.height;
    const x = (Math.random() - 0.5) * 25 * aspect; // Wider spread
    const y = (Math.random() - 0.5) * 25; // Taller spread
    const z = (Math.random() - 0.5) * 15; // More depth
    return { x, y, z };
  }, [viewport]);

  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const radius = useMemo(() => 1.5 + Math.random() * 3, []);
  const speedFactor = useMemo(() => 0.1 + Math.random() * 0.3, []);
  const rotationSpeed = useMemo(() => (Math.random() - 0.5) * 0.01, []);

  useFrame(({ clock }) => {
    if (meshRef.current && initialized) {
      const time = clock.getElapsedTime() * speedFactor * speed;

      // More dynamic floating motion
      meshRef.current.position.x =
        position.x + Math.sin(time * 0.5 + offset) * radius * 1.5;
      meshRef.current.position.y =
        position.y + Math.cos(time * 0.7 + offset * 1.3) * radius;
      meshRef.current.position.z =
        position.z + Math.sin(time * 0.3 + offset * 0.7) * radius * 0.7;

      // Smoother rotation
      meshRef.current.rotation.x += rotationSpeed * speed * 0.7;
      meshRef.current.rotation.y += rotationSpeed * 1.5 * speed * 0.7;
      meshRef.current.rotation.z += rotationSpeed * 0.5 * speed * 0.7;
    }
  });

  const geometry = useMemo(() => {
    const segments = Math.floor(12 + Math.random() * 8); // More detailed geometry
    switch (shape) {
      case "box":
        return <boxGeometry args={[size, size, size, segments, segments]} />;
      case "sphere":
        return <sphereGeometry args={[size * 0.7, segments, segments]} />;
      case "torus":
        return (
          <torusGeometry
            args={[size * 0.6, size * 0.2, segments, segments * 2]}
          />
        );
      case "cone":
        return (
          <coneGeometry
            args={[size * 0.7, size * 1.4, 6 + Math.floor(Math.random() * 4)]}
          />
        );
      case "tetrahedron":
        return <tetrahedronGeometry args={[size * 0.8, 0]} />;
      default:
        return <boxGeometry args={[size, size, size, segments, segments]} />;
    }
  }, [shape, size]);

  // Set initial position after mount
  useEffect(() => {
    if (meshRef.current && !initialized) {
      meshRef.current.position.set(position.x, position.y, position.z);
      setInitialized(true);
    }
  }, [position, initialized]);

  const materialProps = useMemo(
    () => ({
      color,
      metalness: 0.3 + Math.random() * 0.4,
      roughness: 0.4 + Math.random() * 0.3,
      transparent: true,
      opacity: 0.8 + Math.random() * 0.2,
      emissive: color,
      emissiveIntensity: 0.4 + Math.random() * 0.3,
      envMapIntensity: 0.5,
      clearcoat: 0.2 + Math.random() * 0.3,
      clearcoatRoughness: 0.1 + Math.random() * 0.2,
    }),
    [color]
  );

  return (
    <mesh
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      castShadow
      receiveShadow
    >
      {geometry}
      <meshStandardMaterial {...materialProps} />
    </mesh>
  );
};

interface GlobalFloatingElementsProps {
  viewport: {
    width: number;
    height: number;
    dpr: number;
  };
}

export const GlobalFloatingElements = ({ viewport }: GlobalFloatingElementsProps) => {
  const [mounted, setMounted] = useState(false);

  // Generate a larger number of elements for better coverage
  const elements = useMemo(() => {
    const shapes = ["box", "sphere", "torus", "cone", "tetrahedron"] as const;
    const count = 30; // Increased number of elements for better coverage

    // More vibrant color palette
    const colorPalette = [
      "#61dafb", // React blue
      "#f0db4f", // JS yellow
      "#68a063", // Green
      "#ff6b6b", // Coral
      "#9b59b6", // Purple
      "#3498db", // Blue
      "#e74c3c", // Red
      "#2ecc71", // Emerald
    ];

    return Array.from({ length: count }, (_, i) => {
      // Distribute shapes more evenly
      const shape = shapes[i % shapes.length];
      // Use color palette with some randomness
      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];

      return {
        color,
        shape,
        size: 0.2 + Math.random() * 0.4, // Slightly larger and more varied sizes
        speed: 0.3 + Math.random() * 1.2, // Slower, more graceful movement
        opacity: 0.7 + Math.random() * 0.3, // More visible
      };
    });
  }, []);

  // Handle window resize
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {elements.map((element, index) => (
        <FloatingElement key={index} {...element} viewport={viewport} />
      ))}
    </>
  );
};

export default GlobalFloatingElements;
