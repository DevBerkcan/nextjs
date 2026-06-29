import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/seo/site';
export function ContactCta() {
  return (
    <section className="bg-carbon py-28 text-center"
      style={{ backgroundImage: 'radial-gradient(900px 500px at 50% 0%, rgba(194,27,28,.22), transparent)' }}>
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Kontakt</p>
        <h2 className="mx-auto my-4 max-w-2xl font-display text-4xl font-extrabold text-white md:text-5xl">Ihr naechstes Projekt beginnt mit einem Gespraech.</h2>
        <p className="mx-auto mb-8 max-w-xl text-steel-grey">Erzaehlen Sie uns von Ihrem Vorhaben &mdash; wir melden uns mit einem festen Ansprechpartner.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/kontakt">Projekt anfragen</Button>
          <Button href={`tel:${site.mobile.replace(/\s/g, '')}`} variant="ghost">Direkt anrufen</Button>
          <Button href={`mailto:${site.email}`} variant="ghost">E-Mail schreiben</Button>
        </div>
      </Container>
    </section>
  );
}
