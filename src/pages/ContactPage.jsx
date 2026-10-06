import PageHero from '../components/PageHero.jsx';
import Contact from '../components/Contact.jsx';
import Locations from '../components/Locations.jsx';
import Reveal from '../components/Reveal.jsx';
import usePageTitle from '../usePageTitle.js';

export default function ContactPage() {
  usePageTitle('Contact us', 'Request samples, a quotation or a catalogue from Clothing Trims International. Call, WhatsApp or email our Managing Director in Dhaka, Bangladesh.');
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact us"
        lead="Request samples, a quotation or a catalogue. Call or email our Managing Director directly, or send an enquiry below."
        image="/assets/contact-trims.webp"
        caption="Trims & threads"
      >
        Let's finish your next <em>collection.</em>
      </PageHero>
      <Contact page />
      <section className="block alt">
        <div className="wrap">
          <Reveal className="label">Visit us</Reveal>
          <Reveal as="h2" delay={1}>Head office &amp; <em>factory.</em></Reveal>
          <Locations />
        </div>
      </section>
    </>
  );
}
