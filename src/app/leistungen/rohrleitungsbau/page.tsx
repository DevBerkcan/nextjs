import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { ProjectInquiryForm } from '@/components/forms/ProjectInquiryForm';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { site } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Rohrleitungsbau',
  description: 'Planung und Ausführung von Rohrleitungssystemen für Industrie und Versorgung – geprüft und dokumentiert.',
  alternates: { canonical: '/leistungen/rohrleitungsbau' },
};

const useCases = ['Industrie- und Versorgungsleitungen', 'Neu- und Umbau im Bestand', 'Druckgeprüfte Systeme', 'Montage, Verbindung, Übergabe'];
const workflow = [
  { t: 'Anforderungsaufnahme', d: 'Material, Nennweiten, Medien, Termine und Zugänglichkeit werden geklärt.' },
  { t: 'Planung & Vorbereitung', d: 'Verfahren, Ablauf, Maschinen und Team werden projektspezifisch abgestimmt.' },
  { t: 'Ausführung', d: 'Schweißarbeiten und Montage werden kontrolliert ausgeführt und protokolliert.' },
  { t: 'Prüfung & Übergabe', d: 'Qualitätsprüfung, Dokumentation und geordnete Übergabe.' },
];
const faq = [
  { q: 'Welche Schweißverfahren setzen Sie ein?', a: 'Je nach Anforderung u. a. WIG, E-Hand und MAG.' },
  { q: 'Erhalte ich eine Dokumentation?', a: 'Ja – projektspezifisch, nachvollziehbar und übergabefertig.' },
  { q: 'In welchem Gebiet arbeiten Sie?', a: 'Schwerpunkt NRW und Baden-Württemberg, projektbezogen darüber hinaus.' },
];

export default function RohrleitungsbauPage() {
  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Rohrleitungsbau',
      description: 'Planung und Ausführung von Rohrleitungssystemen – geprüft und dokumentiert.',
      areaServed: site.areas,
      provider: { '@type': 'LocalBusiness', name: site.name },
    },
    breadcrumbJsonLd([
      { name: 'Start', url: site.url },
      { name: 'Leistungen', url: `${site.url}/leistungen` },
      { name: 'Rohrleitungsbau', url: `${site.url}/leistungen/rohrleitungsbau` },
    ]),
  ];

  return (
    <>
      <section className="border-b border-steel-dark bg-industrial pb-16 pt-36">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Leistung</p>
          <h1 className="mt-4 font-display text-4xl font-black text-white md:text-6xl">Rohrleitungsbau</h1>
          <p className="mt-5 max-w-2xl text-steel-grey">
            Planung und Ausführung von Rohrleitungssystemen für Industrie und Versorgung – präzise, zuverlässig und sauber dokumentiert.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-white">Typische Einsatzbereiche</h2>
              <ul className="mt-4 space-y-2 text-steel-grey">{useCases.map((u) => (<li key={u}>- {u}</li>))}</ul>

              <h2 className="mt-10 font-display text-2xl text-white">Arbeitsweise</h2>
              <div className="mt-4 space-y-4">
                {workflow.map((s) => (
                  <div key={s.t} className="border-l-2 border-kc-red pl-4">
                    <p className="font-semibold text-white">{s.t}</p>
                    <p className="text-sm text-steel-grey">{s.d}</p>
                  </div>
                ))}
              </div>

              <h2 className="mt-10 font-display text-2xl text-white">Qualität & Dokumentation</h2>
              <p className="mt-3 text-sm text-steel-grey">
                Jede Verbindung wird projektbezogen geprüft und dokumentiert. Konkrete Prüfverfahren/Normen werden erst nach Bestätigung durch den Kunden benannt.
              </p>

              <h2 className="mt-10 font-display text-2xl text-white">FAQ</h2>
              <dl className="mt-4 space-y-4">
                {faq.map((f) => (
                  <div key={f.q}>
                    <dt className="font-semibold text-white">{f.q}</dt>
                    <dd className="text-sm text-steel-grey">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border border-steel-dark bg-graphite p-6">
              <h2 className="mb-4 font-display text-2xl text-white">Projektanfrage</h2>
              <ProjectInquiryForm />
              <p className="mt-4 text-xs text-steel-grey">Hinweis: Ohne SMTP-Konfiguration wird kein Versand vorgetäuscht. Status wird transparent angezeigt.</p>
            </div>
          </div>
        </Container>
      </section>

      <ContactCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
    </>
  );
}
