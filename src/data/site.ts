/**
 * Site-wide content: event facts, contacts, social links, navigation and SEO.
 * Edit text here — components read from this file.
 */
import type { Accent } from '../lib/accents';

/** Public URL from `.env` (VITE_SITE_URL). Used for canonical/OG/JSON-LD. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '');

export const site = {
  shortName: 'SWISF 2027',
  name: 'SUNRAY – World Innovation Summit & Festival 2027',
  wordmark: 'SUNRAY',
  subtitle: 'World Innovation Summit & Festival 2027',
  /** The hero sets the subtitle on two lines, as on the brochure cover */
  subtitleLines: ['World Innovation Summit &', 'Festival 2027'],
  subWordmark: 'SWISF · 2027',
  presents: 'Presents',
  tagline: 'Where India’s sun rises first',
  /** Three-colour tagline under the hero */
  pillars: [
    { label: 'Ignite Innovation', accent: 'royal' },
    { label: 'Unlock Capital', accent: 'saffron' },
    { label: 'Celebrate Culture', accent: 'teal' },
  ] as { label: string; accent: Accent }[],
  motto: ['Innovate', 'Inspire', 'Celebrate'],

  dates: {
    label: 'Late April – Early May',
    year: '2027',
    full: 'Late April – Early May 2027',
  },
  location: {
    city: 'Shillong',
    state: 'Meghalaya',
    full: 'Shillong, Meghalaya',
    coordinates: '25.6°N 91.9°E',
  },

  /** Hero countdown. Set `enabled: false` to hide it. */
  countdown: {
    enabled: true,
    /** Provisional opening day (IST) */
    target: '2027-04-25T09:00:00+05:30',
    targetLabel: '25 April 2027',
    /** Shows a “Dates to be announced” note above the countdown */
    datesToBeAnnounced: true,
  },

  contact: {
    phone: '+91-7303618662',
    phoneHref: 'tel:+917303618662',
    email: 'swisf2027@gmail.com',
  },

  /** Placeholder URLs — replace with the official profile links. */
  socials: {
    instagram: {
      label: 'Instagram',
      handle: 'ecell_nitmeghalaya',
      url: 'https://www.instagram.com/ecell_nitmeghalaya/',
    },
    linkedin: {
      label: 'LinkedIn',
      handle: 'E-Cell NIT Meghalaya',
      url: 'https://www.linkedin.com/search/results/all/?keywords=E-Cell%20NIT%20Meghalaya',
    },
    youtube: {
      label: 'YouTube',
      handle: 'E-Cell NIT Meghalaya',
      url: 'https://www.youtube.com/results?search_query=E-Cell+NIT+Meghalaya',
    },
  },

  organiser: {
    eyebrow: 'About the organisers',
    name: 'E-Cell, NIT Meghalaya',
    text: 'The student-run Entrepreneurship Cell building startup culture at NIT Meghalaya, an Institute of National Importance under the Ministry of Education, Government of India.',
  },

  coPoweredBy: 'BSE (Bombay Stock Exchange)',
  brochurePdf: '/swisf-2027-brochure.pdf',
  copyright: '© 2027 SWISF Organising Committee, E-Cell NIT Meghalaya',
} as const;

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'What You Experience', to: '/experience' },
  { label: 'Project Sunray', to: '/project-sunray' },
  { label: 'Sponsors', to: '/sponsors' },
  { label: 'Team', to: '/team' },
] as const;

export const partnerCta = { label: 'Partner With Us', to: '/sponsors#partner-with-us' } as const;

/** Per-page <title> and meta description. */
export const seo = {
  home: {
    title: 'SWISF 2027 | SUNRAY – World Innovation Summit & Festival, Shillong',
    description:
      'SUNRAY – World Innovation Summit & Festival 2027 brings founders, investors, students, policymakers and artists to Shillong, Meghalaya for three days of ideas, capital and celebration. Organised by E-Cell, NIT Meghalaya, co-powered by BSE.',
  },
  experience: {
    title: 'What You Experience | SWISF 2027, Shillong',
    description:
      'Ideas by day, music by night: keynotes, panels, a startup pitch arena, investor connect and an expo by day; concerts, jam sessions and a night market by night.',
  },
  sunray: {
    title: 'Project Sunray — The Next Generation | SWISF 2027',
    description:
      'Through E-Cell’s Project Centre, SWISF 2027 reaches schools across Meghalaya and the Northeast. Students build, present and learn alongside founders and mentors.',
  },
  sponsors: {
    title: 'Sponsors & Partners | SWISF 2027, co-powered by BSE',
    description:
      'Co-powered by BSE. Partner with SUNRAY – World Innovation Summit & Festival 2027 as an associate, startup arena, festival, knowledge, hospitality or media partner.',
  },
  team: {
    title: 'Team | SWISF 2027 — E-Cell, NIT Meghalaya',
    description: 'Meet the people behind SWISF 2027, organised by E-Cell, NIT Meghalaya.',
  },
  notFound: {
    title: 'Page not found | SWISF 2027',
    description: 'The page you were looking for does not exist.',
  },
} as const;
