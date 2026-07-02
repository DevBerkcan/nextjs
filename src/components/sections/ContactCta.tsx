'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { site } from '@/lib/seo/site';

export function ContactCta() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion || !root.current || !panel.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(panel.current, { clipPath: 'inset(18% 8% 18% 8% round 2px)', scale: 0.94 }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 18%', scrub: 0.8 } });
      gsap.from('[data-contact-reveal]', { y: 70, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 48%' } });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);
  return (
    <section id="kontakt-cta" ref={root} className="min-h-svh bg-industrial p-3 md:p-6">
      <div ref={panel} className="relative flex min-h-[calc(100svh-3rem)] items-center overflow-hidden bg-kc-red text-center">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(135deg,transparent_0%,transparent_48%,white_49%,transparent_50%,transparent_100%)] [background-size:90px_90px]" />
        <div className="absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-white/20" /><div className="absolute -right-16 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-white/15" />
        <Container className="relative py-24">
          <p data-contact-reveal className="font-mono text-xs uppercase tracking-[0.25em] text-white/70">Bereit für eine belastbare Verbindung?</p>
          <h2 data-contact-reveal className="mx-auto my-7 max-w-5xl font-display text-[clamp(3.2rem,8vw,8rem)] font-black leading-[0.86] tracking-[-0.05em] text-white">Lassen Sie uns<br />anfangen.</h2>
          <p data-contact-reveal className="mx-auto mb-10 max-w-xl text-lg text-white/75">Erzählen Sie uns von Ihrem Vorhaben. Sie sprechen direkt mit einem festen Ansprechpartner.</p>
          <div data-contact-reveal className="flex flex-wrap justify-center gap-3"><Button href="/kontakt" className="!bg-white !text-kc-red">Projekt anfragen →</Button><Button href={`tel:${site.mobile.replace(/\s/g, '')}`} variant="ghost" className="!border-white/40 !text-white">Direkt anrufen</Button><Button href={`mailto:${site.email}`} variant="ghost" className="!border-white/40 !text-white">E-Mail</Button></div>
        </Container>
      </div>
    </section>
  );
}
