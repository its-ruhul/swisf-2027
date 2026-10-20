import type { RefObject } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinks, partnerCta } from '../../data/site';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../lib/cn';
import Button from '../ui/Button';
import LogoLockup from '../ui/LogoLockup';

type NavbarProps = {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement>;
};

/**
 * Sticky 76px navbar. Over the home hero it is transparent with cream text;
 * everywhere else (and once you scroll) it is cream at 85% with blur.
 * A thin gold line along the bottom shows how far down the page you are.
 */
export default function Navbar({ menuOpen, onOpenMenu, menuButtonRef }: NavbarProps) {
  const scrolled = useScrolled(24);
  const { pathname } = useLocation();
  const overlay = pathname === '/' && !scrolled && !menuOpen;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-[76px] border-b transition-[background-color,border-color,box-shadow] duration-500',
        overlay ? 'border-transparent bg-transparent' : 'bg-cream/85 backdrop-blur-md',
        !overlay && (scrolled ? 'border-line shadow-nav' : 'border-transparent'),
      )}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container-x flex h-full items-center justify-between gap-4">
        <LogoLockup homeLink compactBse tone={overlay ? 'dark' : 'light'} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'group relative inline-flex min-h-[44px] items-center whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.1em] transition-colors xl:text-[13px] xl:tracking-[0.15em]',
                      isActive ? (overlay ? 'text-saffron-bright' : 'text-saffron-ink') : overlay ? 'text-cream/90 hover:text-cream' : 'text-navy',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {/* hover: gold underline growing from the centre */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-2.5 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
                      />
                      {/* active: small gold diamond underneath */}
                      {isActive && (
                        <motion.span layoutId="nav-active" aria-hidden="true" className="absolute bottom-0 left-1/2 -ml-[3px] h-1.5 w-1.5">
                          <span className="block h-full w-full rotate-45 bg-gold" />
                        </motion.span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button to={partnerCta.to} size="sm" variant={overlay ? 'sun' : 'primary'} className="whitespace-nowrap">
            {partnerCta.label}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? 'mobile-menu' : undefined}
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-full border transition hover:border-gold lg:hidden',
            overlay ? 'border-cream/40 bg-white/10 text-cream backdrop-blur-sm' : 'border-line bg-white/60 text-navy',
          )}
        >
          <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      {/* reading progress */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-gradient-to-r from-saffron via-gold to-gold-soft"
      />
    </header>
  );
}
