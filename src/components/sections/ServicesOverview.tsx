import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { services } from '@/content/services';
import { Reveal } from '@/components/motion/Reveal';

export function ServicesOverview() {
  return (
    <section className="py-28">
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Leistungen</p>
          <h2 className="my-4 font-display text-4xl font-extrabold text-white md:text-5xl">Was wir verbinden.</h2>
          <p className="text-steel-grey">Vom einzelnen Schweißnaht-Detail bis zur kompletten Anlage &mdash; ausgefuehrt von zertifizierten Fachkraeften mit moderner Technik.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link href={`/leistungen/${s.slug}`}
                className={`group relative flex min-h-[230px] flex-col justify-between overflow-hidden border border-steel-dark bg-gradient-to-br from-graphite to-industrial p-8 transition hover:-translate-y-1 hover:border-steel-grey ${i === 0 ? 'md:col-span-2' : ''}`}>
                <span className="absolute left-0 top-0 h-0 w-[3px] bg-kc-red transition-all duration-300 group-hover:h-full" />
                <div>
                  <span className="font-mono text-xs tracking-widest text-kc-red">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="my-3 font-display text-2xl text-white">{s.title}</h3>
                  <p className="text-sm text-steel-grey">{s.summary}</p>
                </div>
                <span className="mt-4 font-mono text-xs tracking-widest text-steel-light">Detail ansehen &rarr;</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
