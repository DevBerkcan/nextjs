'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { submitRentalInquiry, type FormState } from '@/lib/forms/actions';
import { inputCls, labelCls } from './FieldStyles';

const initial: FormState = { status: 'idle' };
function SubmitBtn() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="rounded-sm bg-kc-red px-5 py-3 text-sm font-semibold text-white hover:bg-kc-red-light disabled:opacity-60">{pending ? 'Wird gesendet...' : 'Vermietungsanfrage senden'}</button>;
}
export function RentalForm() {
  const [state, action] = useFormState(submitRentalInquiry, initial);
  return (
    <form action={action} className="grid gap-3.5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-3.5 md:grid-cols-2">
        <div><label className={labelCls} htmlFor="category">Mietkategorie</label>
          <select id="category" name="category" className={inputCls}><option>Fahrzeug / Unimog</option><option>Schweissmaschine</option><option>Sonstige Technik</option></select></div>
        <div><label className={labelCls} htmlFor="device">Gewuenschtes Geraet</label><input id="device" name="device" className={inputCls} required /></div>
      </div>
      <div className="grid gap-3.5 md:grid-cols-2">
        <div><label className={labelCls} htmlFor="location">Einsatzort</label><input id="location" name="location" className={inputCls} required /></div>
        <div><label className={labelCls} htmlFor="period">Mietzeitraum</label><input id="period" name="period" className={inputCls} required /></div>
      </div>
      <div className="grid gap-3.5 md:grid-cols-2">
        <div><label className={labelCls} htmlFor="company">Unternehmen</label><input id="company" name="company" className={inputCls} required /></div>
        <div><label className={labelCls} htmlFor="contact">Ansprechpartner</label><input id="contact" name="contact" className={inputCls} required /></div>
      </div>
      <div className="grid gap-3.5 md:grid-cols-2">
        <div><label className={labelCls} htmlFor="phone">Telefon</label><input id="phone" type="tel" name="phone" className={inputCls} required /></div>
        <div><label className={labelCls} htmlFor="email">E-Mail</label><input id="email" type="email" name="email" className={inputCls} required /></div>
      </div>
      <div><label className={labelCls} htmlFor="message">Nachricht</label><textarea id="message" name="message" rows={3} className={inputCls} /></div>
      <label className="flex items-start gap-2 text-sm text-steel-grey"><input type="checkbox" name="privacy" required /> Ich habe die Datenschutzhinweise gelesen.</label>
      <SubmitBtn />
      {state.status !== 'idle' && <p className={`text-sm ${state.status === 'success' ? 'text-kc-red-light' : 'text-steel-light'}`} role="status">{state.message}</p>}
    </form>
  );
}
