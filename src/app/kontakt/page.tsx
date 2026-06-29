import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ProjectInquiryForm } from '@/components/forms/ProjectInquiryForm';
import { site } from '@/lib/seo/site';

export const metadata: Metadata = { title: 'Kontakt', description: 'Kontakt zu KC Schweisstechnik in Dortmund.', alternates: { canonical: '/kontakt' } };

export default function KontaktPage() {
  return (
    <section className="pt-36 pb-24"><Container>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-kc-red-light">Kontakt</p>
      <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white">Ihr naechstes Projekt beginnt mit einem Gespraech.</h1>
      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="border border-steel-dark bg-graphite p-6"><h2 className="mb-4 font-display text-2xl text-white">Projektanfrage</h2><ProjectInquiryForm /></div>
        <div className="space-y-6">
          <div><p className="font-mono text-xs uppercase tracking-widest text-kc-red-light">Adresse</p><p className="text-steel-light">{site.name}<br />{site.address.street}<br />{site.address.zip} {site.address.city}</p></div>
          <div><p className="font-mono text-xs uppercase tracking-widest text-kc-red-light">Telefon</p><p className="text-steel-light"><a href={`tel:${site.phone.replace(/\s/g,'')}`}>{site.phone}</a><br /><a href={`tel:${site.mobile.replace(/\s/g,'')}`}>{site.mobile}</a></p></div>
          <div><p className="font-mono text-xs uppercase tracking-widest text-kc-red-light">Ansprechpartner</p><p className="text-steel-light">{site.contact}<br /><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
        </div>
      </div>
    </Container></section>
  );
}
