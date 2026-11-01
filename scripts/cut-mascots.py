#!/usr/bin/env python3
"""Turn the mascot artwork into the layered WebPs used by the /mascots page.

    python scripts/cut-mascots.py <sun-image> <ray-image> [--preview <dir>]

For each mascot this writes body + left wing + right wing to
src/assets/images/mascots/, plus layout.json, which tells MascotArt.tsx where
each wing sits and where its shoulder is.

The supplied art is flat on white, so the mascot is first cut out of the white.
Art that already has transparency skips that step. All coordinates below are on
the 484 x 600 canvas of the supplied art and scale with the input, so a
higher-resolution export of the same picture works without any other change.

Requires Pillow and numpy (dev only, nothing here runs in the browser).
"""
import argparse
import json
import os
from collections import deque

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

BASE_W, BASE_H = 484, 600
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'images', 'mascots')

# Output height in pixels. The art is drawn up to about 880 CSS pixels tall.
TARGET_HEIGHT = 1000

MASCOTS = {
    'sun': {
        # white fabric must stay solid; only wings and hair may fade into the background
        'protect': [
            [(140, 232), (205, 215), (300, 210), (345, 245), (372, 330), (392, 395), (452, 505), (432, 600), (0, 600), (0, 530), (40, 495), (110, 432), (120, 380), (118, 300)],
        ],
        'erase': [
            [(0, 498), (58, 498), (60, 512), (46, 528), (26, 532), (0, 522)],  # stray leaf, left of the hem
            [(447, 505), (484, 505), (484, 600), (462, 600), (450, 560)],  # stray leaf, right of the hem
        ],
        # sky left behind between the crown's spikes: pale, colourless specks
        'speck_zones': [[(150, 20), (345, 20), (350, 165), (305, 135), (290, 106), (200, 110), (180, 135), (150, 165)]],
        'speck_keep': (243, 85, 19),  # the orb at the top of the crown is meant to be bright
        't_out': 0.86,
        't_protect': 0.975,
        'hole_min_pure': 0.1,
        'edge_fade': {'right': 8, 'left': 6},
        'extend_wing': None,
        'crop': (0, 12, 484, 600),
        # outer = the part that moves; full = outer plus a stub that slides under the body
        'wings': {
            'left': {
                'outer': [(4, 66), (60, 108), (110, 146), (152, 170), (150, 205), (143, 225), (130, 245), (118, 266), (88, 262), (56, 222), (26, 168), (6, 110)],
                'full': [(4, 66), (60, 108), (110, 146), (168, 170), (170, 205), (163, 232), (150, 254), (136, 276), (88, 268), (56, 226), (26, 172), (4, 112)],
                'pivot': (172, 238),
            },
            'right': {
                'outer': [(362, 176), (400, 146), (440, 100), (470, 54), (484, 54), (484, 136), (472, 172), (448, 208), (428, 244), (408, 268), (392, 272), (385, 255), (372, 235), (368, 210)],
                'full': [(346, 176), (400, 146), (440, 100), (470, 54), (484, 54), (484, 136), (472, 172), (448, 208), (428, 244), (408, 272), (382, 286), (370, 264), (356, 240), (352, 210)],
                'pivot': (332, 240),
            },
        },
    },
    'ray': {
        # chest, belly and the badge are cream or white but solid; fur and whiskers may fade
        'protect': [
            [(205, 225), (262, 225), (282, 290), (330, 300), (335, 445), (262, 447), (215, 400), (205, 340)],
            [(210, 275), (245, 275), (245, 326), (210, 326)],
        ],
        'erase': [],
        't_out': 0.80,
        't_protect': 0.97,
        'hole_min_pure': 0.05,
        'edge_fade': {'bottom': 5},
        'speck_zones': [],
        'speck_keep': None,
        # the wing runs off the right edge of the picture: finish it with a tip like its other lobes, painted
        # by extending the edge colours along the wing's fan of bones (fan centre, then the new outline)
        'extend_wing': {'fan': (373, 152), 'top': (482, 220), 'top_ctrl': (506, 244), 'tip': (525, 302), 'bottom_ctrl': (491, 280), 'bottom': (482, 311), 'inner_x': 470},
        'crop': (92, 44, 530, 600),
        'wings': {
            'left': {
                'outer': [(172, 232), (172, 340), (150, 362), (156, 428), (90, 428), (90, 148), (130, 148)],
                'full': [(186, 236), (188, 346), (152, 372), (158, 430), (88, 430), (88, 146), (132, 146)],
                'pivot': (202, 292),
            },
            'right': {
                'outer': [(336, 276), (352, 240), (356, 108), (532, 108), (532, 370), (414, 354), (392, 320), (384, 346), (371, 346), (367, 322), (336, 318)],
                'full': [(322, 278), (340, 238), (352, 106), (534, 106), (534, 372), (414, 358), (392, 324), (384, 350), (369, 350), (363, 326), (322, 322)],
                'pivot': (306, 300),
            },
        },
    },
}


def poly_mask(size, polys, scale):
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    for poly in polys:
        draw.polygon([(x * scale, y * scale) for x, y in poly], fill=255)
    return mask


def blurred(mask, radius):
    return np.asarray(mask.filter(ImageFilter.GaussianBlur(radius))).astype(np.float32) / 255


def components(mask):
    h, w = mask.shape
    labels = -np.ones(mask.shape, np.int32)
    found = []
    for sy, sx in zip(*np.nonzero(mask)):
        if labels[sy, sx] >= 0:
            continue
        queue = deque([(sy, sx)])
        labels[sy, sx] = len(found)
        pts, touches = [], False
        while queue:
            y, x = queue.popleft()
            pts.append((y, x))
            touches = touches or y in (0, h - 1) or x in (0, w - 1)
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and labels[ny, nx] < 0:
                    labels[ny, nx] = len(found)
                    queue.append((ny, nx))
        found.append((pts, touches))
    return found


def flood(seed, passable):
    h, w = passable.shape
    seen = seed.copy()
    queue = deque(zip(*np.nonzero(seed)))
    while queue:
        y, x = queue.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and passable[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True
                queue.append((ny, nx))
    return seen


def dilate(mask, radius):
    out = mask.copy()
    for _ in range(radius):
        grown = out.copy()
        grown[1:, :] |= out[:-1, :]
        grown[:-1, :] |= out[1:, :]
        grown[:, 1:] |= out[:, :-1]
        grown[:, :-1] |= out[:, 1:]
        out = grown
    return out


def cut_from_white(rgb, spec, scale):
    """Soft alpha from how white a pixel is, for white connected to the outside (or trapped in hair)."""
    h, w, _ = rgb.shape
    low = rgb.min(axis=2)
    low8 = (low * 255).round().astype(np.int32)
    protect = poly_mask((w, h), spec['protect'], scale)
    protect_np = np.asarray(protect) > 127
    fade_limit = spec['t_out'] + (spec['t_protect'] - spec['t_out']) * blurred(protect, 3 * scale)

    seed = np.zeros((h, w), bool)
    for pts, touches in components(low8 >= 250):
        ys, xs = zip(*pts)
        is_hole = np.mean(low8[ys, xs] == 255) >= spec['hole_min_pure'] and protect_np[ys, xs].mean() < 0.5
        if touches or is_hole:
            seed[ys, xs] = True

    fading = flood(seed, low >= fade_limit)
    alpha = np.ones((h, w), np.float32)
    alpha[fading] = np.clip((1 - low[fading]) / (1 - fade_limit[fading]), 0, 1)

    if spec['speck_zones']:
        zone = np.asarray(poly_mask((w, h), spec['speck_zones'], scale)) > 127
        pale = zone & (low >= 0.7) & ((rgb.max(axis=2) - low) <= 0.12)
        if spec['speck_keep']:
            cx, cy, r = (v * scale for v in spec['speck_keep'])
            yy, xx = np.mgrid[0:h, 0:w]
            pale &= (xx - cx) ** 2 + (yy - cy) ** 2 > r * r
        for pts, _ in components(pale):
            if len(pts) <= 45 * scale * scale:
                ys, xs = zip(*pts)
                alpha[ys, xs] = 0

    # Rim pixels were painted half-way to white, so they read as a pale outline on dark backgrounds.
    # Take the true colour from the darkest neighbour and turn the rest of the pixel into transparency.
    radius = max(1, int(round(2 * scale)))
    rim = dilate(alpha < 0.5, radius) & (alpha >= 0.5) & ~protect_np
    white = np.ones(3, np.float32)
    for y, x in zip(*np.nonzero(rim)):
        y0, y1, x0, x1 = max(0, y - radius), min(h, y + radius + 1), max(0, x - radius), min(w, x + radius + 1)
        window_low = np.where(alpha[y0:y1, x0:x1] > 0.5, low[y0:y1, x0:x1], 2)
        iy, ix = np.unravel_index(np.argmin(window_low), window_low.shape)
        true_colour = rgb[y0 + iy, x0 + ix]
        away = white - true_colour
        denom = float(np.dot(away, away))
        if denom > 1e-4:
            alpha[y, x] = min(alpha[y, x], float(np.clip(np.dot(white - rgb[y, x], away) / denom, 0, 1)))

    return alpha


def bezier(p0, p1, p2, steps=40):
    return [tuple((1 - t) ** 2 * a + 2 * (1 - t) * t * b + t * t * c for a, b, c in zip(p0, p1, p2)) for t in np.linspace(0, 1, steps)]


def extend_wing(rgba, spec, scale):
    """Add canvas on the right and paint the end of a wing the picture cuts off."""
    h, w, _ = rgba.shape
    extra = int(round(50 * scale))
    out = np.zeros((h, w + extra, 4), np.float32)
    out[:, :w] = rgba

    inner = spec['inner_x']
    outline = [(inner, spec['top'][1]), *bezier(spec['top'], spec['top_ctrl'], spec['tip']), *bezier(spec['tip'], spec['bottom_ctrl'], spec['bottom']), (inner, spec['bottom'][1])]
    edge = int(round(inner * scale))

    # coverage drawn large and reduced, for a smooth edge
    ss = 4
    big = Image.new('L', ((w + extra) * ss, h * ss), 0)
    ImageDraw.Draw(big).polygon([(x * scale * ss, y * scale * ss) for x, y in outline], fill=255)
    coverage = np.asarray(big.resize((w + extra, h), Image.BOX)).astype(np.float32) / 255

    # where the new paint takes over from the old: a soft ramp, never a line
    ramp = np.clip((np.arange(w + extra) - edge) / (11 * scale), 0, 1)
    ramp = ramp * ramp * (3 - 2 * ramp)
    weight = soft(coverage, 3 * scale) * ramp[None, :]

    cx, cy = spec['fan'][0] * scale, spec['fan'][1] * scale
    span = 3 * scale
    for y, x in zip(*np.nonzero((weight > 0.004) | ((coverage > 0) & (ramp[None, :] > 0)))):
        dx, dy = x - cx, y - cy
        # walk back along the bone that passes through this pixel to the last column of real paint
        k = (edge - 1 - cx) / dx
        samples = []
        for back in (0, span * 0.5, span):
            sx = cx + dx * k - back * dx / np.hypot(dx, dy)
            sy = cy + dy * k - back * dy / np.hypot(dx, dy)
            iy, ix = int(round(sy)), int(round(sx))
            if 0 <= iy < h and 0 <= ix < w and rgba[iy, ix, 3] > 0.9:
                samples.append(rgba[iy, ix, :3])
        if not samples:
            continue
        painted = np.mean(samples, axis=0)
        real_alpha = out[y, x, 3]
        if real_alpha > 0.9:
            out[y, x, :3] = out[y, x, :3] * (1 - weight[y, x]) + painted * weight[y, x]
        else:
            out[y, x, :3] = painted
        out[y, x, 3] = max(real_alpha, coverage[y, x])
    return out


def soften_outline(rgba, scale):
    """A hair of softening along the outline, so it does not stair-step when enlarged."""
    alpha = rgba[..., 3]
    near = dilate(alpha < 0.98, max(1, int(round(scale))))
    radius = 0.6 * scale
    colour = rgba[..., :3].copy()
    soft_alpha = soft(alpha, radius)
    new_alpha = np.where(near, soft_alpha, alpha)
    for i in range(3):
        premultiplied = rgba[..., i] * alpha
        blended = np.where(near, soft(premultiplied, radius), premultiplied)
        colour[..., i] = np.clip(blended / np.maximum(new_alpha, 1e-3), 0, 1)
    return np.dstack([colour, new_alpha])


def premultiplied_resize(rgba, size):
    a = rgba[..., 3:]
    channels = [Image.fromarray(np.clip(rgba[..., i] * rgba[..., 3], 0, 1) * 255) for i in range(3)]
    channels.append(Image.fromarray(rgba[..., 3] * 255))
    resized = [np.asarray(c.resize(size, Image.LANCZOS)).astype(np.float32) / 255 for c in channels]
    alpha = np.clip(resized[3], 0, 1)
    safe = np.maximum(alpha, 1e-3)
    return np.dstack([np.clip(resized[0] / safe, 0, 1), np.clip(resized[1] / safe, 0, 1), np.clip(resized[2] / safe, 0, 1), alpha])


def to_image(rgba):
    return Image.fromarray((np.clip(rgba, 0, 1) * 255).round().astype(np.uint8), 'RGBA')


def soft(channel, radius=6):
    return np.asarray(Image.fromarray((channel * 255).round().astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius))).astype(np.float32) / 255


def sharpen(im):
    # let the colour bleed under the transparent pixels first, or sharpening draws a halo around the outline
    data = np.asarray(im).astype(np.float32) / 255
    soft_alpha = np.maximum(soft(data[..., 3]), 1e-3)
    filled = data[..., :3].copy()
    for i in range(3):
        bleed = soft(data[..., i] * data[..., 3]) / soft_alpha
        filled[..., i] = np.where(data[..., 3] < 0.6, np.clip(bleed, 0, 1), data[..., i])
    rgb = Image.fromarray((filled * 255).round().astype(np.uint8), 'RGB').filter(ImageFilter.UnsharpMask(radius=1.8, percent=60, threshold=2))
    rgb.putalpha(im.getchannel('A'))
    return rgb


def build(name, path, preview_dir):
    spec = MASCOTS[name]
    src = Image.open(path)
    scale = src.width / BASE_W
    print(f'{name}: {src.width}x{src.height} {src.mode}, scale {scale:.2f}')

    if src.mode in ('RGBA', 'LA') and np.asarray(src.convert('RGBA'))[..., 3].min() < 200:
        rgba = np.asarray(src.convert('RGBA')).astype(np.float32) / 255
        alpha = rgba[..., 3]
        rgb = rgba[..., :3]
    else:
        rgb = np.asarray(src.convert('RGB')).astype(np.float32) / 255
        alpha = cut_from_white(rgb, spec, scale)

    h, w = alpha.shape
    if spec['erase']:
        alpha = alpha * (1 - blurred(poly_mask((w, h), spec['erase'], scale), 1.2 * scale))

    for pts, _ in components(alpha > 0.04):
        if len(pts) < 40 * scale * scale:
            ys, xs = zip(*pts)
            alpha[ys, xs] = 0

    for side, px in spec['edge_fade'].items():
        ramp = np.clip(np.arange(max(w, h)) / (px * scale), 0, 1)
        ramp = ramp * ramp * (3 - 2 * ramp)
        if side == 'right':
            alpha = alpha * ramp[w - 1 - np.arange(w)][None, :]
        elif side == 'left':
            alpha = alpha * ramp[np.arange(w)][None, :]
        elif side == 'bottom':
            alpha = alpha * ramp[h - 1 - np.arange(h)][:, None]

    # remove what the white background still contributes to semi-transparent pixels
    a = np.maximum(alpha, 1e-3)[..., None]
    colour = np.where(alpha[..., None] > 0.995, rgb, np.clip((rgb - (1 - a)) / a, 0, 1))
    rgba = np.dstack([colour, alpha])

    if spec['extend_wing']:
        rgba = extend_wing(rgba, spec['extend_wing'], scale)
    rgba = soften_outline(rgba, scale)
    h, w, _ = rgba.shape

    # layers: the body loses the outer wings (soft seam); each wing keeps a stub that hides under the body
    size = (w, h)
    outer = {}
    full = {}
    for side, wing in spec['wings'].items():
        outer[side] = blurred(poly_mask(size, [wing['outer']], scale), 4 * scale)
        full[side] = blurred(poly_mask(size, [wing['full']], scale), 1 * scale)
    body_mask = (1 - outer['left']) * (1 - outer['right'])

    crop = tuple(int(round(v * scale)) for v in spec['crop'])
    cw, ch = crop[2] - crop[0], crop[3] - crop[1]
    upscale = TARGET_HEIGHT / ch
    final = (int(round(cw * upscale)), int(round(ch * upscale)))

    def layer(mask):
        data = rgba.copy()
        data[..., 3] = rgba[..., 3] * mask
        data = data[crop[1]:crop[3], crop[0]:crop[2]]
        return sharpen(to_image(premultiplied_resize(data, final)))

    os.makedirs(OUT_DIR, exist_ok=True)
    table = {'width': final[0], 'height': final[1]}

    def save(im, label, tight):
        box = im.getchannel('A').point(lambda v: 255 if v > 3 else 0).getbbox() if tight else (0, 0, im.width, im.height)
        part = im.crop(box)
        out = os.path.join(OUT_DIR, f'{name}-{label}.webp')
        part.save(out, 'WEBP', quality=82, alpha_quality=85, method=6)
        print(f'  {name}-{label}.webp {part.width}x{part.height} {os.path.getsize(out) // 1024} KB')
        return part, box

    body, _ = save(layer(body_mask), 'body', False)

    placed = {}
    for side, wing in spec['wings'].items():
        part, box = save(layer(full[side]), f'wing-{side}', True)
        px = (wing['pivot'][0] * scale - crop[0]) * upscale
        py = (wing['pivot'][1] * scale - crop[1]) * upscale
        placed[side] = (part, box, (px, py))
        table[side] = {
            'pixelWidth': box[2] - box[0],
            'pixelHeight': box[3] - box[1],
            'left': round(box[0] / final[0] * 100, 2),
            'top': round(box[1] / final[1] * 100, 2),
            'width': round((box[2] - box[0]) / final[0] * 100, 2),
            'height': round((box[3] - box[1]) / final[1] * 100, 2),
            'originX': round((px - box[0]) / (box[2] - box[0]) * 100, 2),
            'originY': round((py - box[1]) / (box[3] - box[1]) * 100, 2),
        }

    if preview_dir:
        os.makedirs(preview_dir, exist_ok=True)
        # how the layers look at rest and at both ends of the wing beat, on the backgrounds they will meet
        angles = {'rest': (0, 0), 'up': (2.4, -2.4), 'down': (-3.6, 3.6)}
        backs = {'night': (10, 18, 48, 255), 'cream': (250, 246, 238, 255)}
        sheet = Image.new('RGB', (final[0] * 3 // 2 + 20, final[1] * 2 // 2 + 10), 'white')
        for row, back in enumerate(backs.values()):
            for col, (left_deg, right_deg) in enumerate(angles.values()):
                frame = Image.new('RGBA', final, back)
                for side, deg in (('left', left_deg), ('right', right_deg)):
                    part, box, (px, py) = placed[side]
                    canvas = Image.new('RGBA', final, (0, 0, 0, 0))
                    canvas.paste(part, box[:2])
                    # PIL rotates counter-clockwise, CSS clockwise: negative here is a positive CSS angle
                    frame.alpha_composite(canvas.rotate(-deg, Image.BICUBIC, center=(px, py)))
                frame.alpha_composite(body)
                small = frame.convert('RGB').resize((final[0] // 2, final[1] // 2), Image.LANCZOS)
                sheet.paste(small, (col * (final[0] // 2 + 10), row * (final[1] // 2 + 10)))
        sheet.save(os.path.join(preview_dir, f'{name}-beat.png'))

    return table


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('sun')
    parser.add_argument('ray')
    parser.add_argument('--preview', help='also write a sheet of the wing beat to this folder')
    args = parser.parse_args()
    layout = {'sun': build('sun', args.sun, args.preview), 'ray': build('ray', args.ray, args.preview)}
    with open(os.path.join(OUT_DIR, 'layout.json'), 'w', encoding='utf-8') as f:
        json.dump(layout, f, indent=2)
        f.write('\n')


if __name__ == '__main__':
    main()
