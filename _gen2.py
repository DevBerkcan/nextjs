import os
def w(p,c):
    d=os.path.dirname(p)
    if d: os.makedirs(d,exist_ok=True)
    open(p,"w",encoding="utf-8").write(c)

# ===== TYPES =====
w("src/types/content.ts", """export type Service = {
  slug: string; title: string; shortTitle: string;
  summary: string; description: string;
  fields: string[]; benefits: string[]; methods: string[];
};
export type Project = {
  slug: string; name: string; region: string; sector: string;
  scope: string; summary: string; methods: string[];
  isPlaceholder: boolean; // true = nicht im Produktivbetrieb zeigen
};
export type Job = {
  slug: string; title: string; type: string; location: string;
  summary: string; isOpen: boolean; // nur offene Stellen -> JobPosting-Schema
};
export type RentalItem = {
  slug: string; category: string; name: string; summary: string;
};
export type Faq = { q: string; a: string };
export type Contact = { name: string; role: string; email: string };
""")

# ===== CONTENT (typed local data; CMS-ready) =====
w("src/content/services/index.ts", """import type { Service } from '@/types/content';

export const services: Service[] = [
  {
    slug: 'rohrleitungsbau', title: 'Rohrleitungsbau', shortTitle: 'Rohrleitungsbau',
    summary: 'Planung und Ausfuehrung von Rohrleitungssystemen fuer Industrie und Versorgung.',
    description: 'DN-uebergreifende Rohrleitungssysteme, druckgeprueft und vollstaendig dokumentiert.',
    fields: ['Industrieleitungen', 'Versorgungsleitungen', 'Druckpruefung'],
    benefits: ['Zertifizierte Schweissverfahren', 'Termintreue', 'Vollstaendige Dokumentation'],
    methods: ['WIG', 'E-Hand', 'MAG'],
  },
  {
    slug: 'fernwaerme', title: 'Fernwaerme', shortTitle: 'Fernwaerme',
    summary: 'Verlegung und Schweissung von Fernwaermeleitungen mit sauberer Isolierung.',
    description: 'Fernwaermeleitungen mit kontrollierter Waermefuehrung und fachgerechter Isolierung.',
    fields: ['Trassenbau', 'Isolierung', 'Hausanschluesse'],
    benefits: ['Kontrollierte Waermefuehrung', 'Saubere Ausfuehrung', 'Dokumentierte Naehte'],
    methods: ['WIG', 'E-Hand'],
  },
  {
    slug: 'gas-wasser-technik', title: 'Gas- und Wassertechnik', shortTitle: 'Gas & Wasser',
    summary: 'Fachgerechte Installation und Schweissung gas- und wasserfuehrender Systeme.',
    description: 'Gas- und wasserfuehrende Systeme nach geltenden Vorgaben, gepruefte Verbindungen.',
    fields: ['Gasleitungen', 'Wasserleitungen', 'Hausanschluesse'],
    benefits: ['Normgerechte Ausfuehrung', 'Gepruefte Verbindungen', 'Sicherheit'],
    methods: ['WIG', 'E-Hand'],
  },
  {
    slug: 'anlagenbau', title: 'Anlagenbau', shortTitle: 'Anlagenbau',
    summary: 'Montage und Verbindung industrieller Anlagenkomponenten.',
    description: 'Koordinierte Montage industrieller Anlagen, termintreu und geprueft.',
    fields: ['Komponentenmontage', 'Rohrverbindungen', 'Inbetriebnahme-Unterstuetzung'],
    benefits: ['Koordinierte Ausfuehrung', 'Termintreue', 'Qualitaetskontrolle'],
    methods: ['WIG', 'E-Hand', 'MAG'],
  },
  {
    slug: 'partnervermittlung', title: 'Partnervermittlung', shortTitle: 'Partner',
    summary: 'Vermittlung qualifizierter Fachkraefte und Partnerbetriebe.',
    description: 'Vermittlung von Fachkraeften und Partnerbetrieben fuer anspruchsvolle Projekte.',
    fields: ['Fachkraefte', 'Partnerbetriebe', 'Projektteams'],
    benefits: ['Geprueftes Netzwerk', 'Schnelle Verfuegbarkeit', 'Persoenliche Abstimmung'],
    methods: [],
  },
];
export const getService = (slug: string) => services.find((s) => s.slug === slug);
""")

w("src/content/projects/index.ts", """import type { Project } from '@/types/content';

// PLATZHALTER: isPlaceholder=true. Im Produktivbetrieb nur echte Projekte mit
// isPlaceholder=false ausspielen (siehe Filter in projekte/page.tsx).
export const projects: Project[] = [
  { slug: 'fernwaermetrasse-platzhalter', name: 'Fernwaermetrasse (Platzhalter)',
    region: 'NRW', sector: 'Fernwaerme', scope: 'Trassenbau',
    summary: 'Verlegung und Schweissung einer Versorgungstrasse. Inhalte folgen.',
    methods: ['WIG', 'E-Hand'], isPlaceholder: true },
  { slug: 'anlagenmontage-platzhalter', name: 'Anlagenmontage (Platzhalter)',
    region: 'NRW', sector: 'Anlagenbau', scope: 'Montage',
    summary: 'Verbindung industrieller Komponenten. Inhalte folgen.',
    methods: ['MAG'], isPlaceholder: true },
  { slug: 'rohrleitungssystem-platzhalter', name: 'Rohrleitungssystem (Platzhalter)',
    region: 'BW', sector: 'Rohrleitungsbau', scope: 'Neubau',
    summary: 'Druckgepruefftes Leitungssystem. Inhalte folgen.',
    methods: ['WIG'], isPlaceholder: true },
];
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
""")

w("src/content/jobs/index.ts", """import type { Job } from '@/types/content';

// Stellen aus der bestehenden Website MUESSEN vor Veroeffentlichung geprueft werden.
// isOpen=true erst setzen, wenn die Stelle bestaetigt offen ist (-> JobPosting-Schema).
export const jobs: Job[] = [
  { slug: 'schweisser-wig-ehand', title: 'Schweisser WIG & E-Hand', type: 'Vollzeit',
    location: 'Dortmund / NRW', summary: 'Ausfuehrung von Schweissarbeiten an Rohrleitungen und Anlagen.', isOpen: false },
  { slug: 'rohrleitungsbauer', title: 'Rohrleitungsbauer', type: 'Vollzeit',
    location: 'Dortmund / NRW', summary: 'Montage und Verlegung von Rohrleitungssystemen.', isOpen: false },
  { slug: 'fernwaerme-isolierer', title: 'Fernwaerme-Isolierer', type: 'Vollzeit',
    location: 'NRW', summary: 'Isolierung von Fernwaermeleitungen.', isOpen: false },
  { slug: 'baggerfahrer', title: 'Baggerfahrer', type: 'Vollzeit', location: 'NRW',
    summary: 'Erdarbeiten im Tief- und Rohrleitungsbau.', isOpen: false },
  { slug: 'lkw-fahrer', title: 'LKW-Fahrer', type: 'Vollzeit', location: 'NRW',
    summary: 'Transport von Material und Technik.', isOpen: false },
  { slug: 'schlosser-vorrichter', title: 'Schlosser / Vorrichter', type: 'Vollzeit',
    location: 'Dortmund', summary: 'Vorrichten und Schlosserarbeiten.', isOpen: false },
];
export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
""")

w("src/content/rental/index.ts", """import type { RentalItem } from '@/types/content';
export const rentalItems: RentalItem[] = [
  { slug: 'unimog', category: 'Fahrzeug', name: 'Unimog', summary: 'Gelaendegaengiges Geraetetraegerfahrzeug. Verfuegbarkeit auf Anfrage.' },
  { slug: 'fahrzeuge', category: 'Fahrzeug', name: 'Fahrzeuge', summary: 'Transport- und Baustellenfahrzeuge.' },
  { slug: 'schweissmaschine', category: 'Maschine', name: 'Schweissmaschinen', summary: 'Gepruefte Geraete fuer WIG, E-Hand und MAG.' },
];
""")

w("src/content/faq/index.ts", """import type { Faq } from '@/types/content';
export const generalFaq: Faq[] = [
  { q: 'In welchem Gebiet arbeiten Sie?', a: 'Schwerpunkt Nordrhein-Westfalen und Baden-Wuerttemberg, projektbezogen darueber hinaus.' },
  { q: 'Sind Ihre Schweisser zertifiziert?', a: 'Ja, wir arbeiten mit zertifizierten Fachkraeften in WIG, E-Hand und MAG.' },
  { q: 'Erhalte ich eine Dokumentation?', a: 'Jedes Projekt wird nachvollziehbar dokumentiert und geordnet uebergeben.' },
];
""")

print("content written")
