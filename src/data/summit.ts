/**
 * "What You Experience" — The Summit by Day.
 */
import {
  Backpack,
  Coins,
  Handshake,
  Lightbulb,
  MessagesSquare,
  Mic,
  Rocket,
  Store,
  type LucideIcon,
} from 'lucide-react';

/** One-screen page with a Day / Night switch. */
export const experience = {
  title: 'What you experience',
  subline: ['Ideas by day', 'Music by night'],
  toggleLabel: 'Show the summit by day or the festival by night',
  toggle: { day: 'Day', night: 'Night' },
};

export const summit = {
  heading: { line1: 'The Summit', line2: 'By Day' },
  intro: 'Three days of ideas, capital and conversation, bringing founders, investors, students and leaders into one room.',
  gridLabel: 'What happens by day',
  /** Icon colours rotate royal → saffron → teal → violet in the component. */
  activities: [
    { icon: Mic, number: '01', title: 'Keynotes & Fireside Chats', text: 'Leaders from business, finance and government' },
    { icon: MessagesSquare, number: '02', title: 'Panel Discussions', text: 'Raising capital, listing, agri-tech, tourism-tech and women founders' },
    { icon: Rocket, number: '03', title: 'Startup Pitch Arena', text: 'Northeast startups pitch live to VCs, angels and experts' },
    { icon: Handshake, number: '04', title: 'Investor Connect', text: 'One-to-one meetings between investors and founders' },
    { icon: Lightbulb, number: '05', title: 'Student Innovation Challenge', text: 'College teams pitch their ideas and prototypes' },
    { icon: Backpack, number: '06', title: 'Schools Innovation Showcase', text: 'Young innovators from schools across the region' },
    { icon: Coins, number: '07', title: 'Financial Literacy Sessions', text: 'Investor awareness for students, families and the public' },
    { icon: Store, number: '08', title: 'Expo of Stalls', text: 'Startups, incubators, government schemes and local enterprise' },
  ] as { icon: LucideIcon; number: string; title: string; text: string }[],
  conversationsLabel: 'Conversations at WISF 2027',
  conversations: [
    'Raising Capital',
    'Going Public',
    'Women Founders',
    'Agri-tech & Food',
    'Tourism-tech',
    'Semiconductors',
    'Creative Economy',
    'Financial Literacy',
  ],
};
