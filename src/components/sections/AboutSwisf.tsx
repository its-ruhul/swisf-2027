import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import techCultureBand from '../../assets/images/tech-culture-band.webp';
import { about } from '../../data/home';
import { accentText } from '../../lib/accents';
import { cn } from '../../lib/cn';
import CircuitTraces from '../ornaments/CircuitTraces';
import DottedGlobe from '../ornaments/DottedGlobe';
import GoldCloud from '../ornaments/GoldCloud';
import MandalaWatermark from '../ornaments/MandalaWatermark';
import { CardWithIcon } from '../ui/Card';
import DividerLabel from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import StatCounter from './StatCounter';

/** Brochure page 3: About SWISF 2027, the light globe, "At a glance" stats and the day/night cards. */
export default function AboutSwisf() {
  return (
    <section aria-labelledby="about-heading" className="relative overflow-hidden bg-cream">
      <MandalaWatermark className="absolute -left-48 -top-48 w-[620px] sm:-left-40 sm:-top-40" opacity={0.1} />
      <GoldCloud variant="a" className="right-[8%] top-4 hidden w-[52%] max-w-[420px] opacity-90 sm:block lg:right-[20%]" />
      <CircuitTraces flip="x" density="light" animated={false} terminalFill="#FAF6EE" className="absolute -right-3 top-0 w-24 opacity-70 sm:w-32" />

      <div className="container-x section-y relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading id="about-heading" line1={about.heading.line1} line2={about.heading.line2} />
            </Reveal>
            <Reveal className="body-copy mt-8 max-w-prose space-y-5" delay={0.05}>
              <p>
                <strong className="font-semibold text-navy">{about.lead}</strong>
                {about.paragraphs[0]}
              </p>
              {about.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>

          <div className="flex flex-col items-center lg:col-span-5">
            <DottedGlobe variant="light" className="w-full max-w-[460px]" />
            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.2em] text-navy shadow-card">
              <MapPin size={16} strokeWidth={1.6} className="text-saffron" aria-hidden="true" />
              {about.globeBadge}
            </span>
          </div>
        </div>

        {/* At a glance */}
        <DividerLabel line="saffron" className="mt-20" as="h3">
          {about.glanceLabel}
        </DividerLabel>
        <div className="relative mt-12">
          {/* thin line connecting the four circles */}
          <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[44px] hidden border-t border-dashed border-line md:block" />
          <Reveal as="ul" stagger className="relative grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
            {about.stats.map((stat) => (
              <RevealItem as="li" key={stat.label} className="group flex flex-col items-center text-center">
                <IconCircle icon={stat.icon} accent={stat.accent} size="xl" fill="cream" />
                <StatCounter value={stat.value} display={stat.display} accent={stat.accent} className="mt-5" />
                <p className="mt-3 text-[13px] font-medium uppercase tracking-[0.3em] text-navy [margin-right:-0.3em]">{stat.label}</p>
                <p className="mt-2 max-w-[13rem] text-[14px] leading-snug text-ink-muted">{stat.caption}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        {/* By day / By night */}
        <Reveal stagger className="mt-20 grid gap-6 md:grid-cols-2">
          {about.cards.map((card) => (
            <RevealItem key={card.title}>
              <Link to={card.to} className="block h-full rounded-2xl">
                <CardWithIcon
                  as="article"
                  icon={card.icon}
                  accent={card.accent}
                  eyebrow={card.eyebrow}
                  title={card.title}
                  text={card.text}
                  hoverLift
                  className="h-full border-[1.5px]"
                >
                  <span className={cn('mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.16em]', accentText[card.accent])}>
                    Explore
                    <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </CardWithIcon>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* closing strip: technology & culture illustration */}
      <img
        src={techCultureBand}
        alt={about.bandAlt}
        width={1600}
        height={309}
        loading="lazy"
        decoding="async"
        className="mx-auto -mt-6 block w-full max-w-[1600px] [mask-image:linear-gradient(to_bottom,transparent,black_14%)] lg:-mt-12"
      />
    </section>
  );
}
