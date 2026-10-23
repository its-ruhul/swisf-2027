/**
 * Team page data.
 *
 * Every entry below is a PLACEHOLDER — replace "Member Name" with real names.
 * To add a photo, put a square image in src/assets/images/team/, import it at
 * the top of this file and set `photo`. Without a photo the card shows the
 * person's initials on a tinted circle.
 *
 *   import priyaPhoto from '../assets/images/team/priya.webp';
 *   { id: 'tech-head-1', name: 'Priya Sharma', role: 'Head', title: 'Technical Head',
 *     department: 'Technical', photo: priyaPhoto,
 *     socials: { linkedin: 'https://linkedin.com/in/…', instagram: 'https://instagram.com/…', email: 'priya@…' } },
 */
import type { Accent } from '../lib/accents';

export type Role = 'President' | 'Vice President' | 'Secretary' | 'Head' | 'Member';

export type Department =
  | 'Technical'
  | 'Marketing & Sponsorship'
  | 'Public Relations & Outreach'
  | 'Events & Operations'
  | 'Design & Creatives'
  | 'Content & Social Media'
  | 'Finance'
  | 'Hospitality & Logistics'
  | 'Project Sunray (Project Sunray)';

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  /** Shown on the card, e.g. "Technical Head" */
  title?: string;
  department?: Department;
  photo?: string;
  socials?: { linkedin?: string; instagram?: string; email?: string };
  /** Lower numbers appear first within the same group */
  order?: number;
}

/** Department order and accent colour on the Team page. */
export const departments: { name: Department; slug: string; accent: Accent }[] = [
  { name: 'Technical', slug: 'technical', accent: 'royal' },
  { name: 'Marketing & Sponsorship', slug: 'marketing', accent: 'saffron' },
  { name: 'Public Relations & Outreach', slug: 'pr-outreach', accent: 'teal' },
  { name: 'Events & Operations', slug: 'events', accent: 'violet' },
  { name: 'Design & Creatives', slug: 'design', accent: 'royal' },
  { name: 'Content & Social Media', slug: 'content', accent: 'saffron' },
  { name: 'Finance', slug: 'finance', accent: 'teal' },
  { name: 'Hospitality & Logistics', slug: 'hospitality', accent: 'violet' },
  { name: 'Project Sunray (Project Sunray)', slug: 'project-centre', accent: 'crimson' },
];

export const teamPage = {
  heading: { line1: 'The people', line2: 'behind SWISF' },
  subline: 'Organised by E-Cell, NIT Meghalaya',
  filterLabel: 'Filter by department',
  allLabel: 'All',
  leadershipLabel: 'Leadership',
  headsLabel: 'Heads',
  membersLabel: 'Members',
  join: {
    title: 'Want to join E-Cell?',
    text: 'Follow E-Cell NIT Meghalaya on Instagram for recruitment calls, events and Project Sunray updates.',
    linkLabel: 'Follow on Instagram',
  },
};

/** PLACEHOLDER entries — replace with the real team. */
export const team: TeamMember[] = [
  // Leadership
  { id: 'president', name: 'Member Name', role: 'President', title: 'President', order: 1, socials: { email: 'swisf2027@gmail.com' } },
  { id: 'vice-president-1', name: 'Member Name', role: 'Vice President', title: 'Vice President', order: 1 },
  { id: 'vice-president-2', name: 'Member Name', role: 'Vice President', title: 'Vice President', order: 2 },
  { id: 'general-secretary', name: 'Member Name', role: 'Secretary', title: 'General Secretary', order: 3 },

  // Technical
  { id: 'technical-head', name: 'Head Name', role: 'Head', title: 'Technical Head', department: 'Technical' },
  { id: 'technical-member-1', name: 'Member Name', role: 'Member', department: 'Technical' },
  { id: 'technical-member-2', name: 'Member Name', role: 'Member', department: 'Technical' },
  { id: 'technical-member-3', name: 'Member Name', role: 'Member', department: 'Technical' },

  // Marketing & Sponsorship
  { id: 'marketing-head', name: 'Head Name', role: 'Head', title: 'Marketing & Sponsorship Head', department: 'Marketing & Sponsorship' },
  { id: 'marketing-member-1', name: 'Member Name', role: 'Member', department: 'Marketing & Sponsorship' },
  { id: 'marketing-member-2', name: 'Member Name', role: 'Member', department: 'Marketing & Sponsorship' },
  { id: 'marketing-member-3', name: 'Member Name', role: 'Member', department: 'Marketing & Sponsorship' },

  // Public Relations & Outreach
  { id: 'pr-head', name: 'Head Name', role: 'Head', title: 'PR & Outreach Head', department: 'Public Relations & Outreach' },
  { id: 'pr-member-1', name: 'Member Name', role: 'Member', department: 'Public Relations & Outreach' },
  { id: 'pr-member-2', name: 'Member Name', role: 'Member', department: 'Public Relations & Outreach' },
  { id: 'pr-member-3', name: 'Member Name', role: 'Member', department: 'Public Relations & Outreach' },

  // Events & Operations
  { id: 'events-head', name: 'Head Name', role: 'Head', title: 'Events & Operations Head', department: 'Events & Operations' },
  { id: 'events-member-1', name: 'Member Name', role: 'Member', department: 'Events & Operations' },
  { id: 'events-member-2', name: 'Member Name', role: 'Member', department: 'Events & Operations' },
  { id: 'events-member-3', name: 'Member Name', role: 'Member', department: 'Events & Operations' },

  // Design & Creatives
  { id: 'design-head', name: 'Head Name', role: 'Head', title: 'Design & Creatives Head', department: 'Design & Creatives' },
  { id: 'design-member-1', name: 'Member Name', role: 'Member', department: 'Design & Creatives' },
  { id: 'design-member-2', name: 'Member Name', role: 'Member', department: 'Design & Creatives' },
  { id: 'design-member-3', name: 'Member Name', role: 'Member', department: 'Design & Creatives' },

  // Content & Social Media
  { id: 'content-head', name: 'Head Name', role: 'Head', title: 'Content & Social Media Head', department: 'Content & Social Media' },
  { id: 'content-member-1', name: 'Member Name', role: 'Member', department: 'Content & Social Media' },
  { id: 'content-member-2', name: 'Member Name', role: 'Member', department: 'Content & Social Media' },
  { id: 'content-member-3', name: 'Member Name', role: 'Member', department: 'Content & Social Media' },

  // Finance
  { id: 'finance-head', name: 'Head Name', role: 'Head', title: 'Finance Head', department: 'Finance' },
  { id: 'finance-member-1', name: 'Member Name', role: 'Member', department: 'Finance' },
  { id: 'finance-member-2', name: 'Member Name', role: 'Member', department: 'Finance' },
  { id: 'finance-member-3', name: 'Member Name', role: 'Member', department: 'Finance' },

  // Hospitality & Logistics
  { id: 'hospitality-head', name: 'Head Name', role: 'Head', title: 'Hospitality & Logistics Head', department: 'Hospitality & Logistics' },
  { id: 'hospitality-member-1', name: 'Member Name', role: 'Member', department: 'Hospitality & Logistics' },
  { id: 'hospitality-member-2', name: 'Member Name', role: 'Member', department: 'Hospitality & Logistics' },
  { id: 'hospitality-member-3', name: 'Member Name', role: 'Member', department: 'Hospitality & Logistics' },

  // Project Sunray (Project Sunray)
  { id: 'project-centre-head', name: 'Head Name', role: 'Head', title: 'Project Sunray Head', department: 'Project Sunray (Project Sunray)' },
  { id: 'project-centre-member-1', name: 'Member Name', role: 'Member', department: 'Project Sunray (Project Sunray)' },
  { id: 'project-centre-member-2', name: 'Member Name', role: 'Member', department: 'Project Sunray (Project Sunray)' },
  { id: 'project-centre-member-3', name: 'Member Name', role: 'Member', department: 'Project Sunray (Project Sunray)' },
];
