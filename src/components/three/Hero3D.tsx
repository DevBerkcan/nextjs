'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceQuality } from '@/hooks/useDeviceQuality';

const WeldScene = dynamic(() => import('./WeldScene'), {
  ssr: false,
  loading: () => <HeroPoster />,
});

function HeroPoster() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(700px 420px at 70% 45%, rgba(255,122,26,.18), transparent 60%), radial-gradient(900px 600px at 70% 35%, rgba(194,27,28,.20), transparent 70%)',
      }}
    />
  );
}

export function Hero3D({ enabled = false }: { enabled?: boolean }) {
  const reduced = useReducedMotion();
  const quality = useDeviceQuality();
  const [failed, setFailed] = useState(false);

  if (!enabled || reduced || quality === 'mobile' || failed) return <HeroPoster />;

  const dpr: [number, number] = quality === 'high' ? [1, 1.75] : [1, 1.25];
  try {
    return <WeldScene dpr={dpr} />;
  } catch {
    setFailed(true);
    return <HeroPoster />;
  }
}
