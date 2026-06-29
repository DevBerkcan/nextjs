import os
def w(p,c):
    d=os.path.dirname(p)
    if d: os.makedirs(d,exist_ok=True)
    open(p,"w",encoding="utf-8").write(c)

# ===== UI =====
w("src/components/ui/Button.tsx", """import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import type { ComponentProps } from 'react';

type Variant = 'red' | 'ghost';
const styles: Record<Variant, string> = {
  red: 'bg-kc-red text-white hover:bg-kc-red-light',
  ghost: 'border border-steel-dark text-steel-light hover:border-steel-grey hover:text-white',
};
export function Button(
  { href, variant = 'red', className, children, ...rest }:
  { href: string; variant?: Variant; className?: string } & ComponentProps<typeof Link>
) {
  return (
    <Link href={href}
      className={cn('inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition', styles[variant], className)}
      {...rest}>
      {children}
    </Link>
  );
}
""")

w("src/components/ui/Container.tsx", """import type { ReactNode } from 'react';
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-6 ${className}`}>{children}</div>;
}
""")

# ===== NAVIGATION =====
w("src/components/navigation/nav-items.ts", """export const navItems = [
  { href: '/unternehmen', label: 'Unternehmen' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/projekte', label: 'Projekte' },
  { href: '/vermietung', label: 'Vermietung' },
  { href: '/karriere', label: 'Karriere' },
  { href: '/kontakt', label: 'Kontakt' },
];
""")

w("src/components/navigation/Header.tsx", """'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { navItems } from './nav-items';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/seo/site';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? 'border-b border-steel-dark bg-carbon/90 backdrop-blur' : 'border-b border-transparent'}`}>
      <Container>
        <div className={`flex items-center justify-between transition-all ${scrolled ? 'h-[68px]' : 'h-[84px]'}`}>
          <Link href="/" aria-label="KC Schweisstechnik Startseite">
            <Image src="/logo.png" alt="KC Schweisstechnik" width={150} height={38} priority className="h-9 w-auto" />
          </Link>
          <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 md:flex">
            {navItems.map((n) => (
              <Link key={n.href} href={n.href} className="text-sm font-medium text-steel-light transition hover:text-white">{n.label}</Link>
            ))}
            <Button href="/kontakt">Projekt anfragen</Button>
          </nav>
          <button className="md:hidden text-2xl text-white" aria-label="Menue oeffnen" onClick={() => setOpen(true)}>&#9776;</button>
        </div>
      </Container>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col gap-2 bg-carbon px-7 pt-24">
            <button className="absolute right-6 top-6 text-3xl text-white" aria-label="Menue schliessen" onClick={() => setOpen(false)}>&times;</button>
            {navItems.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-steel-dark py-4 font-display text-2xl text-white">{n.label}</Link>
            ))}
            <div className="mt-5 flex flex-col gap-3">
              <Button href={`tel:${site.mobile.replace(/\\s/g, '')}`} variant="ghost">Direkt anrufen</Button>
              <Button href="/kontakt" onClick={() => setOpen(false)}>Projekt anfragen</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
""")

w("src/components/layout/Footer.tsx", """import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/seo/site';
export function Footer() {
  return (
    <footer className="border-t border-steel-dark bg-industrial py-12">
      <Container>
        <div className="mb-9 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Image src="/logo.png" alt="KC Schweisstechnik" width={140} height={32} className="mb-4 h-8 w-auto" />
            <p className="max-w-xs text-sm text-steel-grey">Schweisstechnik, Rohrleitungsbau und Anlagenbau aus Dortmund. Verbindungen, die dauerhaft tragen.</p>
          </div>
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-white">Leistungen</h4>
            <ul className="flex flex-col gap-2 text-sm text-steel-grey">
              <li><Link href="/leistungen/rohrleitungsbau">Rohrleitungsbau</Link></li>
              <li><Link href="/leistungen/fernwaerme">Fernwaerme</Link></li>
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
""")

print("ui/nav/footer written")
