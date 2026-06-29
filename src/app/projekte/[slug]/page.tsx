import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactCta } from '@/components/sections/ContactCta';
import { getProject, projects } from '@/content/projects';
import { notFound } from 'next/navigation';

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = getProject(slug);
  return { title: p?.name ?? 'Projekt', description: p?.summary };
}
export default async function ProjektDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = getProject(slug);
  if (!p) notFound();
  return (
    <>
      <section className="pt-36 pb-16 border-b border-steel-dark bg-industrial"><Container>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">{p.sector} / {p.region}</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white">{p.name}</h1>
        {p.isPlaceholder && <p className="mt-4 inline-block border border-dashed border-kc-red-dark bg-kc-red/10 px-4 py-2 text-sm text-steel-light">Platzhalter - im Produktivbetrieb ausblenden.</p>}
      </Container></section>
      <section className="py-20"><Container>
        <div className="max-w-2xl text-steel-light">
          <p>{p.summary}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-kc-red-light">Umfang: {p.scope} - Verfahren: {p.methods.join(' / ') || '-'}</p>
        </div>
      </Container></section>
      <ContactCta />
    </>
  );
}
