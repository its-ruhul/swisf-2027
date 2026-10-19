import PageShell from '../components/layout/PageShell';
import Partners from '../components/sections/Partners';
import { seo } from '../data/site';

/** /sponsors — co-powered by BSE, partnership tiers and the partner logo wall. */
export default function Sponsors() {
  return (
    <PageShell title={seo.sponsors.title} description={seo.sponsors.description}>
      <Partners />
    </PageShell>
  );
}
