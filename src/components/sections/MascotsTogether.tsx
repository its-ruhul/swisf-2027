import { useRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import rayBody from '../../assets/images/mascots/ray-body.webp';
import sunBody from '../../assets/images/mascots/sun-body.webp';
import { together, type MascotName } from '../../data/mascots';
import { usePauseOffscreen } from '../../hooks/usePauseOffscreen';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { accentText } from '../../lib/accents';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';
import { PeachCloud } from '../ornaments/Decor';
import DottedGlobe from '../ornaments/DottedGlobe';
import GoldCloud from '../ornaments/GoldCloud';
import { GoldDust } from '../ornaments/Particles';
import Seigaiha from '../ornaments/Seigaiha';
import { Diamond } from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { EASE_IN_VIEW, EASE_OUT_OF_VIEW, RevealItem } from '../ui/Reveal';
import { MotifWatermark } from '../ui/Seal';

/** Portraits cut from the full figures: how far to zoom in and which point to centre, in % of the artwork. */
const PORTRAIT = {
  sun: { src: sunBody, width: 823, height: 1000, zoom: 3, x: 50, y: 21 },
  ray: { src: rayBody, width: 788, height: 1000, zoom: 3.2, x: 31, y: 18 },
} as const;

function Medallion({ name, angle }: { name: MascotName; angle: number }) {
  const art = PORTRAIT[name];
  return (
    <div className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
      <div className="absolute left-1/2 top-0 aspect-square w-[21%] -translate-x-1/2 -translate-y-[38%]">
        {/* the frame stays upright while the orbit turns */}
        <div className="orbit-counter h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-[#FFF3D1] to-[#F6C98A] shadow-[0_10px_26px_-8px_rgba(14,26,61,0.55)] ring-2 ring-gold" style={cssVars({ '--start': `${-angle}deg` })}>
          <img
            src={art.src}
            alt=""
            aria-hidden="true"
            width={art.width}
            height={art.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute max-w-none select-none"
            style={{ width: `${art.zoom * 100}%`, left: `${50 - art.x * art.zoom}%`, top: `${50 - (art.y * art.zoom * art.height) / art.width}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/** The dotted globe with Sun and Ray circling it side by side, trailing a line of light. */
function Orbit() {
  return (
    <div className="relative mx-auto aspect-square w-[min(80vw,420px)] lg:w-[min(100%,calc((100svh-var(--nav-h))*0.72),600px)]">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <circle cx="50" cy="50" r="49.6" fill="none" stroke="#C9A24A" strokeWidth="0.3" strokeDasharray="0.8 2" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="#E7DCC8" strokeWidth="0.25" />
      </svg>
      <div className="absolute inset-[13%] flex items-center">
        <DottedGlobe variant="dark" decorative className="w-full" />
      </div>
      <div aria-hidden="true" className="orbit-spin absolute inset-0">
        <div className="comet-trail absolute inset-0 rounded-full" />
        <Medallion name="ray" angle={-40} />
        <Medallion name="sun" angle={0} />
      </div>
    </div>
  );
}

const fromLeft: Variants = {
  hidden: { x: '-0.4em', opacity: 0, transition: { duration: 0.5, ease: EASE_OUT_OF_VIEW } },
  show: { x: 0, opacity: 1, transition: { duration: 1, ease: EASE_IN_VIEW } },
};
const fromRight: Variants = {
  hidden: { x: '0.4em', opacity: 0, transition: { duration: 0.5, ease: EASE_OUT_OF_VIEW } },
  show: { x: 0, opacity: 1, transition: { duration: 1, ease: EASE_IN_VIEW } },
};

/** SUN and RAY slide in from either side and meet in one word. */
function Wordmark() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const shown = useScrollReveal(ref);
  const state = shown || reduce ? 'show' : 'hidden';
  const [first, second] = together.wordmark;
  return (
    <h2 ref={ref} id="together-heading" aria-label={`${together.eyebrow} ${first}${second}`}>
      <span aria-hidden="true" className="eyebrow flex items-center gap-3 text-[11px] text-saffron-ink">
        <Diamond className="bg-saffron" />
        {together.eyebrow}
      </span>
      <span aria-hidden="true" className="mt-1 block whitespace-nowrap text-[clamp(3.2rem,21vw,7.25rem)] font-bold leading-none tracking-[0.03em] lg:text-[min(8.2vw,13vh,7.25rem)]">
        <motion.span className="text-sunray inline-block" style={{ backgroundImage: 'linear-gradient(100deg, #a97a33 0%, #c65f21 100%)' }} variants={fromLeft} initial={reduce ? false : 'hidden'} animate={state}>
          {first}
        </motion.span>
        <motion.span className="text-sunray inline-block" style={{ backgroundImage: 'linear-gradient(100deg, #c65f21 0%, #b5122b 100%)' }} variants={fromRight} initial={reduce ? false : 'hidden'} animate={state}>
          {second}
        </motion.span>
      </span>
    </h2>
  );
}

/** A spark, then energy, then the world, joined by a line a spark keeps running along. */
function Journey() {
  return (
    <div className="mt-[clamp(16px,3vh,32px)] max-w-[34rem]">
      <h3 className="eyebrow text-[11px] text-navy">{together.journeyLabel}</h3>
      <div className="relative mt-[clamp(10px,1.8vh,18px)]">
        {/* the line runs between the first and last icon */}
        <span aria-hidden="true" className="absolute left-[16.66%] right-[16.66%] top-7 h-px bg-gold/60">
          <span className="run-along absolute inset-x-0 top-0 block">
            <span className="absolute -left-[3.5px] -top-[3px] h-[7px] w-[7px] rounded-full bg-saffron shadow-[0_0_10px_3px_rgba(224,123,57,0.7)]" />
          </span>
        </span>
        <Reveal as="ol" stagger delay={0.1} className="relative grid grid-cols-3">
          {together.journey.map((stop) => (
            <RevealItem as="li" key={stop.title} className="group relative flex flex-col items-center text-center">
              <IconCircle icon={stop.icon} accent={stop.accent} size="md" fill="cream" />
              <p className={cn('mt-2 text-[12.5px] font-semibold uppercase tracking-[0.12em]', accentText[stop.accent])}>{stop.title}</p>
              <p className="text-[12.5px] leading-snug text-ink-muted">{stop.text}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

/** "Together they are SUNRAY": the closing screen, on paper again after the night. */
export default function MascotsTogether() {
  const ref = useRef<HTMLElement>(null);
  usePauseOffscreen(ref);
  return (
    <section ref={ref} id="together" aria-labelledby="together-heading" className="panel relative isolate flex min-h-panel items-center overflow-hidden bg-cream-2 [scroll-margin-top:-16px]">
      <Seigaiha background="#F4EDE0" className="-z-10 opacity-25" />
      <PeachCloud className="absolute -left-28 bottom-0 -z-10 w-80 opacity-70 sm:w-[28rem]" />
      <GoldCloud variant="b" flip className="-right-16 top-4 -z-10 w-56 opacity-70 sm:w-80" />
      <GoldCloud variant="a" className="bottom-2 right-[38%] -z-10 hidden w-72 opacity-50 lg:block" />
      <MotifWatermark motif="mountains" className="left-[40%] top-[6%] -z-10 hidden w-[clamp(6rem,17vh,10rem)] text-gold-ink/[0.16] xl:block" />
      <GoldDust count={14} seed={37} className="-z-10 max-sm:[&>*:nth-child(even)]:hidden" />

      <div className="container-x relative w-full py-14 lg:py-[clamp(18px,3.4vh,48px)]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 lg:pl-14">
            <Wordmark />
            <Reveal from="blur" delay={0.3} className="mt-[clamp(10px,2vh,20px)] max-w-[34rem]">
              <p className="text-[clamp(17px,2.4vh,21px)] font-semibold leading-snug text-navy">{together.lead}</p>
              <p className="panel-copy mt-2">{together.body}</p>
            </Reveal>
            <Journey />
          </div>
          <Reveal from="turn" delay={0.15} className="lg:col-span-6">
            <Orbit />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
