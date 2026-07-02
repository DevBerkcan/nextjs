'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollExperience } from '@/components/three/ScrollExperience';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { site } from '@/lib/seo/site';

const heroImages = [
  ['https://images.pexels.com/photos/34039390/pexels-photo-34039390.jpeg?auto=compress&cs=tinysrgb&w=2400', 'Professioneller Schweißer bei der Arbeit an einem Stahlrohr'],
  ['https://images.pexels.com/photos/29976478/pexels-photo-29976478.jpeg?auto=compress&cs=tinysrgb&w=2400', 'Industrieller Schweißprozess mit intensivem Funkenflug'],
  ['https://images.pexels.com/photos/15888227/pexels-photo-15888227.jpeg?auto=compress&cs=tinysrgb&w=2400', 'Schweißer mit Schutzmaske bei präziser Metallarbeit'],
  ['https://images.pexels.com/photos/30768943/pexels-photo-30768943.jpeg?auto=compress&cs=tinysrgb&w=2400', 'Schweißarbeiten in einer industriellen Werkstatt'],
  ['https://images.pexels.com/photos/37442610/pexels-photo-37442610.jpeg?auto=compress&cs=tinysrgb&w=2400', 'Metall- und Rohrbearbeitung mit sichtbarem Funkenflug'],
  ['https://images.pexels.com/photos/34203132/pexels-photo-34203132.jpeg?auto=compress&cs=tinysrgb&w=2400', 'Schweißer in Schutzkleidung während des Lichtbogenschweißens'],
] as const;

export function HeroScroll() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>('[data-mask-image]');
      const content = root.current?.querySelector('[data-hero-content]');
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 3.5}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const segment = 1 / layers.length;
          layers.forEach((layer, index) => {
            const local = gsap.utils.clamp(0, 1, (progress - index * segment) / segment);
            const left = 50 - local * 52;
            const right = 50 + local * 52;
            gsap.set(layer, {
              maskImage: `linear-gradient(${90 + local * 32}deg, #000 ${left}%, transparent ${left + 0.5}%, transparent ${right - 0.5}%, #000 ${right}%)`,
              WebkitMaskImage: `linear-gradient(${90 + local * 32}deg, #000 ${left}%, transparent ${left + 0.5}%, transparent ${right - 0.5}%, #000 ${right}%)`,
            });
          });
          if (content) gsap.set(content, { opacity: 1 - gsap.utils.clamp(0, 1, (progress - 0.72) / 0.2), yPercent: -progress * 7 });
        },
      });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={root} className="relative h-svh min-h-[680px] overflow-hidden bg-carbon text-white">
      <div className="absolute inset-0">
        {heroImages.map(([src, alt], index) => (
          <div key={src} data-mask-image={index === 0 ? undefined : ''} className={index === 0 ? 'absolute inset-0' : 'hero-mask-image absolute inset-0'} style={{ zIndex: index === 0 ? 0 : heroImages.length - index }}>
            <Image src={src} alt={alt} fill priority={index < 2} sizes="100vw" className="object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 z-[7] bg-[linear-gradient(90deg,rgba(8,9,10,.88)_0%,rgba(8,9,10,.55)_42%,rgba(8,9,10,.2)_72%,rgba(8,9,10,.52)_100%)]" />
        <div className="absolute inset-0 z-[8] bg-[radial-gradient(circle_at_68%_48%,transparent_0%,rgba(8,9,10,.12)_42%,rgba(8,9,10,.72)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 z-[9] hidden w-[58%] opacity-80 lg:block"><ScrollExperience /></div>

      <div data-hero-content className="relative z-10 flex h-full flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-10 lg:px-14">
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/65 md:text-xs">
          <div><p>KC Schweißtechnik GmbH</p><p>Dortmund · Deutschland</p></div>
          <div className="text-right"><p>Schweißtechnik</p><p>Rohrleitung · Anlagenbau</p></div>
        </div>

        <div className="max-w-5xl py-8">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.26em] text-kc-red-light">Verbindungen mit Verantwortung</p>
          <h1 className="font-display text-[clamp(3.3rem,8.4vw,8.6rem)] font-black leading-[0.86] tracking-[-0.055em]">
            Präzision,<span className="block text-kc-red">die trägt.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/72 md:text-lg">Zertifizierte Schweißtechnik, Rohrleitungsbau und Anlagenbau für Energie, Industrie und Infrastruktur.</p>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/20 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-3"><Button href="/kontakt">Projekt anfragen →</Button><Button href="/leistungen" variant="ghost">Leistungen</Button></div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/55">Scrollen · Materialschichten entdecken<br /><a className="text-white" href={`tel:${site.mobile.replace(/\s/g, '')}`}>{site.mobile}</a></p>
        </div>
      </div>
    </section>
  );
}
