import { useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mascotsHero, ray, sun, type Mascot } from '../../data/mascots';
import { usePauseOffscreen } from '../../hooks/usePauseOffscreen';
import { usePointerLean } from '../../hooks/usePointerLean';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';
import Fireworks from '../ornaments/Fireworks';
import GoldCloud from '../ornaments/GoldCloud';
import MascotArt from '../ornaments/MascotArt';
import { FallingPetals, GoldDust, SkyLanterns } from '../ornaments/Particles';
import Ridge from '../ornaments/Ridge';
import RisingSun from '../ornaments/RisingSun';
import StarField from '../ornaments/StarField';
import { Diamond } from '../ui/DividerLabel';

/* The night sky is the same size as the page and clipped along a diagonal. Moving the wrapper one way and its
   contents the other slides the diagonal with transforms alone, so the sky never has to repaint. */
const NIGHT_CLIP = 'lg:[clip-path:polygon(56%_0,130%_0,130%_100%,44%_100%)] max-lg:[clip-path:polygon(-30%_55%,130%_40%,130%_100%,-30%_100%)]';
const SLIDE = 'transition-transform duration-700 ease-[cubic-bezier(0.22,0.8,0.24,1)]';

function NameLink({ mascot, align, delay, className }: { mascot: Mascot; align: 'left' | 'right'; delay: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn('absolute z-40', className)}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      <Link
        to={{ hash: `#${mascot.id}` }}
        className={cn(
          'group block rounded-2xl max-lg:bg-navy-deep/85 max-lg:px-4 max-lg:py-2 max-lg:ring-1 max-lg:ring-gold/50',
          align === 'right' && 'text-right',
        )}
      >
        <span className="text-sun block [animation:none] text-[clamp(1.9rem,min(8.5vw,11.5vh),6.6rem)] font-bold uppercase leading-[0.95] tracking-[0.05em]">{mascot.name}</span>
        <span
          className={cn(
            'mt-1 flex items-center gap-2 text-[10px] font-medium uppercase leading-snug tracking-[0.14em] text-cream/90 sm:text-[12px] lg:tracking-[0.2em]',
            align === 'right' && 'justify-end',
          )}
        >
          {mascot.tagline}
          <ArrowDown size={15} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-gold-soft transition-transform duration-300 group-hover:translate-y-1" />
        </span>
      </Link>
    </motion.div>
  );
}

function Layer({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      {children}
    </div>
  );
}

/**
 * Opening screen: dawn on one side of a slanted line and night on the other,
 * with Sun rising behind the mountains and Ray looking across at her. The line
 * leans away from whichever mascot the mouse is near.
 */
export default function MascotsHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  usePauseOffscreen(ref);
  const { x, y, onPointerMove: leanTo } = usePointerLean();
  const [near, setNear] = useState<'sun' | 'ray' | null>(null);

  const farX = useTransform(x, (v) => v * 14);
  const farY = useTransform(y, (v) => v * 8);
  const artX = useTransform(x, (v) => v * -16);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    leanTo(e);
    if (reduce || e.pointerType !== 'mouse') return;
    const box = e.currentTarget.getBoundingClientRect();
    const side = e.clientX - box.left < box.width / 2 ? 'sun' : 'ray';
    if (side !== near) setNear(side);
  };

  const split = near === 'sun' ? '4%' : near === 'ray' ? '-4%' : '0%';

  return (
    <section
      ref={ref}
      aria-labelledby="mascots-title"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setNear(null)}
      className="panel relative isolate min-h-panel overflow-hidden bg-navy-deep max-lg:min-h-[max(640px,calc(100svh-var(--nav-h)))]"
      style={cssVars({ '--split': split })}
    >
      {/* ── Dawn ── */}
      <Layer className="bg-gradient-to-b from-[#FDF4E0] via-[#FCE8C2] to-[#F9D49B]">
        <motion.div className="absolute inset-0" style={{ x: farX, y: farY }}>
          <RisingSun className="absolute left-1/2 top-[6%] w-[94%] -translate-x-1/2 sm:w-[60%] lg:bottom-0 lg:left-[27%] lg:top-auto lg:w-[min(50%,calc((100svh-var(--nav-h))*0.92))]" />
          <GoldCloud variant="a" eager className="-left-20 top-[3%] w-56 opacity-70 sm:w-80" />
          <GoldCloud variant="b" eager flip className="left-[30%] top-[2%] hidden w-56 opacity-60 lg:block" />
        </motion.div>
        <Ridge seed={21} from="#DDB08C" to="#EFC79A" className="absolute inset-x-0 bottom-0 h-[24%] max-lg:bottom-[38%] lg:h-[min(40%,30vw)]" />
        <Ridge seed={8} from="#C4876C" to="#E0A97E" rough={0.5} className="absolute inset-x-0 bottom-0 h-[20%] max-lg:bottom-[36%] lg:h-[min(33%,25vw)]" />
        <FallingPetals kind="feather" count={9} seed={13} className="max-sm:[&>*:nth-child(even)]:hidden" />
      </Layer>

      {/* ── Sun: in front of the night on wide screens, cut off by it on phones (which hides the hem of her robe) ── */}
      <div className="absolute z-10 w-[min(84vw,46svh)] max-lg:left-1/2 max-lg:top-[10.5%] max-lg:-translate-x-1/2 lg:bottom-0 lg:left-[5%] lg:translate-y-[14%] lg:z-30 lg:w-[min(46vw,calc((100svh-var(--nav-h))*0.92))] xl:left-[6%]">
        <motion.div style={{ x: artX }}>
          <MascotArt name="sun" eager excited={near === 'sun'} className="w-full" />
        </motion.div>
      </div>

      {/* ── Night ── */}
      <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 z-20 [transform:translateX(var(--split))]', SLIDE, NIGHT_CLIP)}>
        <div className={cn('absolute inset-0 bg-gradient-to-b from-navy-deep via-night to-night-2 [transform:translateX(calc(var(--split)*-1))]', SLIDE)}>
          {/* stars clipped away by the slanted edge can't animate on the compositor, so only those well inside it twinkle */}
          <StarField count={80} seed={52} twinkle={false} className="absolute inset-0" />
          <StarField count={50} seed={53} className="absolute inset-x-0 bottom-0 top-[56%] lg:inset-y-0 lg:left-[60%]" />
          <Fireworks className="absolute inset-x-0 top-0 h-[70%] w-full opacity-80" />
          <SkyLanterns count={7} seed={31} className="max-sm:[&>*:nth-child(even)]:hidden" />
          {/* moon */}
          <span className="absolute right-[6%] top-[46%] h-14 w-14 rounded-full bg-[#F4E7C2] shadow-[0_0_60px_18px_rgba(230,207,148,0.28),inset_-10px_-6px_0_0_rgba(201,162,74,0.45)] lg:right-[4%] lg:top-[8%] lg:h-20 lg:w-20" />
          <div
            className="absolute left-[78%] top-[70%] aspect-square w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full motion-safe:animate-glow-pulse lg:left-[72%] lg:top-[50%] lg:w-[52%]"
            style={{ background: 'radial-gradient(circle, rgba(229,69,95,0.42) 0%, rgba(224,123,57,0.2) 42%, transparent 68%)' }}
          />
          <Ridge seed={34} from="#3B2A7A" to="#241A62" className="absolute inset-x-0 bottom-0 h-[28%] lg:h-[min(40%,30vw)]" />
          <Ridge seed={12} from="#241A62" to="#150F45" rough={0.5} className="absolute inset-x-0 bottom-0 h-[20%] lg:h-[min(33%,25vw)]" />
          <GoldDust tone="ember" count={16} seed={23} />
        </div>
      </div>

      {/* ── The slanted line ── */}
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className={cn('pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible [transform:translateX(var(--split))]', SLIDE)}>
        <g className="hidden lg:block">
          <line x1="56" y1="0" x2="44" y2="100" stroke="#F6C76B" strokeOpacity="0.35" strokeWidth="8" vectorEffect="non-scaling-stroke" />
          <line x1="56" y1="0" x2="44" y2="100" stroke="#FFF1C9" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </g>
        <g className="lg:hidden">
          <line x1="-10" y1="56.5" x2="110" y2="38.5" stroke="#F6C76B" strokeOpacity="0.35" strokeWidth="8" vectorEffect="non-scaling-stroke" />
          <line x1="-10" y1="56.5" x2="110" y2="38.5" stroke="#FFF1C9" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>

      {/* ── Ray, looking across at Sun ── */}
      <div className="absolute z-30 w-[min(84vw,46svh)] max-lg:bottom-[-5%] max-lg:left-1/2 max-lg:-translate-x-[47%] lg:bottom-0 lg:right-[4%] lg:translate-y-[12%] lg:w-[min(45vw,calc((100svh-var(--nav-h))*0.86))] xl:right-[6%]">
        <motion.div style={{ x: artX }}>
          <MascotArt name="ray" eager excited={near === 'ray'} className="w-full" />
        </motion.div>
      </div>

      {/* ── The mountains in front, and the names on them ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] h-[9%] lg:h-[min(25%,18vw)]">
        <Ridge seed={5} from="#23195F" to="#0A1230" rough={0.48} className="absolute inset-x-0 bottom-0 hidden h-full lg:block" />
        <Ridge seed={44} from="#101A45" to="#0A1230" rough={0.5} className="absolute inset-x-0 bottom-0 h-full lg:h-[66%]" />
      </div>

      <NameLink mascot={sun} align="left" delay={0.45} className="max-lg:left-3 max-lg:top-[42%] lg:bottom-[clamp(12px,3vh,30px)] lg:left-16" />
      <NameLink mascot={ray} align="right" delay={0.6} className="max-lg:bottom-3 max-lg:right-3 lg:bottom-[clamp(12px,3vh,30px)] lg:right-16" />

      <Link
        to={{ hash: '#sun' }}
        className="group absolute bottom-[clamp(10px,2.4vh,24px)] left-1/2 z-40 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-cream/75 transition hover:text-cream xl:flex"
      >
        {mascotsHero.scrollLabel}
        <span aria-hidden="true" className="relative h-9 w-px overflow-hidden bg-cream/20">
          <span className="scroll-cue absolute inset-0 bg-gold-soft" />
        </span>
      </Link>

      {/* ── Page title, on the line ── */}
      <div className="absolute left-1/2 top-[clamp(10px,2.6vh,28px)] z-40 w-max max-w-[calc(100vw-32px)] -translate-x-1/2 lg:left-[54.5%]">
        <motion.div
          className="rounded-2xl bg-navy-deep/90 px-4 py-2 text-center shadow-[0_18px_40px_-18px_rgba(10,18,48,0.8)] ring-1 ring-gold/60 sm:px-7 sm:py-3"
          initial={reduce ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          <p className="flex items-center justify-center gap-2 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.18em] text-gold-soft sm:text-[10.5px] sm:tracking-[0.24em]">
            <Diamond className="bg-saffron" />
            {mascotsHero.eyebrow}
            <Diamond className="bg-saffron" />
          </p>
          <h1 id="mascots-title" className="mt-0.5 whitespace-nowrap text-[clamp(1.05rem,3.2vh,1.75rem)] font-semibold uppercase tracking-[0.12em] text-cream sm:tracking-[0.14em]">
            {mascotsHero.title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
