/**
 * Where the app is served from, worked out at runtime.
 *
 * The production build uses a relative base (`base: './'` in vite.config.ts), so the
 * same `dist/` works at the domain root (`https://site.com/`) or in any sub-folder
 * (`https://site.com/swisf-demo/`) without rebuilding. Every bundled chunk lives in
 * `<deploy-root>/assets/`, so the deploy root is the part of this module's URL
 * before `/assets/`. In dev the app is always served from `/`.
 */
function detectBase(): string {
  if (import.meta.env.DEV) return '';
  try {
    const { pathname } = new URL(import.meta.url);
    const i = pathname.lastIndexOf('/assets/');
    return i > 0 ? pathname.slice(0, i) : '';
  } catch {
    return '';
  }
}

/** Deploy root without a trailing slash: `''` at the domain root, `'/swisf-demo'` in a sub-folder. */
export const APP_BASE = detectBase();

/** `basename` for React Router. */
export const ROUTER_BASENAME = APP_BASE || '/';

/** Absolute URL for a file in `public/`, e.g. `publicUrl('/brochure.pdf')`. */
export function publicUrl(path: string): string {
  return `${APP_BASE}/${path.replace(/^\/+/, '')}`;
}
