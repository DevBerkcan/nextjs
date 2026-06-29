import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { projects } from '@/content/projects';

export function ProjectsPreview() {
  const list = projects.slice(0, 3);
  return (
    <section className="py-28">
      <Container>
        <div className="mb-14 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Projekte</p>
            <h2 className="my-4 font-display text-4xl font-extrabold text-white md:text-5xl">Referenzen.</h2>
            <p className="text-steel-grey">Platzhalter bis echte Projekte/Bilder geliefert sind. Im Produktivbetrieb ausblenden.</p>
          </div>
          <Link href="/projekte" className="hidden font-mono text-xs uppercase tracking-widest text-steel-light md:inline">Alle Projekte →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {list.map((p) => (
            <Link key={p.slug} href={`/projekte/${p.slug}`} className="group border border-steel-dark bg-graphite transition hover:-translate-y-1 hover:border-steel-grey">
              <div className="flex h-44 items-center justify-center font-mono text-xs tracking-widest text-steel-dark" style={{ background: 'repeating-linear-gradient(45deg,#1b1f23,#1b1f23 12px,#191c20 12px,#191c20 24px)' }}>BILDPLATZHALTER</div>
              <div className="p-6">
                <div className="mb-2 flex gap-2 font-mono text-[0.62rem] text-kc-red-light">
                  <span className="border border-steel-dark px-2 py-0.5">{p.sector}</span>
                  <span className="border border-steel-dark px-2 py-0.5">{p.region}</span>
                </div>
                <h3 className="font-display text-xl text-white">{p.name}</h3>
                <p className="mt-2 text-sm text-steel-grey">{p.summary}</p>
                {p.isPlaceholder && (
                  <p className="mt-4 inline-block border border-dashed border-kc-red-dark bg-kc-red/10 px-3 py-1 text-[0.75rem] text-steel-light">Platzhalter</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
