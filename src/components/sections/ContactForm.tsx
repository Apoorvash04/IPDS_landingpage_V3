'use client';

import { useState, type FormEvent } from 'react';
import { services, site } from '@/lib/site';
import ArrowButton from '@/components/ui/ArrowButton';

/**
 * Enquiry form. For now it opens the visitor's email app with the message prefilled.
 * To deliver submissions directly, replace the mailto block with a fetch() to an API route / server action.
 */
export default function ContactForm() {
  const [note, setNote] = useState<{ text: string; error?: boolean } | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? '').trim();
    if (!get('name') || !get('phone')) {
      setNote({ text: 'Please add your name and phone number.', error: true });
      return;
    }
    const body = `Name: ${get('name')}\nPhone: ${get('phone')}\nEmail: ${get('email')}\nService: ${get('service')}\n\n${get('message')}`;
    location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${get('service')}`)}&body=${encodeURIComponent(body)}`;
    setNote({ text: 'Opening your email app… or reach us instantly on WhatsApp.' });
  };

  return (
    <form onSubmit={onSubmit} noValidate data-up aria-label="Enquiry form">
      <div className="f"><input id="f1" name="name" placeholder=" " autoComplete="name" required /><label htmlFor="f1">Your name</label><span className="ln" /></div>
      <div className="f"><input id="f2" name="phone" type="tel" placeholder=" " autoComplete="tel" required /><label htmlFor="f2">Phone</label><span className="ln" /></div>
      <div className="f full"><input id="f3" name="email" type="email" placeholder=" " autoComplete="email" /><label htmlFor="f3">Email (optional)</label><span className="ln" /></div>
      <div className="f full">
        <select id="f4" name="service" defaultValue={services[0].title}>
          {services.map((s) => <option key={s.id}>{s.title}</option>)}
          <option>Something else</option>
        </select>
        <label htmlFor="f4">Interested in</label><span className="ln" />
      </div>
      <div className="f full"><textarea id="f5" name="message" placeholder=" " /><label htmlFor="f5">Tell us about your project</label><span className="ln" /></div>
      <ArrowButton type="submit">Send message</ArrowButton>
      <p className="note" aria-live="polite" style={note?.error ? { color: 'var(--brand-2)' } : undefined}>{note?.text}</p>
    </form>
  );
}
