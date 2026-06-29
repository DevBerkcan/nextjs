import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { RentalForm } from '@/components/forms/RentalForm';
import { rentalItems } from '@/content/rental';

export const metadata: Metadata = { title: 'Vermietung', description: 'Fahrzeuge, Unimogs und Schweissmaschinen auf Anfrage.' };

export default function VermietungPage() {
  return (
    <>
      <section className="pt-36 pb-16 border-b border-steel-dark bg-industrial"><Container>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Vermietung</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white">Technik auf Anfrage.</h1>
      </Container></section>
      <section className="py-20"><Container>
        <div className="grid gap-12 md:grid-cols-2">
          <ul className="space-y-4">
            {rentalItems.map((r) => (
              <li key={r.slug} className="border-l-2 border-kc-red pl-4 py-2"><strong className="block font-display text-white">{r.name}</strong><span className="text-sm text-steel-grey">{r.summary}</span></li>
            ))}
          </ul>
          <div className="border border-steel-dark bg-graphite p-6"><RentalForm /></div>
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
