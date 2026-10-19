import type { RefObject } from 'react';
import { Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
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

/** Sticky 76px navbar: cream at 85% with blur; border + shadow appear after 24px of scroll. */
export default function Navbar({ menuOpen, onOpenMenu, menuButtonRef }: NavbarProps) {
  const scrolled = useScrolled(24);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-[76px] border-b bg-cream/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300',
        scrolled ? 'border-line shadow-nav' : 'border-transparent',
      )}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container-x flex h-full items-center justify-between gap-4">
        <LogoLockup size="nav" homeLink compactBse />

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
                      isActive ? 'text-saffron-ink' : 'text-navy',
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
                        <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-gold" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button to={partnerCta.to} size="sm">
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/60 text-navy transition hover:border-gold lg:hidden"
        >
          <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
