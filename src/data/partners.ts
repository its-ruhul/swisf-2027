/**
 * Sponsors page: co-powering partner (BSE), partnership tiers and the
 * partner logo wall.
 */
import {
  BedDouble,
  BookOpen,
  Crown,
  Handshake,
  Lightbulb,
  Mic,
  Music,
  Presentation,
  Radio,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import bseLogo from '../assets/logos/bse-logo.webp';
import type { Accent } from '../lib/accents';

export const partnersPage = {
  heading: { line1: 'Our', line2: 'Partners' },
  coPoweredLabel: 'Co-powered by',
  coPowered: {
    name: 'BSE (Bombay Stock Exchange)',
    logo: bseLogo,
    width: 450,
    height: 246,
  },
  coPoweredLine: 'With BSE alongside, SWISF 2027 brings the Northeast closer to India’s capital markets.',
  contributions: [
    { icon: Mic, accent: 'royal', text: 'Leadership keynotes and panel discussions' },
    { icon: Presentation, accent: 'saffron', text: 'Mentorship from capital-markets experts' },
    { icon: Handshake, accent: 'teal', text: 'Investor and VC connect for founders' },
    { icon: BookOpen, accent: 'violet', text: 'Financial literacy and investor awareness' },
  ] as { icon: LucideIcon; accent: Accent; text: string }[],
  partnerLabel: 'Partner with us',
  partnerIntro: 'SWISF 2027 welcomes collaborators who share our vision for the Northeast.',
  tiers: [
    { icon: Crown, accent: 'saffron', title: 'Associate Partner', text: 'Presence across all three days' },
    { icon: Rocket, accent: 'royal', title: 'Startup Arena Partner', text: 'Powering the pitch competition' },
    { icon: Music, accent: 'violet', title: 'Festival Partner', text: 'The concerts and night market' },
    { icon: Lightbulb, accent: 'teal', title: 'Knowledge Partner', text: 'Masterclasses and sessions' },
    { icon: BedDouble, accent: 'teal', title: 'Hospitality Partner', text: 'Hosting speakers and guests' },
    { icon: Radio, accent: 'royal', title: 'Media Partner', text: 'Telling the story nationwide' },
  ] as { icon: LucideIcon; accent: Accent; title: string; text: string }[],
  enquireLabel: 'Enquire',
  collaborate: {
    eyebrow: 'To collaborate',
    title: 'Let’s build SWISF 2027 together',
    download: 'Download Brochure (PDF)',
  },
  logoWallTitle: 'Our 2027 Partners',
};

export type Partner = {
  name: string;
  /** Import the logo from src/assets/logos and pass it here */
  logo: string;
  url?: string;
  /** e.g. "Associate Partner" */
  tier?: string;
};

/**
 * Confirmed partners. The "Our 2027 Partners" logo wall is hidden while this
 * list is empty and appears automatically once you add an entry, e.g.:
 *
 *   import acmeLogo from '../assets/logos/acme.webp';
 *   { name: 'Acme Ventures', logo: acmeLogo, url: 'https://acme.example', tier: 'Associate Partner' },
 */
export const partners: Partner[] = [];
