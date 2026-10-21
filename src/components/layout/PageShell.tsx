import { useContext, useMemo, type ContextType, type ReactNode } from 'react';
import { motion, PresenceContext, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../../hooks/usePageMeta';
import { cn } from '../../lib/cn';
import ScrollToTop from './ScrollToTop';

type PageShellProps = {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
};

const noopRegister = () => () => {};

/**
 * Keeps page contents out of the route-level <AnimatePresence> in App.tsx so only
 * <main> takes part in the page exit.
 *
 * Why: framer-motion's `layout` / `layoutId` elements register with the nearest
 * presence but never unregister when they unmount (e.g. the Day/Night thumb on
 * /experience remounts on every toggle). The route exit would then wait forever for
 * an element that no longer exists, leaving the next page blank until a refresh.
 *
 * The route-level `initial={false}` (no page fade on first load) is deliberately NOT
 * passed on: framer-motion would start every element inside the page at its end state,
 * so the hero intro and the scroll reveals would not play on the first visit.
 */
function IsolatePresence({ children }: { children: ReactNode }) {
  const parent = useContext(PresenceContext);
  const parentId = parent?.id;
  const value = useMemo<ContextType<typeof PresenceContext>>(
    () => (parentId === undefined ? null : { id: `${parentId}-page`, isPresent: true, register: noopRegister }),
    [parentId],
  );
  return <PresenceContext.Provider value={value}>{children}</PresenceContext.Provider>;
}

/** Wraps every route: page <title>/meta, scroll handling and the 0.35s fade + 12px slide transition. */
export default function PageShell({ title, description, jsonLd, className, children }: PageShellProps) {
  usePageMeta({ title, description, jsonLd });
  const reduce = useReducedMotion();

  return (
    <motion.main
      id="main"
      tabIndex={-1}
      className={cn('relative outline-none', className)}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <ScrollToTop />
      <IsolatePresence>{children}</IsolatePresence>
    </motion.main>
  );
}
