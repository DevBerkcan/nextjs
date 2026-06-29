import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { projects } from '@/content/projects';

export const metadata: Metadata = { title: 'Projekte', description: 'Referenzen aus Rohrleitungsbau, Fernwärme und Anlagenbau.' };

export default function ProjektePage() {
  // Im Produktivbetrieb: const visible = projects.filter((p) => !p.isPlaceholder);
  const visible = projects;
  return (
    <>
      <section className="pt-36 pb-16 border-b border-steel-dark bg-industrial"><Container>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Projekte</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white">Referenzen.</h1>
        <p className="mt-5 max-w-2xl text-steel-grey">Eintraege mit Markierung sind Platzhalter. Echte Projektdaten pflegt der Kunde vor Veroeffentlichung ein.</p>
      </Container></section>
      <section className="py-20"><Container>
        <div className="grid gap-4 md:grid-cols-3">
          {visible.map((p) => (
            <Link key={p.slug} href={`/projekte/${p.slug}`} className="border border-steel-dark bg-graphite transition hover:border-steel-grey">
              <div className="flex h-44 items-center justify-center font-mono text-xs tracking-widest text-steel-dark" style={{ background: 'repeating-linear-gradient(45deg,#1b1f23,#1b1f23 12px,#191c20 12px,#191c20 24px)' }}>BILDPLATZHALTER</div>
              <div className="p-5">
                <div className="mb-2 flex gap-2 font-mono text-[0.62rem] text-kc-red-light"><span className="border border-steel-dark px-2 py-0.5">{p.sector}</span><span className="border border-steel-dark px-2 py-0.5">{p.region}</span></div>
                <h2 className="font-display text-lg text-white">{p.name}</h2>
                <p className="mt-1 text-sm text-steel-grey">{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
