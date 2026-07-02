'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const steps = [
  ['Anfrage & Anforderungsanalyse', 'Umfang, Materialien, Normen und Termine - mit festem Ansprechpartner.'],
  ['Technische Planung', 'Verfahren, Materialwahl und Ausfuehrungsdetails werden festgelegt.'],
  ['Vorbereitung & Koordination', 'Logistik, Maschinen und Fachkraefte werden abgestimmt.'],
  ['Ausfuehrung & Schweißarbeiten', 'Praezise Ausfuehrung durch zertifizierte Schweißer.'],
  ['Qualitätspruefung', 'Kontrolle der Verbindungen nach festgelegten Prüfkriterien.'],
  ['Dokumentation & Übergabe', 'Vollstaendige Dokumentation und geordnete Übergabe.'],
];

// Desktop: gepinnte, scrollgesteuerte Linie via GSAP ScrollTrigger.
// Mobile: kompakte vertikale Liste (kein mehrfaches Pinning).
export function ProcessScroll() {
  const root = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isDesktop || reduced || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.kc-line', { scaleY: 0 }, {
        scaleY: 1, transformOrigin: 'top',
        scrollTrigger: { trigger: root.current, start: 'top center', end: 'bottom center', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [isDesktop, reduced]);

  return (
    <section id="ablauf" className="border-y border-steel-dark bg-industrial py-28" ref={root}>
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Ablauf</p>
          <h2 className="my-4 font-display text-4xl font-extrabold text-white md:text-5xl">Von der Anfrage bis zur dokumentierten Übergabe.</h2>
        </div>
        <div className="relative">
          <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-steel-dark" />
          <div className="kc-line absolute left-[27px] top-2 bottom-2 w-0.5 origin-top bg-kc-red" />
          {steps.map(([t, d], i) => (
            <div key={t} className="relative pb-10 pl-20 last:pb-0">
              <div className="absolute left-4 top-0.5 grid h-6 w-6 place-items-center rounded-full border-2 border-kc-red bg-carbon font-mono text-[0.62rem] text-white">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="mb-1.5 font-display text-lg text-white">{t}</h3>
              <p className="max-w-xl text-sm text-steel-grey">{d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
