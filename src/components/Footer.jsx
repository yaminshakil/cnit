import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ADDRESSES, EMAIL, NAV, PHONE, WHATSAPP } from '../data.jsx';

export function Footer() {
  return (
    <footer>
      <div className="wrap fgrid">
        <div className="fbrand">
          <Link to="/" className="logo">
            <img src="/assets/logo.webp" alt="" width="44" height="44" />
            <b>Clothing Trims<small>International</small></b>
          </Link>
          <p>Premium garment accessories from Dhaka, Bangladesh. Accessories that complete your creation.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            {NAV.map(n => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="/Clothing-Trims-Catalogue.pdf" download>Catalogue (PDF)</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`tel:${PHONE}`}>+880 1713&#8209;490067</a></li>
            <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          </ul>
        </div>
        <div>
          <h4>Visit</h4>
          <ul>
            {ADDRESSES.map(a => <li key={a.name}><b>{a.name}</b><br />{a.lines.join(' ')}</li>)}
          </ul>
        </div>
      </div>
      <div className="wrap fbar">
        <span>© {new Date().getFullYear()} Clothing Trims International</span>
        <span>Accessories that complete your creation</span>
      </div>
    </footer>
  );
}

/** Floating "Contact us" button (desktop): appears after the hero, hidden on the contact page and near the home contact section. */
export function FloatingContact() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const check = () => {
      const top = document.getElementById('contact')?.getBoundingClientRect().top ?? Infinity;
      setShow(window.scrollY > window.innerHeight * 0.8 && top > window.innerHeight * 0.6);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [pathname]);

  if (pathname === '/contact') return null;
  return <Link to="/contact" className={`float${show ? ' show' : ''}`}><i></i>Contact us</Link>;
}

/** Round "back to top" button: appears once the visitor has scrolled a screen or so down. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => setShow(window.scrollY > window.innerHeight);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <button type="button" className={`totop${show ? ' show' : ''}`} aria-label="Back to top" tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}

/** Round WhatsApp chat button, always visible. */
export function WhatsAppButton() {
  return (
    <a className="wa" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello, I would like to enquire about garment trims.')}`}
      target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.200-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.300 3 3 0 0 0-.9 2.200c0 1.300.9 2.500 1 2.700.1.200 1.800 2.800 4.400 3.900 1.600.7 2.300.7 3.100.6.500-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.2-1.200-.1-.1-.3-.2-.5-.3Z"/></svg>
    </a>
  );
}
