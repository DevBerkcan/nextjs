import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
export const metadata: Metadata = { title: 'Impressum', robots: { index: false } };
export default function Page() {
  return (
    <section className="pt-36 pb-24"><Container>
      <h1 className="font-display text-4xl font-black text-white">Impressum</h1>
      <p className="mt-6 max-w-2xl text-steel-grey">Platzhalter. Rechtstexte werden ausschliesslich nach inhaltlicher Pruefung aus der bestehenden Website uebernommen - nicht veraendert oder neu erfunden.</p>
    </Container></section>
  );
}
