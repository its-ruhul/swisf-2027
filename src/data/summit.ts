/**
 * "What You Experience" — The Summit by Day + Who Comes Together.
 */
import {
  Backpack,
  Brush,
  Building2,
  Coins,
  Globe,
  GraduationCap,
  HandCoins,
  Handshake,
  Landmark,
  Lightbulb,
  MessagesSquare,
  Mic,
  Rocket,
  Store,
  type LucideIcon,
} from 'lucide-react';

export const experienceHero = {
  heading: { line1: 'What you', line2: 'experience' },
  subline: ['Ideas by day', 'Music by night'],
  intro: 'Three days in Shillong: by day, founders, investors, students and leaders in one room; by night, concerts across the concert capital of India.',
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
  conversationsLabel: 'Conversations at SWISF 2027',
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
  valleyAlt:
    'Illustrated Meghalaya valley with rhododendrons, a waterfall, a living root bridge, a drone and a signal tower among the hills',
};

export const whoComesTogether = {
  heading: { line1: 'Who comes', line2: 'together' },
  intro: 'One stage for every voice that shapes the ecosystem, from first-time founders to seasoned investors, from classrooms to concert stages.',
  groups: [
    { icon: Rocket, title: 'Founders & Startups' },
    { icon: HandCoins, title: 'Investors & VCs' },
    { icon: GraduationCap, title: 'Students & Colleges' },
    { icon: Backpack, title: 'Schools & Young Innovators' },
    { icon: Landmark, title: 'Government & Policymakers' },
    { icon: Building2, title: 'Industry & Corporates' },
    { icon: Brush, title: 'Artists & Musicians' },
    { icon: Globe, title: 'Guests from India & Abroad' },
  ] as { icon: LucideIcon; title: string }[],
  quote: { line1: 'Many collaborators. One shared vision:', line2: 'a stronger Northeast.' },
  note: 'SWISF 2027 welcomes partners, speakers and guests from organisations across India and the world.',
  bandAlt:
    'Illustration of the Northeast coming together: a crowd on a bridge beneath a dragon, a rhino in the river, wind turbines, solar farms, a monastery, orchids and a train',
};

export const agenda = {
  title: 'Full three-day schedule coming soon',
  text: 'Speakers, sessions and timings will be published here. Email us and we’ll let you know when the agenda goes live.',
  linkLabel: 'Get notified',
  subject: 'Notify me: SWISF 2027 agenda',
};
