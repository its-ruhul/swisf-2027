import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Mail, Quote, School } from 'lucide-react';
import futuristicEye from '../../assets/images/futuristic-eye.webp';
import sunriseCircle from '../../assets/images/sunrise-circle.webp';
import { site } from '../../data/site';
import { nextGeneration } from '../../data/sunray';
import { accentText } from '../../lib/accents';
import { cn } from '../../lib/cn';
import ArcFrame from '../ornaments/ArcFrame';
import { ChineseKnot, PeachCloud, SwirlBorder } from '../ornaments/Decor';
import GoldCloud from '../ornaments/GoldCloud';
import Button from '../ui/Button';
import DividerLabel from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const mailto = (subject: string) => `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;

/** The four-step journey; the connecting line draws itself as you scroll. */
function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 45%'] });
  const progress = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <div ref={ref} className="relative mt-12">
      {/* horizontal line (desktop) */}
      <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[36px] hidden h-px bg-line lg:block">
        <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-gold" />
      </div>
      {/* vertical line (mobile / tablet) */}
      <div aria-hidden="true" className="absolute bottom-10 left-[35px] top-10 w-px bg-line lg:hidden">
        <motion.span style={{ scaleY: progress }} className="absolute inset-0 origin-top bg-gold" />
      </div>

      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
        {nextGeneration.steps.map((step) => (
          <li key={step.step} className="group flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
            <IconCircle icon={step.icon} accent={step.accent} size="lg" fill="cream" />
            <div className="pt-1 lg:pt-0">
              <p className={cn('text-[12.5px] font-semibold uppercase tracking-[0.2em] lg:mt-6', accentText[step.accent])}>{step.step}</p>
              <h3 className="mt-2 text-lg font-medium uppercase tracking-[0.14em] text-navy">{step.title}</h3>
              <p className="mt-1.5 text-[14.5px] font-medium text-saffron-ink">{step.when}</p>
              <p className="mt-2 max-w-[17rem] text-[14.5px] leading-relaxed text-ink-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Brochure page 8: The Next Generation (E-Cell's Project Centre). */
export default function NextGeneration() {
  const { heading, lead, body, imageAlt, journeyLabel, quote, schools, eyeAlt } = nextGeneration;
  return (
    <section aria-labelledby="sunray-heading" className="relative overflow-hidden bg-cream">
      <SwirlBorder />
      <ChineseKnot className="absolute left-0 top-12 w-14 sm:left-2 sm:w-20 lg:w-24" eager />
      <PeachCloud className="absolute -left-28 top-[38%] w-80 opacity-60" />
      <GoldCloud variant="b" className="-right-16 top-[31%] w-44 opacity-90 sm:w-56 lg:top-[33%]" />

      <div className="container-x section-y relative pt-16 sm:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="pl-14 sm:pl-20 lg:col-span-6 lg:pl-16">
            <Reveal>
              <SectionHeading as="h1" id="sunray-heading" line1={heading.line1} line2={heading.line2} />
            </Reveal>
            <Reveal delay={0.05}>
              <p className="lead-copy mt-6 max-w-[34rem]">{lead}</p>
              <p className="body-copy mt-4 max-w-[34rem]">{body}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <div className="relative mx-auto aspect-square w-[82%] max-w-[460px]">
              <ArcFrame className="absolute -inset-[9%] h-[118%] w-[118%]" />
              <img
                src={sunriseCircle}
                alt={imageAlt}
                width={720}
                height={720}
                loading="eager"
                decoding="async"
                className="relative h-full w-full rounded-full object-cover shadow-lift"
              />
            </div>
          </div>
        </div>

        <DividerLabel className="mt-20" as="h2">
          {journeyLabel}
        </DividerLabel>
        <Journey />

        <Reveal className="mt-20">
          <figure className="relative rounded-2xl border border-line border-l-4 border-l-saffron bg-white px-6 py-7 shadow-card sm:flex sm:items-center sm:gap-6 sm:px-10">
            <Quote aria-hidden="true" size={40} strokeWidth={1.5} className="shrink-0 text-saffron" />
            <blockquote className="mt-3 text-xl font-medium leading-snug text-navy sm:mt-0 sm:text-2xl">
              <p>
                {quote.text} <span className="text-saffron-ink sm:text-saffron-ink-lg">{quote.highlight}</span>
              </p>
            </blockquote>
          </figure>
        </Reveal>

        {/* Schools CTA */}
        <Reveal stagger className="mt-12">
          <RevealItem>
            <div className="relative overflow-hidden rounded-2xl bg-navy-deep px-6 py-10 text-cream sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="flex items-start gap-5">
                <IconCircle icon={School} accent="gold" size="md" tone="dark" interactive={false} />
                <div>
                  <h2 className="text-2xl font-semibold text-cream sm:text-3xl">{schools.title}</h2>
                  <p className="mt-2 max-w-xl text-cream/80">{schools.text}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 xs:flex-row lg:mt-0 lg:shrink-0">
                <Button href={mailto(schools.register.subject)} variant="light" icon={Mail} iconPosition="left">
                  {schools.register.label}
                </Button>
                <Button href={mailto(schools.mentor.subject)} variant="outline-light">
                  {schools.mentor.label}
                </Button>
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </div>

      {/* closing strip: futuristic eye / circuit light */}
      <div className="relative h-[200px] border-t-2 border-saffron sm:h-[260px] lg:h-[340px]">
        <img
          src={futuristicEye}
          alt={eyeAlt}
          width={1600}
          height={897}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[50%_45%]"
        />
      </div>
    </section>
  );
}
