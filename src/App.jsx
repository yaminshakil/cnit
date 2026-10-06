import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import FxManager from './components/FxManager.jsx';
import { Footer, FloatingContact, BackToTop, WhatsAppButton } from './components/Footer.jsx';
import Home from './pages/Home.jsx';

// Inner pages are split into their own chunks so the first load only ships the home page.
const CollectionPage = lazy(() => import('./pages/CollectionPage.jsx'));
const PartnersPage = lazy(() => import('./pages/PartnersPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollManager />
      <FxManager />
      <Header />
      <main id="top">
        <Suspense fallback={<div className="route-loading" />}>
          <div className="page" key={pathname}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
      <FloatingContact />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
