import { useEffect, type RefObject } from 'react';

/**
 * Pauses the looping CSS animations inside a section while it is off screen
 * (see `[data-paused]` in index.css). Sets an attribute rather than React state,
 * so scrolling past a section never re-renders it.
 */
export function usePauseOffscreen(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.paused = String(!entry.isIntersecting);
      },
      { rootMargin: '10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
