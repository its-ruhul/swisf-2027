import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
      {children}
    </motion.main>
  );
}
