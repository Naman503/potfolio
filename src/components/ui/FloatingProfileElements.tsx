"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingElementProps {
  position: [number, number, number];
  color: string;
  shape: 'box' | 'sphere' | 'torus' | 'cone' | 'tetrahedron';
  size?: number;
  speed?: number;
}

const FloatingElement = ({ 
  position, 
  color, 
  shape, 
  size = 0.5, 
  speed = 1 
}: FloatingElementProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => ({
    x: position[0] + (Math.random() - 0.5) * 2,
    y: position[1] + (Math.random() - 0.5) * 2,
    z: position[2] + (Math.random() - 0.5) * 2,
  }), [position]);

  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const radius = useMemo(() => 2 + Math.random() * 3, []);
  const speedFactor = useMemo(() => 0.2 + Math.random() * 0.3, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speedFactor * speed;
      
      // Circular motion around initial position
      meshRef.current.position.x = initialPosition.x + Math.sin(time + offset) * radius * 0.5;
      meshRef.current.position.y = initialPosition.y + Math.cos(time * 0.7 + offset) * radius * 0.5;
      meshRef.current.position.z = initialPosition.z + Math.sin(time * 0.5 + offset) * radius * 0.5;
      
      // Gentle floating motion
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.z = time * 0.15;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box':
        return <boxGeometry args={[size, size, size]} />;
      case 'sphere':
        return <sphereGeometry args={[size * 0.7, 16, 16]} />;
      case 'torus':
        return <torusGeometry args={[size * 0.5, size * 0.2, 16, 32]} />;
      case 'cone':
        return <coneGeometry args={[size * 0.7, size * 1.4, 4]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[size * 0.8]} />;
      default:
        return <boxGeometry args={[size, size, size]} />;
    }
  }, [shape, size]);

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      {geometry}
      <meshStandardMaterial 
        color={color} 
        metalness={0.6} 
        roughness={0.4}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export const FloatingProfileElements = () => {
  const elements = useMemo<FloatingElementProps[]>(() => [
    { position: [0, 0, 0] as [number, number, number], color: '#61dafb', shape: 'box', size: 0.4, speed: 1 },
    { position: [1, 1, 0] as [number, number, number], color: '#f0db4f', shape: 'sphere', size: 0.3, speed: 0.8 },
    { position: [-1, -1, 0] as [number, number, number], color: '#68a063', shape: 'torus', size: 0.35, speed: 1.2 },
    { position: [1, -1, 1] as [number, number, number], color: '#ff6b6b', shape: 'cone', size: 0.25, speed: 0.9 },
    { position: [-1, 1, -1] as [number, number, number], color: '#9b59b6', shape: 'tetrahedron', size: 0.3, speed: 1.1 },
  ], []);

  return (
    <>
      {elements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}
    </>
  );
};

export default FloatingProfileElements;
