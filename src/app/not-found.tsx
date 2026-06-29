import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center"><Container>
      <p className="font-mono text-xs uppercase tracking-widest text-kc-red-light">Fehler 404</p>
      <h1 className="mt-3 font-display text-5xl font-black text-white">Seite nicht gefunden.</h1>
      <p className="mt-4 text-steel-grey">Die angeforderte Seite existiert nicht. Zurueck zur Startseite:</p>
      <div className="mt-6"><Button href="/">Zur Startseite</Button></div>
    </Container></section>
  );
}
