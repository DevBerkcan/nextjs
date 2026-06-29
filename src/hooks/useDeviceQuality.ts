'use client';
import { useEffect, useState } from 'react';
// Liefert eine grobe Qualitaetsstufe fuer adaptive 3D-Last.
export type Quality = 'high' | 'medium' | 'mobile';
export function useDeviceQuality(): Quality {
  const [q, setQ] = useState<Quality>('medium');
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return setQ('mobile');
    const cores = navigator.hardwareConcurrency ?? 4;
    setQ(cores >= 8 ? 'high' : 'medium');
  }, []);
  return q;
}
