import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';

export const metadata: Metadata = { title: 'Qualität & Sicherheit', description: 'Qualitätskontrollen, Dokumentation und Sicherheit auf Baustellen.' };

// HINWEIS: Diese Seite darf erst veroeffentlicht werden, wenn verifizierte
// Inhalte und Zertifikate vorliegen. Bis dahin neutral halten.
export default function QualitätPage() {
  return (
    <>
      <section className="pt-36 pb-16 border-b border-steel-dark bg-industrial"><Container>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Qualität & Sicherheit</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white">Geprueft. Dokumentiert. Sicher.</h1>
      </Container></section>
      <section className="py-20"><Container>
        <ul className="max-w-2xl space-y-3 text-steel-light">
          <li>- Zertifizierte Fachkraefte</li>
          <li>- Qualitätskontrollen je Projekt</li>
          <li>- Technische Dokumentation</li>
          <li>- Sicherheit auf Baustellen</li>
          <li>- Nachvollziehbare Prozesse</li>
        </ul>
        <p className="mt-8 max-w-2xl text-sm text-steel-grey">Konkrete Normen, Zertifikate und Prüfverfahren werden erst nach schriftlicher Bestaetigung durch den Kunden ergaenzt.</p>
      </Container></section>
      <ContactCta />
    </>
  );
}
