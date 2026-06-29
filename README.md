# KC Schweisstechnik GmbH - Website-Relaunch

Industrial-Precision-Website fuer Schweisstechnik, Rohrleitungsbau und Anlagenbau.

Dieses Paket enthaelt:

- /demo/index.html - sofort lauffaehige Vorschau der Startseite (im Browser oeffnen, KEIN Build noetig).
- /nextjs/ - vollstaendiges Next.js-Projektgeruest (App Router, TypeScript Strict, Tailwind, R3F-Hero, Zod-Formulare, alle Sitemap-Seiten). Benoetigt eine Paketinstallation; in der Offline-Umgebung nicht baubar.

## Next.js lokal starten

    cd nextjs
    cp .env.example .env.local
    (Pakete installieren)
    (dev-Server starten -> http://localhost:3000)
    typecheck / lint / build ausfuehren

## 1. Framework-Entscheidung
Next.js (App Router). Mehrere dynamische Formulare, Bewerbungsuploads mit serverseitiger
Dateipruefung, dynamische Routen (projekte/[slug], karriere/[slug]), strukturierte Metadaten,
JobPosting-Schema und eine zentrale R3F-Szene. Server Actions, next/image, next/font und
granulares Client-/Server-Splitting decken das nativ ab. Astro waere nur bei ueberwiegend
statischem Inhalt im Vorteil. Server Components Standard, Client Components nur fuer echte
Interaktionen.

## 2. Installierte Pakete
Basis: next, react, react-dom, typescript, tailwindcss, eslint, prettier, zod, react-hook-form,
@hookform/resolvers, clsx, tailwind-merge. Animation: motion, gsap+ScrollTrigger, lenis.
3D: three, @react-three/fiber, @react-three/drei, @react-three/postprocessing.
Jede Aufgabe nur eine Bibliothek (Motion ODER GSAP pro Element).

## 3-6. Struktur und 3D
Lenis (SmoothScroll.tsx): eine Instanz, GSAP-Sync, reduced-motion-Abbruch, Cleanup.
GSAP (ProcessScroll.tsx): gepinnte Prozesslinie via gsap.context(), revert()-Cleanup, mobil Liste.
Motion (Reveal.tsx, Header-Drawer): UI-Reveals, Menue.
R3F (WeldScene.tsx, Hero3D.tsx): zentrale Szene 'The Perfect Connection'.
3D-Konzept: zwei dunkle Rohrsegmente + gluehende emissive-pulsierende Schweissnaht (prozedural).
Adaptive DPR, AdaptiveDpr, warehouse-Environment. Spaeter 1:1 gegen GLB austauschbar.

## 7. Performance-Fallbacks
3D nur clientseitig (dynamic, ssr:false), Poster-Loading. useDeviceQuality -> high/medium/mobile;
mobil und reduced-motion -> statisches Poster. WebGL-Fehler -> Poster, keine Fehlermeldung.
Hero-Text serverseitig gerendert, unabhaengig vom Canvas.

## 8. Formular-Konfiguration
Server Actions (lib/forms/actions.ts), Zod-Validierung (lib/validation/schemas.ts), Honeypot 'website',
In-Memory Rate-Limit. Bewerbung: nur PDF, max 8 MB. Ohne SMTP liefert mailer.ts Status
'not_configured' - kein vorgetaeuschter Versand.

## 9. Umgebungsvariablen
Siehe .env.example: SMTP_HOST/PORT/USER/PASSWORD, MAIL_FROM, MAIL_TO, RATE_LIMIT_*,
NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_ANALYTICS_ID.

## 10. Fehlende Kundeninhalte
Finale Texte; Bestaetigung der Vertrauenszahlen (50+ Projekte, 15 Partner) - aktuell nur
qualitative Aussagen; Zertifikate/Normen fuer Qualitaet & Sicherheit; offene Stellen (alle
derzeit isOpen:false); WhatsApp + Freigabe; Pruefung Impressum/Datenschutz/AGB.

## 11. Fehlende Bilder
Echte Fotos: Schweissmakros, Mitarbeiter, Rohrleitungs-/Fernwaerme-/Gas-Wasser-/Anlagenbau,
Unimog, Schweissmaschinen, Team, Baustellen, Qualitaetspruefung. Keine KI-Bilder fuer Referenzen.

## 12. Benoetigte 3D-Assets
public/models/pipe-joint.glb (PBR, Draco/Meshopt, KTX2/WebP, klein). Bis dahin prozedurale Szene.

## 13. Unverifizierte Aussagen
Projektzahlen, Partneranzahl, Zertifikatsnamen, alle Referenzen (isPlaceholder:true), Stellen-Status.

## 14. Build / TS / Lint
In der Offline-Umgebung nicht ausfuehrbar. Lokal: typecheck, lint, build. Strict Mode, Server-/
Client-Grenzen gesetzt, Cleanups vorhanden.
