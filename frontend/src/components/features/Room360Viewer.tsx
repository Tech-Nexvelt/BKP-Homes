'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface PanoramaMeshProps {
  imageUrl: string;
}

function PanoramaMesh({ imageUrl }: PanoramaMeshProps) {
  // Load the image texture with CORS enabled automatically by Drei
  const texture = useTexture(imageUrl);

  // Invert the texture horizontally so it renders correctly on the interior of the sphere
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;

  const meshRef = useRef<THREE.Mesh>(null);

  // Subtle look-around parallax effect on cursor move
  useFrame((state) => {
    const { x, y } = state.pointer; // Range is [-1, 1]
    
    // Significantly reduced cursor sensitivity for a premium, steady cinematic drift
    const targetRotationY = x * (Math.PI / 40);
    const targetRotationX = y * (Math.PI / 60);

    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* 
        Use a sphere geometry scaled to flip faces inwards.
      */}
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Room360Viewer({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing bg-[#050505] flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 65 }}>
        <Suspense fallback={
          <Html center>
            <div className="flex flex-col items-center justify-center gap-3 w-64 text-center">
              <div className="w-6 h-6 rounded-full border-2 border-[#C8A96B]/20 border-t-[#C8A96B] animate-spin" />
              <span className="text-[10px] tracking-[0.25em] text-[#C8A96B] uppercase font-semibold">
                Compiling 360° Scene...
              </span>
            </div>
          </Html>
        }>
          <PanoramaMesh imageUrl={imageUrl} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            rotateSpeed={-0.18} // Stabilized dragging rotation speed
            autoRotate={false}
            // Constrain rotation to keep the view focused inside the active texture area
            minPolarAngle={Math.PI / 2.4} 
            maxPolarAngle={Math.PI / 1.7} 
            minAzimuthAngle={-Math.PI / 3} 
            maxAzimuthAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
