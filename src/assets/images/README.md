# Image slots

All artwork is WebP. To replace an image, overwrite the file and **keep the same file name**
(similar proportions keep layouts unchanged). Decorative pieces use empty `alt` text; meaningful
images get their alt text from the data files or the component that renders them.

**Source** says where each file came from:
- *Assets folder*: from the supplied `Assets` folder (Canva exports).
- *Brochure PDF (hi-res)*: the same artwork as in the Assets folder, taken at higher resolution from the brochure PDF.
- *Brochure PDF*: not in the Assets folder; extracted from the brochure PDF.

## Logos (`src/assets/logos/`)

| File | Size | Shows | Used in | Source |
| --- | --- | --- | --- | --- |
| `ecell-crest.webp` | 320×255 | E-Cell NIT Meghalaya crest (peacocks, shield) | navbar, hero, footer | Brochure PDF (hi-res) |
| `bse-logo.webp` | 450×246 | BSE logo | navbar (xl+), hero, sponsors card, footer | Brochure PDF (hi-res) |

## Photos and illustrations

| File | Size | Shows | Used in | Source |
| --- | --- | --- | --- | --- |
| `sunrise-banner.webp` | 1588×584 | Sunrise over a sea of clouds, ridge with people | Home: welcome banner | Brochure PDF (hi-res) |
| `sunrise-circle.webp` | 720×720 | Hilltop sunrise over clouds (square, shown as a circle) | Project Sunray: Next Generation | Brochure PDF |
| `dragon-waves.webp` | 1600×619 | Painted dragon in sunlit clouds and waves | Home: end of welcome | Brochure PDF (hi-res) |
| `festival-concert.webp` | 900×900 | Night concert: stage, lasers, fireworks, crowd | Experience: festival circle | Brochure PDF |
| `futuristic-eye.webp` | 1600×897 | Eye reflecting orange circuit light | Project Sunray: closing band | Brochure PDF |
| `ne-heritage-band.webp` | 1024×341 | Northeast heritage line art: root bridge, caves, waterfalls, orchids, train, satellite, globe | Home: hero bottom | Assets folder |
| `pagoda-sketch.webp` | 540×594 | Pencil sketch of a pagoda/monastery | Home: hero bottom-right | Brochure PDF (hi-res) |
| `tech-culture-band.webp` | 1600×309 | Tech & culture line art: turbines, solar, rocket, satellite, atoms, skyline, bridge, handshake, brain | Home: end of About | Brochure PDF (hi-res) |
| `valley-band.webp` | 1600×405 | Meghalaya valley: rhododendrons, waterfall, living root bridge, drone, signal tower | Experience: end of Summit | Brochure PDF |
| `who-comes-together.webp` | 1600×497 | People on a bridge beneath a dragon, rhino, turbines, monastery, orchids, train | Experience: Who Comes Together | Brochure PDF |
| `globe-dark.webp` | 900×755 | Navy dot-matrix globe, orange city lights, gold orbit | Home: hero | Brochure PDF (hi-res) |
| `globe-light.webp` | 820×690 | White dot-matrix globe, orange nodes over Northeast India | Home: About | Brochure PDF (hi-res) |
| `world-map-dots.webp` | 1100×435 | Faint dotted world map | Home: behind hero text | Brochure PDF (hi-res) |
| `skyline-blue.webp` | 1337×237 | Shillong landmarks line art (blue-grey) | Home: hero skyline + reflection | Brochure PDF (hi-res) |
| `skyline-gold.webp` | 1337×237 | Same skyline, recoloured gold | Footer top edge | derived from the skyline |
| `circuit-banner.webp` | 1024×210 | Navy circuit board leading to a chip and globe | Home: closing banner background | Brochure PDF |

## Ornaments

| File | Size | Shows | Used in | Source |
| --- | --- | --- | --- | --- |
| `gold-cloud-a.webp` | 900×579 | Gold auspicious cloud (wide) | most sections | Assets folder |
| `gold-cloud-b.webp` | 800×428 | Gold auspicious cloud (compact) | most sections | Assets folder |
| `crimson-cloud.webp` | 760×287 | Crimson cloud with scale pattern | Why the Northeast | Brochure PDF (hi-res cut) |
| `knot-corner.webp` | 380×395 | Crimson Tibetan-knot corner | Why the Northeast | Brochure PDF (hi-res cut) |
| `chinese-knot.webp` | 260×545 | Hanging red Chinese knot | Project Sunray | Brochure PDF |
| `lantern-frame.webp` | 160×758 | Tall red frame with a lantern | Experience: Summit left edge | Brochure PDF |
| `lanterns-pair.webp` | 900×463 | Two red lanterns on a string | Experience: Summit top-right | Brochure PDF |
| `lanterns-string.webp` | 1440×604 | Row of hanging paper lanterns | Sponsors: top (repeated) | Brochure PDF |
| `plum-blossom.webp` | 640×393 | Red plum-blossom branch | Sponsors: bottom corners | Brochure PDF |
| `flower-ornament.webp` | 560×382 | Magenta and saffron flower motif | Experience: Who Comes Together | Brochure PDF |
| `peach-cloud-a.webp`, `peach-cloud-b.webp` | ~560px | Soft watercolour peach clouds | section edges | Brochure PDF (hi-res) |
| `festival-pattern.webp` | 1600×937 | Red/gold peonies, dragons, coins, lanterns | Experience: festival top/bottom bands | Brochure PDF |
| `medallion-strip.webp` | 823×80 (tile) | Red medallion border | Experience: Summit top | Brochure PDF |
| `swirl-border.webp` | 831×160 (tile) | Red-and-cream swirl clouds | Project Sunray: top | Brochure PDF |
| `pattern-border.webp` | 724×48 (tile) | Small orange floral border | Sponsors: bottom | Brochure PDF |
| `lattice-tile.webp` | 129×240 (tile) | Gold geometric lattice | Why the Northeast: bottom | Brochure PDF (hi-res) |

The sunrise emblem, circuit traces, mandala, lanterns on the festival page, arc frames and stars are
drawn in SVG code (`src/components/ornaments/`), so they have no image files.
