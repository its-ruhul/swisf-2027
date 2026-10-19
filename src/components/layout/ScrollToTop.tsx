import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

/**
 * On route change: jump to the top of the new page.
 * With a hash (e.g. /sponsors#partner-with-us): smooth-scroll to that section.
 * The navbar offset comes from `scroll-padding-top` on <html> in index.css.
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }, 80);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    return undefined;
  }, [pathname, hash, key, reduce]);

  return null;
}
