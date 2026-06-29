import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';

export const metadata: Metadata = { title: 'Unternehmen', description: 'KC Schweisstechnik - familiengefuehrt, technisch konsequent.' };

export default function Page() {
  return (
    <>
      <section className="pt-36 pb-16 border-b border-steel-dark bg-industrial">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Unternehmen</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white">Familiengefuehrt. Technisch konsequent.</h1>
          <p className="mt-5 max-w-2xl text-steel-grey">KC Schweisstechnik steht fuer zuverlaessige Ausfuehrung, flexible Koordination und einen klaren Qualitaetsanspruch.</p>
        </Container>
      </section>
      <section className="py-20"><Container><div className="prose-kc max-w-2xl text-steel-light"><p>Getragen von erfahrenen Fachkraeften und festen Ansprechpartnern. (Echte Unternehmensinhalte und Bilder werden vom Kunden ergaenzt.)</p></div></Container></section>
      <ContactCta />
    </>
  );
}
