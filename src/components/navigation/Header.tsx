'use client';
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
              <Button href={`tel:${site.mobile.replace(/\s/g, '')}`} variant="ghost">Direkt anrufen</Button>
              <Button href="/kontakt" onClick={() => setOpen(false)}>Projekt anfragen</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
