import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo/site';
import { services } from '@/content/services';
import { projects } from '@/content/projects';
import { jobs } from '@/content/jobs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPaths = ['', '/unternehmen', '/leistungen', '/projekte', '/vermietung', '/qualitaet-sicherheit', '/karriere', '/kontakt'];
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, lastModified: new Date() })),
    ...services.map((s) => ({ url: `${base}/leistungen/${s.slug}`, lastModified: new Date() })),
    ...projects.filter((p) => !p.isPlaceholder).map((p) => ({ url: `${base}/projekte/${p.slug}`, lastModified: new Date() })),
    ...jobs.filter((j) => j.isOpen).map((j) => ({ url: `${base}/karriere/${j.slug}`, lastModified: new Date() })),
  ];
}
