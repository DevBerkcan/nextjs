import type { Metadata } from 'next';
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
    <html lang="de" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-carbon text-steel-light antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[200] focus:bg-kc-red focus:px-4 focus:py-3 focus:text-white">Zum Inhalt springen</a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
      </body>
    </html>
  );
}
