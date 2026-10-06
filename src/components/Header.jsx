import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV } from '../data.jsx';
import useTheme from '../useTheme.js';

export default function Header() {
  const [theme, toggleTheme] = useTheme();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`top${solid ? ' solid' : ''}`}>
      <div className="wrap nav">
        <Link to="/" className="logo">
          <img src="/assets/logo.webp" alt="CTI logo" width="44" height="44" fetchPriority="high" />
          <b>Clothing Trims<small>International</small></b>
        </Link>
        <nav className={`links${open ? ' open' : ''}`} onClick={e => { if (e.target.tagName === 'A') setOpen(false); }}>
          {NAV.map(n => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
          <NavLink to="/contact">Contact us</NavLink>
          <a href="/Company-Profile.pdf" target="_blank" rel="noopener noreferrer" className="cta">Company profile</a>
        </nav>
        <div className="tools">
          <button className="theme" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`${theme === 'dark' ? 'Light' : 'Dark'} mode`}>
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" /></svg>
            )}
          </button>
          <button className={`menu${open ? ' open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <i></i><i></i>
          </button>
        </div>
      </div>
    </header>
  );
}
