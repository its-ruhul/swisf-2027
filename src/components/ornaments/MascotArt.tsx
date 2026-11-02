import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useAnimationControls, useReducedMotion, type Variants } from 'framer-motion';
import layout from '../../assets/images/mascots/layout.json';
import rayBodySmall from '../../assets/images/mascots/ray-body-sm.webp';
import rayBody from '../../assets/images/mascots/ray-body.webp';
import rayWingLeftSmall from '../../assets/images/mascots/ray-wing-left-sm.webp';
import rayWingLeft from '../../assets/images/mascots/ray-wing-left.webp';
import rayWingRightSmall from '../../assets/images/mascots/ray-wing-right-sm.webp';
import rayWingRight from '../../assets/images/mascots/ray-wing-right.webp';
import sunBodySmall from '../../assets/images/mascots/sun-body-sm.webp';
import sunBody from '../../assets/images/mascots/sun-body.webp';
import sunWingLeftSmall from '../../assets/images/mascots/sun-wing-left-sm.webp';
import sunWingLeft from '../../assets/images/mascots/sun-wing-left.webp';
import sunWingRightSmall from '../../assets/images/mascots/sun-wing-right-sm.webp';
import sunWingRight from '../../assets/images/mascots/sun-wing-right.webp';
import type { MascotName } from '../../data/mascots';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';
import { EASE_IN_VIEW, EASE_OUT_OF_VIEW } from '../ui/Reveal';

type Files = { small: string; large: string };

const srcSet = (files: Files, smallWidth: number, largeWidth: number) => `${files.small} ${smallWidth}w, ${files.large} ${largeWidth}w`;

/**
 * How wide a layer is drawn, given its share of the figure's width. It is one rule for every
 * panel, so they all choose the same file and the browser never downloads both sizes. Below
 * 1024px it understates the true width (up to 460px or 92vw): the extra pixels of the large
 * files can't be seen on a phone or tablet, so those stay on the small ones.
 */
const drawnWidth = (share = 1) => `(min-width: 1024px) ${46 * share}vw, (min-width: 500px) ${440 * share}px, ${70 * share}vw`;

const ART = {
  sun: {
    body: { small: sunBodySmall, large: sunBody },
    wings: {
      left: { small: sunWingLeftSmall, large: sunWingLeft },
      right: { small: sunWingRightSmall, large: sunWingRight },
    },
    // Sun's feathered wings beat slowly and gently; Ray's are quicker and wider
    period: 5.6,
    beat: 2.4,
    float: -7,
    // where the sparks fly from: her open palm
    burst: { x: 35, y: 47, colours: ['#FFF1C9', '#F6C76B', '#E9B954'] },
    // glints on the crown and in the palm, in % of the artwork
    sparkles: [
      { x: 49.3, y: 4.5, size: 22, delay: 0 },
      { x: 66.5, y: 15, size: 16, delay: 1.3 },
      { x: 36, y: 13, size: 15, delay: 2.2 },
      { x: 58.5, y: 6.5, size: 13, delay: 3.1 },
      { x: 35, y: 47, size: 26, delay: 0.7 },
    ],
  },
  ray: {
    body: { small: rayBodySmall, large: rayBody },
    wings: {
      left: { small: rayWingLeftSmall, large: rayWingLeft },
      right: { small: rayWingRightSmall, large: rayWingRight },
    },
    period: 3.8,
    beat: 3.4,
    float: -5,
    // a puff of embers from his nose
    burst: { x: 19, y: 20, colours: ['#FFE7B0', '#F29A5E', '#E5455F'] },
    sparkles: [
      { x: 30.6, y: 16.7, size: 13, delay: 0.4 },
      { x: 64.6, y: 14, size: 15, delay: 1.7 },
      { x: 6.4, y: 20.3, size: 13, delay: 2.8 },
    ],
  },
} as const;

const SIDES = ['left', 'right'] as const;
type Side = (typeof SIDES)[number];

/** Left wing folds anticlockwise, right wing clockwise. */
const towardsBody = (side: Side) => (side === 'left' ? -1 : 1);

const wingVariants: Variants = {
  hidden: (side: Side) => ({ rotate: 20 * towardsBody(side), opacity: 0, transition: { duration: 0.45, ease: EASE_OUT_OF_VIEW } }),
  show: { rotate: 0, opacity: 1, transition: { rotate: { type: 'spring', stiffness: 55, damping: 9 }, opacity: { duration: 0.5 } } },
  // lift, drop past rest, settle
  flap: (side: Side) => ({
    rotate: [0, -7, 4, -2, 0].map((deg) => deg * towardsBody(side)),
    opacity: 1,
    transition: { duration: 1.15, ease: 'easeInOut' },
  }),
};

const figureVariants: Variants = {
  hidden: { opacity: 0, y: '8%', scale: 0.96, transition: { duration: 0.5, ease: EASE_OUT_OF_VIEW } },
  show: { opacity: 1, y: '0%', scale: 1, transition: { duration: 1, ease: EASE_IN_VIEW } },
};

/** Four-point star that twinkles on the spot. */
function Sparkle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="sparkle absolute"
      style={cssVars({ '--delay': `${delay}s` }, { left: `${x}%`, top: `${y}%`, width: size, height: size })}
    >
      <path d="M12 0C12.8 7.6 16.4 11.2 24 12C16.4 12.8 12.8 16.4 12 24C11.2 16.4 7.6 12.8 0 12C7.6 11.2 11.2 7.6 12 0Z" fill="#FFF6D8" />
    </svg>
  );
}

/** A one-shot ring of sparks; remounted with a new key to play again. */
function Burst({ x, y, colours }: { x: number; y: number; colours: readonly string[] }) {
  return (
    <span aria-hidden="true" className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="burst-dot absolute -ml-1 -mt-1 h-2 w-2 rounded-full"
          style={cssVars(
            { '--a': `${i * (360 / 14) + (i % 2) * 9}deg`, '--d': `${46 + ((i * 37) % 54)}px` },
            { backgroundColor: colours[i % colours.length], boxShadow: `0 0 8px ${colours[i % colours.length]}` },
          )}
        />
      ))}
    </span>
  );
}

type MascotArtProps = {
  name: MascotName;
  /** Accessible description; leave empty where the mascot is decorative */
  alt?: string;
  /** Load straight away (use in the first screen) */
  eager?: boolean;
  /** Flaps and throws sparks each time this turns true (e.g. hovering a larger area) */
  excited?: boolean;
  /** Drawn inside the artwork's box, behind the figure */
  behind?: ReactNode;
  /** Drawn over the figure and moving with it */
  children?: ReactNode;
  /** Size with a width class: the height follows the artwork */
  className?: string;
};

/**
 * A mascot in three layers. The wings beat around the shoulders and unfold as
 * the figure rises into view; hover or tap makes them flap and throws sparks.
 * Everything animates transform and opacity only, and nothing shows until all
 * three layers have loaded, so a wing never pops in late.
 */
export default function MascotArt({ name, alt = '', eager = false, excited = false, behind, children, className }: MascotArtProps) {
  const art = ART[name];
  const box = layout[name];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useScrollReveal(ref);
  const loaded = useRef(0);
  const [ready, setReady] = useState(false);
  const wings = useAnimationControls();
  const [burst, setBurst] = useState(0);
  const lastReaction = useRef(0);

  const visible = ready && inView;

  const onLayerLoaded = () => {
    loaded.current += 1;
    if (loaded.current >= 3) setReady(true);
  };

  useEffect(() => {
    wings.start(visible || reduce ? 'show' : 'hidden');
  }, [visible, reduce, wings]);

  const react = useCallback(() => {
    if (reduce || !visible) return;
    const now = performance.now();
    if (now - lastReaction.current < 1300) return;
    lastReaction.current = now;
    wings.start('flap');
    setBurst((n) => n + 1);
  }, [reduce, visible, wings]);

  useEffect(() => {
    if (excited) react();
  }, [excited, react]);

  const shared = {
    decoding: 'async',
    loading: eager ? 'eager' : 'lazy',
    draggable: false,
    onLoad: onLayerLoaded,
    onError: onLayerLoaded,
  } as const;

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      style={{ aspectRatio: `${box.width} / ${box.height}` }}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') react();
      }}
      onClick={react}
    >
      {behind}
      <motion.div className="absolute inset-0" variants={figureVariants} initial={reduce ? false : 'hidden'} animate={visible || reduce ? 'show' : 'hidden'}>
        <div className="mascot-float absolute inset-0" style={cssVars({ '--float': `${art.float}px`, '--period': `${art.period * 1.5}s` })}>
          {SIDES.map((side) => {
            const wing = box[side];
            const origin = `${wing.originX}% ${wing.originY}%`;
            return (
              <motion.div
                key={side}
                className="absolute"
                style={{ left: `${wing.left}%`, top: `${wing.top}%`, width: `${wing.width}%`, height: `${wing.height}%`, transformOrigin: origin }}
                custom={side}
                variants={wingVariants}
                initial={reduce ? false : 'hidden'}
                animate={wings}
              >
                <img
                  {...shared}
                  sizes={drawnWidth(wing.width / 100)}
                  srcSet={srcSet(art.wings[side], wing.smallWidth, wing.pixelWidth)}
                  src={art.wings[side].small}
                  alt=""
                  aria-hidden="true"
                  width={wing.pixelWidth}
                  height={wing.pixelHeight}
                  className="mascot-wing block h-full w-full select-none"
                  style={cssVars(
                    { '--beat': `${art.beat * (side === 'left' ? 1 : -1)}deg`, '--period': `${art.period}s` },
                    { transformOrigin: origin },
                  )}
                />
              </motion.div>
            );
          })}
          <img
            {...shared}
            sizes={drawnWidth()}
            srcSet={srcSet(art.body, box.smallWidth, box.width)}
            src={art.body.small}
            alt={alt}
            aria-hidden={alt ? undefined : true}
            width={box.width}
            height={box.height}
            className="absolute inset-0 block h-full w-full select-none"
            {...(eager ? { fetchpriority: 'high' } : {})}
          />
          {art.sparkles.map((sparkle) => (
            <Sparkle key={`${sparkle.x}-${sparkle.y}`} {...sparkle} />
          ))}
          {burst > 0 && <Burst key={burst} {...art.burst} />}
          {children}
        </div>
      </motion.div>
    </div>
  );
}
