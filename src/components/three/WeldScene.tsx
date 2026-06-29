'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, AdaptiveDpr } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// Konzept 'The Perfect Connection':
// Zwei dunkle Rohrsegmente, dazwischen eine gluehende Schweissnaht.
// PROZEDURALES Platzhaltermodell aus Primitiven. Spaeter gegen ein
// komprimiertes GLB (Draco/Meshopt, KTX2-Texturen) austauschbar:
//   const { scene } = useGLTF('/models/pipe-joint.glb');
//   return <primitive object={scene} />;

function Pipe({ x }: { x: number }) {
  return (
    <mesh position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.7, 0.7, 1.4, 48]} />
      <meshStandardMaterial color="#23282d" metalness={0.9} roughness={0.35} />
    </mesh>
  );
}

function Seam() {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (!ref.current) return;
    // Sanfte Emissive-Pulsation der Schweissnaht (Lichtbogen).
    const t = state.clock.elapsedTime;
    ref.current.emissiveIntensity = 1.4 + Math.sin(t * 2) * 0.5;
  });
  return (
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[0.72, 0.05, 16, 64]} />
      <meshStandardMaterial ref={ref} color="#ff7a1a" emissive="#ff7a1a" emissiveIntensity={1.6} />
    </mesh>
  );
}

export default function WeldScene({ dpr = [1, 1.75] as [number, number] }) {
  return (
    <Canvas camera={{ position: [0, 0.6, 4], fov: 42 }} dpr={dpr} frameloop="always">
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 2]} intensity={6} color="#ff9a4a" distance={6} />
      <Pipe x={-0.75} />
      <Pipe x={0.75} />
      <Seam />
      <Environment preset="warehouse" />
    </Canvas>
  );
}
