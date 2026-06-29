import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/validation/schemas';

export type UploadCheck = { ok: true } | { ok: false; message: string };

export async function validatePdfUpload(file: File): Promise<UploadCheck> {
  if (!file) return { ok: false, message: 'Bitte eine Datei auswaehlen.' };
  if (file.size > MAX_FILE_SIZE) return { ok: false, message: 'Datei ist zu gross (max. 8 MB).' };
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return { ok: false, message: 'Nur PDF-Dateien sind erlaubt.' };
  return { ok: true };
}
