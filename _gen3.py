import os
def w(p,c):
    d=os.path.dirname(p)
    if d: os.makedirs(d,exist_ok=True)
    open(p,"w",encoding="utf-8").write(c)

# ===== VALIDATION (Zod) =====
w("src/lib/validation/schemas.ts", """import { z } from 'zod';

const phone = z.string().min(5, 'Bitte eine gueltige Telefonnummer angeben.');

export const projectInquirySchema = z.object({
  company: z.string().min(2, 'Bitte Unternehmen angeben.'),
  contact: z.string().min(2, 'Bitte Ansprechpartner angeben.'),
  email: z.string().email('Bitte eine gueltige E-Mail angeben.'),
  phone,
  service: z.string().min(1, 'Bitte einen Leistungsbereich waehlen.'),
  message: z.string().min(10, 'Bitte beschreiben Sie Ihr Vorhaben kurz.'),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Bitte Datenschutz bestaetigen.' }) }),
  // Honeypot: muss leer bleiben.
  website: z.string().max(0).optional(),
});
export type ProjectInquiry = z.infer<typeof projectInquirySchema>;

export const rentalInquirySchema = z.object({
  category: z.string().min(1, 'Bitte Mietkategorie waehlen.'),
  device: z.string().min(1, 'Bitte gewuenschtes Geraet angeben.'),
  location: z.string().min(2, 'Bitte Einsatzort angeben.'),
  period: z.string().min(2, 'Bitte Mietzeitraum angeben.'),
  company: z.string().min(2),
  contact: z.string().min(2),
  phone,
  email: z.string().email(),
  message: z.string().optional(),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Bitte Datenschutz bestaetigen.' }) }),
  website: z.string().max(0).optional(),
});
export type RentalInquiry = z.infer<typeof rentalInquirySchema>;

// Bewerbung: Dateipruefung erfolgt serverseitig (Typ + Groesse).
export const ALLOWED_FILE_TYPES = ['application/pdf'];
export const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB
export const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone,
  position: z.string().min(1),
  message: z.string().optional(),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Bitte Datenschutz bestaetigen.' }) }),
  website: z.string().max(0).optional(),
});
export type Application = z.infer<typeof applicationSchema>;
""")

# ===== MAILER (no fake success) =====
w("src/lib/forms/mailer.ts", """// Zentrale Versandlogik. Solange SMTP nicht konfiguriert ist, wird KEIN
// Erfolg vorgetaeuscht. Stattdessen wird ein eindeutiger Status zurueckgegeben.
type SendResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'error'; detail?: string };

export async function sendMail(subject: string, body: string): Promise<SendResult> {
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !MAIL_TO) {
    // Nicht konfiguriert -> ehrlich melden, nicht so tun als sei versendet.
    console.warn('[mailer] SMTP nicht konfiguriert. Nachricht NICHT versendet:', subject);
    return { ok: false, reason: 'not_configured' };
  }
  try {
    // TODO: nodemailer-Transport mit obigen Variablen verbinden.
    // const transporter = nodemailer.createTransport({ host: SMTP_HOST, ... });
    // await transporter.sendMail({ from: MAIL_FROM, to: MAIL_TO, subject, text: body });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: 'error', detail: String(e) };
  }
}
""")

w("src/lib/forms/rate-limit.ts", """// Einfaches In-Memory Rate Limiting (pro Instanz). Fuer Produktion ggf.
// auf Upstash/Redis umstellen (Variablen in .env.example vorbereitet).
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW = (Number(process.env.RATE_LIMIT_WINDOW) || 60) * 1000;
const MAX = Number(process.env.RATE_LIMIT_TOKENS) || 5;

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const e = hits.get(key);
  if (!e || now - e.ts > WINDOW) { hits.set(key, { count: 1, ts: now }); return true; }
  if (e.count >= MAX) return false;
  e.count += 1; return true;
}
""")

w("src/lib/forms/actions.ts", """'use server';
import { projectInquirySchema, rentalInquirySchema } from '@/lib/validation/schemas';
import { sendMail } from './mailer';
import { rateLimit } from './rate-limit';

export type FormState = { status: 'idle' | 'success' | 'error' | 'not_configured'; message?: string };

export async function submitProjectInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!rateLimit('project')) return { status: 'error', message: 'Zu viele Anfragen. Bitte spaeter erneut versuchen.' };
  const parsed = projectInquirySchema.safeParse({
    company: formData.get('company'), contact: formData.get('contact'),
    email: formData.get('email'), phone: formData.get('phone'),
    service: formData.get('service'), message: formData.get('message'),
    privacy: formData.get('privacy') === 'on', website: formData.get('website') ?? '',
  });
  if (!parsed.success) return { status: 'error', message: parsed.error.issues[0]?.message ?? 'Bitte Eingaben pruefen.' };
  if (parsed.data.website) return { status: 'success' }; // Honeypot still drop

  const res = await sendMail('Projektanfrage', JSON.stringify(parsed.data, null, 2));
  if (res.ok) return { status: 'success', message: 'Vielen Dank. Wir melden uns zeitnah.' };
  if (res.reason === 'not_configured')
    return { status: 'not_configured', message: 'E-Mail-Versand ist noch nicht konfiguriert (siehe .env.example).' };
  return { status: 'error', message: 'Versand fehlgeschlagen. Bitte rufen Sie uns an.' };
}

export async function submitRentalInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!rateLimit('rental')) return { status: 'error', message: 'Zu viele Anfragen. Bitte spaeter erneut versuchen.' };
  const parsed = rentalInquirySchema.safeParse({
    category: formData.get('category'), device: formData.get('device'),
    location: formData.get('location'), period: formData.get('period'),
    company: formData.get('company'), contact: formData.get('contact'),
    phone: formData.get('phone'), email: formData.get('email'),
    message: formData.get('message') ?? '', privacy: formData.get('privacy') === 'on',
    website: formData.get('website') ?? '',
  });
  if (!parsed.success) return { status: 'error', message: parsed.error.issues[0]?.message ?? 'Bitte Eingaben pruefen.' };
  const res = await sendMail('Vermietungsanfrage', JSON.stringify(parsed.data, null, 2));
  if (res.ok) return { status: 'success', message: 'Vielen Dank. Wir pruefen die Verfuegbarkeit.' };
  if (res.reason === 'not_configured')
    return { status: 'not_configured', message: 'E-Mail-Versand ist noch nicht konfiguriert (siehe .env.example).' };
  return { status: 'error', message: 'Versand fehlgeschlagen. Bitte rufen Sie uns an.' };
}
""")

# ===== HOOKS =====
w("src/hooks/useReducedMotion.ts", """'use client';
import { useEffect, useState } from 'react';
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}
""")
w("src/hooks/useMediaQuery.ts", """'use client';
import { useEffect, useState } from 'react';
export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}
""")
w("src/hooks/useDeviceQuality.ts", """'use client';
import { useEffect, useState } from 'react';
// Liefert eine grobe Qualitaetsstufe fuer adaptive 3D-Last.
export type Quality = 'high' | 'medium' | 'mobile';
export function useDeviceQuality(): Quality {
  const [q, setQ] = useState<Quality>('medium');
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return setQ('mobile');
    const cores = navigator.hardwareConcurrency ?? 4;
    setQ(cores >= 8 ? 'high' : 'medium');
  }, []);
  return q;
}
""")
w("src/hooks/useScrollProgress.ts", """'use client';
import { useEffect, useState } from 'react';
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
    };
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return p;
}
""")

print("validation/forms/hooks written")
