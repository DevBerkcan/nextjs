import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { getJob, jobs } from '@/content/jobs';
import { site } from '@/lib/seo/site';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = getJob(slug);
  return { title: j?.title ?? 'Stelle', description: j?.summary };
}

export default async function JobDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = getJob(slug);
  if (!j) notFound();

  // JobPosting-Schema NUR fuer bestaetigt offene Stellen.
  const jsonld = j.isOpen
    ? {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: j.title,
        description: j.summary,
        employmentType: j.type,
        hiringOrganization: { '@type': 'Organization', name: site.name },
        jobLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressLocality: site.address.city, addressCountry: 'DE' },
        },
      }
    : null;

  return (
    <>
      <section className="border-b border-steel-dark bg-industrial pb-16 pt-36">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">
            {j.location} - {j.type}
          </p>
          <h1 className="mt-4 font-display text-4xl font-black text-white md:text-6xl">{j.title}</h1>
          {!j.isOpen && (
            <p className="mt-4 inline-block border border-dashed border-kc-red-dark bg-kc-red/10 px-4 py-2 text-sm text-steel-light">
              Status in Pruefung - kein JobPosting-Schema aktiv.
            </p>
          )}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="max-w-2xl text-steel-light">{j.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-steel-grey">
                <li>- PDF-Upload (max. 8 MB)</li>
                <li>- Serverseitige Dateipruefung (Typ/Groesse)</li>
                <li>- Datenschutz-Consent, Honeypot</li>
                <li>- Kein vorgetaeuschter Versand ohne SMTP-Konfiguration</li>
              </ul>
              <p className="mt-6 text-sm text-steel-grey">
                Alternativ per E-Mail: <a className="text-kc-red-light" href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className="border border-steel-dark bg-graphite p-6">
              <h2 className="mb-4 font-display text-2xl text-white">Bewerbung</h2>
              <ApplicationForm positionDefault={j.title} />
            </div>
          </div>
        </Container>
      </section>

      <ContactCta />

      {jsonld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />}
    </>
  );
}
