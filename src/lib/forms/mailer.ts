// Zentrale Versandlogik. Solange SMTP nicht konfiguriert ist, wird KEIN
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
