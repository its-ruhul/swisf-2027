/**
 * Mascots page: Sun, Ray and what they stand for together.
 */
import { BookOpen, Flame, Globe, HandHeart, Lightbulb, Rocket, Sparkles, Zap, type LucideIcon } from 'lucide-react';
import type { Accent } from '../lib/accents';

export type MascotName = 'sun' | 'ray';

type Callout = {
  /** Where the marker sits on the artwork, in % of its width and height */
  x: number;
  y: number;
  /** Which side of the marker the label opens towards */
  side: 'left' | 'right';
  title: string;
  text: string;
};

export type Mascot = {
  id: MascotName;
  name: string;
  tagline: string;
  /** Opening sentence, set larger than the rest */
  lead: string;
  body: string;
  /** Words in the body picked out in bold */
  highlights: string[];
  alt: string;
  standsForLabel: string;
  standsFor: { icon: LucideIcon; accent: Accent; label: string }[];
  callouts: Callout[];
  link: { label: string; to: string };
};

export const mascotsHero = {
  eyebrow: 'Official mascots · Shillong 2027',
  title: 'Meet the mascots',
  scrollLabel: 'Scroll to meet them',
};

export const mascotEyebrow = 'Official mascot · Shillong 2027';

export const sun: Mascot = {
  id: 'sun',
  name: 'Sun',
  tagline: 'The light of new ideas',
  lead: 'Sun is the warm-hearted host of SWISF 2027.',
  body: 'In the folk tales of Meghalaya’s Khasi people, the Sun is a woman named Ka Sngi, and our Sun carries her spirit. Her golden crown is the rising sun of new ideas, and her open hand invites everyone to come and share theirs. By day she leads the summit, lighting the way for students, founders and dreamers.',
  highlights: ['Ka Sngi', 'golden crown', 'open hand'],
  alt: 'Sun, the official mascot: a smiling woman with long curly hair, a golden sun crown and feathered wings, in a white and gold robe, reaching out with an open hand',
  standsForLabel: 'Sun stands for',
  standsFor: [
    { icon: Lightbulb, accent: 'saffron', label: 'Ideas' },
    { icon: BookOpen, accent: 'royal', label: 'Knowledge' },
    { icon: HandHeart, accent: 'crimson', label: 'A warm welcome' },
  ],
  callouts: [
    { x: 64, y: 15, side: 'right', title: 'Golden crown', text: 'The rising sun of new ideas' },
    { x: 33.5, y: 53, side: 'left', title: 'Open hand', text: 'Come and share yours' },
  ],
  link: { label: 'The summit by day', to: '/experience#summit' },
};

export const ray: Mascot = {
  id: 'ray',
  name: 'Ray',
  tagline: 'The energy to make it happen',
  lead: 'Ray is Sun’s fiery dragon companion, and his name is a ray of her light.',
  body: 'Where Sun brings ideas, Ray brings the courage and energy to act on them. He guards the mountains at dawn, carries Sun’s light out to the world, and comes alive at night when the festival and concerts begin.',
  highlights: ['courage and energy', 'guards the mountains', 'comes alive at night'],
  alt: 'Ray, the official mascot: a red and gold dragon with a flowing cream mane, a curved horn and wide orange wings, sitting upright and wearing a badge on his collar',
  standsForLabel: 'Ray stands for',
  standsFor: [
    { icon: Zap, accent: 'gold', label: 'Energy' },
    { icon: Flame, accent: 'saffron', label: 'Courage' },
    { icon: Rocket, accent: 'crimson', label: 'Turning ideas into action' },
  ],
  callouts: [
    { x: 64.5, y: 14, side: 'right', title: 'His wings', text: 'Carry Sun’s light to the world' },
    { x: 27, y: 80.5, side: 'left', title: 'His perch', text: 'Guards the mountains at dawn' },
  ],
  link: { label: 'The festival by night', to: '/experience#festival' },
};

export const together = {
  eyebrow: 'Together they are',
  wordmark: ['SUN', 'RAY'] as const,
  lead: 'An idea is a spark of light, and it takes energy to carry it into the world.',
  body: 'That’s why Sun and Ray always travel together, from the hills of Shillong, where India’s sun rises first, out to the rest of the world.',
  journeyLabel: 'How an idea travels',
  journey: [
    { icon: Sparkles, accent: 'gold', title: 'A spark', text: 'Sun’s light' },
    { icon: Flame, accent: 'crimson', title: 'Energy', text: 'Ray’s fire' },
    { icon: Globe, accent: 'royal', title: 'The world', text: 'Out from Shillong' },
  ] as { icon: LucideIcon; accent: Accent; title: string; text: string }[],
};
