import type { CSSProperties } from 'react';

/** Typed helper for passing CSS custom properties through `style`. */
export function cssVars(vars: Record<`--${string}`, string | number>, extra?: CSSProperties): CSSProperties {
  return { ...(vars as CSSProperties), ...extra };
}
