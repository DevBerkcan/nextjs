'use client';

import { useState } from 'react';
import { inputCls, labelCls } from './FieldStyles';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'not_configured';

export function ApplicationForm({ positionDefault = '' }: { positionDefault?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: fd });
      const json = await res.json();
      if (json.status === 'success') {
        setStatus('success');
        setMessage(json.message ?? 'Vielen Dank. Wir melden uns.');
        form.reset();
        return;
      }
      if (json.status === 'not_configured') {
        setStatus('not_configured');
        setMessage(json.message);
        return;
      }
      setStatus('error');
      setMessage(json.message ?? 'Bitte Eingaben pruefen.');
    } catch {
      setStatus('error');
      setMessage('Unerwarteter Fehler. Bitte erneut versuchen.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3.5" encType="multipart/form-data">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div>
        <label className={labelCls} htmlFor="position">Position</label>
        <input id="position" name="position" className={inputCls} defaultValue={positionDefault} required />
      </div>
      <div className="grid gap-3.5 md:grid-cols-2">
        <div><label className={labelCls} htmlFor="name">Name</label><input id="name" name="name" className={inputCls} required /></div>
        <div><label className={labelCls} htmlFor="phone">Telefon</label><input id="phone" type="tel" name="phone" className={inputCls} required /></div>
      </div>
      <div><label className={labelCls} htmlFor="email">E-Mail</label><input id="email" type="email" name="email" className={inputCls} required /></div>
      <div>
        <label className={labelCls} htmlFor="cv">Lebenslauf (PDF, max. 8 MB)</label>
        <input id="cv" type="file" name="cv" accept="application/pdf" className="w-full rounded-sm border border-steel-dark bg-carbon px-3.5 py-3 text-sm text-white file:mr-3 file:rounded-sm file:border-0 file:bg-graphite file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white" required />
      </div>
      <div><label className={labelCls} htmlFor="message">Nachricht (optional)</label><textarea id="message" name="message" rows={3} className={inputCls} /></div>
      <label className="flex items-start gap-2 text-sm text-steel-grey"><input type="checkbox" name="privacy" required /> Ich habe die Datenschutzhinweise gelesen.</label>
      <button type="submit" disabled={status === 'sending'} className="rounded-sm bg-kc-red px-5 py-3 text-sm font-semibold text-white hover:bg-kc-red-light disabled:opacity-60">
        {status === 'sending' ? 'Wird gesendet...' : 'Bewerbung senden'}
      </button>
      {status !== 'idle' && (
        <p className={`text-sm ${status === 'success' ? 'text-kc-red-light' : 'text-steel-light'}`} role="status">{message}</p>
      )}
    </form>
  );
}
