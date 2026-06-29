export type Service = {
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
