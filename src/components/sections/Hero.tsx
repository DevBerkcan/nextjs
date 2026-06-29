import { Hero3D } from '@/components/three/Hero3D';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Weldline } from '@/components/ui/Weldline';
import { site } from '@/lib/seo/site';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-industrial">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(theme(colors.steel.dark)_1px,transparent_1px),linear-gradient(90deg,theme(colors.steel.dark)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(900px_600px_at_70%_40%,black_0%,transparent_75%)]" />
        <Weldline className="opacity-60" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2">
        <Hero3D enabled={false} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl py-36">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">KC Schweißtechnik · Dortmund</p>
          <h1 className="my-5 font-display text-5xl font-black leading-[1.02] text-white md:text-7xl">
            Verbindungen,<span className="block text-kc-red">die dauerhaft tragen.</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-steel-light">
            Schweißtechnik, Rohrleitungsbau und Anlagenbau für Energieversorger, Industrie und anspruchsvolle Infrastrukturprojekte. Präzise geplant, zuverlässig ausgeführt und sauber dokumentiert.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/kontakt">Projekt anfragen →</Button>
            <Button href="/leistungen" variant="ghost">Leistungen entdecken</Button>
          </div>
          <p className="mt-7 font-mono text-sm text-steel-grey">
            Direktkontakt · <a className="border-b border-kc-red text-white" href={`tel:${site.mobile.replace(/\s/g, '')}`}>{site.mobile}</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
