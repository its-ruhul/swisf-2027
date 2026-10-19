import { cn } from '../../lib/cn';

type SectionHeadingProps = {
  /** First line — navy (cream on dark backgrounds) */
  line1: string;
  /** Second line — saffron */
  line2: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
};

/**
 * Two-line uppercase section heading — the brochure's signature pattern,
 * e.g. "WELCOME" / "TO SWISF 2027".
 */
export default function SectionHeading({
  line1,
  line2,
  as: Tag = 'h2',
  id,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  return (
    <Tag id={id} className={cn('heading-2', align === 'center' && 'text-center', className)}>
      <span className={cn('block', tone === 'dark' ? 'text-cream' : 'text-navy')}>{line1}</span>{' '}
      <span className={cn('block', tone === 'dark' ? 'text-saffron-bright' : 'text-saffron-ink-lg')}>{line2}</span>
    </Tag>
  );
}
