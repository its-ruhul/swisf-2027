# Image slots

All artwork is WebP. To replace an image, overwrite the file and **keep the same file name**
(similar proportions keep layouts unchanged). Decorative pieces use empty `alt` text; meaningful
images get their alt text from the data files or the component that renders them.

**Source** says where each file came from:
- *Assets folder*: from the supplied `Assets` folder (Canva exports).
- *Brochure PDF (hi-res)*: the same artwork as in the Assets folder, taken at higher resolution from the brochure PDF.
- *Brochure PDF*: not in the Assets folder; extracted from the brochure PDF.
- *Official logo*: cropped from the supplied SUNRAY / SWISF 2027 logo (2000×1914, transparent), never stretched.

## Logos (`src/assets/logos/`)

| File | Size | Shows | Used in | Source |
| --- | --- | --- | --- | --- |
| `swisf-emblem.webp` | 960×495 | Sunrise emblem only (rays, arcs, star, gold sun, crimson diamond) | Home hero (rising on the horizon), 404 | Official logo |
| `swisf-emblem-sm.webp` | 360×186 | Same emblem, small | Navbar | Official logo |
| `swisf-logo.webp` | 800×718 | Full logo, navy SUNRAY wordmark | `SunrayLockup tone="light"` | Official logo |
| `swisf-logo-dark.webp` | 800×718 | Full logo recoloured for navy: cream wordmark, brighter gold and crimson text | Footer, mobile menu, Home closing banner | Official logo |
| `bse-logo.webp` | 450×246 | BSE logo | navbar (xl+), sponsors card, footer | Brochure PDF (hi-res) |
| `bse-logo-light.webp` | 450×246 | BSE logo with cream letters | navbar over the home hero | derived from the BSE logo |
| `ecell-crest.webp` | 320×255 | E-Cell NIT Meghalaya crest (peacocks, shield) | footer ("Organised by") | Brochure PDF (hi-res) |

The favicons (`public/favicon.png`, `public/apple-touch-icon.png`) are the centre of the emblem on a navy tile.

## Photos and illustrations

| File | Size | Shows | Used in | Source |
| --- | --- | --- | --- | --- |
| `sunrise-banner.webp` | 1588×584 | Sunrise over a sea of clouds, ridge with people | Home: full-screen hero background | Brochure PDF (hi-res) |
| `sunrise-circle.webp` | 720×720 | Hilltop sunrise over clouds (square, shown as a circle) | Project Centre | Brochure PDF |
| `dragon-waves.webp` | 1600×619 | Painted dragon in sunlit clouds and waves | Home: Welcome "moon gate" circle | Brochure PDF (hi-res) |
| `festival-concert.webp` | 900×900 | Night concert / jam session: stage, lasers, fireworks, crowd | Experience: Night | Brochure PDF |
| `tech-culture-band.webp` | 1600×309 | Tech & culture line art: turbines, solar, rocket, satellite, atoms, skyline, bridge, handshake, brain | Home: About (faint, along the bottom) | Brochure PDF (hi-res) |
| `valley-band.webp` | 1600×405 | Meghalaya valley: rhododendrons, waterfall, living root bridge, drone, signal tower | Experience: Day (along the bottom) | Brochure PDF |
| `globe-light.webp` | 820×690 | White dot-matrix globe, orange nodes over Northeast India | Home: About | Brochure PDF (hi-res) |
| `globe-dark.webp` | 900×755 | Navy dot-matrix globe, orange city lights, gold orbit | `DottedGlobe variant="dark"` (not on a page at the moment) | Brochure PDF (hi-res) |
| `skyline-gold.webp` | 1337×237 | Shillong landmarks line art, gold | Footer top edge | derived from the skyline |
| `skyline-blue.webp` | 1337×237 | Same skyline, blue-grey | `SkylineStrip tone="blue"` (not on a page at the moment) | Brochure PDF (hi-res) |
| `circuit-banner.webp` | 1024×210 | Navy circuit board leading to a chip and globe | Home: closing banner background | Brochure PDF |

## Ornaments

| File | Size | Shows | Used in | Source |
| --- | --- | --- | --- | --- |
| `gold-cloud-a.webp` | 900×579 | Gold auspicious cloud (wide) | most sections | Assets folder |
| `gold-cloud-b.webp` | 800×428 | Gold auspicious cloud (compact) | most sections | Assets folder |
| `crimson-cloud.webp` | 760×287 | Crimson cloud with scale pattern | Why the Northeast | Brochure PDF (hi-res cut) |
| `knot-corner.webp` | 380×395 | Crimson Tibetan-knot corner | Why the Northeast | Brochure PDF (hi-res cut) |
| `chinese-knot.webp` | 260×545 | Hanging red Chinese knot | Project Centre | Brochure PDF |
| `lantern-frame.webp` | 160×758 | Tall red frame with a lantern | Experience: Day (right edge, xl+) | Brochure PDF |
| `lanterns-pair.webp` | 900×463 | Two red lanterns on a string | Experience: Day (top-left) | Brochure PDF |
| `lanterns-string.webp` | 1440×604 | Row of hanging paper lanterns | Sponsors: top (repeated) | Brochure PDF |
| `plum-blossom.webp` | 640×393 | Red plum-blossom branch | Sponsors: bottom corners | Brochure PDF |
| `peach-cloud-a.webp`, `peach-cloud-b.webp` | ~560px | Soft watercolour peach clouds | section edges | Brochure PDF (hi-res) |
| `festival-pattern.webp` | 1600×937 | Red/gold peonies, dragons, coins, lanterns | Experience: Night (bottom band) | Brochure PDF |
| `medallion-strip.webp` | 823×80 (tile) | Red medallion border | Experience: Day (top) | Brochure PDF |
| `swirl-border.webp` | 831×160 (tile) | Red-and-cream swirl clouds | Project Centre: top | Brochure PDF |
| `pattern-border.webp` | 724×48 (tile) | Small orange floral border | Sponsors: bottom | Brochure PDF |
| `lattice-tile.webp` | 129×240 (tile) | Gold geometric lattice | Why the Northeast: bottom | Brochure PDF (hi-res) |

Drawn in code (`src/components/ornaments/`, no image files): circuit traces, lotus mandala, dharma wheel (in `StatesRing`),
paper lanterns, arc frames, stars, seigaiha waves, prayer flags, fireworks, sky lanterns, gold dust, plum petals, the atom
and the ensō brush circle. The hanko seals and calligraphy watermarks are live text in the Yuji Syuku font (see the main README).
