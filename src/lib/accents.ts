/**
 * Accent colours from the brochure. Tailwind only ships classes it can see as
 * complete strings, so every accent → class mapping lives here as literals.
 */
export type Accent = 'royal' | 'saffron' | 'teal' | 'violet' | 'crimson' | 'gold';

/** Brochure order for icon grids: royal → saffron → teal → violet. */
export const ACCENT_ROTATION: Accent[] = ['royal', 'saffron', 'teal', 'violet'];

export const rotateAccent = (index: number): Accent => ACCENT_ROTATION[index % ACCENT_ROTATION.length];

/** Icon + outline colour on light backgrounds. */
export const accentLine: Record<Accent, string> = {
  royal: 'border-royal text-royal',
  saffron: 'border-saffron text-saffron',
  teal: 'border-teal text-teal',
  violet: 'border-violet text-violet',
  crimson: 'border-crimson text-crimson',
  gold: 'border-gold text-gold',
};

/** Icon + outline colour on dark (night / navy) backgrounds. */
export const accentLineBright: Record<Accent, string> = {
  royal: 'border-royal-bright text-royal-bright',
  saffron: 'border-saffron-bright text-saffron-bright',
  teal: 'border-teal-bright text-teal-bright',
  violet: 'border-violet-bright text-violet-bright',
  crimson: 'border-crimson-light text-crimson-light',
  gold: 'border-gold-soft text-gold-soft',
};

/** AA-safe text colour on cream / white. */
export const accentText: Record<Accent, string> = {
  royal: 'text-royal',
  saffron: 'text-saffron-ink',
  teal: 'text-teal-ink',
  violet: 'text-violet',
  crimson: 'text-crimson',
  gold: 'text-gold-ink',
};

/** AA-safe text colour on night / navy. */
export const accentTextBright: Record<Accent, string> = {
  royal: 'text-royal-bright',
  saffron: 'text-saffron-bright',
  teal: 'text-teal-bright',
  violet: 'text-violet-bright',
  crimson: 'text-crimson-light',
  gold: 'text-gold-soft',
};

/** Outline-only border colour (pills, chips). */
export const accentBorder: Record<Accent, string> = {
  royal: 'border-royal',
  saffron: 'border-saffron',
  teal: 'border-teal',
  violet: 'border-violet',
  crimson: 'border-crimson',
  gold: 'border-gold',
};

/** Solid background (dots, chips, rings). */
export const accentBg: Record<Accent, string> = {
  royal: 'bg-royal',
  saffron: 'bg-saffron',
  teal: 'bg-teal',
  violet: 'bg-violet',
  crimson: 'bg-crimson',
  gold: 'bg-gold',
};

/** 8% tint on hover of the element itself or its `group` parent. */
export const accentHoverTint: Record<Accent, string> = {
  royal: 'hover:bg-royal/[0.08] group-hover:bg-royal/[0.08]',
  saffron: 'hover:bg-saffron/[0.08] group-hover:bg-saffron/[0.08]',
  teal: 'hover:bg-teal/[0.08] group-hover:bg-teal/[0.08]',
  violet: 'hover:bg-violet/[0.08] group-hover:bg-violet/[0.08]',
  crimson: 'hover:bg-crimson/[0.08] group-hover:bg-crimson/[0.08]',
  gold: 'hover:bg-gold/[0.1] group-hover:bg-gold/[0.1]',
};

/** Soft background tint used for grid-cell hovers and initials avatars. */
export const accentSoftBg: Record<Accent, string> = {
  royal: 'bg-royal/10',
  saffron: 'bg-saffron/10',
  teal: 'bg-teal/10',
  violet: 'bg-violet/10',
  crimson: 'bg-crimson/10',
  gold: 'bg-gold/15',
};

/** Ring colour (team photos). */
export const accentRing: Record<Accent, string> = {
  royal: 'ring-royal',
  saffron: 'ring-saffron',
  teal: 'ring-teal',
  violet: 'ring-violet',
  crimson: 'ring-crimson',
  gold: 'ring-gold',
};

/** Raw hex values for SVG fills/strokes. */
export const accentHex: Record<Accent, string> = {
  royal: '#3B5BB5',
  saffron: '#E07B39',
  teal: '#1F7A6A',
  violet: '#7A4FB0',
  crimson: '#B5122B',
  gold: '#C9A24A',
};
