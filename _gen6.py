import os
def w(p,c):
    d=os.path.dirname(p)
    if d: os.makedirs(d,exist_ok=True)
    open(p,"w",encoding="utf-8").write(c)

# ===== SECTIONS =====
w("src/components/sections/Hero.tsx", """import { Hero3D } from '@/components/three/Hero3D';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/seo/site';

// Text wird serverseitig gerendert und ist NICHT vom Canvas abhaengig.
export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-industrial">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2"><Hero3D /></div>
      <Container className="relative z-10">
        <div className="max-w-3xl py-36">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">KC Schweisstechnik &middot; Dortmund</p>
          <h1 className="my-5 font-display text-5xl font-black leading-[1.02] text-white md:text-7xl">
            Verbindungen,<span className="block text-kc-red">die dauerhaft tragen.</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-steel-light">
            Schweisstechnik, Rohrleitungsbau und Anlagenbau fuer Energieversorger, Industrie und anspruchsvolle Infrastrukturprojekte. Praezise geplant, zuverlaessig ausgefuehrt und sauber dokumentiert.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/kontakt">Projekt anfragen &rarr;</Button>
            <Button href="/leistungen" variant="ghost">Leistungen entdecken</Button>
          </div>
          <p className="mt-7 font-mono text-sm text-steel-grey">
            Direktkontakt &middot; <a className="border-b border-kc-red text-white" href={`tel:${site.mobile.replace(/\\s/g,'')}`}>{site.mobile}</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
""")

w("src/components/sections/TrustBar.tsx", """import { Container } from '@/components/ui/Container';
// Nur verifizierbare Aussagen ohne erfundene Zahlen.
const items = [
  ['TUEV-zertifizierte Fachkraefte', 'WIG / E-Hand / MAG'],
  ['Vollstaendige Dokumentation', 'Nachvollziehbar je Projekt'],
  ['Persoenliche Ansprechpartner', 'Direkt erreichbar'],
  ['Einsatzgebiet NRW & BW', 'Projektbezogen bundesweit'],
];
export function TrustBar() {
  return (
    <section className="border-y border-steel-dark bg-graphite">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {items.map(([t, s]) => (
            <div key={t} className="border-b border-steel-dark py-7 text-center md:border-b-0">
              <strong className="block font-display text-white">{t}</strong>
              <span className="text-sm text-steel-grey">{s}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
""")

w("src/components/sections/ServicesOverview.tsx", """import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { services } from '@/content/services';
import { Reveal } from '@/components/motion/Reveal';

export function ServicesOverview() {
  return (
    <section className="py-28">
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Leistungen</p>
          <h2 className="my-4 font-display text-4xl font-extrabold text-white md:text-5xl">Was wir verbinden.</h2>
          <p className="text-steel-grey">Vom einzelnen Schweissnaht-Detail bis zur kompletten Anlage &mdash; ausgefuehrt von zertifizierten Fachkraeften mit moderner Technik.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link href={`/leistungen/${s.slug}`}
                className={`group relative flex min-h-[230px] flex-col justify-between overflow-hidden border border-steel-dark bg-gradient-to-br from-graphite to-industrial p-8 transition hover:-translate-y-1 hover:border-steel-grey ${i === 0 ? 'md:col-span-2' : ''}`}>
                <span className="absolute left-0 top-0 h-0 w-[3px] bg-kc-red transition-all duration-300 group-hover:h-full" />
                <div>
                  <span className="font-mono text-xs tracking-widest text-kc-red">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="my-3 font-display text-2xl text-white">{s.title}</h3>
                  <p className="text-sm text-steel-grey">{s.summary}</p>
                </div>
                <span className="mt-4 font-mono text-xs tracking-widest text-steel-light">Detail ansehen &rarr;</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
""")

w("src/components/sections/ProcessScroll.tsx", """'use client';
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
  ['Ausfuehrung & Schweissarbeiten', 'Praezise Ausfuehrung durch zertifizierte Schweisser.'],
  ['Qualitaetspruefung', 'Kontrolle der Verbindungen nach festgelegten Pruefkriterien.'],
  ['Dokumentation & Uebergabe', 'Vollstaendige Dokumentation und geordnete Uebergabe.'],
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
    <section className="border-y border-steel-dark bg-industrial py-28" ref={root}>
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Ablauf</p>
          <h2 className="my-4 font-display text-4xl font-extrabold text-white md:text-5xl">Von der Anfrage bis zur dokumentierten Uebergabe.</h2>
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
""")

w("src/components/sections/ContactCta.tsx", """import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/seo/site';
export function ContactCta() {
  return (
    <section className="bg-carbon py-28 text-center"
      style={{ backgroundImage: 'radial-gradient(900px 500px at 50% 0%, rgba(194,27,28,.22), transparent)' }}>
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Kontakt</p>
        <h2 className="mx-auto my-4 max-w-2xl font-display text-4xl font-extrabold text-white md:text-5xl">Ihr naechstes Projekt beginnt mit einem Gespraech.</h2>
        <p className="mx-auto mb-8 max-w-xl text-steel-grey">Erzaehlen Sie uns von Ihrem Vorhaben &mdash; wir melden uns mit einem festen Ansprechpartner.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/kontakt">Projekt anfragen</Button>
          <Button href={`tel:${site.mobile.replace(/\\s/g, '')}`} variant="ghost">Direkt anrufen</Button>
          <Button href={`mailto:${site.email}`} variant="ghost">E-Mail schreiben</Button>
        </div>
      </Container>
    </section>
  );
}
""")

print("sections written")
