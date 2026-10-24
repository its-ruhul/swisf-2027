import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Mail, Quote, School } from 'lucide-react';
import sunriseCircle from '../../assets/images/sunrise-circle.webp';
import { site } from '../../data/site';
import { nextGeneration } from '../../data/sunray';
import { accentText } from '../../lib/accents';
import { cn } from '../../lib/cn';
import ArcFrame from '../ornaments/ArcFrame';
import CircuitTraces from '../ornaments/CircuitTraces';
import { ChineseKnot, PeachCloud, SwirlBorder } from '../ornaments/Decor';
import Enso from '../ornaments/Enso';
import GoldCloud from '../ornaments/GoldCloud';
import { GoldDust } from '../ornaments/Particles';
import Seigaiha from '../ornaments/Seigaiha';
import Button from '../ui/Button';
import DividerLabel from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal from '../ui/Reveal';
import Seal, { MotifWatermark } from '../ui/Seal';
import SectionHeading from '../ui/SectionHeading';

const mailto = (subject: string) => `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;

/** The four-step journey; the connecting line draws itself once it scrolls into view. */
function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 55%'] });
  const progress = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <div ref={ref} className="relative mt-[clamp(22px,3.2vh,34px)]">
      {/* horizontal line above the steps (desktop) */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-3.5 hidden h-px bg-line lg:block">
        <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-gradient-to-r from-royal via-saffron to-violet" />
      </div>
      {/* vertical line (mobile / tablet) */}
      <div aria-hidden="true" className="absolute bottom-8 left-[27px] top-8 w-px bg-line lg:hidden">
        <motion.span style={{ scaleY: progress }} className="absolute inset-0 origin-top bg-gold" />
      </div>

      <ol className="relative grid gap-7 lg:grid-cols-4 lg:gap-5">
        {nextGeneration.steps.map((step) => (
          <li key={step.step} className="group relative flex gap-4">
            <span aria-hidden="true" className="absolute -top-[17px] left-[25px] hidden h-1.5 w-1.5 rotate-45 bg-gold lg:block" />
            <IconCircle icon={step.icon} accent={step.accent} size="md" fill="cream" />
            <div className="min-w-0 pt-0.5">
              <p className={cn('text-[10.5px] font-semibold uppercase tracking-[0.16em] xl:text-[11px] xl:tracking-[0.2em]', accentText[step.accent])}>
                {step.step} · <span className="whitespace-nowrap text-saffron-ink">{step.when}</span>
              </p>
              <h3 className="mt-1 text-[15px] font-semibold uppercase tracking-[0.14em] text-navy">{step.title}</h3>
              <p className="mt-1 text-[13.5px] leading-snug text-ink-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Sunrise photo in a circle, ringed by an ensō brush stroke and a saffron arc. */
function SunriseCircle() {
  const { imageAlt } = nextGeneration;
  return (
    <div className="relative mx-auto aspect-square w-[min(62vw,280px)] sm:w-[min(52vw,320px)] lg:w-[min(100%,30vh,380px)] xl:w-[min(100%,36vh,380px)]">
      <Enso className="absolute -inset-[16%] h-[132%] w-[132%]" color="#0E1A3D" />
      <ArcFrame className="absolute -inset-[7%] h-[114%] w-[114%] motion-safe:animate-spin-slow" />
      <div className="relative h-full w-full overflow-hidden rounded-full shadow-lift ring-2 ring-cream">
        <img src={sunriseCircle} alt={imageAlt} width={720} height={720} loading="eager" decoding="async" className="h-full w-full scale-[1.04] object-cover" />
      </div>
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_42%_8%,rgba(255,214,140,0.5),transparent_45%)] mix-blend-screen motion-safe:animate-glow-pulse" />
      <Seal motif="lotus" meaning="Future" size="md" className="absolute -right-[2%] bottom-[6%]" />
    </div>
  );
}

/** Project Sunray — The Next Generation (E-Cell's Project Sunray). One screen tall on desktop. */
export default function NextGeneration() {
  const { heading, lead, body, journeyLabel, quote, schools } = nextGeneration;
  return (
    <section aria-labelledby="sunray-heading" className="panel relative flex min-h-panel flex-col overflow-hidden bg-cream">
      <Seigaiha background="#FAF6EE" className="opacity-25" />
      <SwirlBorder className="relative !h-8 sm:!h-10" />
      <ChineseKnot className="absolute left-0 top-8 w-12 sm:left-2 sm:w-16 lg:w-20" eager />
      <PeachCloud className="absolute -left-28 top-[38%] w-80 opacity-60" />
      <GoldCloud variant="b" className="-right-16 top-[12%] w-44 opacity-80 sm:w-56" />
      <CircuitTraces flip="x" density="light" terminalFill="#FAF6EE" className="absolute -right-3 bottom-0 hidden w-28 rotate-180 opacity-50 lg:block" />
      <MotifWatermark motif="lotus" className="right-[1%] top-[16%] hidden w-[clamp(6rem,15vh,9.5rem)] text-saffron/[0.12] xl:block" />
      <GoldDust count={14} seed={31} className="opacity-70" />

      <div className="container-x relative flex w-full flex-1 flex-col justify-center py-10 lg:py-[clamp(10px,2vh,32px)]">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="pl-12 sm:pl-16 lg:col-span-7 lg:pl-14">
            <Reveal>
              <p className="eyebrow text-[11px] text-saffron-ink">Project Sunray · E-Cell Project Sunray</p>
              <SectionHeading as="h1" id="sunray-heading" line1={heading.line1} line2={heading.line2} className="mt-2" />
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-[clamp(12px,2.2vh,22px)] max-w-[36rem] text-[clamp(16px,2.15vh,19px)] font-semibold leading-snug text-navy">{lead}</p>
              <p className="panel-copy mt-2 max-w-[36rem]">{body}</p>
              <figure className="mt-[clamp(12px,2.4vh,24px)] flex max-w-[36rem] items-center gap-3 border-l-[3px] border-saffron pl-4 lg:hidden xl:flex">
                <Quote aria-hidden="true" size={22} strokeWidth={1.5} className="shrink-0 text-saffron" />
                <blockquote className="text-[clamp(15px,2vh,18px)] font-medium leading-snug text-navy">
                  <p>
                    {quote.text} <span className="text-saffron-ink">{quote.highlight}</span>
                  </p>
                </blockquote>
              </figure>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <SunriseCircle />
          </div>
        </div>

        <DividerLabel className="mt-12 lg:mt-[clamp(16px,3.2vh,36px)]" as="h2">
          {journeyLabel}
        </DividerLabel>
        <Journey />

        {/* Schools call to action */}
        <Reveal className="mt-10 lg:mt-[clamp(12px,2.4vh,32px)]">
          <div className="relative overflow-hidden rounded-2xl bg-navy-deep px-6 py-6 text-cream ring-1 ring-gold/40 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:py-[clamp(10px,1.7vh,22px)]">
            <span aria-hidden="true" className="absolute -right-16 -top-20 h-48 w-48 rounded-full border border-gold/20" />
            <span aria-hidden="true" className="absolute -right-4 -top-8 h-24 w-24 rounded-full border border-gold/20" />
            <div className="relative flex items-center gap-4">
              <IconCircle icon={School} accent="gold" size="md" tone="dark" interactive={false} />
              <div>
                <h2 className="text-xl font-semibold text-cream sm:text-2xl lg:text-xl xl:text-2xl">{schools.title}</h2>
                <p className="mt-1 max-w-xl text-[14px] text-cream/75">{schools.text}</p>
              </div>
            </div>
            {/* phones: under the text, lined up with it; desktop: on the right */}
            <div className="relative mt-5 pl-[72px] lg:mt-0 lg:shrink-0 lg:pl-0">
              <Button href={mailto(schools.register.subject)} variant="sun" icon={Mail} iconPosition="left">
                {schools.register.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
