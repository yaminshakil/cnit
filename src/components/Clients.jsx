import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function Clients() {
  return (
    <section id="clients" className="clients">
      <div className="wrap two">
        <div>
          <Reveal className="label">Buying partners</Reveal>
          <Reveal as="h2" delay={1}>Trusted by the world's <em>leading brands.</em></Reveal>
          <Reveal as="p" delay={2} className="lead">Renowned as a nominated trims supplier for several global brands, noted for strong client relationships and sustainability efforts.</Reveal>
          <Reveal className="more-l"><Link to="/partners" className="btn line">Our partners <span>→</span></Link></Reveal>
        </div>
        <Reveal className="logos">
          <img src="/assets/clients-logos.webp" alt="Buying partners: C&A, G-Star Raw, Aldi, Primark, Inditex, Scanwear, Tesco, Carrefour" loading="lazy" />
          <div className="std"><small>Complied standards</small><img src="/assets/standards.webp" alt="Confidence in Textiles and FSC certifications" loading="lazy" /></div>
        </Reveal>
      </div>
      <div className="wrap">
        <Reveal className="bank">
          <img src="/assets/bank-coins.webp" alt="" loading="lazy" />
          <div><small>Banking &amp; finance partner</small><h3>Dhaka Bank</h3><p>Sonargaon Janapath, Dhaka</p></div>
        </Reveal>
      </div>
    </section>
  );
}
