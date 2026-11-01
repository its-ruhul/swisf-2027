import PageShell from '../components/layout/PageShell';
import MascotsHero from '../components/sections/MascotsHero';
import MascotsTogether from '../components/sections/MascotsTogether';
import MeetRay from '../components/sections/MeetRay';
import MeetSun from '../components/sections/MeetSun';
import { seo } from '../data/site';

/** /mascots — Sun, Ray and what they are together. */
export default function Mascots() {
  return (
    <PageShell title={seo.mascots.title} description={seo.mascots.description}>
      <MascotsHero />
      <MeetSun />
      <MeetRay />
      <MascotsTogether />
    </PageShell>
  );
}
