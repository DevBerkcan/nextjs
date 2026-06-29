import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/seo/site';
export function Footer() {
  return (
    <footer className="border-t border-steel-dark bg-industrial py-12">
      <Container>
        <div className="mb-9 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Image src="/logo.png" alt="KC Schweißtechnik" width={140} height={32} className="mb-4 h-8 w-auto" />
            <p className="max-w-xs text-sm text-steel-grey">Schweißtechnik, Rohrleitungsbau und Anlagenbau aus Dortmund. Verbindungen, die dauerhaft tragen.</p>
          </div>
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-white">Leistungen</h4>
            <ul className="flex flex-col gap-2 text-sm text-steel-grey">
              <li><Link href="/leistungen/rohrleitungsbau">Rohrleitungsbau</Link></li>
              <li><Link href="/leistungen/fernwaerme">Fernwärme</Link></li>
              <li><Link href="/leistungen/gas-wasser-technik">Gas & Wasser</Link></li>
              <li><Link href="/leistungen/anlagenbau">Anlagenbau</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-white">Rechtliches</h4>
            <ul className="flex flex-col gap-2 text-sm text-steel-grey">
              <li><Link href="/impressum">Impressum</Link></li>
              <li><Link href="/datenschutz">Datenschutz</Link></li>
              <li><Link href="/agb">AGB</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-steel-dark pt-5 text-xs text-steel-grey">
          <span>&copy; {new Date().getFullYear()} {site.name}</span>
          <span>{site.address.street}, {site.address.zip} {site.address.city}</span>
        </div>
      </Container>
    </footer>
  );
}
