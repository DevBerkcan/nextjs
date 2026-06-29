import type { Job } from '@/types/content';

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
