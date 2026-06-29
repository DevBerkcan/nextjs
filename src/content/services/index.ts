import type { Service } from '@/types/content';

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
