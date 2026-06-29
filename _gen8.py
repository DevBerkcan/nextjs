import os
def w(p,c):
    d=os.path.dirname(p)
    if d: os.makedirs(d,exist_ok=True)
    open(p,"w",encoding="utf-8").write(c)

# ===== ROOT LAYOUT =====
w("src/app/layout.tsx", """import type { Metadata } from 'next';
import './globals.css';
import { display, body, mono } from '@/lib/fonts';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { site } from '@/lib/seo/site';
import { organizationJsonLd } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Verbindungen, die dauerhaft tragen`, template: `%s | ${site.shortName}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'de_DE', siteName: site.name, title: site.name, description: site.description, url: site.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang=\"de\" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className=\"bg-carbon text-steel-light antialiased\">
        <a href=\"#main\" className=\"sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[200] focus:bg-kc-red focus:px-4 focus:py-3 focus:text-white\">Zum Inhalt springen</a>
        <SmoothScroll />
        <Header />
        <main id=\"main\">{children}</main>
        <Footer />
        <script type=\"application/ld+json\" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
      </body>
    </html>
  );
}
""")

# ===== HOME =====
w("src/app/page.tsx", """import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { ProcessScroll } from '@/components/sections/ProcessScroll';
import { ContactCta } from '@/components/sections/ContactCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <ProcessScroll />
      <ContactCta />
    </>
  );
}
""")

# shared page shell helper
PAGE_SHELL = """import type {{ Metadata }} from 'next';
import {{ Container }} from '@/components/ui/Container';
import {{ ContactCta }} from '@/components/sections/ContactCta';

export const metadata: Metadata = {{ title: '{title}', description: '{desc}' }};

export default function Page() {{
  return (
    <>
      <section className=\"pt-36 pb-16 border-b border-steel-dark bg-industrial\">
        <Container>
          <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">{eyebrow}</p>
          <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">{h1}</h1>
          <p className=\"mt-5 max-w-2xl text-steel-grey\">{lead}</p>
        </Container>
      </section>
      <section className=\"py-20\"><Container>{body}</Container></section>
      <ContactCta />
    </>
  );
}}
"""

# UNTERNEHMEN
w("src/app/unternehmen/page.tsx", PAGE_SHELL.format(
  title='Unternehmen', desc='KC Schweisstechnik - familiengefuehrt, technisch konsequent.',
  eyebrow='Unternehmen', h1='Familiengefuehrt. Technisch konsequent.',
  lead='KC Schweisstechnik steht fuer zuverlaessige Ausfuehrung, flexible Koordination und einen klaren Qualitaetsanspruch.',
  body="<div className=\"prose-kc max-w-2xl text-steel-light\"><p>Getragen von erfahrenen Fachkraeften und festen Ansprechpartnern. (Echte Unternehmensinhalte und Bilder werden vom Kunden ergaenzt.)</p></div>"))

# LEISTUNGEN overview
w("src/app/leistungen/page.tsx", """import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { services } from '@/content/services';

export const metadata: Metadata = { title: 'Leistungen', description: 'Rohrleitungsbau, Fernwaerme, Gas- und Wassertechnik, Anlagenbau und Partnervermittlung.' };

export default function LeistungenPage() {
  return (
    <>
      <section className=\"pt-36 pb-16 border-b border-steel-dark bg-industrial\">
        <Container>
          <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">Leistungen</p>
          <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">Was wir verbinden.</h1>
        </Container>
      </section>
      <section className=\"py-20\"><Container>
        <div className=\"grid gap-4 md:grid-cols-2\">
          {services.map((s) => (
            <Link key={s.slug} href={`/leistungen/${s.slug}`} className=\"border border-steel-dark bg-graphite p-8 transition hover:border-steel-grey\">
              <h2 className=\"font-display text-2xl text-white\">{s.title}</h2>
              <p className=\"mt-2 text-sm text-steel-grey\">{s.summary}</p>
            </Link>
          ))}
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
""")

# individual service pages
SERVICE_TPL = """import type {{ Metadata }} from 'next';
import {{ Container }} from '@/components/ui/Container';
import {{ ContactCta }} from '@/components/sections/ContactCta';
import {{ ProjectInquiryForm }} from '@/components/forms/ProjectInquiryForm';
import {{ getService }} from '@/content/services';
import {{ generalFaq }} from '@/content/faq';
import {{ breadcrumbJsonLd }} from '@/lib/seo/jsonld';
import {{ site }} from '@/lib/seo/site';
import {{ notFound }} from 'next/navigation';

const SLUG = '{slug}';
const svc = getService(SLUG);
export const metadata: Metadata = {{
  title: svc?.title ?? 'Leistung',
  description: svc?.summary,
  alternates: {{ canonical: `/leistungen/${{SLUG}}` }},
}};

export default function ServicePage() {{
  if (!svc) notFound();
  const jsonld = [
    {{ '@context': 'https://schema.org', '@type': 'Service', name: svc.title, description: svc.description, areaServed: site.areas, provider: {{ '@type': 'LocalBusiness', name: site.name }} }},
    breadcrumbJsonLd([
      {{ name: 'Start', url: site.url }},
      {{ name: 'Leistungen', url: `${{site.url}}/leistungen` }},
      {{ name: svc.title, url: `${{site.url}}/leistungen/${{SLUG}}` }},
    ]),
  ];
  return (
    <>
      <section className=\"pt-36 pb-16 border-b border-steel-dark bg-industrial\">
        <Container>
          <p className=\"font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light\">Leistung</p>
          <h1 className=\"mt-4 font-display text-4xl md:text-6xl font-black text-white\">{{svc.title}}</h1>
          <p className=\"mt-5 max-w-2xl text-steel-grey\">{{svc.description}}</p>
        </Container>
      </section>
      <section className=\"py-20\"><Container>
        <div className=\"grid gap-12 md:grid-cols-2\">
          <div>
            <h2 className=\"font-display text-2xl text-white\">Einsatzbereiche</h2>
            <ul className=\"mt-4 space-y-2 text-steel-grey\">{{svc.fields.map((f) => <li key={{f}}>- {{f}}</li>)}}</ul>
            <h2 className=\"mt-8 font-display text-2xl text-white\">Ihre Vorteile</h2>
            <ul className=\"mt-4 space-y-2 text-steel-grey\">{{svc.benefits.map((b) => <li key={{b}}>- {{b}}</li>)}}</ul>
            {{svc.methods.length > 0 && (
              <p className=\"mt-8 font-mono text-xs uppercase tracking-widest text-kc-red-light\">Verfahren: {{svc.methods.join(' / ')}}</p>
            )}}
          </div>
          <div className=\"border border-steel-dark bg-graphite p-6\">
            <h2 className=\"mb-4 font-display text-2xl text-white\">Projektanfrage</h2>
            <ProjectInquiryForm />
          </div>
        </div>
        <div className=\"mt-16 max-w-2xl\">
          <h2 className=\"font-display text-2xl text-white\">Haeufige Fragen</h2>
          <dl className=\"mt-4 space-y-4\">{{generalFaq.map((f) => (<div key={{f.q}}><dt className=\"font-semibold text-white\">{{f.q}}</dt><dd className=\"text-sm text-steel-grey\">{{f.a}}</dd></div>))}}</dl>
        </div>
      </Container></section>
      <ContactCta />
      <script type=\"application/ld+json\" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(jsonld) }}}} />
    </>
  );
}}
"""
for slug in ['rohrleitungsbau','fernwaerme','gas-wasser-technik','anlagenbau','partnervermittlung']:
    w(f"src/app/leistungen/{slug}/page.tsx", SERVICE_TPL.format(slug=slug))

print("home + unternehmen + services written")
