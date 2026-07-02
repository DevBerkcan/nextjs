'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { Weldline } from '@/components/ui/Weldline';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const points = [
  { n: '01', t: 'Qualitätsprüfung', d: 'Verbindungen werden nach festgelegten Prüfkriterien kontrolliert.' },
  { n: '02', t: 'Dokumentation', d: 'Projektbezogene Unterlagen – nachvollziehbar strukturiert und übergabefertig.' },
  { n: '03', t: 'Sicherheit auf Baustellen', d: 'Klare Abläufe, abgestimmte Koordination und saubere Übergaben.' },
  { n: '04', t: 'Zertifizierte Fachkräfte', d: 'WIG · E-Hand · MAG – passend zu Anforderung und Verfahren.' },
];

export function QualitySafety() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from('[data-quality-title]', { xPercent: -12, opacity: 0, scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'top 35%', scrub: 0.7 } });
      gsap.from('[data-quality-card]', { y: 100, rotateX: 12, opacity: 0, stagger: 0.12, transformPerspective: 900, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '[data-quality-grid]', start: 'top 78%' } });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);
  return (
    <section id="qualitaet" ref={root} className="relative overflow-hidden border-y border-steel-dark bg-industrial py-32">
      <Weldline className="opacity-40" />
      <Container className="relative">
        <div data-quality-title className="mb-16 max-w-3xl"><p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Qualität & Sicherheit</p><h2 className="my-4 font-display text-5xl font-extrabold leading-[0.95] text-white md:text-7xl">Geprüft.<br />Dokumentiert. Sicher.</h2><p className="max-w-xl text-steel-grey">Nachvollziehbare Abläufe und verantwortungsvolle Ausführung vom ersten Termin bis zur Übergabe.</p></div>
        <div data-quality-grid className="grid gap-px overflow-hidden border border-steel-dark bg-steel-dark md:grid-cols-2">
          {points.map((point) => <article key={point.t} data-quality-card className="group min-h-[250px] bg-graphite p-8 transition-colors hover:bg-[#20242a] md:p-10"><span className="font-mono text-xs tracking-[0.2em] text-kc-red">{point.n}</span><h3 className="mb-4 mt-12 font-display text-2xl text-white md:text-3xl">{point.t}</h3><p className="max-w-md text-sm leading-relaxed text-steel-grey">{point.d}</p><div className="mt-8 h-px w-0 bg-kc-red transition-all duration-500 group-hover:w-full" /></article>)}
        </div>
      </Container>
    </section>
  );
}
