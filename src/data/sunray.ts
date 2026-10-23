/**
 * Project Sunray — The Next Generation (E-Cell's Project Sunray).
 */
import { BookOpen, Megaphone, Presentation, Wrench, type LucideIcon } from 'lucide-react';
import type { Accent } from '../lib/accents';

export const nextGeneration = {
  heading: { line1: 'The Next', line2: 'Generation' },
  lead: 'Through E-Cell’s Project Sunray, SWISF 2027 reaches schools across Meghalaya and the Northeast.',
  body: 'Students build, present and learn alongside founders and mentors, and their families get a front-row seat to the region’s innovation story.',
  imageAlt: 'Sunrise over the clouds seen from a hilltop in Meghalaya, with people gathered along the ridge',
  journeyLabel: 'The journey',
  steps: [
    {
      icon: Megaphone,
      accent: 'royal',
      step: 'Step 01',
      title: 'Reach out',
      when: 'Months ahead',
      text: 'Schools across the region are invited to take part',
    },
    {
      icon: Wrench,
      accent: 'saffron',
      step: 'Step 02',
      title: 'Build',
      when: 'In the run-up',
      text: 'Student teams develop projects with mentors from NIT Meghalaya',
    },
    {
      icon: Presentation,
      accent: 'teal',
      step: 'Step 03',
      title: 'Showcase',
      when: 'At SWISF 2027',
      text: 'The best projects take the stage at the Schools Innovation Showcase',
    },
    {
      icon: BookOpen,
      accent: 'violet',
      step: 'Step 04',
      title: 'Learn',
      when: 'During the summit',
      text: 'Students and families join financial-literacy and investor-awareness sessions',
    },
  ] as { icon: LucideIcon; accent: Accent; step: string; title: string; when: string; text: string }[],
  quote: { text: 'Bringing teachers, parents and young minds into the', highlight: 'innovation story.' },
  schools: {
    title: 'Is your school ready to take part?',
    text: 'Write to the Project Sunray team to bring your students into Project Sunray, or to mentor a school team.',
    register: { label: 'Register Interest', subject: 'Project Sunray – School Registration' },
    mentor: { label: 'Become a Mentor', subject: 'Project Sunray – Mentor' },
  },
};
