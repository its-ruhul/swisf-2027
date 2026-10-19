/**
 * "What You Experience" — The Festival by Night.
 */
import { Guitar, Music, Store, Trophy, type LucideIcon } from 'lucide-react';
import type { Accent } from '../lib/accents';

export const festival = {
  heading: { line1: 'The Festival', line2: 'By Night' },
  lead: 'Shillong, the concert capital of India, comes alive for three nights.',
  body: 'When the summit closes each evening, the city takes over. Concerts on all three nights, jam sessions and a night market turn SWISF 2027 into a celebration of the region’s music, food and enterprise.',
  imageAlt:
    'Illustrated night concert: a band on a lit stage with lasers and fireworks, a sunburst backdrop and a crowd with raised hands',
  highlightsLabel: 'Highlights',
  highlights: [
    { icon: Music, accent: 'violet', title: 'A concert every night', text: 'Northeast bands and independent artists, all three nights' },
    { icon: Guitar, accent: 'saffron', title: 'Jam sessions', text: 'Open, collaborative and unforgettable' },
    { icon: Store, accent: 'teal', title: 'Night market', text: 'Food, crafts and products from local entrepreneurs' },
    { icon: Trophy, accent: 'royal', title: 'On-stage moments', text: 'Pitch winners and partners celebrated before the crowd' },
  ] as { icon: LucideIcon; accent: Accent; title: string; text: string }[],
  closing: { day: 'Ideas by day', night: 'Music by night', caption: 'Three nights of concerts in the concert capital of India' },
  lineup: {
    title: 'Artist line-up to be announced',
    text: 'Follow E-Cell NIT Meghalaya for the first names.',
    slots: 3,
  },
};
