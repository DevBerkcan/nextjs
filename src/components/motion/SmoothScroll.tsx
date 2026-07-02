'use client';
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
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      anchors: { offset: -88 },
      stopInertiaOnNavigate: true,
      prevent: (node) => node.hasAttribute('data-lenis-prevent'),
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => { lenis.raf(t * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, [reduced]);
  return null;
}
