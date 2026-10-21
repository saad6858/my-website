'use client';
import {useState} from 'react';

export function ContactForm() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'Could not send enquiry.');
      setStatus('Thanks — your enquiry has been received.');
      form.reset();
    } catch (err) {
      setStatus(
        err instanceof Error
          ? err.message
          : 'Unable to send right now. Please use LinkedIn instead.'
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" method="post" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Name
          <input name="name" required maxLength={100} autoComplete="name" />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
          />
        </label>
      </div>
      <label>
        Business type
        <input
          name="businessType"
          maxLength={120}
          placeholder="e.g. dental clinic, agency, small business"
        />
      </label>
      <label>
        Service of interest
        <select name="service" defaultValue="">
          <option value="">Choose an area</option>
          <option>AI chatbot or virtual assistant</option>
          <option>Workflow automation</option>
          <option>Appointment and reminder workflows</option>
          <option>Customer support automation</option>
          <option>Custom AI agents or RAG</option>
          <option>AI consulting</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label>
        What are you exploring?
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder="A little about the workflow, problem or idea…"
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="form-note">
        Please do not submit patient information, health data, passwords,
        credentials or other sensitive information through this form.
      </p>
      <button className="button button-primary" disabled={busy}>
        {busy ? 'Sending…' : 'Send enquiry'} ↗
      </button>
      {status && (
        <p role="status" className="form-status">
          {status}
        </p>
      )}
    </form>
  );
}
