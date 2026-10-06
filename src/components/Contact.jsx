import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { ADDRESSES, EMAIL, PHONE, WHATSAPP } from '../data.jsx';

// Handled by public/api/enquiry.php (PHP on Hostinger): it emails the team and sends the visitor a confirmation.
const ENDPOINT = '/api/enquiry.php';

export default function Contact({ page = false }) {
  const product = useSearchParams()[0].get('product');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function sendEnquiry(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: d.get('name'),
          company: d.get('company'),
          email: d.get('email'),
          message: d.get('msg'),
          website: d.get('website'),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="cwrap">
          <div>
            <Reveal className="label">Contact us</Reveal>
            <Reveal as="h2" delay={1}>Let's finish your next <em>collection.</em></Reveal>
            <Reveal as="p" delay={2} className="lead">Request samples, a quotation or a catalogue. Speak directly with our Managing Director — we reply promptly.</Reveal>
            <Reveal className="direct">
              <a href={`tel:${PHONE}`}><small>Call the Managing Director</small><b>+880 1713&#8209;490067</b></a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"><small>WhatsApp</small><b>Chat with us</b></a>
              <a href={`mailto:${EMAIL}`}><small>Email</small><b>{EMAIL}</b></a>
            </Reveal>
          </div>
          <Reveal as="form" delay={1} className="form" onSubmit={sendEnquiry}>
            <h3>Send an enquiry</h3>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
            <label>Your name<input name="name" required autoComplete="name" /></label>
            <label>Company<input name="company" autoComplete="organization" /></label>
            <label>Email<input name="email" type="email" required autoComplete="email" /></label>
            <label>Which trims do you need?<textarea name="msg" rows="4" required defaultValue={product ? `I would like a quotation for: ${product}` : ''}></textarea></label>
            <button className="btn solid" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <>Send enquiry <span>→</span></>}
            </button>
            <p className="note" role="status">
              {status === 'sent' && 'Thank you — your enquiry has been sent. A confirmation is on its way to your inbox, and we will reply shortly.'}
              {status === 'error' && <>Sorry, something went wrong. Please email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</>}
              {(status === 'idle' || status === 'sending') && 'We reply promptly to every enquiry.'}
            </p>
          </Reveal>
        </div>
        {!page && (
          <Reveal className="addr">
            {ADDRESSES.map(a => <div key={a.name}><small>{a.name}</small><p>{a.lines[0]}<br />{a.lines[1]}</p></div>)}
          </Reveal>
        )}
      </div>
    </section>
  );
}
