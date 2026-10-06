import { Hero, Marquee } from '../components/Hero.jsx';
import Products from '../components/Products.jsx';
import Clients from '../components/Clients.jsx';
import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';
import usePageTitle from '../usePageTitle.js';

export default function Home() {
  usePageTitle('');
  return (
    <>
      <Hero />
      <Marquee />
      <Products />
      <Clients />
      <About />
      <Contact />
    </>
  );
}
