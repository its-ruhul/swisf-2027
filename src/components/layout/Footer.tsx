import { CalendarDays, Download, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import bseLogo from '../../assets/logos/bse-logo.webp';
import ecellCrest from '../../assets/logos/ecell-crest.webp';
import { navLinks, partnerCta, site } from '../../data/site';
import type { Accent } from '../../lib/accents';
import CircuitTraces from '../ornaments/CircuitTraces';
import SkylineStrip from '../ornaments/SkylineStrip';
import Eyebrow from '../ui/Eyebrow';
import IconCircle from '../ui/IconCircle';
import Motto from '../ui/Motto';
import SectionHeading from '../ui/SectionHeading';
import SocialLinks from '../ui/SocialLinks';
import SunrayLockup from '../ui/SunrayLockup';

const contactRows: { icon: typeof CalendarDays; accent: Accent; label: string; value: string; href?: string }[] = [
  { icon: CalendarDays, accent: 'royal', label: 'Dates', value: site.dates.full },
  { icon: MapPin, accent: 'saffron', label: 'Venue', value: site.location.full },
  { icon: Phone, accent: 'teal', label: 'Phone', value: site.contact.phone, href: site.contact.phoneHref },
  { icon: Mail, accent: 'violet', label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
];

/** "See You in Shillong" — contacts, socials, organisers and quick links on every page. */
export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="relative overflow-hidden bg-navy-deep text-cream">
      {/* gold line-art skyline along the top edge */}
      <SkylineStrip tone="gold" reflection={false} className="absolute inset-x-0 top-0 mx-auto max-w-[1100px] opacity-[0.13]" />
      {/* circuit traces in the top-right and bottom-left corners */}
      <CircuitTraces flip="x" density="light" className="absolute -right-6 top-0 w-36 opacity-50 sm:w-48" />
      <CircuitTraces flip="xy" density="light" className="absolute -left-6 bottom-0 hidden w-40 opacity-30 md:block" />

      <div className="container-x relative pb-10 pt-28 sm:pt-36 md:pt-44 lg:pt-[216px]">
        {/* Top row: heading + SUNRAY lockup */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <SectionHeading as="h2" id="footer-heading" line1="See you" line2="in Shillong" tone="dark" />
          <SunrayLockup tone="dark" className="self-start md:self-auto" />
        </div>

        {/* Middle: contacts | organisers | quick links */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="sr-only">Contact</h3>
            <ul className="space-y-4">
              {contactRows.map((row) => (
                <li key={row.label} className="flex items-center gap-4">
                  <IconCircle icon={row.icon} accent={row.accent} size="xs" tone="dark" interactive={false} />
                  <span className="min-w-0">
                    <span className="sr-only">{row.label}: </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="inline-flex min-h-[44px] items-center break-all text-[15px] text-cream/90 underline-offset-4 hover:text-gold-soft hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-[15px] text-cream/90">{row.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <div className="flex items-center gap-4">
                <Eyebrow as="h3" tone="cream">
                  Follow us
                </Eyebrow>
                <span aria-hidden="true" className="h-px w-10 bg-gold" />
              </div>
              <SocialLinks tone="dark" className="mt-4" />
              <p className="mt-3 text-sm text-cream/70">@{site.socials.instagram.handle}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gold/45 bg-white/[0.04] p-6 sm:p-7">
              <h3 className="eyebrow text-saffron-bright">{site.organiser.eyebrow}</h3>
              <p className="mt-3 text-lg font-bold text-cream">{site.organiser.name}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/80">{site.organiser.text}</p>
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <Eyebrow as="h3" tone="gold">
              Quick links
            </Eyebrow>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 lg:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-[44px] items-center text-[15px] text-cream/85 underline-offset-4 transition hover:text-gold-soft hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={partnerCta.to}
                  className="inline-flex min-h-[44px] items-center text-[15px] text-saffron-bright underline-offset-4 hover:underline"
                >
                  {partnerCta.label}
                </Link>
              </li>
              <li>
                <a
                  href={site.brochurePdf}
                  download
                  className="inline-flex min-h-[44px] items-center gap-2 text-[15px] text-cream/85 underline-offset-4 hover:text-gold-soft hover:underline"
                >
                  <Download size={16} strokeWidth={1.6} aria-hidden="true" /> Brochure (PDF)
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar: organised by | co-powered by | motto */}
        <div className="mt-14 flex flex-col gap-10 border-t border-gold/25 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
            <div className="flex items-center gap-4">
              <img src={ecellCrest} alt="E-Cell NIT Meghalaya crest" width={320} height={255} loading="lazy" className="h-14 w-auto" />
              <div>
                <p className="eyebrow text-[11px] text-saffron-bright">Organised by</p>
                <p className="mt-1 font-bold text-cream">E-Cell, NIT Meghalaya</p>
              </div>
            </div>
            <span aria-hidden="true" className="hidden h-14 w-px bg-gold/50 sm:block" />
            <div>
              <p className="eyebrow text-[11px] text-saffron-bright">Co-powered by</p>
              <span className="mt-2 inline-flex rounded-lg bg-cream px-3 py-1.5">
                <img src={bseLogo} alt="BSE — Bombay Stock Exchange" width={450} height={246} loading="lazy" className="h-9 w-auto" />
              </span>
            </div>
          </div>
          <Motto orientation="vertical" compact align="end" />
        </div>

        <p className="mt-10 text-center text-xs text-cream/60 md:text-left">{site.copyright}</p>
      </div>
    </footer>
  );
}
