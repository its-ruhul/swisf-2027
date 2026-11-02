import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { sun } from '../../data/mascots';
import { usePauseOffscreen } from '../../hooks/usePauseOffscreen';
import { usePointerLean } from '../../hooks/usePointerLean';
import AtomOrbit from '../ornaments/AtomOrbit';
import { ChineseKnot, PeachCloud, SwirlBorder } from '../ornaments/Decor';
import GoldCloud from '../ornaments/GoldCloud';
import MascotArt from '../ornaments/MascotArt';
import { FallingPetals } from '../ornaments/Particles';
import Ridge from '../ornaments/Ridge';
import RisingSun from '../ornaments/RisingSun';
import Seigaiha from '../ornaments/Seigaiha';
import MascotCopy, { MascotCallout } from './MascotCopy';

/* The disc and the figure are separate layers (mountains pass between them) in the same box. */
const ART_BOX = 'lg:absolute lg:bottom-0 lg:right-[1%] lg:translate-y-[11%] lg:w-[min(46%,calc((100svh-var(--nav-h))*0.83))] xl:right-[2%] 2xl:right-[-6%] 2xl:w-[min(52%,calc((100svh-var(--nav-h))*0.83))]';

/**
 * Sun at dawn: she rises from behind the mountains with the sun at her back and
 * a mandala turning behind her crown. The nearest ridge is the same navy as the
 * top of the next panel, so morning runs straight into Ray's night.
 */
export default function MeetSun() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  usePauseOffscreen(ref);
  const { x, y, onPointerMove } = usePointerLean();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rise = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);
  const farY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, -24]);
  const midY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, -12]);
  const leanX = useTransform(x, (v) => v * -18);
  const leanY = useTransform(y, (v) => v * -10);
  const skyX = useTransform(x, (v) => v * 14);

  return (
    <section
      ref={ref}
      id="sun"
      aria-labelledby="sun-heading"
      onPointerMove={onPointerMove}
      className="panel relative isolate flex min-h-panel flex-col overflow-hidden bg-cream [scroll-margin-top:-16px]"
    >
      <Seigaiha background="#FAF6EE" className="-z-20 opacity-30" />
      <SwirlBorder className="relative z-10 !h-7 shrink-0 sm:!h-9" />

      {/* warm sky behind her, fading into the paper under the text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{ background: 'radial-gradient(70% 90% at 78% 46%, rgba(251,201,138,0.95) 0%, rgba(249,222,143,0.72) 38%, rgba(250,246,238,0) 78%)' }}
      />

      <ChineseKnot className="absolute left-1 top-7 z-10 hidden w-12 sm:block lg:w-14" />
      <PeachCloud className="absolute -left-28 top-[42%] -z-10 w-80 opacity-60" />
      <GoldCloud variant="b" flip className="-right-16 top-[36%] w-48 opacity-70 sm:w-72" />
      <AtomOrbit className="absolute left-[43%] top-[11%] hidden w-16 opacity-90 xl:block" />

      {/* far ranges, behind her */}
      <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[min(46%,340px)] lg:h-[46%]" style={{ y: farY }}>
        <Ridge seed={73} snow from="#E9C49C" to="#F2CFA5" tilt={0.34} className="absolute inset-x-0 bottom-0 h-[82%]" />
      </motion.div>
      <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[min(34%,250px)] lg:h-[34%]" style={{ y: midY }}>
        <Ridge seed={15} from="#CD9478" to="#E3B086" tilt={0.4} rough={0.5} className="absolute inset-x-0 bottom-0 h-[76%]" />
      </motion.div>

      <div className="container-x relative flex w-full flex-1 flex-col lg:flex-row lg:items-center">
        <MascotCopy mascot={sun} tone="light" motif="sun" className="relative z-20 pt-10 sm:pl-14 lg:w-[50%] lg:py-[clamp(10px,2vh,28px)] lg:pb-[clamp(40px,7.4vh,90px)] lg:pl-14 xl:w-[49%]" />

        {/* the sun at her back */}
        <div className={`absolute inset-x-0 bottom-0 -z-20 h-[min(118vw,540px)] lg:inset-x-auto lg:aspect-[823/1000] lg:h-auto ${ART_BOX}`}>
          <div className="absolute left-1/2 top-0 w-[min(112vw,540px)] -translate-x-1/2 lg:top-[-3%] lg:w-[112%]">
            <motion.div style={{ x: skyX, y: rise }}>
              <RisingSun className="relative w-full" />
            </motion.div>
          </div>
        </div>

        {/* her robe runs down behind the nearest ridge */}
        <div className={`relative z-10 mx-auto -mb-[9%] mt-6 w-[min(92vw,460px)] lg:mb-0 lg:mt-0 ${ART_BOX}`}>
          <motion.div style={{ x: leanX, y: leanY }}>
            <MascotArt name="sun" alt={sun.alt} className="w-full">
              {sun.callouts.map((callout, i) => (
                <MascotCallout key={callout.title} callout={callout} tone="light" delay={0.7 + i * 0.35} />
              ))}
            </MascotArt>
          </motion.div>
        </div>
      </div>

      <FallingPetals kind="feather" count={12} seed={29} className="z-10 max-sm:[&>*:nth-child(even)]:hidden" />

      {/* nearest ridges, in front of her */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[clamp(70px,17vh,170px)] lg:h-[clamp(70px,min(17vh,14vw),170px)]">
        <Ridge seed={58} from="#5A3A63" to="#231B5C" tilt={0.5} rough={0.5} className="absolute inset-x-0 bottom-0 h-full" />
        <Ridge seed={90} from="#14143F" to="#0A1230" tilt={0.42} rough={0.46} className="absolute inset-x-0 bottom-0 h-[64%]" />
      </div>
    </section>
  );
}
