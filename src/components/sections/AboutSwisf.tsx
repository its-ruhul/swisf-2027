import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import techCultureBand from '../../assets/images/tech-culture-band.webp';
import { about } from '../../data/home';
import AtomOrbit from '../ornaments/AtomOrbit';
import CircuitTraces from '../ornaments/CircuitTraces';
import DottedGlobe from '../ornaments/DottedGlobe';
import GoldCloud from '../ornaments/GoldCloud';
import MandalaWatermark from '../ornaments/MandalaWatermark';
import DividerLabel from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import { MotifWatermark } from '../ui/Seal';
import SectionHeading from '../ui/SectionHeading';
import StatCounter from './StatCounter';

/** About SWISF 2027, the light globe and the "At a glance" stats — one screen tall on desktop. */
export default function AboutSwisf() {
  return (
    <section aria-labelledby="about-heading" className="panel relative flex min-h-panel items-center overflow-hidden bg-cream">
      <div className="absolute -left-48 -top-48 w-[620px] motion-safe:animate-spin-slower sm:-left-40 sm:-top-40">
        <MandalaWatermark className="w-full" opacity={0.12} />
      </div>
      <GoldCloud variant="a" className="-right-16 -top-6 hidden w-[26%] max-w-[340px] opacity-70 lg:block" />
      <CircuitTraces flip="x" density="light" terminalFill="#FAF6EE" className="absolute -right-3 top-0 w-24 opacity-70 sm:w-32" />
      <MotifWatermark motif="cloud" className="bottom-[14%] left-[1.5%] hidden w-[clamp(6rem,15vh,10rem)] text-navy/[0.07] xl:block" />
      {/* technology & culture line art along the bottom edge */}
      <img
        src={techCultureBand}
        alt=""
        aria-hidden="true"
        width={1600}
        height={309}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1600px] select-none opacity-[0.13] [mask-image:linear-gradient(to_bottom,transparent,black_55%)]"
      />

      <div className="container-x relative w-full py-14 lg:py-[clamp(20px,3.4vh,64px)]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeading id="about-heading" reveal line1={about.heading.line1} line2={about.heading.line2} />
            <Reveal from="blur" className="panel-copy mt-[clamp(16px,3vh,32px)] max-w-prose space-y-[clamp(10px,1.8vh,18px)]" delay={0.25}>
              <p>
                <strong className="font-semibold text-navy">{about.lead}</strong>
                {about.paragraphs[0]}
              </p>
              {about.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>

          <Reveal from="turn" delay={0.15} className="relative flex flex-col items-center lg:col-span-5">
            <div className="relative w-full max-w-[min(100%,44vh,440px)] max-lg:max-w-[380px]">
              <DottedGlobe variant="light" className="w-full" />
              <AtomOrbit className="absolute -right-2 -top-2 w-20 sm:w-24" />
            </div>
            <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.2em] text-navy shadow-card">
              <MapPin size={16} strokeWidth={1.6} className="text-saffron" aria-hidden="true" />
              {about.globeBadge}
            </span>
          </Reveal>
        </div>

        {/* At a glance */}
        <Reveal from="blur" amount={0.8} className="mt-14 lg:mt-[clamp(20px,4vh,48px)]">
          <DividerLabel line="saffron" as="h3">
            {about.glanceLabel}
          </DividerLabel>
        </Reveal>
        <div className="relative mt-8 lg:mt-[clamp(16px,3vh,32px)]">
          {/* thin line connecting the four circles, drawn left to right as it scrolls into view */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[28px] hidden origin-left border-t border-dashed border-gold/60 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
          />
          <Reveal as="ul" stagger className="relative grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {about.stats.map((stat) => (
              <RevealItem as="li" from="scale" key={stat.label} className="group flex flex-col items-center text-center">
                <IconCircle icon={stat.icon} accent={stat.accent} size="md" fill="cream" />
                <StatCounter value={stat.value} display={stat.display} accent={stat.accent} className="mt-3" />
                <p className="mt-2 text-[12.5px] font-medium uppercase tracking-[0.3em] text-navy [margin-right:-0.3em]">{stat.label}</p>
                <p className="mt-1 max-w-[14rem] text-[13.5px] leading-snug text-ink-muted">{stat.caption}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
