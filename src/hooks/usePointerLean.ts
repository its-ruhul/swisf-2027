import type { PointerEvent } from 'react';
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Where the mouse is over an element, smoothed: `x` and `y` run from -0.5 to 0.5.
 * Touch input is ignored, so phones never run the springs.
 */
export function usePointerLean() {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 50, damping: 18 });
  const y = useSpring(rawY, { stiffness: 50, damping: 18 });

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const box = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - box.left) / box.width - 0.5);
    rawY.set((e.clientY - box.top) / box.height - 0.5);
  };

  return { x, y, onPointerMove };
}
