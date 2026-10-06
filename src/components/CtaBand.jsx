import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function CtaBand({ title, text, to = '/contact', label = 'Contact us' }) {
  return (
    <section className="cta-band">
      <Reveal className="wrap">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link to={to} className="btn solid">{label} <span>→</span></Link>
      </Reveal>
    </section>
  );
}
