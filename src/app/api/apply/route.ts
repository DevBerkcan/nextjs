import { NextResponse } from 'next/server';
import { applicationSchema } from '@/lib/validation/schemas';
import { sendMail } from '@/lib/forms/mailer';

export async function POST(req: Request) {
  const form = await req.formData();

  const parsed = applicationSchema.safeParse({
    name: form.get('name'),
    email: form.get('email'),
    phone: form.get('phone'),
    position: form.get('position'),
    message: form.get('message') ?? '',
    privacy: form.get('privacy') === 'on',
    website: form.get('website') ?? '',
  });
  if (!parsed.success) {
    return NextResponse.json({ ok: false, status: 'error', message: parsed.error.issues[0]?.message ?? 'Bitte Eingaben pruefen.' }, { status: 400 });
  }
  if (parsed.data.website) return NextResponse.json({ ok: true, status: 'success' });

  const file = form.get('cv');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, status: 'error', message: 'Bitte PDF (Lebenslauf) hochladen.' }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ ok: false, status: 'error', message: 'Datei ist zu gross (max. 8 MB).' }, { status: 400 });
  }
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ ok: false, status: 'error', message: 'Nur PDF-Dateien sind erlaubt.' }, { status: 400 });
  }

  const body = `Bewerbung\n\n${JSON.stringify(parsed.data, null, 2)}\n\nDatei: ${file.name} (${Math.round(file.size/1024)} KB)`;
  const res = await sendMail('Bewerbung', body);
  if (res.ok) return NextResponse.json({ ok: true, status: 'success', message: 'Vielen Dank. Wir melden uns.' });
  if (res.reason === 'not_configured') {
    return NextResponse.json({ ok: false, status: 'not_configured', message: 'E-Mail-Versand ist noch nicht konfiguriert (siehe .env.example).' }, { status: 200 });
  }
  return NextResponse.json({ ok: false, status: 'error', message: 'Versand fehlgeschlagen. Bitte per E-Mail bewerben.' }, { status: 500 });
}
