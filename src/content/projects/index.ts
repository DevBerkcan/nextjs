import type { Project } from '@/types/content';

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
