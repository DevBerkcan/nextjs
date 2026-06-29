import { Container } from '@/components/ui/Container';
// Nur verifizierbare Aussagen ohne erfundene Zahlen.
const items = [
  ['TÜV-zertifizierte Fachkraefte', 'WIG / E-Hand / MAG'],
  ['Vollstaendige Dokumentation', 'Nachvollziehbar je Projekt'],
  ['Persoenliche Ansprechpartner', 'Direkt erreichbar'],
  ['Einsatzgebiet NRW & BW', 'Projektbezogen bundesweit'],
];
export function TrustBar() {
  return (
    <section className="border-y border-steel-dark bg-graphite">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {items.map(([t, s]) => (
            <div key={t} className="border-b border-steel-dark py-7 text-center md:border-b-0">
              <strong className="block font-display text-white">{t}</strong>
              <span className="text-sm text-steel-grey">{s}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
