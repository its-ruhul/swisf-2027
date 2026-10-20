/**
 * Home page content: welcome letter, pillars, About SWISF, stats and
 * "Why the Northeast". Copy reproduced from the brochure.
 */
import {
  Building2,
  CalendarDays,
  Coins,
  Globe,
  GraduationCap,
  HandCoins,
  Lightbulb,
  Map as MapIcon,
  Mountain,
  Music,
  Presentation,
  Sprout,
  Star,
  Sunrise,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { YarnIcon } from '../components/ui/icons';
import type { Accent } from '../lib/accents';

export type IconItem = { icon: LucideIcon; accent: Accent; title: string; text: string };

/** Home hero (full-screen sunrise over the sea of clouds). */
export const hero = {
  /** Set on four lines; the last two are drawn in the saffron-gold gradient */
  titleLines: ['World', 'Innovation', 'Summit &', 'Festival'],
  coPowered: 'Co-powered by Bombay Stock Exchange',
  /** Until registrations open, "Register" sends an email to the organisers */
  register: { label: 'Register Interest', subject: 'SWISF 2027 – Register my interest' },
  explore: { label: 'Explore SWISF', to: '/experience' },
  organiser: 'Organised by E-Cell, NIT Meghalaya',
  photoAlt: 'Sunrise over a sea of clouds in the Meghalaya hills, with people gathered on a ridge to watch',
  scrollLabel: 'Scroll to explore',
  /** The ticker running along the bottom of the hero */
  ticker: [
    'Ignite Innovation',
    'Unlock Capital',
    'Celebrate Culture',
    'Keynotes & Fireside Chats',
    'Startup Pitch Arena',
    'Investor Connect',
    'Concerts all three nights',
    'Eight states · One stage',
    'Co-powered by BSE',
  ],
};

export const welcome = {
  heading: { line1: 'Welcome', line2: 'to SWISF 2027' },
  salutation: 'Dear Innovators,',
  paragraphs: [
    'Every day in India begins in the Northeast. In 2027, so will the conversation on innovation.',
    'The SUNRAY-World Innovation Summit & Festival 2027 brings founders, investors, students, policymakers, artists and guests from across India and beyond to Shillong for three days of ideas, capital and celebration.',
    'Our purpose is simple: to give the Northeast’s innovators the mentorship, connections and global exposure they deserve, and to build a lasting bridge to India’s innovation and finance ecosystem.',
    'Join us where India’s sun rises first.',
  ],
  signOff: { regards: 'Warm regards,', name: 'Organising committee', org: 'SWISF 2027' },
  pillarsTitle: 'Our three pillars',
  pillars: [
    { icon: Lightbulb, accent: 'royal', title: 'Innovation', text: 'Ideas, startups and the people building them' },
    { icon: Coins, accent: 'saffron', title: 'Capital', text: 'Investors, mentors and the knowledge to grow' },
    { icon: Music, accent: 'teal', title: 'Culture', text: 'Music, community and the spirit of the hills' },
  ] as IconItem[],
};

export const about = {
  heading: { line1: 'About', line2: 'SWISF 2027' },
  /** First paragraph starts with a bold “SWISF 2027”. */
  lead: 'SWISF 2027',
  paragraphs: [
    ' is a three-day summit and festival in Shillong, Meghalaya, organised by the SWISF organising committee, comprising members of E-Cell, NIT Meghalaya and leaders from industry, capital markets, government, academia and the startup ecosystem, in collaboration with the Bombay Stock Exchange (BSE).',
    'By day, the summit brings founders, investors, students and leaders into one room. By night, the festival fills the city with music.',
    'It is one stage for the entire Northeast, built to connect the region’s talent with India’s innovation and finance ecosystem, and with the world.',
  ],
  glanceLabel: 'At a glance',
  stats: [
    { icon: CalendarDays, accent: 'royal', value: 3, display: '3', label: 'Days', caption: 'Of summit and festival' },
    { icon: Sunrise, accent: 'saffron', value: 2, display: '2', label: 'Worlds', caption: 'Summit by day, festival by night' },
    { icon: MapIcon, accent: 'teal', value: null, display: '∞', label: 'Ideas', caption: 'One stage for the whole of India' },
    { icon: Building2, accent: 'violet', value: 1, display: '1', label: 'City', caption: 'Shillong, the concert capital of India' },
  ] as { icon: LucideIcon; accent: Accent; value: number | null; display: string; label: string; caption: string }[],
  globeBadge: 'Shillong · 25.6°N 91.9°E',
};

export type StateItem = { name: string; accent: Accent; host?: boolean };

export const northeast = {
  heading: { line1: 'Why the', line2: 'Northeast' },
  lead: 'Despite its immense potential, the Northeast’s contribution to India’s startup ecosystem remains very low.',
  body: 'The talent is here, and so are the ideas. What the region’s founders lack is access: mentors who have built companies, investors who rarely travel this far, knowledge of capital markets, and a stage the world is watching. SWISF 2027 exists to give them that national and global exposure.',
  diagramLabel: 'One stage for eight states',
  /** Clockwise from the top, matching the brochure diagram. */
  states: [
    { name: 'Arunachal Pradesh', accent: 'royal' },
    { name: 'Assam', accent: 'teal' },
    { name: 'Nagaland', accent: 'violet' },
    { name: 'Manipur', accent: 'teal' },
    { name: 'Mizoram', accent: 'royal' },
    { name: 'Tripura', accent: 'teal' },
    { name: 'Meghalaya', accent: 'saffron', host: true },
    { name: 'Sikkim', accent: 'violet' },
  ] as StateItem[],
  regionHolds: {
    title: 'What the region holds',
    accent: 'royal' as Accent,
    items: [
      { icon: Sprout, text: 'Agriculture and food' },
      { icon: YarnIcon, text: 'Bamboo, handloom and crafts' },
      { icon: Mountain, text: 'Tourism and hospitality' },
      { icon: Music, text: 'Music and creative industries' },
      { icon: GraduationCap, text: 'A young, ambitious generation' },
    ] as { icon: LucideIcon; text: string }[],
  },
  swisfBrings: {
    title: 'What SWISF brings',
    accent: 'saffron' as Accent,
    items: [
      { icon: Presentation, text: 'Mentors with real experience' },
      { icon: HandCoins, text: 'Investors and VCs in the room' },
      { icon: TrendingUp, text: 'Capital-markets knowledge' },
      { icon: Globe, text: 'National and global exposure' },
      { icon: Star, text: 'A lasting platform for the region' },
    ] as { icon: LucideIcon; text: string }[],
  },
};

export const homeCta = {
  eyebrow: 'Late April – Early May 2027 · Shillong',
  /** The highlight is set in the saffron-gold gradient */
  title: { lead: 'Be part of', highlight: 'SWISF 2027' },
  text: 'Three days of ideas, capital and celebration, where India’s sun rises first.',
  /** The first link is the main (gold) button */
  links: [
    { label: 'What You Experience', to: '/experience' },
    { label: 'Project Sunray', to: '/project-sunray' },
    { label: 'Partner With Us', to: '/sponsors' },
  ],
};
