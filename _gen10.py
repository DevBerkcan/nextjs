import os
def w(p,c):
    d=os.path.dirname(p)
    if d: os.makedirs(d,exist_ok=True)
    open(p,"w",encoding="utf-8").write(c)

# KARRIERE list
w("src/app/karriere/page.tsx", """import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { jobs } from '@/content/jobs';

export const metadata: Metadata = { title: 'Karriere', description: 'Offene Stellen und Initiativbewerbung bei KC Schweisstechnik.' };

export default function KarrierePage() {
  return (
    <>
      <section className=\"pt-36 pb-16 border-b border-steel-dark bg-industrial\"><Container>
        <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">Karriere</p>
        <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">Arbeiten bei KC.</h1>
        <p className=\"mt-5 max-w-2xl text-steel-grey\">Positionen werden vor Veroeffentlichung geprueft. Initiativbewerbungen sind jederzeit willkommen.</p>
      </Container></section>
      <section className=\"py-20\"><Container>
        <div className=\"divide-y divide-steel-dark border-y border-steel-dark\">
          {jobs.map((j) => (
            <Link key={j.slug} href={`/karriere/${j.slug}`} className=\"flex items-center justify-between gap-4 py-5 transition hover:bg-graphite px-2\">
              <div><h2 className=\"font-display text-xl text-white\">{j.title}</h2><p className=\"text-sm text-steel-grey\">{j.location} - {j.type}</p></div>
              <span className=\"font-mono text-xs text-kc-red-light\">{j.isOpen ? 'OFFEN' : 'IN PRUEFUNG'} &rarr;</span>
            </Link>
          ))}
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
""")

# KARRIERE detail (JobPosting only if open)
w("src/app/karriere/[slug]/page.tsx", """import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { getJob, jobs } from '@/content/jobs';
import { site } from '@/lib/seo/site';
import { notFound } from 'next/navigation';

export function generateStaticParams() { return jobs.map((j) => ({ slug: j.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const j = getJob(slug);
  return { title: j?.title ?? 'Stelle', description: j?.summary };
}
export default async function JobDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const j = getJob(slug);
  if (!j) notFound();
  // JobPosting-Schema NUR fuer bestaetigt offene Stellen.
  const jsonld = j.isOpen ? {
    '@context': 'https://schema.org', '@type': 'JobPosting', title: j.title, description: j.summary,
    employmentType: j.type, hiringOrganization: { '@type': 'Organization', name: site.name },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: site.address.city, addressCountry: 'DE' } },
  } : null;
  return (
    <>
      <section className=\"pt-36 pb-16 border-b border-steel-dark bg-industrial\"><Container>
        <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">{j.location} - {j.type}</p>
        <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">{j.title}</h1>
        {!j.isOpen && <p className=\"mt-4 inline-block border border-dashed border-kc-red-dark bg-kc-red/10 px-4 py-2 text-sm text-steel-light\">Status in Pruefung - kein JobPosting-Schema aktiv.</p>}
      </Container></section>
      <section className=\"py-20\"><Container>
        <p className=\"max-w-2xl text-steel-light\">{j.summary}</p>
        <p className=\"mt-6 text-sm text-steel-grey\">Bewerbung per E-Mail an <a className=\"text-kc-red-light\" href={`mailto:${site.email}`}>{site.email}</a> (PDF, max. 8 MB). Das Bewerbungsformular mit Upload und serverseitiger Dateipruefung ist in lib/validation/schemas.ts vorbereitet.</p>
      </Container></section>
      <ContactCta />
      {jsonld && <script type=\"application/ld+json\" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />}
    </>
  );
}
""")

# KONTAKT
w("src/app/kontakt/page.tsx", """import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ProjectInquiryForm } from '@/components/forms/ProjectInquiryForm';
import { site } from '@/lib/seo/site';

export const metadata: Metadata = { title: 'Kontakt', description: 'Kontakt zu KC Schweisstechnik in Dortmund.', alternates: { canonical: '/kontakt' } };

export default function KontaktPage() {
  return (
    <section className=\"pt-36 pb-24\"><Container>
      <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">Kontakt</p>
      <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">Ihr naechstes Projekt beginnt mit einem Gespraech.</h1>
      <div className=\"mt-12 grid gap-12 md:grid-cols-2\">
        <div className=\"border border-steel-dark bg-graphite p-6\"><h2 className=\"mb-4 font-display text-2xl text-white\">Projektanfrage</h2><ProjectInquiryForm /></div>
        <div className=\"space-y-6\">
          <div><p className=\"font-mono text-xs uppercase tracking-widest text-kc-red-light\">Adresse</p><p className=\"text-steel-light\">{site.name}<br />{site.address.street}<br />{site.address.zip} {site.address.city}</p></div>
          <div><p className=\"font-mono text-xs uppercase tracking-widest text-kc-red-light\">Telefon</p><p className=\"text-steel-light\"><a href={`tel:${site.phone.replace(/\\s/g,'')}`}>{site.phone}</a><br /><a href={`tel:${site.mobile.replace(/\\s/g,'')}`}>{site.mobile}</a></p></div>
          <div><p className=\"font-mono text-xs uppercase tracking-widest text-kc-red-light\">Ansprechpartner</p><p className=\"text-steel-light\">{site.contact}<br /><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
        </div>
      </div>
    </Container></section>
  );
}
""")

# Legal pages
LEGAL = """import type {{ Metadata }} from 'next';
import {{ Container }} from '@/components/ui/Container';
export const metadata: Metadata = {{ title: '{title}', robots: {{ index: false }} }};
export default function Page() {{
  return (
    <section className=\"pt-36 pb-24\"><Container>
      <h1 className=\"font-display text-4xl font-black text-white\">{title}</h1>
      <p className=\"mt-6 max-w-2xl text-steel-grey\">Platzhalter. Rechtstexte werden ausschliesslich nach inhaltlicher Pruefung aus der bestehenden Website uebernommen - nicht veraendert oder neu erfunden.</p>
    </Container></section>
  );
}}
"""
w("src/app/impressum/page.tsx", LEGAL.format(title='Impressum'))
w("src/app/datenschutz/page.tsx", LEGAL.format(title='Datenschutzerklaerung'))
w("src/app/agb/page.tsx", LEGAL.format(title='AGB'))

# not-found
w("src/app/not-found.tsx", """import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
export default function NotFound() {
  return (
    <section className=\"flex min-h-[70vh] items-center\"><Container>
      <p className=\"font-mono text-xs uppercase tracking-widest text-kc-red-light\">Fehler 404</p>
      <h1 className=\"mt-3 font-display text-5xl font-black text-white\">Seite nicht gefunden.</h1>
      <p className=\"mt-4 text-steel-grey\">Die angeforderte Seite existiert nicht. Zurueck zur Startseite:</p>
      <div className=\"mt-6\"><Button href=\"/\">Zur Startseite</Button></div>
    </Container></section>
  );
}
""")

# sitemap + robots
w("src/app/sitemap.ts", """import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo/site';
import { services } from '@/content/services';
import { projects } from '@/content/projects';
import { jobs } from '@/content/jobs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPaths = ['', '/unternehmen', '/leistungen', '/projekte', '/vermietung', '/qualitaet-sicherheit', '/karriere', '/kontakt'];
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, lastModified: new Date() })),
    ...services.map((s) => ({ url: `${base}/leistungen/${s.slug}`, lastModified: new Date() })),
    ...projects.filter((p) => !p.isPlaceholder).map((p) => ({ url: `${base}/projekte/${p.slug}`, lastModified: new Date() })),
    ...jobs.filter((j) => j.isOpen).map((j) => ({ url: `${base}/karriere/${j.slug}`, lastModified: new Date() })),
  ];
}
""")
w("src/app/robots.ts", """import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo/site';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/impressum', '/datenschutz', '/agb'] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
""")

print("careers/kontakt/legal/sitemap written")
