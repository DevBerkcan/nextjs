import os
def w(p,c):
    d=os.path.dirname(p)
    if d: os.makedirs(d,exist_ok=True)
    open(p,"w",encoding="utf-8").write(c)

# PROJEKTE list (only non-placeholder in production)
w("src/app/projekte/page.tsx", """import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { projects } from '@/content/projects';

export const metadata: Metadata = { title: 'Projekte', description: 'Referenzen aus Rohrleitungsbau, Fernwaerme und Anlagenbau.' };

export default function ProjektePage() {
  // Im Produktivbetrieb: const visible = projects.filter((p) => !p.isPlaceholder);
  const visible = projects;
  return (
    <>
      <section className=\"pt-36 pb-16 border-b border-steel-dark bg-industrial\"><Container>
        <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">Projekte</p>
        <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">Referenzen.</h1>
        <p className=\"mt-5 max-w-2xl text-steel-grey\">Eintraege mit Markierung sind Platzhalter. Echte Projektdaten pflegt der Kunde vor Veroeffentlichung ein.</p>
      </Container></section>
      <section className=\"py-20\"><Container>
        <div className=\"grid gap-4 md:grid-cols-3\">
          {visible.map((p) => (
            <Link key={p.slug} href={`/projekte/${p.slug}`} className=\"border border-steel-dark bg-graphite transition hover:border-steel-grey\">
              <div className=\"flex h-44 items-center justify-center font-mono text-xs tracking-widest text-steel-dark\" style={{ background: 'repeating-linear-gradient(45deg,#1b1f23,#1b1f23 12px,#191c20 12px,#191c20 24px)' }}>BILDPLATZHALTER</div>
              <div className=\"p-5\">
                <div className=\"mb-2 flex gap-2 font-mono text-[0.62rem] text-kc-red-light\"><span className=\"border border-steel-dark px-2 py-0.5\">{p.sector}</span><span className=\"border border-steel-dark px-2 py-0.5\">{p.region}</span></div>
                <h2 className=\"font-display text-lg text-white\">{p.name}</h2>
                <p className=\"mt-1 text-sm text-steel-grey\">{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
""")

w("src/app/projekte/[slug]/page.tsx", """import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { getProject, projects } from '@/content/projects';
import { notFound } from 'next/navigation';

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = getProject(slug);
  return { title: p?.name ?? 'Projekt', description: p?.summary };
}
export default async function ProjektDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = getProject(slug);
  if (!p) notFound();
  return (
    <>
      <section className=\"pt-36 pb-16 border-b border-steel-dark bg-industrial\"><Container>
        <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">{p.sector} / {p.region}</p>
        <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">{p.name}</h1>
        {p.isPlaceholder && <p className=\"mt-4 inline-block border border-dashed border-kc-red-dark bg-kc-red/10 px-4 py-2 text-sm text-steel-light\">Platzhalter - im Produktivbetrieb ausblenden.</p>}
      </Container></section>
      <section className=\"py-20\"><Container>
        <div className=\"max-w-2xl text-steel-light\">
          <p>{p.summary}</p>
          <p className=\"mt-4 font-mono text-xs uppercase tracking-widest text-kc-red-light\">Umfang: {p.scope} - Verfahren: {p.methods.join(' / ') || '-'}</p>
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
""")

# VERMIETUNG
w("src/app/vermietung/page.tsx", """import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { RentalForm } from '@/components/forms/RentalForm';
import { rentalItems } from '@/content/rental';

export const metadata: Metadata = { title: 'Vermietung', description: 'Fahrzeuge, Unimogs und Schweissmaschinen auf Anfrage.' };

export default function VermietungPage() {
  return (
    <>
      <section className=\"pt-36 pb-16 border-b border-steel-dark bg-industrial\"><Container>
        <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">Vermietung</p>
        <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">Technik auf Anfrage.</h1>
      </Container></section>
      <section className=\"py-20\"><Container>
        <div className=\"grid gap-12 md:grid-cols-2\">
          <ul className=\"space-y-4\">
            {rentalItems.map((r) => (
              <li key={r.slug} className=\"border-l-2 border-kc-red pl-4 py-2\"><strong className=\"block font-display text-white\">{r.name}</strong><span className=\"text-sm text-steel-grey\">{r.summary}</span></li>
            ))}
          </ul>
          <div className=\"border border-steel-dark bg-graphite p-6\"><RentalForm /></div>
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
""")

# QUALITAET (gated)
w("src/app/qualitaet-sicherheit/page.tsx", """import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';

export const metadata: Metadata = { title: 'Qualitaet & Sicherheit', description: 'Qualitaetskontrollen, Dokumentation und Sicherheit auf Baustellen.' };

// HINWEIS: Diese Seite darf erst veroeffentlicht werden, wenn verifizierte
// Inhalte und Zertifikate vorliegen. Bis dahin neutral halten.
export default function QualitaetPage() {
  return (
    <>
      <section className=\"pt-36 pb-16 border-b border-steel-dark bg-industrial\"><Container>
        <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">Qualitaet & Sicherheit</p>
        <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">Geprueft. Dokumentiert. Sicher.</h1>
      </Container></section>
      <section className=\"py-20\"><Container>
        <ul className=\"max-w-2xl space-y-3 text-steel-light\">
          <li>- Zertifizierte Fachkraefte</li>
          <li>- Qualitaetskontrollen je Projekt</li>
          <li>- Technische Dokumentation</li>
          <li>- Sicherheit auf Baustellen</li>
          <li>- Nachvollziehbare Prozesse</li>
        </ul>
        <p className=\"mt-8 max-w-2xl text-sm text-steel-grey\">Konkrete Normen, Zertifikate und Pruefverfahren werden erst nach schriftlicher Bestaetigung durch den Kunden ergaenzt.</p>
      </Container></section>
      <ContactCta />
    </>
  );
}
""")

print("projekte/vermietung/qualitaet written")
