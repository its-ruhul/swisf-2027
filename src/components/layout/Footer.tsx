import type { ReactNode } from 'react';
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react';
import bseLogo from '../../assets/logos/bse-logo.webp';
import ecellCrest from '../../assets/logos/ecell-crest.webp';
import { site } from '../../data/site';
import type { Accent } from '../../lib/accents';
import CircuitTraces from '../ornaments/CircuitTraces';
import Eyebrow from '../ui/Eyebrow';
import IconCircle from '../ui/IconCircle';
import Motto from '../ui/Motto';
import SocialLinks from '../ui/SocialLinks';

const contactRows: { icon: typeof CalendarDays; accent: Accent; label: string; value: string; href?: string }[] = [
  { icon: CalendarDays, accent: 'royal', label: 'Dates', value: site.dates.full },
  { icon: MapPin, accent: 'saffron', label: 'Venue', value: site.location.full },
  { icon: Phone, accent: 'teal', label: 'Phone', value: site.contact.phone, href: site.contact.phoneHref },
  { icon: Mail, accent: 'violet', label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
];

type PartnerMarkProps = { logo: ReactNode; label: string; name: string };

/** Logo on the left, label and name beside it. The logo slot has a fixed width so both names line up. */
function PartnerMark({ logo, label, name }: PartnerMarkProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-14 w-[88px] shrink-0 items-center">{logo}</span>
      <div className="min-w-0">
        <p className="eyebrow text-[11px] text-saffron-bright">{label}</p>
        <p className="mt-1 font-bold text-cream">{name}</p>
      </div>
    </div>
  );
}

/** "See You in Shillong" — contacts, organisers and socials on every page. */
export default function Footer() {
  return (
    <footer aria-label="Site footer" className="relative overflow-hidden bg-navy-deep text-cream">
      {/* Bottom-left corner circuit traces (wide screens only, where they clear the crest and the motto) */}
      <CircuitTraces flip="xy" density="light" className="absolute -left-6 bottom-0 hidden w-28 opacity-30 xl:block 2xl:w-40" />

      <div className="container-x relative pb-10 pt-10 md:pt-12">
        {/* Main row: contacts | organisers | follow us (phones: stacked; tablets: contacts + follow us, organisers below) */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4">
            <h3 className="sr-only">Contact</h3>
            <ul className="space-y-3">
              {contactRows.map((row) => (
                <li key={row.label} className="flex min-h-[44px] items-center gap-4">
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
          </div>

          <div className="md:order-last md:col-span-2 lg:order-none lg:col-span-5">
            <div className="rounded-2xl border border-gold/45 bg-white/[0.04] p-6 sm:p-7">
              <h3 className="eyebrow text-saffron-bright">{site.organiser.eyebrow}</h3>
              <p className="mt-3 text-lg font-bold text-cream">{site.organiser.name}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/80">{site.organiser.text}</p>
            </div>
          </div>

          <div className="md:justify-self-end lg:col-span-3">
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

        {/* Partners: organised by | co-organised by — logo left, label and name beside it */}
        <div className="mt-10 flex flex-col gap-6 border-t border-gold/25 pt-8 sm:mt-12 sm:flex-row sm:items-center sm:gap-10 sm:pt-10">
          
          <PartnerMark
            label="co-organised by"
            name="Bombay Stock Exchange"
            logo={
              <span className="flex h-12 w-full items-center justify-center rounded-lg bg-cream px-2">
                <img src={bseLogo} alt="BSE logo" width={450} height={246} loading="lazy" className="h-9 w-auto" />
              </span>
            }
          />
          <span aria-hidden="true" className="hidden h-14 w-px bg-gold/50 sm:block" />
          <PartnerMark
            label="co-organisd by"
            name="E-Cell, NIT Meghalaya"
            logo={<img src={ecellCrest} alt="E-Cell NIT Meghalaya crest" width={320} height={255} loading="lazy" className="h-14 w-auto" />}
          />
          
        </div>

        {/* Bottom row: copyright | motto (phones: motto above the copyright) */}
        <div className="mt-8 flex flex-col gap-4 border-t border-gold/15 pt-6 lg:flex-row-reverse lg:items-center lg:justify-between">
          <Motto orientation="horizontal" compact align="start" />
          <p className="text-xs text-cream/60">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
