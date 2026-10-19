# SWISF 2027 — SUNRAY World Innovation Summit & Festival

Website for **SUNRAY – World Innovation Summit & Festival 2027**, Shillong, Meghalaya.
Organised by **E-Cell, NIT Meghalaya**, co-powered by **BSE**. The design follows the printed brochure:
two-tone headings, gold cloud and circuit ornaments, outlined icon circles and the cream / navy / saffron palette.

**Stack:** React 18 · Vite 5 · TypeScript · Tailwind CSS 3 · React Router 6 · Framer Motion 11 · lucide-react

| Route | Page |
| --- | --- |
| `/` | Home: hero (brochure cover), welcome letter, About SWISF 2027, Why the Northeast, closing banner |
| `/experience` | The Summit by Day + Who Comes Together + The Festival by Night (the background turns to night as you scroll) |
| `/project-sunray` | The Next Generation: Project Centre journey and schools sign-up |
| `/sponsors` | Co-powered by BSE, partnership tiers (`#partner-with-us`), collaborate banner, partner logo wall |
| `/team` | Leadership and departments, filterable by department |
| anything else | 404: "The sun hasn't risen here" |

---

## 1. Run it locally

Requires **Node.js 18.18 or newer**.

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check, then production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # TypeScript only
```

## 2. Before you publish: set your domain

Replace `https://example.com` with your real domain in these three places:

1. **`.env`**: `VITE_SITE_URL=https://your-domain.in` (used for canonical links, Open Graph tags and the Event JSON-LD)
2. **`public/robots.txt`**
3. **`public/sitemap.xml`**

## 3. Deploy to Hostinger (shared hosting, `public_html`)

1. Run `npm run build`.
2. In Hostinger **File Manager** (or FTP), open `public_html/` and delete any old site files.
3. Upload **the contents of `dist/`** (not the `dist` folder itself) into `public_html/`.
   - `dist/.htaccess` is a hidden file. Enable *Show hidden files* in File Manager and make sure it was uploaded.
     It sends every page URL to `index.html`, so links such as `/team` work when opened or refreshed directly.
     It also turns on compression and long-term caching for the fingerprinted assets.
4. Open your domain and refresh a deep link (e.g. `/sponsors#partner-with-us`) to confirm routing works.

If a deep link shows a Hostinger 404, the `.htaccess` file is missing or `mod_rewrite` is off. Re-upload it.

## 4. Editing content

All text, lists and icons live in typed data files. You don't need to touch any component to change the copy.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Event name, dates, location, **countdown**, phone, email, **social links**, navigation, organiser blurb, per-page `<title>`/description |
| `src/data/home.ts` | Welcome letter, three pillars, About text, "At a glance" stats, Day/Night cards, Why the Northeast, the eight states, region/SWISF lists, closing banner |
| `src/data/summit.ts` | Experience page intro, Summit activities (8), conversation topics, Who Comes Together, agenda placeholder |
| `src/data/festival.ts` | Festival copy, highlights, closing line, line-up placeholder |
| `src/data/sunray.ts` | Project Sunray copy, the four journey steps, schools call-to-action |
| `src/data/partners.ts` | BSE contributions, partnership tiers, **partner logo list** |
| `src/data/team.ts` | Departments and **team members** |

Icons are [Lucide](https://lucide.dev/icons/) components. To change one, import another name from `lucide-react` at the top of the data file.
Accent colours are `'royal' | 'saffron' | 'teal' | 'violet' | 'crimson' | 'gold'`.

### Countdown and dates

In `src/data/site.ts → countdown`:

```ts
countdown: {
  enabled: true,                          // false hides it
  target: '2027-04-25T09:00:00+05:30',    // opening day (IST)
  targetLabel: '25 April 2027',
  datesToBeAnnounced: true,               // shows "Dates to be announced"
},
```

### Social links

`site.socials` in `src/data/site.ts`. LinkedIn and YouTube are **placeholder search links**. Paste the official page URLs.

### Adding team members

Edit `src/data/team.ts`. Every current entry is a placeholder ("Member Name" / "Head Name").

```ts
import priyaPhoto from '../assets/images/team/priya.webp'; // optional square photo

{ id: 'technical-head', name: 'Priya Sharma', role: 'Head', title: 'Technical Head',
  department: 'Technical', photo: priyaPhoto,
  socials: { linkedin: 'https://linkedin.com/in/…', instagram: 'https://instagram.com/…', email: 'priya@…' } },
```

- `role`: `'President' | 'Vice President' | 'Secretary' | 'Head' | 'Member'`. Leadership roles appear at the top; Heads and Members appear under their department.
- Without a `photo`, the card shows the person's initials on a tinted circle.
- Social icons only appear for the links you provide (on desktop they slide up on hover).
- Use `order` (lower first) to control ordering inside a group.
- Photos: square, about 400×400px, WebP, in `src/assets/images/team/`.

### Adding partner logos

The "Our 2027 Partners" logo wall on `/sponsors` stays hidden until the list has an entry. In `src/data/partners.ts`:

```ts
import acmeLogo from '../assets/logos/acme.webp';

export const partners: Partner[] = [
  { name: 'Acme Ventures', logo: acmeLogo, url: 'https://acme.example', tier: 'Associate Partner' },
];
```

Logos show in grayscale and turn to colour on hover. Transparent PNG/WebP, at least 400px wide, works best.

### Brochure download

The "Download Brochure (PDF)" buttons link to `public/swisf-2027-brochure.pdf`. Replace that file to update it (keep the name).

## 5. Images

Every image is in `src/assets/images/` or `src/assets/logos/` as WebP. **[`src/assets/images/README.md`](src/assets/images/README.md)** lists each file, what it shows, where it's used and where it came from.
To swap an image, replace the file and keep the same name (ideally similar proportions).

Social sharing image: `public/og-image.jpg` (1200×630). Favicon: `public/favicon.svg` and `public/apple-touch-icon.png`.

## 6. Project structure

```
src/
  main.tsx, App.tsx, index.css        entry, routes + page transitions, global styles
  routes/                              Home, Experience, ProjectSunray, Sponsors, Team, NotFound
  components/
    layout/                            Navbar, MobileSidebar, Footer, PageShell, ScrollToTop
    ui/                                SectionHeading, Eyebrow, IconCircle, Card, Pill, Button, DividerLabel,
                                       Reveal, LogoLockup, SunrayLockup, Countdown, Motto, SocialLinks, icons
    ornaments/                         GoldCloud, CircuitTraces, SunriseRays, DottedGlobe, SkylineStrip, Lantern,
                                       LatticeBorder, MandalaWatermark, ArcFrame, StarField, Decor
    sections/                          Hero, Welcome, AboutSwisf, WhyNortheast, StatesRing, HomeCta,
                                       ExperienceHero, SummitByDay, WhoComesTogether, FestivalByNight,
                                       NextGeneration, Partners, TeamGrid, StatCounter
  data/                                site, home, summit, festival, sunray, partners, team
  hooks/                               useCountdown, useScrolled, usePageMeta
  lib/                                 accents (colour → class maps), cn, cssVars
  assets/images, assets/logos          WebP artwork
public/                                .htaccess, favicon.svg, apple-touch-icon.png, og-image.jpg,
                                       robots.txt, sitemap.xml, swisf-2027-brochure.pdf
```

## 7. Design tokens

Defined in `tailwind.config.ts` (and mirrored as CSS variables in `src/index.css`):

| Token | Hex | Use |
| --- | --- | --- |
| `navy` / `navy-deep` | `#0E1A3D` / `#0A1230` | headings line 1, dark panels, footer |
| `cream` / `cream-2` | `#FAF6EE` / `#F4EDE0` | page backgrounds (alternating) |
| `gold` / `gold-soft` | `#C9A24A` / `#E6CF94` | ornaments, rules, focus ring |
| `saffron` | `#E07B39` | headings line 2, eyebrows, accents |
| `royal` · `teal` · `violet` | `#3B5BB5` · `#1F7A6A` · `#7A4FB0` | icon accents |
| `crimson` | `#B5122B` | SWISF · 2027, lanterns, knots |
| `ink-muted` · `line` | `#4A5068` · `#E7DCC8` | body copy, borders |

Brochure saffron and gold are too light for small text on cream, so text uses slightly deeper `*-ink` versions of the same hues
(`saffron-ink`, `gold-ink`, `teal-ink`) to pass WCAG AA. Ornaments, icons and borders keep the exact brochure colours.

## 8. Accessibility and motion

- Semantic landmarks, one `<h1>` per page, skip link, alt text on every meaningful image (decorative art has empty alt).
- Gold focus rings; all buttons and links have touch targets of 44px or more.
- Mobile menu: focus is trapped inside, Esc / overlay / link click closes it, focus returns to the menu button, and body scroll is locked.
- `prefers-reduced-motion` turns off every non-essential animation (clouds, lanterns, rays, globe, reveals, page transitions).
