export const site = {
  name: 'KC Schweißtechnik GmbH',
  shortName: 'KC Schweißtechnik',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.kc-schweisstechnik.de',
  description:
    'Schweißtechnik, Rohrleitungsbau und Anlagenbau fuer Energieversorger, Industrie und Infrastruktur. Praezise geplant, zuverlaessig ausgefuehrt, sauber dokumentiert.',
  address: {
    street: 'Breisenbachstrasse 81',
    zip: '44357',
    city: 'Dortmund',
    country: 'DE',
  },
  phone: '+49 231 13 05 29 11',
  mobile: '+49 176 548 980 71',
  email: 'info@kc-schweisstechnik.de',
  contact: 'Onur Karahan',
  areas: ['Nordrhein-Westfalen', 'Baden-Württemberg'],
} as const;
