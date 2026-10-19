import { createLucideIcon } from 'lucide-react';

/**
 * Custom line icons drawn in Lucide's style (24px grid, 1.5–2px stroke, round
 * caps), so they behave exactly like lucide-react icons.
 *
 * Social glyphs are kept here instead of importing Lucide's brand icons, which
 * Lucide has deprecated.
 */

export const InstagramIcon = createLucideIcon('InstagramOutline', [
  ['rect', { x: '3', y: '3', width: '18', height: '18', rx: '5', key: 'ig-frame' }],
  ['circle', { cx: '12', cy: '12', r: '4', key: 'ig-lens' }],
  ['path', { d: 'M17.5 6.5h.01', key: 'ig-dot' }],
]);

export const LinkedinIcon = createLucideIcon('LinkedinOutline', [
  ['rect', { x: '3', y: '3', width: '18', height: '18', rx: '3', key: 'li-frame' }],
  ['path', { d: 'M8 10.5V17', key: 'li-i' }],
  ['path', { d: 'M8 7.5h.01', key: 'li-dot' }],
  ['path', { d: 'M12 17v-6.5', key: 'li-n1' }],
  ['path', { d: 'M12 13.5c0-1.8 1.1-3 2.6-3s2.4 1.1 2.4 3V17', key: 'li-n2' }],
]);

export const YoutubeIcon = createLucideIcon('YoutubeOutline', [
  ['rect', { x: '2.5', y: '5', width: '19', height: '14', rx: '4', key: 'yt-frame' }],
  ['path', { d: 'm10 9.25 5 2.75-5 2.75z', key: 'yt-play' }],
]);

/** Ball of yarn — "Bamboo, handloom and crafts" in the brochure. */
export const YarnIcon = createLucideIcon('YarnBall', [
  ['circle', { cx: '11', cy: '11', r: '8', key: 'yarn-ball' }],
  ['path', { d: 'M4.6 7.4c3.6.4 7.2 3 8.9 10.6', key: 'yarn-a' }],
  ['path', { d: 'M3.3 11.6c2.9.5 5.3 2.4 6.6 6.9', key: 'yarn-b' }],
  ['path', { d: 'M7.9 3.7c3.4 1.6 6.4 5 7.8 10.4', key: 'yarn-c' }],
  ['path', { d: 'M12.6 3.2c2.4 1.6 4.4 4.3 5.4 7.5', key: 'yarn-d' }],
  ['path', { d: 'M16.4 17.6c1.6 1.7 3.4 2.6 5.1 2.4', key: 'yarn-tail' }],
]);
