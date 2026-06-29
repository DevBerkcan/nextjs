import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { services } from '@/content/services';

export const metadata: Metadata = { title: 'Leistungen', description: 'Rohrleitungsbau, Fernwärme, Gas- und Wassertechnik, Anlagenbau und Partnervermittlung.' };

export default function LeistungenPage() {
  return (
    <>
      <section className="pt-36 pb-16 border-b border-steel-dark bg-industrial">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Leistungen</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white">Was wir verbinden.</h1>
        </Container>
      </section>
      <section className="py-20"><Container>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/leistungen/${s.slug}`} className="border border-steel-dark bg-graphite p-8 transition hover:border-steel-grey">
              <h2 className="font-display text-2xl text-white">{s.title}</h2>
              <p className="mt-2 text-sm text-steel-grey">{s.summary}</p>
            </Link>
          ))}
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
