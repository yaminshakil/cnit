import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { VM, VALUES } from '../data.jsx';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="wrap">
        <Reveal as="figure" className="photo">
          <img src="/assets/factory.webp" alt="Clothing Trims International factory" loading="lazy" />
          <figcaption>Our factory · Uttarkhan, Dhaka</figcaption>
        </Reveal>
        <div>
          <Reveal className="label">About us</Reveal>
          <Reveal as="h2" delay={1}>The finishing touch that sets garments <em>apart.</em></Reveal>
          <Reveal as="p" delay={2} className="lead">Backed by years of experience and advanced manufacturing partnerships, Clothing Trims International is renowned as a nominated trims supplier for several global brands — noted for strong client relationships and a genuine commitment to sustainability.</Reveal>
          <Reveal className="vm">
            {VM.map(([n, title, text]) => (
              <article key={n}><i>{n}</i><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </Reveal>
          <Reveal className="more-l"><Link to="/about" className="btn line">Our story <span>→</span></Link></Reveal>
        </div>
      </div>

      <div className="wrap pl">
        <Reveal className="pl-head"><div className="label">Our values</div></Reveal>
        <div className="pl-grid">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i % 3} className="pl-item">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{v.icon}</svg>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
