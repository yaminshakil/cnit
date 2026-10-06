import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../usePageTitle.js';
import { BRANDS } from '../data.jsx';

const WHY = [
  ['01', 'Timely delivery', 'Consistent supply you can plan your production around, so your lines are never kept waiting.'],
  ['02', 'Competitive pricing', 'Honest, transparent pricing across the full trims package, without compromising on quality.'],
  ['03', 'Uncompromising quality', 'Every trim inspected to the exacting standards of the global fashion industry.'],
];

export default function PartnersPage() {
  usePageTitle('Partners', 'Nominated trims supplier to global brands including C&A, G-Star Raw, Aldi, Primark, Inditex, Tesco and Carrefour, with a commitment to sustainability.');
  return (
    <>
      <PageHero
        crumb="Partners"
        eyebrow="Buying partners"
        lead="We are a nominated trims supplier for several global brands, noted for strong client relationships and a genuine commitment to sustainability."
        image="/assets/bank-coins.webp"
        caption="Built to last"
      >
        Trusted by the world's <em>leading brands.</em>
      </PageHero>

      <section className="block">
        <div className="wrap twocol">
          <div>
            <Reveal className="label">Nominated supplier</Reveal>
            <Reveal as="h2" delay={1}>Chosen by the brands <em>you know.</em></Reveal>
            <Reveal as="p" delay={2} className="body">
              When a global brand nominates a trims supplier, it names us as the source for the labels, threads, elastics and packaging used across its garment factories. It is a statement of trust that comes from consistent quality and delivery.
            </Reveal>
            <Reveal className="brands">
              {BRANDS.map(b => <span key={b}>{b}</span>)}
            </Reveal>
          </div>
          <Reveal delay={1} className="darkpanel">
            <img src="/assets/clients-logos.webp" alt={`Buying partners: ${BRANDS.join(', ')}`} />
          </Reveal>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <Reveal className="label">Why brands choose us</Reveal>
          <Reveal as="h2" delay={1}>Three promises, <em>kept.</em></Reveal>
          <div className="trio">
            {WHY.map(([n, t, p], i) => (
              <Reveal key={n} delay={i} className="t">
                <i>{n}</i><h3>{t}</h3><p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap twocol">
          <Reveal className="darkpanel">
            <img src="/assets/standards.webp" alt="Confidence in Textiles and FSC certifications" />
          </Reveal>
          <div>
            <Reveal className="label">Complied standards</Reveal>
            <Reveal as="h2" delay={1}>Responsible by <em>design.</em></Reveal>
            <Reveal delay={2} className="stds">
              <div>
                <h3>Confidence in Textiles</h3>
                <p>A label showing that textile products have been tested for harmful substances, giving buyers and wearers added assurance.</p>
              </div>
              <div>
                <h3>FSC</h3>
                <p>Forest Stewardship Council certification, relevant to the paper and board we supply for hang tags, labels and cartons.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap twocol">
          <div>
            <Reveal className="label">Banking &amp; finance partner</Reveal>
            <Reveal as="h2" delay={1}>Dhaka <em>Bank.</em></Reveal>
            <Reveal as="p" delay={2} className="body">Our banking and finance partner, based at Sonargaon Janapath, Dhaka.</Reveal>
          </div>
          <Reveal delay={1} className="bankimg">
            <img src="/assets/bank-coins.webp" alt="" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Become our next partner."
        text="Request samples, a quotation or a catalogue and speak directly with our Managing Director."
      />
    </>
  );
}
