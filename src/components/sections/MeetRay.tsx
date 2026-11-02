import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ray } from '../../data/mascots';
import { usePauseOffscreen } from '../../hooks/usePauseOffscreen';
import { usePointerLean } from '../../hooks/usePointerLean';
import { cssVars } from '../../lib/cssVars';
import CircuitTraces from '../ornaments/CircuitTraces';
import { FestivalBand } from '../ornaments/Decor';
import Fireworks from '../ornaments/Fireworks';
import GoldCloud from '../ornaments/GoldCloud';
import Lantern from '../ornaments/Lantern';
import MascotArt from '../ornaments/MascotArt';
import { GoldDust, SkyLanterns } from '../ornaments/Particles';
import Ridge from '../ornaments/Ridge';
import StarField from '../ornaments/StarField';
import MascotCopy, { MascotCallout } from './MascotCopy';

const BEAMS = [
  { left: '54%', from: -24, to: 8, dur: 9, delay: 0, colour: 'rgba(188, 155, 243, 0.2)' },
  { left: '67%', from: -12, to: 18, dur: 7, delay: -2, colour: 'rgba(242, 154, 94, 0.18)' },
  { left: '80%', from: 16, to: -14, dur: 8, delay: -4, colour: 'rgba(147, 170, 240, 0.17)' },
  { left: '92%', from: 4, to: -26, dur: 10, delay: -1, colour: 'rgba(229, 69, 95, 0.17)' },
];

/** The crag Ray sits on: its top meets his claws, and his tail hangs down in front of it. */
function Perch() {
  const crest = 'M0 100L5 74L12 66L17 50L23 44L29 22L36 15L44 12L55 13L63 12L70 19L74 34L80 40L85 58L91 66L96 84L100 100';
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute bottom-[-16%] left-[-22%] h-[38%] w-[144%]">
      <defs>
        <linearGradient id="ray-perch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A2A78" />
          <stop offset="0.5" stopColor="#1C1552" />
          <stop offset="1" stopColor="#0A1230" />
        </linearGradient>
      </defs>
      <path d={`${crest}Z`} fill="url(#ray-perch)" />
      {/* facets catching the glow behind him */}
      <g fill="#E07B39" fillOpacity="0.13">
        <path d="M29 22L36 15L40 40L31 62L24 50Z" />
        <path d="M55 13L63 12L70 19L66 46L58 60L52 36Z" />
        <path d="M74 34L80 40L85 58L80 78L72 60Z" />
      </g>
      <g fill="#0A1230" fillOpacity="0.28">
        <path d="M12 66L17 50L24 50L31 62L22 90Z" />
        <path d="M40 40L52 36L58 60L46 86L31 62Z" />
      </g>
      <path d={crest} fill="none" stroke="#F29A5E" strokeOpacity="0.55" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * Ray at night: stage lights sweep behind him, fireworks go up and embers rise
 * around the rock he guards. The band along the bottom is the festival's.
 */
export default function MeetRay() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  usePauseOffscreen(ref);
  const { x, y, onPointerMove } = usePointerLean();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const farY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [34, -22]);
  const midY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, -10]);
  const moonY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const leanX = useTransform(x, (v) => v * -18);
  const leanY = useTransform(y, (v) => v * -10);

  return (
    <section
      ref={ref}
      id="ray"
      aria-labelledby="ray-heading"
      onPointerMove={onPointerMove}
      className="panel relative isolate flex min-h-panel flex-col overflow-hidden text-cream [scroll-margin-top:-16px]"
      style={{ background: 'linear-gradient(180deg, #0A1230 0%, #1A1240 44%, #2A1A5E 80%, #3D1A5C 100%)' }}
    >
      <StarField count={130} seed={64} className="absolute inset-0 -z-20 h-full w-full" />
      <Fireworks className="absolute inset-x-0 top-0 -z-20 h-[62%] w-full opacity-70 max-lg:bottom-[6%] max-lg:top-auto max-lg:h-[40%]" />
      <SkyLanterns count={7} seed={47} className="-z-20 max-sm:[&>*:nth-child(even)]:hidden" />

      <motion.span
        aria-hidden="true"
        className="absolute left-[44%] top-[7%] -z-10 hidden h-16 w-16 rounded-full bg-[#F4E7C2] shadow-[0_0_70px_20px_rgba(230,207,148,0.26),inset_-11px_-7px_0_0_rgba(201,162,74,0.45)] xl:block"
        style={{ y: moonY }}
      />

      {/* concert light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {BEAMS.map((beam) => (
          <span
            key={beam.left}
            className="stage-beam absolute bottom-[8%] h-[92%] w-[min(28vw,300px)] max-lg:hidden"
            style={cssVars(
              { '--from': `${beam.from}deg`, '--to': `${beam.to}deg`, '--dur': `${beam.dur}s`, '--delay': `${beam.delay}s` },
              { left: beam.left, background: `linear-gradient(to top, ${beam.colour}, transparent 92%)` },
            )}
          />
        ))}
      </div>

      {/* the furnace glow behind him */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-6%] right-[-30%] -z-10 aspect-square w-[150%] rounded-full motion-safe:animate-glow-pulse lg:right-[3%] lg:w-[52%]"
        style={{ background: 'radial-gradient(circle, rgba(229,69,95,0.55) 0%, rgba(224,123,57,0.3) 40%, transparent 68%)' }}
      />

      <CircuitTraces animated={false} flip="x" density="light" terminalFill="#0A1230" className="absolute -right-3 top-0 -z-10 w-28 opacity-60 sm:w-40" />
      <GoldCloud variant="a" className="-left-24 top-[46%] -z-10 w-72 opacity-20 sm:w-96" />
      <div aria-hidden="true" className="absolute left-[1.5%] top-0 -z-10 hidden gap-4 lg:flex">
        <Lantern className="w-7" stringLength={18} />
        <Lantern className="w-9" stringLength={44} delay={0.8} />
      </div>

      {/* ranges behind him */}
      <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[min(40%,300px)] lg:h-[40%]" style={{ y: farY }}>
        <Ridge seed={81} from="#4A3590" to="#2A1F6C" tilt={0.34} className="absolute inset-x-0 bottom-0 h-[92%]" />
      </motion.div>
      <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[min(30%,220px)] lg:h-[30%]" style={{ y: midY }}>
        <Ridge seed={27} from="#2A1F6C" to="#150F45" tilt={0.28} rough={0.5} className="absolute inset-x-0 bottom-0 h-[84%]" />
      </motion.div>

      <div className="container-x relative flex w-full flex-1 flex-col lg:flex-row lg:items-center">
        <MascotCopy mascot={ray} tone="dark" motif="lantern" className="relative z-20 pt-12 sm:pl-14 lg:w-[50%] lg:py-[clamp(10px,2vh,28px)] lg:pb-[clamp(12px,3vh,60px)] lg:pl-14 lg:pt-[clamp(20px,4vh,56px)] xl:w-[47%]" />

        <motion.div
          className="relative z-10 mx-auto mb-10 mt-4 w-[min(92vw,450px)] lg:absolute lg:bottom-[clamp(40px,6.2vh,60px)] lg:right-[1%] lg:my-0 lg:w-[min(46%,calc((100svh-var(--nav-h)-60px)*0.74))] xl:right-[5%] 2xl:right-[-5%] 2xl:w-[min(56%,calc((100svh-var(--nav-h)-60px)*0.74))]"
          style={{ x: leanX, y: leanY }}
        >
          <MascotArt name="ray" alt={ray.alt} behind={<Perch />} className="w-full">
            {ray.callouts.map((callout, i) => (
              <MascotCallout key={callout.title} callout={callout} tone="dark" delay={0.7 + i * 0.35} />
            ))}
          </MascotArt>
        </motion.div>
      </div>

      <GoldDust tone="ember" count={18} seed={9} className="z-10 max-sm:[&>*:nth-child(even)]:hidden" />

      <div className="relative z-20 shrink-0">
        <FestivalBand className="!h-9 sm:!h-11" />
      </div>
    </section>
  );
}
