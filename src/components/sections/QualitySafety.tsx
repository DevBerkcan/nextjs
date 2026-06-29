import { Container } from '@/components/ui/Container';
import { Weldline } from '@/components/ui/Weldline';

const points = [
  { t: 'Qualitätsprüfung', d: 'Verbindungen werden nach festgelegten Prüfkriterien kontrolliert.' },
  { t: 'Dokumentation', d: 'Projektbezogene Unterlagen – nachvollziehbar strukturiert und übergabefertig.' },
  { t: 'Sicherheit auf Baustellen', d: 'Klare Abläufe, abgestimmte Koordination, saubere Übergaben.' },
  { t: 'Zertifizierte Fachkräfte', d: 'WIG · E-Hand · MAG – je nach Anforderung und Verfahren.' },
];

export function QualitySafety() {
  return (
    <section className="relative border-y border-steel-dark bg-industrial py-28">
      <Weldline className="opacity-40" />
      <Container className="relative">
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Qualität & Sicherheit</p>
          <h2 className="my-4 font-display text-4xl font-extrabold text-white md:text-5xl">Geprüft. Dokumentiert. Sicher.</h2>
          <p className="text-steel-grey">Konkrete Normen, Zertifikate und Prüfverfahren werden erst nach schriftlicher Bestätigung ergänzt.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {points.map((p) => (
            <div key={p.t} className="border border-steel-dark bg-graphite p-7">
              <h3 className="font-display text-2xl text-white">{p.t}</h3>
              <p className="mt-2 text-sm text-steel-grey">{p.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
