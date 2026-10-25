import { useRef, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, CalendarDays, Landmark, MapPin } from 'lucide-react';
import sunriseBanner from '../../assets/images/sunrise-banner.webp';
import { hero } from '../../data/home';
import { site } from '../../data/site';
import { cn } from '../../lib/cn';
import GoldCloud from '../ornaments/GoldCloud';
import { GoldDust } from '../ornaments/Particles';
import StarField from '../ornaments/StarField';
import Button from '../ui/Button';
import Countdown from '../ui/Countdown';
import { Diamond } from '../ui/DividerLabel';
import Marquee from '../ui/Marquee';
import { MotifWatermark } from '../ui/Seal';
import SwisfEmblem from '../ui/SwisfEmblem';

/* Where the sun sits in sunrise-banner.webp (1588 × 584), as a fraction of the image. */
const SUN_X = 0.508;
const SUN_Y = 0.277;

/* Soft banks of low cloud, repeated so the drift can loop seamlessly. */
const FOG =
  'radial-gradient(ellipse 22% 38% at 12% 62%, rgba(255,255,255,0.55), transparent 70%),' +
  'radial-gradient(ellipse 18% 30% at 38% 48%, rgba(255,246,230,0.45), transparent 70%),' +
  'radial-gradient(ellipse 26% 42% at 66% 66%, rgba(255,255,255,0.5), transparent 70%),' +
  'radial-gradient(ellipse 16% 28% at 90% 52%, rgba(255,240,220,0.4), transparent 70%)';

const lineReveal = {
  hidden: { y: '105%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 + i * 0.09 } }),
};

/* Phones: slightly shorter buttons so the hero fits one screen */
const compactOnPhones = 'max-sm:min-h-[46px] max-sm:px-6 max-sm:py-2.5 max-sm:text-[12px]';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay: d } }),
};

/**
 * Full-screen hero: the Meghalaya sunrise over a sea of clouds, slowly
 * zooming, with god-rays turning around the sun, drifting fog, gold dust,
 * the WISF emblem rising on the horizon, a live countdown and a ticker.
 * The navbar floats transparently over it.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // scroll: the photo sinks slower than the page, the content lifts and fades
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);

  // pointer: a few layers lean towards the cursor
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 18 });
  const sy = useSpring(py, { stiffness: 50, damping: 18 });
  const nearX = useTransform(sx, (v) => v * -26);
  const nearY = useTransform(sy, (v) => v * -14);
  const farX = useTransform(sx, (v) => v * 12);
  const farY = useTransform(sy, (v) => v * 8);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const scrollToWelcome = () => {
    document.getElementById('welcome')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const registerHref = 'https://docs.google.com/forms/d/e/1FAIpQLSdLARvVjmJ60w6v-sqB8ujVAaTPQlTHwl8N79hYuvzaHkCScA/viewform?usp=publish-editor';
  const priorityAttrs = { fetchpriority: 'high' };

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="relative isolate -mt-[var(--nav-h)] flex h-[100svh] min-h-[500px] flex-col overflow-hidden bg-navy-deep text-cream"
    >
      {/* ── Photo, sized like object-fit: cover but anchored on the sun ── */}
      <motion.div aria-hidden="true" style={{ y: photoY }} className="absolute inset-0 -z-30">
        <motion.div style={{ x: farX, y: farY }} className="absolute inset-[-3%]">
          <div
            className="absolute top-1/2 left-1/2 -translate-y-1/2 max-lg:-translate-x-[50.8%] lg:left-[68%] lg:-translate-x-[50.8%]"
            style={{ aspectRatio: '1588 / 584', height: 'max(100%, 53vw)' }}
          >
            <div className="absolute inset-0 motion-safe:animate-kenburns" style={{ transformOrigin: `${SUN_X * 100}% ${SUN_Y * 100}%` }}>
              <img
                src={sunriseBanner}
                alt=""
                width={1588}
                height={584}
                decoding="async"
                className="h-full w-full select-none"
                draggable={false}
                {...priorityAttrs}
              />
              {/* god-rays turning around the sun */}
              <div
                className="god-rays absolute aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 mix-blend-screen motion-safe:animate-spin-slower"
                style={{ left: `${SUN_X * 100}%`, top: `${SUN_Y * 100}%` }}
              />
              {/* breathing glow */}
              <div
                className="absolute aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen motion-safe:animate-glow-pulse"
                style={{
                  left: `${SUN_X * 100}%`,
                  top: `${SUN_Y * 100}%`,
                  background: 'radial-gradient(circle, rgba(255,214,140,0.75) 0%, rgba(242,154,94,0.35) 28%, transparent 66%)',
                }}
              />
              {/* the WISF emblem rising on the horizon */}
              <div
                className="absolute w-[19%] -translate-x-1/2 mix-blend-screen"
                style={{ left: `${SUN_X * 100}%`, bottom: `${(1 - SUN_Y) * 100 - 1.9}%` }}
              >
                <motion.div
                  initial={reduce ? false : { y: '30%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 0.6 }}
                  transition={{ duration: 2.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.4 }}
                >
                  <SwisfEmblem source="lg" eager glint glintDelay={2.6} className="w-full" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Navy wash for legibility (left-heavy on desktop, bottom-heavy on mobile) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,18,48,0.94) 0%, rgba(10,18,48,0.82) 30%, rgba(10,18,48,0.35) 58%, rgba(10,18,48,0.12) 78%, rgba(10,18,48,0.3) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,18,48,0.7) 0%, rgba(10,18,48,0.15) 22%, rgba(10,18,48,0.25) 55%, rgba(10,18,48,0.92) 100%)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-navy-deep/45 lg:hidden" />

      {/* ── Atmosphere ── */}
      <StarField count={60} seed={41} className="absolute inset-x-0 top-0 -z-10 h-[45%] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[6%] -z-10 h-[46%] overflow-hidden opacity-[0.22] mix-blend-screen">
        <div className="fog absolute inset-y-0 left-0 w-[200%]" style={{ backgroundImage: FOG, backgroundSize: '50% 100%', backgroundRepeat: 'repeat-x' }} />
      </div>
      {/*<CircuitTraces className="absolute -left-2 top-0 -z-10 w-40 opacity-50 sm:w-56 lg:w-64" />*/}
      <motion.div aria-hidden="true" style={{ x: nearX, y: nearY }} className="pointer-events-none absolute inset-0 -z-10">
        <GoldCloud variant="a" eager className="-left-24 bottom-[14%] w-72 opacity-[0.22] sm:w-96" />
        <GoldCloud variant="b" eager flip className="-right-16 top-[30%] hidden w-80 opacity-[0.28] md:block lg:w-[26rem]" />
      </motion.div>
      <MotifWatermark motif="sun" className="right-[3%] top-[18%] hidden w-[clamp(7rem,18vh,12rem)] text-cream/[0.09] lg:block" />
      <GoldDust count={32} className="-z-10" />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative flex flex-1 flex-col pb-[calc(52px+clamp(12px,2vh,34px))] pt-[calc(var(--nav-h)+clamp(8px,1.8vh,44px))]"
      >
        <div className="flex max-w-[56rem] flex-1 flex-col justify-center">
          <motion.p
            variants={fadeUp}
            custom={0.05}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.34em] text-gold-soft sm:text-[13px] max-md:[@media(max-height:600px)]:hidden"
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold sm:w-12" />
            {site.tagline}
            <Diamond className="bg-saffron" />
          </motion.p>

          {/* four lines, sized by width and height so the hero stays one screen */}
          <h1
            id="hero-title"
            className="mt-[clamp(8px,1.5vh,24px)] text-[clamp(1.75rem,min(9.6vw,6.2vh),6rem)] font-bold uppercase leading-[0.92] tracking-[-0.01em] lg:text-[clamp(2.55rem,min(7.4vw,8.2vh),7rem)]"
          >
            {hero.titleLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className={cn('block', i >= 2 ? 'text-sun' : 'text-cream')}
                  variants={lineReveal}
                  custom={i}
                  initial={reduce ? false : 'hidden'}
                  animate="show"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            custom={0.6}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="mt-[clamp(10px,1.8vh,26px)] text-[clamp(0.95rem,2.2vh,1.1rem)] font-light text-cream/90 md:text-[clamp(1.02rem,2.4vh,1.5rem)]"
          >
            {hero.coPowered}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.75}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="mt-[clamp(14px,2.4vh,36px)] flex flex-wrap gap-3 sm:gap-4"
          >
            <Button href={registerHref} variant="sun" size="lg" icon={ArrowRight} className={compactOnPhones}>
              {hero.register.label}
            </Button>
            <Button to={hero.explore.to} variant="glass" size="lg" className={compactOnPhones}>
              {hero.explore.label}
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          custom={0.95}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="mt-[clamp(18px,3.2vh,40px)] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-9">
            {site.countdown.enabled && (
              <Countdown target={site.countdown.target} targetLabel={site.countdown.targetLabel} tba={site.countdown.datesToBeAnnounced} />
            )}
            {/* on short phones the dates and venue give way so the hero still fits one screen */}
            <ul className="space-y-2 whitespace-nowrap text-[14px] text-cream/90 sm:text-[15.5px] max-md:[@media(max-height:660px)]:hidden">
              <li className="flex items-center gap-3">
                <CalendarDays size={18} strokeWidth={1.6} className="shrink-0 text-gold-soft" aria-hidden="true" />
                {site.dates.full}
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} strokeWidth={1.6} className="shrink-0 text-gold-soft" aria-hidden="true" />
                {site.location.full}
              </li>
              <li className="flex items-center gap-3 max-md:hidden">
                <Landmark size={18} strokeWidth={1.6} className="shrink-0 text-gold-soft" aria-hidden="true" />
                {hero.organiser}
              </li>
            </ul>
          </div>

          <a
            href="#welcome"
            onClick={(e) => {
              e.preventDefault();
              scrollToWelcome();
            }}
            className="group hidden items-center gap-4 self-end pb-2 text-[11px] xl:flex font-medium uppercase tracking-[0.36em] text-cream/75 transition hover:text-cream"
          >
            {hero.scrollLabel}
            <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-cream/20">
              <span className="scroll-cue absolute inset-0 bg-gold-soft" />
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Ticker ── */}
      <Marquee
        items={hero.ticker}
        label="WISF 2027 highlights"
        duration={48}
        className="absolute inset-x-0 bottom-0 h-[52px] items-center border-t border-gold/30 bg-navy-deep/70 backdrop-blur-md"
        itemClassName="text-[11px] font-medium uppercase tracking-[0.3em] text-cream/80 sm:text-[12px]"
        diamondClassName="bg-gold"
      />
    </section>
  );
}
