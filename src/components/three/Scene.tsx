'use client';
import { AdaptiveDpr, Environment, Float } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Particles } from './Particles';

function PipeConnection({ particleCount }: { particleCount: number }) {
  const group = useRef<THREE.Group>(null);
  const seam = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
    if (seam.current) seam.current.emissiveIntensity = 1.6 + Math.sin(state.clock.elapsedTime * 2.1) * 0.25;
  });
  return (
    <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.28} floatingRange={[-0.08, 0.08]}>
      <group ref={group} rotation={[0.15, -0.45, -0.08]}>
        {[-0.8, 0.8].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.72, 0.72, 1.55, 64, 1, true]} />
            <meshStandardMaterial color="#30363b" metalness={0.88} roughness={0.22} envMapIntensity={1.25} side={THREE.DoubleSide} />
          </mesh>
        ))}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.73, 0.065, 20, 96]} />
          <meshStandardMaterial ref={seam} color="#ff9b52" emissive="#ff5a14" emissiveIntensity={1.6} metalness={0.65} roughness={0.2} />
        </mesh>
        <Particles count={particleCount} />
      </group>
    </Float>
  );
}

function CinematicEffects({ multisampling }: { multisampling: number }) {
  const { gl } = useThree();
  const [contextAvailable, setContextAvailable] = useState(
    () => gl.getContext().getContextAttributes() !== null,
  );

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLost = () => setContextAvailable(false);
    const handleContextRestored = () => {
      setContextAvailable(gl.getContext().getContextAttributes() !== null);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);

  if (!contextAvailable || gl.getContext().getContextAttributes() === null) return null;

  return (
    <EffectComposer multisampling={multisampling}>
      <Bloom intensity={1.15} luminanceThreshold={0.7} luminanceSmoothing={0.25} mipmapBlur />
      <Vignette eskil={false} offset={0.25} darkness={0.55} />
    </EffectComposer>
  );
}

export default function Scene({ dpr, gpuTier }: { dpr: [number, number]; gpuTier: number }) {
  return (
    <Canvas dpr={dpr} camera={{ position: [0, 0.2, 4.4], fov: 40 }} gl={{ antialias: gpuTier >= 2, alpha: true, powerPreference: 'high-performance' }} frameloop="always" shadows={gpuTier >= 2}>
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.5} color="#d9e8ff" />
      <pointLight position={[0, 0.3, 2]} intensity={14} color="#ff6a1a" distance={6} decay={2} />
      <PipeConnection particleCount={gpuTier >= 3 ? 150 : gpuTier >= 2 ? 90 : 36} />
      <Environment preset="warehouse" environmentIntensity={0.65} />
      {gpuTier >= 2 && <CinematicEffects multisampling={gpuTier >= 3 ? 4 : 0} />}
    </Canvas>
  );
}
