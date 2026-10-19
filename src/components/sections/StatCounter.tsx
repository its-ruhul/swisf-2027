import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { accentText, type Accent } from '../../lib/accents';
import { cn } from '../../lib/cn';

type StatCounterProps = {
  /** Numeric target to count up to; null renders `display` as-is (e.g. ∞) */
  value: number | null;
  display: string;
  accent: Accent;
  className?: string;
};

/** Large coloured number that counts up once when scrolled into view. */
export default function StatCounter({ value, display, accent, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(value === null || reduce ? null : 0);

  useEffect(() => {
    if (!inView || value === null || reduce) return undefined;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setCurrent(Math.round(v)),
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
