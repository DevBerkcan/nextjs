'use client';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export function Particles({ count = 90 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + Math.sin(i * 91.17) * 0.7;
      const radius = 0.75 + ((i * 37) % count) / count;
      data[i * 3] = Math.cos(angle) * radius;
      data[i * 3 + 1] = (Math.sin(i * 12.43) * 0.8 + Math.sin(angle) * 0.25) * radius;
      data[i * 3 + 2] = Math.sin(angle) * radius * 0.45;
    }
    return data;
  }, [count]);
  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.z += delta * 0.035;
    points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.12;
  });
  return (
    <points ref={points} aria-hidden>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#ff7a1a" size={0.035} sizeAttenuation transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
