import PageShell from '../components/layout/PageShell';
import AboutSwisf from '../components/sections/AboutSwisf';
import Hero from '../components/sections/Hero';
import HomeCta from '../components/sections/HomeCta';
import Welcome from '../components/sections/Welcome';
import WhyNortheast from '../components/sections/WhyNortheast';
import { seo, site, SITE_URL } from '../data/site';

/** schema.org Event — dates are provisional until announced. */
const EVENT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${site.name} (${site.shortName})`,
  description: seo.home.description,
  startDate: '2027-04',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: [`${SITE_URL}/og-image.jpg`],
  url: `${SITE_URL}/`,
  location: {
    '@type': 'Place',
    name: 'Shillong',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Shillong',
      addressRegion: 'Meghalaya',
      addressCountry: 'IN',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'E-Cell, NIT Meghalaya',
    email: site.contact.email,
    telephone: site.contact.phone,
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <PageShell title={seo.home.title} description={seo.home.description} jsonLd={EVENT_JSON_LD}>
      <Hero />
      <Welcome />
      <AboutSwisf />
      <WhyNortheast />
      <HomeCta />
    </PageShell>
  );
}
