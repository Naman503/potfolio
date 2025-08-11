"use client";

import { memo, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import GlobalFloatingElements from "@/components/ui/GlobalFloatingElements";

// 3D Scene Component - Memoized to prevent re-renders
const ThreeScene = memo(() => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Set initial camera position
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = 12;
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={75}
        near={0.1}
        far={1000}
        position={[0, 0, 12]}
      />

      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.5} color="#ffffff" />

      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        color="#61dafb"
        castShadow
      />

      {/* Additional lights */}
      <pointLight
        position={[15, 10, 15]}
        intensity={1.5}
        color="#61dafb"
        distance={50}
        decay={1}
      />
      <pointLight
        position={[-15, 0, -10]}
        intensity={1}
        color="#f0db4f"
        distance={40}
        decay={1.5}
      />
      <pointLight
        position={[0, 15, 0]}
        intensity={0.8}
        color="#9b59b6"
        distance={30}
        decay={1.2}
      />

      {/* Background elements */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Main 3D elements */}
      <GlobalFloatingElements 
        viewport={{ 
          width: window.innerWidth, 
          height: window.innerHeight, 
          dpr: Math.min(window.devicePixelRatio, 2) 
        }} 
      />

      {/* Camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
});

ThreeScene.displayName = "ThreeScene";

const Global3DBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    // Only update DPR which is critical for performance
    const updateDpr = () => {
      setDpr(Math.min(window.devicePixelRatio, 2));
    };

    updateDpr();
    setMounted(true);

    const handleResize = () => {
      updateDpr();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (typeof window === "undefined" || !mounted) {
    return null;
  }

  return (
    <div className="global-3d-background">
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.8,
        }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 0, 12],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setPixelRatio(dpr);
        }}
      >
        <ThreeScene />
      </Canvas>
    </div>
  );
};

export default memo(Global3DBackground);
