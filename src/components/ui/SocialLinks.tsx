import { site } from '../../data/site';
import { cn } from '../../lib/cn';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from './icons';

const LINKS = [
  { ...site.socials.instagram, Icon: InstagramIcon },
  { ...site.socials.linkedin, Icon: LinkedinIcon },
  { ...site.socials.youtube, Icon: YoutubeIcon },
];

type SocialLinksProps = {
  tone?: 'light' | 'dark';
  className?: string;
};

/** Instagram / LinkedIn / YouTube as outlined circle icons (44px touch targets). */
export default function SocialLinks({ tone = 'dark', className }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {LINKS.map(({ label, handle, url, Icon }) => (
        <li key={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${handle} on ${label} (opens in a new tab)`}
            title={`${label}: ${handle}`}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 hover:-translate-y-0.5',
              tone === 'dark'
                ? 'border-gold/60 text-cream hover:border-gold hover:bg-gold/10'
                : 'border-navy/40 text-navy hover:border-navy hover:bg-navy/5',
            )}
          >
            <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
