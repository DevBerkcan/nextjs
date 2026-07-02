'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { projects } from '@/content/projects';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ProjectsPreview() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isDesktop || reducedMotion || !root.current || !track.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth + 96);
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance() * 1.15}`,
          pin: true,
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>('[data-project-visual]').forEach((visual) => {
        gsap.fromTo(visual, { backgroundPositionX: '35%' }, { backgroundPositionX: '65%', ease: 'none', scrollTrigger: { trigger: visual, containerAnimation: undefined, start: 'left right', end: 'right left', scrub: true } });
      });
    }, root);
    return () => context.revert();
  }, [isDesktop, reducedMotion]);

  return (
    <section id="projekte" ref={root} className="overflow-hidden bg-carbon py-24 lg:h-svh lg:min-h-[720px]">
      <Container className="mb-12 flex items-end justify-between gap-6">
        <div className="max-w-2xl"><p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Projekte</p><h2 className="my-4 font-display text-4xl font-extrabold text-white md:text-6xl">Arbeit, die bleibt.</h2><p className="text-steel-grey">Ausgewählte Einblicke in Rohrleitungsbau, Anlagenmontage und Versorgungstechnik.</p></div>
        <Link href="/projekte" className="hidden font-mono text-xs uppercase tracking-widest text-steel-light md:inline">Alle Projekte →</Link>
      </Container>
      <div ref={track} className="flex w-max gap-5 px-5 md:px-10 lg:px-14">
        {projects.map((project, index) => (
          <Link key={project.slug} href={`/projekte/${project.slug}`} className="group relative grid h-[430px] w-[84vw] max-w-[760px] flex-none overflow-hidden border border-steel-dark bg-graphite md:h-[500px] md:w-[68vw]">
            <div data-project-visual className="absolute inset-0 opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-75" style={{ backgroundImage: `radial-gradient(circle at ${25 + index * 25}% 45%, rgba(194,27,28,.6), transparent 22%), repeating-linear-gradient(${35 + index * 12}deg,#272c31 0,#272c31 18px,#171a1e 18px,#171a1e 38px)` }} />
            <div className="relative flex flex-col justify-between bg-gradient-to-t from-carbon via-carbon/30 to-transparent p-7 md:p-10">
              <div className="flex justify-between font-mono text-xs uppercase tracking-[0.18em] text-white/55"><span>0{index + 1}</span><span>{project.region} · {project.sector}</span></div>
              <div><p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-kc-red-light">{project.scope}</p><h3 className="max-w-xl font-display text-3xl text-white md:text-5xl">{project.name.replace(' (Platzhalter)', '')}</h3><p className="mt-4 max-w-lg text-steel-light/70">{project.summary}</p></div>
            </div>
          </Link>
        ))}
        <Link href="/kontakt" className="grid h-[430px] w-[70vw] max-w-[560px] flex-none place-items-center border border-kc-red bg-kc-red p-10 text-center md:h-[500px]"><span className="font-display text-4xl font-bold text-white md:text-6xl">Ihr Projekt<br />als Nächstes →</span></Link>
      </div>
    </section>
  );
}
