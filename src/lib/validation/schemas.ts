import { z } from 'zod';

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
