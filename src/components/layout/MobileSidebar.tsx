import { useEffect, useRef, type RefObject } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinks, partnerCta, site } from '../../data/site';
import { cn } from '../../lib/cn';
import CircuitTraces from '../ornaments/CircuitTraces';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';
import SunrayLockup from '../ui/SunrayLockup';

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  /** The hamburger button — focus returns here when the drawer closes */
  returnFocusRef: RefObject<HTMLButtonElement>;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Right-side slide-in drawer for < 1024px.
 * Closes on overlay click, Esc, link click, route change and the X button.
 * Locks body scroll, traps focus and returns focus to the hamburger.
 */
export default function MobileSidebar({ open, onClose, returnFocusRef }: MobileSidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const reduce = useReducedMotion();
  const { pathname, hash } = useLocation();

  // Close when the route changes
  useEffect(() => {
    onClose();
  }, [pathname, hash, onClose]);

  // Close if the viewport grows to desktop width
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [onClose]);

  // Scroll lock + Esc + focus trap while open
  useEffect(() => {
    if (!open) return undefined;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const inside = active instanceof HTMLElement && panelRef.current.contains(active);
      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open, onClose]);

  // Return focus to the hamburger after closing
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      returnFocusRef.current?.focus();
    }
  }, [open, returnFocusRef]);

  const duration = reduce ? 0 : 0.3;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-navy/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          />
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-[85vw] max-w-[360px] flex-col overflow-y-auto overscroll-contain bg-navy-deep text-cream shadow-[0_0_60px_rgba(0,0,0,0.45)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration, ease: 'easeOut' }}
          >
            {/* faint gold circuit traces on the drawer edge */}
            <CircuitTraces
              animated={false}
              density="light"
              flip="xy"
              className="pointer-events-none absolute -right-3 bottom-0 h-56 w-auto opacity-25"
            />
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-gold/40" />

            <div className="relative flex items-start justify-between gap-4 px-6 pt-6">
              <SunrayLockup tone="dark" className="w-32" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-cream transition hover:border-gold hover:bg-white/5"
              >
                <X size={22} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="relative mt-6 px-6">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.to} className="border-b border-gold/25">
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex min-h-[56px] items-center gap-3 text-[17px] font-medium uppercase tracking-[0.14em] transition-colors',
                          isActive ? 'text-saffron-bright' : 'text-cream hover:text-gold-soft',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            aria-hidden="true"
                            className={cn('h-1.5 w-1.5 shrink-0 rotate-45 transition', isActive ? 'bg-saffron' : 'bg-transparent')}
                          />
                          <span>{link.label}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative mt-8 px-6">
              <Button to={partnerCta.to} variant="light" className="w-full" onClick={onClose}>
                {partnerCta.label}
              </Button>
            </div>

            <ul className="relative mt-8 space-y-1 px-6 text-sm">
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex min-h-[44px] items-center gap-3 text-cream/90 hover:text-gold-soft">
                  <Mail size={18} strokeWidth={1.5} className="text-saffron-bright" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="flex min-h-[44px] items-center gap-3 text-cream/90 hover:text-gold-soft">
                  <Phone size={18} strokeWidth={1.5} className="text-saffron-bright" aria-hidden="true" />
                  {site.contact.phone}
                </a>
              </li>
            </ul>

            <div className="relative mt-auto px-6 pb-8 pt-6">
              <SocialLinks tone="dark" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
