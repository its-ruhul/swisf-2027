import { Fragment } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import heritageBand from '../../assets/images/ne-heritage-band.webp';
import pagodaSketch from '../../assets/images/pagoda-sketch.webp';
import worldMapDots from '../../assets/images/world-map-dots.webp';
import { site } from '../../data/site';
import { accentText } from '../../lib/accents';
import CircuitTraces from '../ornaments/CircuitTraces';
import DottedGlobe from '../ornaments/DottedGlobe';
import GoldCloud from '../ornaments/GoldCloud';
import SkylineStrip from '../ornaments/SkylineStrip';
import SunriseRays from '../ornaments/SunriseRays';
import Button from '../ui/Button';
import Countdown from '../ui/Countdown';
import DividerLabel from '../ui/DividerLabel';
import LogoLockup from '../ui/LogoLockup';
import Motto from '../ui/Motto';

/* Navy panel with a flowing S-curve right edge (viewBox 0–100, stretched to fit). */
const PANEL_PATH = 'M0 0H76C72 13 50 22 50 40C50 57 100 62 100 77C100 90 66 95 58 100H0Z';
const EDGE_PATH = 'M76 0C72 13 50 22 50 40C50 57 100 62 100 77C100 90 66 95 58 100';
/* The panel's tail continues behind the skyline and narrows towards the bottom. */
const TAIL_PATH = 'M0 0H58C50 18 30 40 30 66C30 84 36 94 40 100H0Z';
const TAIL_EDGE = 'M58 0C50 18 30 40 30 66C30 84 36 94 40 100';

/** Brochure cover: navy S-curve panel, sunrise emblem, SUNRAY wordmark, dates and CTAs. */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-cream">
      {/* ── Mobile & tablet: navy band with a curved bottom edge ── */}
      <div className="relative overflow-hidden bg-navy-deep pb-14 pt-8 lg:hidden">
        <CircuitTraces className="absolute -left-2 top-0 w-44 opacity-70 sm:w-56" />
        <CircuitTraces flip="x" density="light" className="absolute -right-2 top-0 w-32 opacity-50 sm:w-44" />
        <div className="container-x relative flex flex-col items-center gap-6">
          <Motto orientation="horizontal" />
          <DottedGlobe variant="dark" priority className="w-[78%] max-w-[340px]" />
        </div>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-10 w-full"
        >
          <path d="M0 40V24C96 -2 236 46 400 12V40Z" fill="#FAF6EE" />
          <path d="M0 24C96 -2 236 46 400 12" fill="none" stroke="#C9A24A" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* ── Cover ── */}
      <div className="relative z-10 lg:min-h-[max(640px,calc(100svh_-_76px))]">
        {/* Desktop navy panel */}
        <div className="absolute inset-y-0 left-0 hidden w-[34%] max-w-[600px] lg:block">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path d={PANEL_PATH} fill="#0A1230" />
            <path d={EDGE_PATH} fill="none" stroke="#C9A24A" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <CircuitTraces className="absolute left-0 top-0 w-[64%] max-w-[300px]" />
          <Motto className="absolute left-[13%] top-[44%] bg-navy-deep" />
        </div>

        {/* Desktop globe overflowing the curve */}
        <div className="pointer-events-none absolute -bottom-[3%] -left-[4%] hidden w-[36%] max-w-[620px] lg:block xl:w-[38%]">
          <DottedGlobe variant="dark" priority />
        </div>

        {/* Faint dotted world map behind the centre content */}
        <img
          src={worldMapDots}
          alt=""
          aria-hidden="true"
          width={1100}
          height={435}
          decoding="async"
          className="pointer-events-none absolute left-1/2 top-[44%] w-[120%] max-w-none -translate-x-1/2 select-none opacity-35 lg:left-[67%] lg:top-[46%] lg:w-[58%]"
        />

        {/* Centre content */}
        <div className="relative px-4 sm:px-8 lg:ml-[34%] lg:px-10 xl:px-16">
          <div className="mx-auto flex max-w-[680px] flex-col items-center pb-12 pt-8 text-center sm:pt-10 lg:pb-16 lg:pt-12">
            <LogoLockup size="hero" />

            <p className="mt-6 text-[13px] font-medium uppercase tracking-[0.6em] text-navy [margin-right:-0.6em]">{site.presents}</p>

            <div className="relative mt-3 w-[78%] max-w-[340px]">
              <GoldCloud variant="a" eager className="-left-[58%] top-[18%] w-[66%] opacity-90" />
              <GoldCloud variant="b" eager flip className="-right-[60%] -top-[4%] w-[62%] opacity-90" />
              <SunriseRays className="relative w-full" />
            </div>

            <h1 id="hero-title" className="flex flex-col items-center">
              <span className="font-display text-[clamp(3.5rem,9vw,7rem)] font-medium leading-[0.95] tracking-[0.08em] text-navy [margin-right:-0.08em]">
                {site.wordmark}
              </span>
              <span className="mt-4 text-[14px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-gold-ink [margin-right:-0.16em] xs:text-[15px] sm:text-lg sm:tracking-[0.3em] sm:[margin-right:-0.3em] lg:text-2xl lg:text-gold-ink-lg">
                {site.subtitleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </h1>

            <p className="mt-3 text-sm font-medium uppercase tracking-[0.45em] text-crimson [margin-right:-0.45em] sm:text-base">
              {site.subWordmark}
            </p>

            <DividerLabel diamonds className="mt-6 w-full">
              {site.tagline}
            </DividerLabel>

            <p className="mt-5 flex flex-col items-center justify-center gap-x-3 gap-y-1 text-[12px] font-medium uppercase tracking-[0.18em] sm:flex-row sm:flex-wrap sm:text-[13px]">
              {site.pillars.map((pillar, i) => (
                <Fragment key={pillar.label}>
                  {i > 0 && (
                    <span aria-hidden="true" className="hidden text-saffron sm:inline">
                      •
                    </span>
                  )}
                  <span className={accentText[pillar.accent]}>{pillar.label}</span>
                </Fragment>
              ))}
            </p>

            <CalendarDays aria-hidden="true" size={30} strokeWidth={1.5} className="mt-7 text-saffron" />
            <p className="mt-2 text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold uppercase leading-tight text-navy">{site.dates.label}</p>
            <p className="mt-1.5 text-[13px] font-medium uppercase tracking-[0.18em] text-royal sm:text-[15px] sm:tracking-[0.3em]">
              {site.dates.year} · {site.location.full}
            </p>
            <span aria-hidden="true" className="mt-5 h-0.5 w-14 bg-saffron" />

            <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 xs:w-auto xs:items-center sm:flex-row">
              <Button to="/experience" size="lg" icon={ArrowRight}>
                Explore the Experience
              </Button>
              <Button to="/sponsors" variant="secondary" size="lg">
                Partner With Us
              </Button>
            </div>

            {site.countdown.enabled && (
              <Countdown
                className="mt-8"
                target={site.countdown.target}
                targetLabel={site.countdown.targetLabel}
                tba={site.countdown.datesToBeAnnounced}
              />
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Desktop: the navy panel's tail continues down the left edge */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-y-0 left-0 hidden h-full w-[34%] max-w-[600px] lg:block"
        >
          <path d={TAIL_PATH} fill="#0A1230" />
          <path d={TAIL_EDGE} fill="none" stroke="#C9A24A" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* ── Skyline with reflection across the cream side ── */}
        <div className="relative px-4 lg:ml-[30%] lg:px-10">
          <SkylineStrip className="mx-auto max-w-[1000px]" />
        </div>

        {/* ── Northeast heritage illustration band ── */}
        <div className="relative -mt-6 sm:-mt-10 lg:ml-[22%]">
          <img
            src={heritageBand}
            alt="Illustrated Northeast heritage: a monastery, waterfalls, orchids, a living root bridge, limestone caves, a train, a satellite and a globe"
            width={1024}
            height={341}
            loading="lazy"
            decoding="async"
            className="mx-auto block w-full max-w-[1200px] [mask-image:linear-gradient(to_bottom,transparent,black_18%)] lg:[-webkit-mask-composite:source-in] lg:[mask-composite:intersect] lg:[mask-image:linear-gradient(to_bottom,transparent,black_18%),linear-gradient(to_right,transparent,black_9%)]"
          />
          <img
            src={pagodaSketch}
            alt=""
            aria-hidden="true"
            width={540}
            height={594}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute bottom-0 right-0 hidden w-[20%] max-w-[260px] select-none md:block"
          />
        </div>
      </div>
    </section>
  );
}
