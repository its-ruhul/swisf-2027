import { useEffect, useState, type RefObject } from 'react';

/**
 * Replayable scroll trigger. True while the element's top edge is above a line
 * `offset` (fraction of the screen height) up from the bottom of the screen:
 * it turns true as the element scrolls up into view, and false again when you
 * scroll back up and it drops below that line — so the entrance replays every
 * time and runs in reverse on the way back up. Elements that have scrolled off
 * the top stay true, so nothing animates out of sight above you.
 */
export function useScrollReveal(ref: RefObject<Element>, offset = 0.1): boolean {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setShown(entry.isIntersecting), {
      // the observed area runs from far above the page down to the trigger line
      rootMargin: `100000px 0px -${Math.round(offset * 100)}% 0px`,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, offset]);

  return shown;
}
