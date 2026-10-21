import type { Config } from 'tailwindcss';

/**
 * SWISF 2027 design tokens — taken from the printed brochure.
 *
 * Brand colours are used as-is for ornaments, icons, borders and rules.
 * The `*-ink` variants are slightly deeper versions of the same hues, used only
 * for TEXT on cream so every label passes WCAG AA contrast:
 *   - `ink`    → small text (≥ 4.5:1)
 *   - `ink-lg` → large headings, 24px+ (≥ 3:1)
 * The `*-bright` variants are for icons/text on the dark night/navy panels.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        navy: { DEFAULT: '#0E1A3D', deep: '#0A1230' },
        cream: { DEFAULT: '#FAF6EE', 2: '#F4EDE0' },
        gold: {
          DEFAULT: '#C9A24A',
          soft: '#E6CF94',
          brown: '#B8873A',
          ink: '#8A652C',
          'ink-lg': '#A97A33',
        },
        saffron: {
          DEFAULT: '#E07B39',
          ink: '#AA531B',
          'ink-lg': '#C65F21',
          bright: '#F29A5E',
        },
        royal: { DEFAULT: '#3B5BB5', bright: '#93AAF0' },
        teal: { DEFAULT: '#1F7A6A', ink: '#1A6B5D', bright: '#5CC8AE' },
        violet: { DEFAULT: '#7A4FB0', bright: '#BC9BF3' },
        crimson: { DEFAULT: '#B5122B', light: '#E5455F' },
        ink: { muted: '#4A5068' },
        line: '#E7DCC8',
        night: { DEFAULT: '#1A1240', 2: '#2A1A5E' },
        festival: '#8E1B1B',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Cormorant', 'Georgia', 'Times New Roman', 'serif'],
      },
      minHeight: {
        /** One full screen below the sticky navbar */
        panel: 'calc(100svh - var(--nav-h))',
      },
      maxWidth: {
        content: '1200px',
        prose: '62ch',
      },
      boxShadow: {
        card: '0 6px 24px rgba(14, 26, 61, 0.06)',
        lift: '0 16px 36px rgba(14, 26, 61, 0.12)',
        nav: '0 6px 24px rgba(14, 26, 61, 0.08)',
        glow: '0 0 0 6px rgba(201, 162, 74, 0.12)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateX(-8px)' },
          '50%': { transform: 'translateX(8px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2.5deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        sheen: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.65', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-slower': 'spin 120s linear infinite',
        kenburns: 'kenburns 32s ease-in-out infinite alternate',
        marquee: 'marquee var(--marquee-dur, 40s) linear infinite',
        bob: 'bob 4s ease-in-out infinite',
        sheen: 'sheen 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 6s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        'drift-slow': 'drift 16s ease-in-out infinite',
        sway: 'sway 5s ease-in-out infinite',
        'sway-slow': 'sway 7s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
        twinkle: 'twinkle 3.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
