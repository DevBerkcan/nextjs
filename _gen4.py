import os
def w(p,c):
    d=os.path.dirname(p)
    if d: os.makedirs(d,exist_ok=True)
    open(p,"w",encoding="utf-8").write(c)

# ===== SMOOTH SCROLL (Lenis) PROVIDER =====
w("src/components/motion/SmoothScroll.tsx", """'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Eine einzige Lenis-Instanz. Synchronisiert mit GSAP ScrollTrigger.
// Bei prefers-reduced-motion: kein Smooth Scrolling.
export function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => { lenis.raf(t * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, [reduced]);
  return null;
}
""")

# ===== MOTION PRIMITIVES =====
w("src/components/motion/Reveal.tsx", """'use client';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
// Kleiner Text/Block-Reveal via Motion (nicht GSAP).
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
""")

# ===== 3D HERO =====
w("src/components/three/WeldScene.tsx", """'use client';
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
""")

w("src/components/three/Hero3D.tsx", """'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceQuality } from '@/hooks/useDeviceQuality';

// 3D wird ausschliesslich clientseitig geladen (ssr:false), erst wenn sinnvoll.
const WeldScene = dynamic(() => import('./WeldScene'), {
  ssr: false,
  loading: () => <HeroPoster />,
});

function HeroPoster() {
  // Hochwertiger statischer Fallback (Poster). Ersetzt 3D bei Mobile,
  // reduced-motion oder WebGL-Fehler. Keine Fehlermeldung fuer den Nutzer.
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(600px 400px at 70% 50%, rgba(255,122,26,.25), transparent 60%), radial-gradient(900px 600px at 70% 40%, rgba(194,27,28,.18), transparent 70%)',
      }}
    />
  );
}

export function Hero3D() {
  const reduced = useReducedMotion();
  const quality = useDeviceQuality();
  const [failed, setFailed] = useState(false);

  // Mobile / reduced-motion / Fehler -> Poster. 3D ist nie funktional notwendig.
  if (reduced || quality === 'mobile' || failed) return <HeroPoster />;

  const dpr: [number, number] = quality === 'high' ? [1, 1.75] : [1, 1.25];
  try {
    return <WeldScene dpr={dpr} />;
  } catch {
    setFailed(true);
    return <HeroPoster />;
  }
}
""")

print("motion + 3d written")
