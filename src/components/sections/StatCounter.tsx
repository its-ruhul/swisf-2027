import { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { accentText, type Accent } from '../../lib/accents';
import { cn } from '../../lib/cn';

type StatCounterProps = {
  /** Numeric target to count up to; null renders `display` as-is (e.g. ∞) */
  value: number | null;
  display: string;
  accent: Accent;
  className?: string;
};

/** Large coloured number that counts up every time it scrolls into view, and back down when you scroll up past it. */
export default function StatCounter({ value, display, accent, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useScrollReveal(ref);
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(value === null || reduce ? null : 0);

  // always runs from the number currently shown, so a quick scroll back and forth never jumps
  const shownRef = useRef(0);
  useEffect(() => {
    if (value === null || reduce) return undefined;
    const controls = animate(shownRef.current, inView ? value : 0, {
      duration: inView ? 1.2 : 0.6,
      ease: inView ? 'easeOut' : 'easeIn',
      onUpdate: (v) => {
        shownRef.current = v;
        setCurrent(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={cn('block text-4xl font-bold leading-none sm:text-[2.6rem]', accentText[accent], className)}>
      <span aria-hidden="true">{value === null || current === null ? display : current}</span>
      <span className="sr-only">{display}</span>
    </span>
  );
}
