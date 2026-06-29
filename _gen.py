import os
def w(p, c):
    d=os.path.dirname(p)
    if d: os.makedirs(d, exist_ok=True)
    open(p, "w", encoding="utf-8").write(c)

# ---------- config files ----------
w("package.json", """{
  "name": "kc-schweisstechnik",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^3.23.8",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4",
    "motion": "^11.11.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.13",
    "three": "^0.169.0",
    "@react-three/fiber": "^8.17.10",
    "@react-three/drei": "^9.114.0",
    "@react-three/postprocessing": "^2.16.3"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.169.0",
    "tailwindcss": "^3.4.14",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.1.0",
    "prettier": "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.8"
  }
}
""")

w("tsconfig.json", """{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
""")

w("next.config.mjs", """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // GLB/3D assets are loaded via dynamic import on the client only.
};
export default nextConfig;
""")

w("postcss.config.mjs", """export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
""")

w("tailwind.config.ts", """import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        kc: { red: '#c21b1c', 'red-dark': '#8f1113', 'red-light': '#e33a3b' },
        carbon: '#08090a',
        industrial: '#101214',
        graphite: '#191c20',
        steel: { dark: '#282d32', grey: '#8e969f', light: '#d4d8dc' },
        heat: '#ff7a1a',
        arc: '#b9dfff',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
""")

w(".eslintrc.json", '{ "extends": "next/core-web-vitals" }\n')
w(".prettierrc", '{ "semi": true, "singleQuote": true, "plugins": ["prettier-plugin-tailwindcss"] }\n')
w(".gitignore", "node_modules\n.next\nout\n.env*.local\n*.tsbuildinfo\nnext-env.d.ts\n")

w(".env.example", """# === E-Mail-Versand (Formulare) ===
# SMTP-Zugangsdaten des Kunden eintragen. Solange leer, werden Formulare
# validiert, aber NICHT versendet (siehe lib/forms/mailer.ts).
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
MAIL_FROM="KC Schweisstechnik <noreply@kc-schweisstechnik.de>"
MAIL_TO=info@kc-schweisstechnik.de

# === Rate Limiting (optional, z. B. Upstash) ===
RATE_LIMIT_TOKENS=5
RATE_LIMIT_WINDOW=60

# === Site ===
NEXT_PUBLIC_SITE_URL=https://www.kc-schweisstechnik.de

# === Analytics (erst nach Consent aktiv, optional) ===
NEXT_PUBLIC_ANALYTICS_ID=
""")

# ---------- globals + fonts + layout ----------
w("src/app/globals.css", """@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --kc-red:#c21b1c; --kc-red-dark:#8f1113; --kc-red-light:#e33a3b;
  --carbon-black:#08090a; --industrial-black:#101214; --graphite:#191c20;
  --steel-dark:#282d32; --steel-grey:#8e969f; --steel-light:#d4d8dc;
  --heat-orange:#ff7a1a; --arc-blue:#b9dfff;
}
html { background:var(--carbon-black); color:var(--steel-light); }
body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
/* Lenis handles smooth scroll; do not add scroll-behavior:smooth here. */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

a:focus-visible, button:focus-visible, input:focus-visible,
select:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--kc-red); outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
}
""")

w("src/lib/fonts.ts", """import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';

export const display = Archivo({
  subsets: ['latin'], weight: ['600', '700', '800', '900'],
  variable: '--font-display', display: 'swap',
});
export const body = Inter({
  subsets: ['latin'], weight: ['400', '500', '600'],
  variable: '--font-body', display: 'swap',
});
export const mono = JetBrains_Mono({
  subsets: ['latin'], weight: ['400', '500', '700'],
  variable: '--font-mono', display: 'swap',
});
""")

w("src/lib/utils/cn.ts", """import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
""")

w("src/lib/seo/site.ts", """export const site = {
  name: 'KC Schweisstechnik GmbH',
  shortName: 'KC Schweisstechnik',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.kc-schweisstechnik.de',
  description:
    'Schweisstechnik, Rohrleitungsbau und Anlagenbau fuer Energieversorger, Industrie und Infrastruktur. Praezise geplant, zuverlaessig ausgefuehrt, sauber dokumentiert.',
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
  areas: ['Nordrhein-Westfalen', 'Baden-Wuerttemberg'],
} as const;
""")

w("src/lib/seo/jsonld.ts", """import { site } from './site';

// LocalBusiness / Organization structured data.
// NOTE: keine Bewertungen / aggregateRating erfinden.
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    areaServed: site.areas,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: it.url,
    })),
  };
}
""")

print("config + lib written")
