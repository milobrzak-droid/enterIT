/**
 * build-og.mjs — the link preview card, one per language.
 *
 * This is the single most-seen image the company has. It is what a CEO sees when
 * a partner pastes the URL into Teams, and it gets looked at for about a second
 * at roughly a third of its real size. The card it replaced was a green field
 * with an oversized logo, a clipped doodle and the words "AI AGENTS ·
 * AUTOMATION · SYSTEMS" — a positioning the site itself no longer uses, and
 * nothing a reader could act on.
 *
 * So this one is built like the site: the navy hero, the headline in Greycliff,
 * the proof line in Fira Mono, and a row of keycaps along the bottom carrying
 * the brand palette. Everything is sized to survive being scaled to ~380px
 * wide, which is what Slack and Teams actually render — the headline is set at
 * a size that stays readable there, and nothing important sits within 48px of
 * an edge, because some clients crop.
 *
 * Written with the same fonts the site loads, so the card and the page it opens
 * are visibly the same object.
 *
 * Run: node scripts/build-og.mjs
 */
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { voice } from "./beta2-copy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Card text comes from the hero the card leads to, so the promise a reader sees
   in the preview is the promise on the page — not a separate line that drifts. */
const CARDS = ["en", "cs", "de", "pl"].map((code) => ({
  code,
  file: code === "en" ? "og.png" : `og-${code}.png`,
  eyebrow: voice[code].hero.eyebrow,
  title: voice[code].hero.h1,
  proof: voice[code].hero.note,
}));

const py = `
import json, sys
from PIL import Image, ImageDraw, ImageFont

CARDS = json.loads(sys.argv[1])
ROOT = sys.argv[2]
W, H = 1200, 630
NAVY  = (23, 32, 46)
WHITE = (251, 251, 251)
TURQ  = (65, 227, 158)
KEYS  = [(65, 227, 158), (110, 206, 255), (183, 144, 255), (255, 132, 140), (248, 227, 84)]
PAD   = 68

def font(name, size):
    return ImageFont.truetype(f"{ROOT}/assets/fonts/{name}", size)

def wrap(draw, text, f, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=f) <= width:
            cur = t
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def fit(draw, text, name, width, hi, lo=30):
    """Largest size at which the text wraps to at most two lines."""
    while hi > lo:
        f = font(name, hi)
        if len(wrap(draw, text, f, width)) <= 2:
            return f, wrap(draw, text, f, width)
        hi -= 2
    f = font(name, lo)
    return f, wrap(draw, text, f, width)

for c in CARDS:
    im = Image.new("RGB", (W, H), NAVY)
    d  = ImageDraw.Draw(im)

    # The hero's own wash, so the card and the page it opens are one object.
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)],
               fill=(int(23 + 12 * t), int(32 + 14 * t), int(46 + 16 * t)))

    # --- the mark -----------------------------------------------------------
    # The logo is the word in a rounded outline. Drawn rather than rasterised so
    # it stays crisp and sits on the same baseline grid as everything else.
    lw, lh, r, stroke = 196, 82, 26, 9
    lx, ly = PAD, PAD
    d.rounded_rectangle([lx + 8, ly + 8, lx + lw + 8, ly + lh + 8], radius=r, fill=(11, 17, 27))
    d.rounded_rectangle([lx, ly, lx + lw, ly + lh], radius=r, outline=WHITE, width=stroke)
    fw = font("GreycliffCF-Heavy.otf", 50)
    tw = d.textlength("enter", font=fw)
    bb = fw.getbbox("enter")
    d.text((lx + (lw - tw) / 2, ly + (lh - (bb[3] - bb[1])) / 2 - bb[1]), "enter",
           font=fw, fill=WHITE)

    # --- keycap strip, bottom right -----------------------------------------
    # Five caps in the palette, each above its own solid side, as on the board.
    cw, gap, travel = 92, 18, 8
    total = len(KEYS) * cw + (len(KEYS) - 1) * gap
    kx = W - PAD - total - travel
    ky = H - PAD - cw
    legends = ["E", "N", "T", "E", "R"]
    fl = font("GreycliffCF-Heavy.otf", 34)
    for i, col in enumerate(KEYS):
        x = kx + i * (cw + gap)
        d.rounded_rectangle([x + travel, ky + travel, x + cw + travel, ky + cw + travel],
                            radius=18, fill=(11, 17, 27))
        d.rounded_rectangle([x, ky, x + cw, ky + cw], radius=18, fill=col)
        lt = d.textlength(legends[i], font=fl)
        lb = fl.getbbox(legends[i])
        d.text((x + (cw - lt) / 2, ky + (cw - (lb[3] - lb[1])) / 2 - lb[1]),
               legends[i], font=fl, fill=NAVY)

    # --- words --------------------------------------------------------------
    col_w = W - PAD * 2
    y = ly + lh + 54

    f_eyebrow = font("FiraMono-Medium.ttf", 19)
    d.text((PAD, y), c["eyebrow"].upper(), font=f_eyebrow, fill=TURQ)
    y += 42

    # The headline is the whole point of the card, so it takes the largest size
    # that still lands in two lines — a third line would push it into the caps.
    f_title, lines = fit(d, c["title"], "GreycliffCF-Heavy.otf", col_w - 20, 64)
    lead = int(f_title.size * 1.06)
    for ln in lines:
        d.text((PAD, y), ln, font=f_title, fill=WHITE)
        y += lead
    y += 16

    # The proof line clears the keycap strip.
    f_proof = font("FiraMono-Medium.ttf", 20)
    for ln in wrap(d, c["proof"], f_proof, col_w - 8)[:2]:
        d.text((PAD, y), ln, font=f_proof, fill=(150, 163, 180))
        y += 30

    # Domain on the bottom edge, level with the caps.
    f_dom = font("FiraMono-Medium.ttf", 20)
    db = f_dom.getbbox("enterit.cz")
    d.text((PAD, ky + cw - (db[3] - db[1]) - 2), "enterit.cz", font=f_dom, fill=WHITE)

    im.save(f"{ROOT}/assets/{c['file']}", "PNG", optimize=True)
    print(c["file"], im.size, f"headline {f_title.size}px / {len(lines)} lines")
`;

execFileSync("python3", ["-c", py, JSON.stringify(CARDS), root], { stdio: "inherit" });
