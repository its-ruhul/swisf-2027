import { Download, Handshake, Mail, Phone } from 'lucide-react';
import { partners, partnersPage } from '../../data/partners';
import { site } from '../../data/site';
import { PatternBorder, PeachCloud, PlumBlossom } from '../ornaments/Decor';
import GoldCloud from '../ornaments/GoldCloud';
import { HangingLanterns } from '../ornaments/Lantern';
import { FallingPetals, GoldDust } from '../ornaments/Particles';
import Seigaiha from '../ornaments/Seigaiha';
import StarField from '../ornaments/StarField';
import Button from '../ui/Button';
import DividerLabel from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import Seal, { MotifWatermark } from '../ui/Seal';
import SectionHeading from '../ui/SectionHeading';

/** Our Partners: co-organised by BSE, partner categories (coming soon), collaborate banner and logo wall. */
export default function Partners() {
  const p = partnersPage;
  return (
    <section aria-labelledby="partners-heading" className="relative overflow-hidden bg-cream">
      <Seigaiha background="#FAF6EE" className="opacity-25" />
      {/* hanging red paper lanterns along a string */}
      <HangingLanterns variant="string" className="relative h-24 sm:h-28 lg:h-32" />
      <GoldCloud variant="b" className="-right-14 top-40 hidden w-72 sm:block" />
      <PeachCloud className="absolute -left-24 top-56 w-72 opacity-60 sm:w-96" />
      <MotifWatermark motif="knot" className="left-[2%] top-[30%] hidden w-[clamp(7rem,17vh,11rem)] text-crimson/[0.08] xl:block" />
      <FallingPetals count={12} seed={17} />

      <div className="container-x relative pb-16 pt-4 sm:pb-20">
        <Reveal className="flex items-end justify-center gap-5">
          <SectionHeading as="h1" id="partners-heading" align="center" line1={p.heading.line1} line2={p.heading.line2} />
          <Seal motif="knot" meaning="Partnership" size="md" className="mb-1" />
        </Reveal>

        {/* co-organised by BSE */}
        <DividerLabel className="mt-12" as="h2">
          {p.coPoweredLabel}
        </DividerLabel>
        <Reveal className="mx-auto mt-8 max-w-lg">
          <div className="group relative rounded-[22px] bg-gradient-to-br from-gold-soft via-gold to-saffron p-[1.5px] shadow-lift">
            <div className="relative flex flex-col items-center overflow-hidden rounded-[21px] bg-white px-10 py-10">
              <span aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-[16px] border border-gold/30" />
              {/* a sweep of light across the card on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[320%]"
              />
              <img src={p.coPowered.logo} alt={p.coPowered.name} width={p.coPowered.width} height={p.coPowered.height} loading="lazy" className="relative h-24 w-auto sm:h-28" />
              <p className="eyebrow relative mt-5 text-[11px] text-gold-ink">Bombay Stock Exchange</p>
            </div>
          </div>
        </Reveal>
        <p className="mx-auto mt-7 max-w-2xl text-center text-lg font-medium leading-snug text-navy sm:text-xl">{p.coPoweredLine}</p>

        {/* Partner with us */}
        <div id="partner-with-us" className="pt-16">
          <DividerLabel as="h2">{p.partnerLabel}</DividerLabel>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[17px] text-ink-muted">{p.partnerIntro}</p>

          <Reveal as="ul" stagger className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {p.tiers.map((tier) => (
              <RevealItem
                as="li"
                key={tier.title}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-line bg-white/90 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift"
              >
                <IconCircle icon={tier.icon} accent={tier.accent} size="md" fill="white" />
                <div className="min-w-0">
                  <h3 className="card-title">{tier.title}</h3>
                  <p className="mt-1.5 animate-sheen bg-gradient-to-r from-ink-muted/35 via-gold/80 to-ink-muted/35 bg-[length:220%_100%] bg-clip-text text-[12px] font-medium uppercase tracking-[0.3em] text-transparent">
                    {p.comingSoon}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        {/* Collaborate banner */}
        <Reveal className="mt-14">
          <div className="relative isolate overflow-hidden rounded-2xl bg-navy-deep px-6 py-10 text-cream ring-1 ring-gold/40 sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:py-12">
            <StarField count={40} seed={9} className="absolute inset-0 -z-10 h-full w-full opacity-50" />
            <GoldDust count={12} seed={13} className="-z-10" />
            <span aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-gold/20" />
            <span aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-gold/20" />
            <div className="relative">
              <p className="eyebrow text-saffron-bright">{p.collaborate.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-medium text-cream sm:text-3xl">{p.collaborate.title}</h2>
              <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <Button
                  href={'https://docs.google.com/forms/d/e/1FAIpQLSc7I0uFaWnvl4fOpTjLCdPF8V7Qc8Jc4Sjh_zHG6Wd_Cxd-Jw/viewform?usp=publish-editor'}
                  variant="sun"
                  icon={Handshake}
                  iconPosition="left"
                >
                  {p.collaborate.becomeSponsor.label}
                </Button>
                <Button href={site.brochurePdf} download variant="outline-light" icon={Download} iconPosition="left">
                  {p.collaborate.download}
                </Button>
              </div>
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
      <div className="relative h-24 sm:h-32">
        <PlumBlossom className="absolute bottom-5 left-0 w-40 sm:w-56" />
        <PlumBlossom flip className="absolute bottom-5 right-0 w-40 sm:w-56" />
      </div>
      <PatternBorder />
    </section>
  );
}
