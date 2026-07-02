'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const sections = [
  ['hero', 'Start'],
  ['leistungen', 'Leistungen'],
  ['ablauf', 'Ablauf'],
  ['projekte', 'Projekte'],
  ['qualitaet', 'Qualität'],
  ['kontakt-cta', 'Kontakt'],
] as const;

export function ScrollRail() {
  const progress = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('hero');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: ({ progress: value }) => gsap.set(progress.current, { scaleY: value }),
    });
    const sectionTriggers = sections.map(([id]) => ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onToggle: ({ isActive }) => { if (isActive) setActive(id); },
    }));
    return () => {
      progressTrigger.kill();
      sectionTriggers.forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  return (
    <aside aria-label="Seitennavigation" className="fixed right-4 top-1/2 z-[80] hidden -translate-y-1/2 lg:block">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/15"><div ref={progress} className="h-full origin-top scale-y-0 bg-kc-red" /></div>
      <nav className="relative flex flex-col gap-5">
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-label={label} className="group flex items-center justify-end gap-3">
            <span className="translate-x-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/0 transition-all group-hover:translate-x-0 group-hover:text-white/70">{label}</span>
            <span className={`h-[15px] w-[15px] rounded-full border transition-all ${active === id ? 'scale-100 border-kc-red bg-kc-red' : 'scale-75 border-white/35 bg-carbon'}`} />
          </a>
        ))}
      </nav>
    </aside>
  );
}
