import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { ProjectInquiryForm } from '@/components/forms/ProjectInquiryForm';
import { getService } from '@/content/services';
import { generalFaq } from '@/content/faq';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { site } from '@/lib/seo/site';
import { notFound } from 'next/navigation';

const SLUG = 'fernwaerme';
const svc = getService(SLUG);
export const metadata: Metadata = {
  title: svc?.title ?? 'Leistung',
  description: svc?.summary,
  alternates: { canonical: `/leistungen/${SLUG}` },
};

export default function ServicePage() {
  if (!svc) notFound();
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Service', name: svc.title, description: svc.description, areaServed: site.areas, provider: { '@type': 'LocalBusiness', name: site.name } },
    breadcrumbJsonLd([
      { name: 'Start', url: site.url },
      { name: 'Leistungen', url: `${site.url}/leistungen` },
      { name: svc.title, url: `${site.url}/leistungen/${SLUG}` },
    ]),
  ];
  return (
    <>
      <section className="pt-36 pb-16 border-b border-steel-dark bg-industrial">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Leistung</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white">{svc.title}</h1>
          <p className="mt-5 max-w-2xl text-steel-grey">{svc.description}</p>
        </Container>
      </section>
      <section className="py-20"><Container>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-white">Einsatzbereiche</h2>
            <ul className="mt-4 space-y-2 text-steel-grey">{svc.fields.map((f) => <li key={f}>- {f}</li>)}</ul>
            <h2 className="mt-8 font-display text-2xl text-white">Ihre Vorteile</h2>
            <ul className="mt-4 space-y-2 text-steel-grey">{svc.benefits.map((b) => <li key={b}>- {b}</li>)}</ul>
            {svc.methods.length > 0 && (
              <p className="mt-8 font-mono text-xs uppercase tracking-widest text-kc-red-light">Verfahren: {svc.methods.join(' / ')}</p>
            )}
          </div>
          <div className="border border-steel-dark bg-graphite p-6">
            <h2 className="mb-4 font-display text-2xl text-white">Projektanfrage</h2>
            <ProjectInquiryForm />
          </div>
        </div>
        <div className="mt-16 max-w-2xl">
          <h2 className="font-display text-2xl text-white">Haeufige Fragen</h2>
          <dl className="mt-4 space-y-4">{generalFaq.map((f) => (<div key={f.q}><dt className="font-semibold text-white">{f.q}</dt><dd className="text-sm text-steel-grey">{f.a}</dd></div>))}</dl>
        </div>
      </Container></section>
      <ContactCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
    </>
  );
}
