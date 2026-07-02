'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { services } from '@/content/services';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ServicesOverview() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-service-card]').forEach((card, index, cards) => {
        if (index === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.94 + index * 0.008,
          opacity: 0.48,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top 18%', endTrigger: cards[index + 1], end: 'top 20%', scrub: true },
        });
      });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="leistungen" ref={root} className="bg-carbon py-28">
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Leistungen</p>
          <h2 className="my-4 font-display text-4xl font-extrabold text-white md:text-5xl">Was wir verbinden.</h2>
          <p className="text-steel-grey">Vom einzelnen Schweißnaht-Detail bis zur kompletten Anlage &mdash; ausgefuehrt von zertifizierten Fachkraeften mit moderner Technik.</p>
        </div>
        <div className="relative mx-auto max-w-5xl">
          {services.map((s, i) => (
            <div key={s.slug} data-service-card className="sticky mb-6" style={{ top: `${12 + i * 1.6}vh`, zIndex: i + 1 }}>
              <Link href={`/leistungen/${s.slug}`}
                className="group relative grid min-h-[300px] overflow-hidden border border-steel-dark bg-gradient-to-br from-[#202429] to-[#101214] p-7 shadow-2xl shadow-black/40 transition-colors hover:border-steel-grey md:grid-cols-[1fr_1.25fr] md:p-10">
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kc-red to-transparent opacity-70" />
                <div className="flex flex-col justify-between">
                  <span className="font-mono text-xs tracking-[0.22em] text-kc-red">{String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</span>
                  <h3 className="my-6 font-display text-3xl text-white md:text-5xl">{s.title}</h3>
                </div>
                <div className="flex flex-col justify-end border-t border-steel-dark pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                  <p className="max-w-lg text-base leading-relaxed text-steel-grey">{s.summary}</p>
                  <span className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-steel-light">Detail ansehen &rarr;</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
