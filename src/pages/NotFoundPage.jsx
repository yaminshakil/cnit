import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../usePageTitle.js';

export default function NotFoundPage() {
  usePageTitle('Page not found');
  return (
    <>
      <PageHero crumb="404" eyebrow="Page not found" lead="The page you are looking for has moved or does not exist. Browse our collection or get in touch and we will help.">
        This page is <em>missing.</em>
      </PageHero>
      <CtaBand title="Looking for trims?" text="Explore all nine categories of garment trims and packing materials." to="/collection" label="View collection" />
    </>
  );
}
