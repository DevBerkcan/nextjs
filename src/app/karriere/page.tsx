import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { jobs } from '@/content/jobs';

export const metadata: Metadata = { title: 'Karriere', description: 'Offene Stellen und Initiativbewerbung bei KC Schweisstechnik.' };

export default function KarrierePage() {
  return (
    <>
      <section className="pt-36 pb-16 border-b border-steel-dark bg-industrial"><Container>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Karriere</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white">Arbeiten bei KC.</h1>
        <p className="mt-5 max-w-2xl text-steel-grey">Positionen werden vor Veroeffentlichung geprueft. Initiativbewerbungen sind jederzeit willkommen.</p>
      </Container></section>
      <section className="py-20"><Container>
        <div className="divide-y divide-steel-dark border-y border-steel-dark">
          {jobs.map((j) => (
            <Link key={j.slug} href={`/karriere/${j.slug}`} className="flex items-center justify-between gap-4 py-5 transition hover:bg-graphite px-2">
              <div><h2 className="font-display text-xl text-white">{j.title}</h2><p className="text-sm text-steel-grey">{j.location} - {j.type}</p></div>
              <span className="font-mono text-xs text-kc-red-light">{j.isOpen ? 'OFFEN' : 'IN PRUEFUNG'} &rarr;</span>
            </Link>
          ))}
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
