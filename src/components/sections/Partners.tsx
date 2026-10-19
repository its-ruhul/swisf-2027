import { ArrowRight, Download, Mail, Phone } from 'lucide-react';
import { partners, partnersPage } from '../../data/partners';
import { site } from '../../data/site';
import { accentText } from '../../lib/accents';
import { cn } from '../../lib/cn';
import { PatternBorder, PeachCloud, PlumBlossom } from '../ornaments/Decor';
import GoldCloud from '../ornaments/GoldCloud';
import { HangingLanterns } from '../ornaments/Lantern';
import Button from '../ui/Button';
import { CardWithIcon } from '../ui/Card';
import DividerLabel from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const enquiryHref = (tier: string) =>
  `mailto:${site.contact.email}?subject=${encodeURIComponent(`SWISF 2027 – ${tier} enquiry`)}`;

/** Brochure page 9: Our Partners. */
export default function Partners() {
  const p = partnersPage;
  return (
    <section aria-labelledby="partners-heading" className="relative overflow-hidden bg-cream">
      {/* hanging red paper lanterns along a string */}
      <HangingLanterns variant="string" className="h-28 sm:h-36 lg:h-44" />
      <GoldCloud variant="b" className="-right-14 top-48 hidden w-72 sm:block lg:top-56" />
      <PeachCloud className="absolute -left-24 top-56 w-72 opacity-60 sm:w-96" />

      <div className="container-x relative pb-20 pt-6 sm:pb-24 lg:pb-28">
        <Reveal>
          <SectionHeading as="h1" id="partners-heading" line1={p.heading.line1} line2={p.heading.line2} />
        </Reveal>

        {/* Co-powered by BSE */}
        <DividerLabel className="mt-14" as="h2">
          {p.coPoweredLabel}
        </DividerLabel>
        <Reveal className="mx-auto mt-8 max-w-md">
          <div className="flex items-center justify-center rounded-2xl border border-line bg-white px-10 py-10 shadow-card">
            <img src={p.coPowered.logo} alt={p.coPowered.name} width={p.coPowered.width} height={p.coPowered.height} loading="lazy" className="h-24 w-auto sm:h-28" />
          </div>
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-center text-lg font-medium leading-snug text-navy sm:text-xl">{p.coPoweredLine}</p>

        <Reveal as="ul" stagger className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {p.contributions.map((item) => (
            <RevealItem as="li" key={item.text} className="group flex flex-col items-center text-center">
              <IconCircle icon={item.icon} accent={item.accent} size="md" fill="white" />
              <p className="mt-4 max-w-[14rem] text-[15px] leading-snug text-ink-muted">{item.text}</p>
            </RevealItem>
          ))}
        </Reveal>

        <hr className="mt-16 border-line" />

        {/* Partner with us */}
        <div id="partner-with-us" className="pt-14">
          <DividerLabel as="h2">{p.partnerLabel}</DividerLabel>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[17px] text-ink-muted">{p.partnerIntro}</p>

          <Reveal as="ul" stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.tiers.map((tier) => (
              <RevealItem as="li" key={tier.title} className="h-full">
                <CardWithIcon icon={tier.icon} accent={tier.accent} title={tier.title} text={tier.text} hoverLift className="h-full">
                  <a
                    href={enquiryHref(tier.title)}
                    className={cn(
                      'mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.16em] underline-offset-4 hover:underline',
                      accentText[tier.accent],
                    )}
                  >
                    {p.enquireLabel}
                    <span className="sr-only"> about the {tier.title}</span>
                    <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </CardWithIcon>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        {/* Collaborate banner */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-2xl bg-navy-deep px-6 py-10 text-cream sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:py-12">
            <span aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-gold/20" />
            <span aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-gold/20" />
            <div className="relative">
              <p className="eyebrow text-saffron-bright">{p.collaborate.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-medium text-cream sm:text-3xl">{p.collaborate.title}</h2>
              <Button href={site.brochurePdf} download variant="light" icon={Download} iconPosition="left" className="mt-7">
                {p.collaborate.download}
              </Button>
            </div>
            <ul className="relative mt-8 space-y-2 lg:mt-0">
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex min-h-[44px] items-center gap-3 text-[15px] text-cream hover:text-gold-soft sm:text-base">
                  <Mail size={20} strokeWidth={1.5} className="shrink-0 text-saffron-bright" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="flex min-h-[44px] items-center gap-3 text-[15px] text-cream hover:text-gold-soft sm:text-base">
                  <Phone size={20} strokeWidth={1.5} className="shrink-0 text-saffron-bright" aria-hidden="true" />
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Logo wall — appears automatically once partners are added in data/partners.ts */}
        {partners.length > 0 && (
          <div className="mt-20">
            <DividerLabel as="h2">{p.logoWallTitle}</DividerLabel>
            <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {partners.map((partner) => {
                const logo = (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-16 w-auto grayscale transition duration-300 group-hover:grayscale-0"
                  />
                );
                return (
                  <li key={partner.name} className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-6 text-center shadow-card">
                    {partner.url ? (
                      <a href={partner.url} target="_blank" rel="noopener noreferrer" className="flex h-20 items-center justify-center">
                        {logo}
                      </a>
                    ) : (
                      <span className="flex h-20 items-center justify-center">{logo}</span>
                    )}
                    {partner.tier && <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">{partner.tier}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* bottom: plum blossoms in both corners + small pattern border */}
      <div className="relative h-28 sm:h-36">
        <PlumBlossom className="absolute bottom-5 left-0 w-44 sm:w-60" />
        <PlumBlossom flip className="absolute bottom-5 right-0 w-44 sm:w-60" />
      </div>
      <PatternBorder />
    </section>
  );
}
