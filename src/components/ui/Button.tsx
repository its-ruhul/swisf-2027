import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'light' | 'outline-light' | 'sun' | 'glass';
type Size = 'sm' | 'md' | 'lg';

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  'aria-label'?: string;
  onClick?: () => void;
};

/** Internal route — rendered as a React Router <Link> */
type RouteButton = BaseProps & { to: string };
/** External / mailto / tel / file link — rendered as <a> */
type AnchorButton = BaseProps & { href: string; target?: '_blank' | '_self'; rel?: string; download?: boolean | string };
/** Plain <button> */
type NativeButton = BaseProps & { type?: 'button' | 'submit'; disabled?: boolean };

export type ButtonProps = RouteButton | AnchorButton | NativeButton;

const isRoute = (p: ButtonProps): p is RouteButton => typeof (p as RouteButton).to === 'string';
const isAnchor = (p: ButtonProps): p is AnchorButton => typeof (p as AnchorButton).href === 'string';

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full text-center font-medium uppercase tracking-[0.14em] transition duration-300 ease-out select-none';

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 text-[12px]',
  md: 'px-6 py-2.5 text-[12.5px] sm:text-[13px]',
  lg: 'min-h-[52px] px-7 py-3 text-[13px] sm:text-sm',
};

const variants: Record<Variant, string> = {
  // navy fill, cream text, gold 1px inner border on hover
  primary: 'border border-navy bg-navy text-cream hover:bg-navy-deep hover:ring-1 hover:ring-inset hover:ring-gold',
  // transparent with saffron border and text
  secondary: 'border-[1.5px] border-saffron bg-transparent text-saffron-ink hover:bg-saffron/10',
  // for dark backgrounds
  light: 'border border-cream bg-cream text-navy hover:ring-1 hover:ring-inset hover:ring-gold',
  'outline-light': 'border border-gold/70 bg-transparent text-cream hover:border-gold hover:bg-white/10',
  // saffron → gold gradient with a glow (hero, dark banners)
  sun: 'btn-sun border border-gold-soft/60 font-semibold text-navy-deep',
  // frosted outline over photos
  glass: 'border border-cream/45 bg-white/[0.06] font-semibold text-cream backdrop-blur-sm hover:border-gold-soft hover:bg-white/[0.14]',
};

/** Rounded-full, uppercase, tracked button that renders a Link, an anchor or a button. */
export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', icon: Icon, iconPosition = 'right', className, onClick } = props;
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={16} strokeWidth={1.75} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={16} strokeWidth={1.75} aria-hidden="true" />}
    </>
  );

  if (isRoute(props)) {
    return (
      <Link to={props.to} className={classes} onClick={onClick} aria-label={props['aria-label']}>
        {content}
      </Link>
    );
  }

  if (isAnchor(props)) {
    const rel = props.rel ?? (props.target === '_blank' ? 'noopener noreferrer' : undefined);
    return (
      <a
        href={props.href}
        target={props.target}
        rel={rel}
        download={props.download}
        className={classes}
        onClick={onClick}
        aria-label={props['aria-label']}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      disabled={props.disabled}
      className={cn(classes, 'disabled:cursor-not-allowed disabled:opacity-60')}
      onClick={onClick}
      aria-label={props['aria-label']}
    >
      {content}
    </button>
  );
}
