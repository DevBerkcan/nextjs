'use server';
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
