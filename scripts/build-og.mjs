/**
 * build-og.mjs — the link preview card, one per language.
 *
 * This is the single most-seen image the company has: what a CEO sees when a
 * partner pastes the URL into Teams, at about a third of its real size, for
 * about a second.
 *
 * So it is not a separate design. It is the site's main banner, rendered at
 * 1200x630: the same navy, the same greyscale photograph of the team behind it,
 * the same sideways wash that keeps the type readable, the same eyebrow,
 * headline and proof pill — and the real logo, rasterised from
 * assets/enter_logo_color.svg rather than redrawn, so the mark on the card is
 * the mark in the manual.
 *
 * The headline is generated from the hero of the page the card opens, so the
 * preview cannot drift from the promise on the page.
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
ROOT  = sys.argv[2]
W, H  = 1200, 630
NAVY  = (23, 32, 46)
WHITE = (251, 251, 251)
TURQ  = (65, 227, 158)
PAD   = 56

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

def fit(draw, text, name, width, hi, lines_max=2, lo=30):
    while hi > lo:
        f = font(name, hi)
        if len(wrap(draw, text, f, width)) <= lines_max:
            return f, wrap(draw, text, f, width)
        hi -= 2
    f = font(name, lo)
    return f, wrap(draw, text, f, lo and width)

# --- the banner's own photograph ------------------------------------------
# Same frame, same treatment as the hero: greyscale, contrast lifted a touch,
# brightness down to 55%, anchored at 40% so heads stay in.
shot = Image.open(f"{ROOT}/assets/decor/standup.webp").convert("RGB")
r = max(W / shot.width, H / shot.height)
shot = shot.resize((int(shot.width * r + 1), int(shot.height * r + 1)), Image.LANCZOS)
ox = int((shot.width - W) * 0.28)
oy = int((shot.height - H) * 0.40)
shot = shot.crop((ox, oy, ox + W, oy + H))
g = shot.convert("L")
shot = Image.merge("RGB", (g, g, g)).point(lambda v: int(min(255, (v - 128) * 1.05 + 128) * 0.55))

logo = Image.open(f"{ROOT}/assets/enter_logo_white_1200.png").convert("RGBA")

for c in CARDS:
    im = shot.copy()

    # The hero's sideways wash: solid navy through the first third, opening up to
    # the right so the photograph is visible but the type never fights it.
    wash = Image.new("RGBA", (W, H))
    wd = ImageDraw.Draw(wash)
    for x in range(W):
        t = x / W
        if t <= 0.34:      a = 255
        elif t <= 0.52:    a = int(255 - (t - 0.34) / 0.18 * 20)
        else:              a = int(235 - (t - 0.52) / 0.48 * 38)
        wd.line([(x, 0), (x, H)], fill=NAVY + (a,))
    im = Image.alpha_composite(im.convert("RGBA"), wash).convert("RGB")
    d = ImageDraw.Draw(im)

    # --- the real mark ----------------------------------------------------
    lw = 214
    lg = logo.resize((lw, int(lw * logo.height / logo.width)), Image.LANCZOS)
    im.paste(lg, (PAD, PAD), lg)

    col_w = 700
    y = PAD + lg.height + 46

    f_eyebrow = font("FiraMono-Medium.ttf", 18)
    d.text((PAD, y), c["eyebrow"].upper(), font=f_eyebrow, fill=TURQ)
    y += 40

    f_title, lines = fit(d, c["title"], "GreycliffCF-Heavy.otf", col_w, 60, 3)
    lead = int(f_title.size * 1.02)
    for ln in lines:
        d.text((PAD, y), ln, font=f_title, fill=WHITE)
        y += lead
    y += 26

    # The proof pill, as on the banner: a hairline capsule, not a bare line.
    f_proof = font("FiraMono-Medium.ttf", 17)
    txt = c["proof"]
    tw = d.textlength(txt, font=f_proof)
    bb = f_proof.getbbox(txt)
    ph = (bb[3] - bb[1]) + 22
    d.rounded_rectangle([PAD, y, PAD + tw + 34, y + ph], radius=ph // 2,
                        outline=(251, 251, 251, 90), width=2)
    d.text((PAD + 17, y + 11 - bb[1]), txt, font=f_proof, fill=(214, 221, 230))

    # Domain on the bottom edge, where the banner puts its partner row.
    f_dom = font("FiraMono-Medium.ttf", 18)
    db = f_dom.getbbox("enterit.cz")
    d.text((PAD, H - PAD - (db[3] - db[1])), "enterit.cz", font=f_dom, fill=(150, 163, 180))

    im.save(f"{ROOT}/assets/{c['file']}", "PNG", optimize=True)
    print(c["file"], im.size, f"headline {f_title.size}px / {len(lines)} lines")
`;

execFileSync("python3", ["-c", py, JSON.stringify(CARDS), root], { stdio: "inherit" });
