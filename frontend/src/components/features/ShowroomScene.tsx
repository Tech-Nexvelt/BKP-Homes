'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  ContactShadows, 
  Float, 
  PresentationControls,
  useGLTF
} from '@react-three/drei';
import * as THREE from 'three';
import { BlueprintAnimation } from './BlueprintAnimation';

// Class-based Error Boundary to catch WebGL or Model compilation crashes
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Canvas error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Check if WebGL is supported on the client browser
function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

// Premium static visual placeholder when WebGL is absent or fails
const StaticShowroomFallback = () => (
  <div className="relative w-full h-full bg-[#050505] flex items-center justify-center">
    <BlueprintAnimation />
    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 text-[8px] uppercase tracking-[0.2em] text-[#C8A96B] font-semibold">
      Interactive Sketch Model
    </div>
  </div>
);

function RealChairModel() {
  // Using a highly realistic, premium velvet/wood chair GLTF sample model
  const { scene } = useGLTF('/models/SheenChair.glb');
  
  // Custom luxury fabric material color adjustment to match BKP's premium branding
  React.useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Enable shadows for real-time light interactions
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat: any) => {
            const matName = (mat.name || '').toLowerCase();
            
            // Check if cushion/fabric or reddish material
            if (
              matName.includes('fabric') || 
              matName.includes('cushion') || 
              matName.includes('velvet') || 
              matName.includes('mat') ||
              (mat.color && mat.color.r > 0.5 && mat.color.g < 0.3)
            ) {
              // Convert cushion to a premium deep emerald green velvet (vibrant & visible)
              mat.color.setStyle('#1E5E4E'); // Visible deep emerald green
              if (mat.sheenColor) {
                mat.sheenColor.setStyle('#328F79'); // Matching green sheen
              }
              mat.roughness = 0.55;
            } 
            // Check if wood legs/frame
            else if (
              matName.includes('wood') || 
              matName.includes('frame') || 
              matName.includes('legs') ||
              (mat.color && mat.color.r > 0.25 && mat.color.r < 0.5 && mat.color.g > 0.12 && mat.color.g < 0.35)
            ) {
              // Convert frame/legs to a classic visible teak/walnut wood stain
              mat.color.setStyle('#6E4730'); // Clearly visible wood stain
              mat.roughness = 0.45;
            }
          });
        }
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      position={[0, -0.7, 0]} 
      scale={2.6} 
      rotation={[0, -Math.PI / 6, 0]}
    />
  );
}

export function ShowroomScene() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setIsSupported(checkWebGLSupport());
  }, []);

  if (isSupported === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 w-full h-full bg-[#050505]">
        <div className="w-8 h-8 rounded-full border-2 border-[#C8A96B]/20 border-t-[#C8A96B] animate-spin" />
        <span className="text-[9px] tracking-[0.25em] text-[#C8A96B] uppercase font-semibold">Initializing Showroom...</span>
      </div>
    );
  }

  if (isSupported === false) {
    return <StaticShowroomFallback />;
  }

  return (
    <div className="w-full h-full relative bg-transparent flex items-center justify-center">
      <CanvasErrorBoundary fallback={<StaticShowroomFallback />}>
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#C8A96B]/20 border-t-[#C8A96B] animate-spin" />
            <span className="text-[9px] tracking-[0.25em] text-[#C8A96B] uppercase font-semibold">Loading 3D Curation...</span>
          </div>
        }>
          <Canvas shadows camera={{ position: [0, 1.2, 3.8], fov: 45 }}>
            {/* Bright Ambient Base Light */}
            <ambientLight intensity={1.2} color="#F5F2ED" />
            
            {/* Front Camera Light - Illuminates textures directly */}
            <directionalLight 
              position={[0, 3, 5]} 
              intensity={2.8} 
              color="#FFFFFF" 
              castShadow
            />

            {/* Key Light - Warm Luxury Gold */}
            <spotLight 
              position={[5, 8, 5]} 
              intensity={6.5} 
              color="#D9BB84" 
              angle={0.6}
              penumbra={1}
              castShadow 
              shadow-bias={-0.0001}
            />
            
            {/* Fill Light - Subtle Emerald Wash */}
            <spotLight 
              position={[-5, 5, -2]} 
              intensity={3} 
              color="#1A7A68" 
              angle={0.8}
              penumbra={1}
            />

            {/* Top Down Directional Fill */}
            <directionalLight 
              position={[0, 10, 0]} 
              intensity={2.0} 
              color="#FFFFFF" 
            />
  
            {/* Rim Light - Sharp White Edge Highlights */}
            <pointLight 
              position={[0, 5, -5]} 
              intensity={4.0} 
              color="#FFFFFF" 
            />
  
            <PresentationControls 
              global 
              rotation={[0, -Math.PI / 6, 0]} 
              polar={[-0.2, 0.25]} 
              azimuth={[-Math.PI / 1.5, Math.PI / 1.5]} 
            >
              <RealChairModel />
            </PresentationControls>
  
            <ContactShadows 
              position={[0, -0.71, 0]} 
              opacity={0.8} 
              scale={10} 
              blur={2.8} 
              far={3} 
              color="#000000" 
            />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
}

