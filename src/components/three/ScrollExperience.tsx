'use client';
import { useDetectGPU } from '@react-three/drei';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Scene = dynamic(() => import('./Scene'), { ssr: false });
function supportsWebGL() {
  try { const canvas = document.createElement('canvas'); return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')); } catch { return false; }
}
export function ScrollExperience() {
  const reducedMotion = useReducedMotion();
  const gpu = useDetectGPU();
  const [webGL, setWebGL] = useState<boolean | null>(null);
  useEffect(() => setWebGL(supportsWebGL()), []);
  if (reducedMotion || webGL !== true || gpu.tier === 0) return null;
  const dpr: [number, number] = gpu.tier >= 3 ? [1, 2] : [1, 1.5];
  return <div className="absolute inset-0" aria-hidden="true"><Scene dpr={dpr} gpuTier={gpu.tier} /></div>;
}
