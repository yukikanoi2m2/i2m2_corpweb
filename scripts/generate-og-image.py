#!/usr/bin/env python3
"""
Generate `public/open-graph.png` — the image social platforms expand when the
site is shared — from `public/logo-i2m2.png`.

Why this script exists: the file previously committed at that path was a stock
photograph of a Greek marble statue, left over from the template this site was
built on. It had nothing to do with the brand, and it was the picture every
LINE / X / Slack / Facebook share of i2m2.com showed. It is replaced here with
the logo lockup on the site's own background.

Decisions worth recording:

1. **1200x630, not the old 900x600.** 1.91:1 is the size Facebook, X, LinkedIn
   and Slack all document, and the one `generate-page-metadata.ts` already
   named as ideal in a comment while declaring 900x600. Anything else gets
   re-cropped by the platform, which is how logos lose their edges.

2. **The full lockup, not the cross mark.** The opposite call from
   `generate-icons.py`, and for the opposite reason: a share card is rendered
   ~500px wide in a timeline, so the "i2m2" wordmark and tagline are perfectly
   legible. It is the only place the whole logo can be read, whereas at 16px
   only the mark survives.

3. **The company name is drawn in Japanese below the logo.** A share card is
   often seen with the title text truncated, so the image has to identify the
   company on its own. Noto Sans CJK JP is the closest available match to the
   site's own type; it is only used to rasterise this one static asset, so the
   site's webfont stack is unaffected.

4. **Safe margins.** Some surfaces (notably X's summary_large_image and Slack's
   unfurl) crop a few percent off the edges, so all artwork sits inside an 8%
   inset and the composition is centred.

Run: python3 scripts/generate-og-image.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SOURCE = PUBLIC / "logo-i2m2.png"
TARGET = PUBLIC / "open-graph.png"

# The size every major platform documents for `summary_large_image` / og:image.
# Must stay in sync with the `width`/`height` in `generate-page-metadata.ts`.
WIDTH, HEIGHT = 1200, 630

# --background from globals.css, so the card matches the site it links to.
BACKGROUND = (3, 3, 5)

# --accent-warm / --accent-cool from globals.css. These are the two colours of
# the hero particle ring; reusing them makes the card recognisably the same
# brand without trying to redraw the WebGL scene.
ACCENT_WARM = (255, 160, 145)
ACCENT_COOL = (141, 169, 252)

# --muted, for the supporting line.
MUTED = (160, 160, 160)

# Fraction of the shorter edge kept clear of artwork on every side, so platform
# cropping can never clip the logo.
SAFE_INSET = 0.08

# Logo width as a fraction of the canvas width. Sized so the tagline inside the
# lockup ("Bonanza: Fortune Smiles!") is still readable when the card is shown
# at ~500px in a timeline.
LOGO_WIDTH_RATIO = 0.42

FONT_CANDIDATES = (
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Medium.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-DemiLight.ttc",
)

# Noto Sans CJK ships as a .ttc collection; the JP face is not index 0.
JP_FACE_INDEX = 0
JP_FACE_NAMES = ("Noto Sans CJK JP", "Noto Sans JP")


def load_jp_font(size: int) -> ImageFont.FreeTypeFont:
    """Noto Sans CJK JP at `size`px, or PIL's default if Noto is unavailable."""
    for path in FONT_CANDIDATES:
        if not Path(path).exists():
            continue
        # Walk the collection's faces and take the Japanese one. Index order is
        # not stable across Noto releases, so match on the family name instead
        # of hardcoding a number.
        for index in range(12):
            try:
                font = ImageFont.truetype(path, size, index=index)
            except (OSError, ValueError):
                break
            family = (font.getname() or ("",))[0]
            if family in JP_FACE_NAMES:
                return font
        try:
            return ImageFont.truetype(path, size, index=JP_FACE_INDEX)
        except (OSError, ValueError):
            continue
    print("  ! Noto Sans CJK not found — falling back to the default font")
    return ImageFont.load_default(size)


def radial_glow(size: tuple[int, int], colour: tuple[int, int, int], radius: int) -> Image.Image:
    """A soft circular bloom, used to echo the hero's particle ring."""
    w, h = size
    layer = Image.new("L", (w, h), 0)
    ImageDraw.Draw(layer).ellipse(
        (w // 2 - radius, h // 2 - radius, w // 2 + radius, h // 2 + radius),
        fill=255,
    )
    # Blur radius tied to the circle so the falloff scales with the glow.
    layer = layer.filter(ImageFilter.GaussianBlur(radius * 0.55))
    tinted = Image.new("RGBA", (w, h), (*colour, 0))
    tinted.putalpha(layer)
    return tinted


def build() -> Image.Image:
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), (*BACKGROUND, 255))

    # Two offset blooms, warm on the left and cool on the right, mirroring the
    # gradient direction of `text-gradient-accent`. Kept very low-opacity: the
    # card has to stay legible as a thumbnail, and a busy background is what
    # makes share images look like adverts.
    for colour, cx_ratio, radius, opacity in (
        (ACCENT_WARM, 0.24, 300, 46),
        (ACCENT_COOL, 0.78, 330, 42),
    ):
        glow = radial_glow((WIDTH, HEIGHT), colour, radius)
        # Shift the bloom horizontally, then knock its strength down.
        offset = int((cx_ratio - 0.5) * WIDTH)
        shifted = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        shifted.paste(glow, (offset, 0))
        alpha = shifted.getchannel("A").point(lambda v: v * opacity // 255)
        shifted.putalpha(alpha)
        canvas.alpha_composite(shifted)

    logo = Image.open(SOURCE).convert("RGBA")
    logo_w = int(WIDTH * LOGO_WIDTH_RATIO)
    logo_h = max(1, round(logo.height * logo_w / logo.width))
    logo = logo.resize((logo_w, logo_h), Image.LANCZOS)

    name_font = load_jp_font(40)
    tag_font = load_jp_font(27)
    name = "株式会社イズムズ"
    tagline = "カルテ電子化・医療DX　×　医療M&A・事業承継"

    draw = ImageDraw.Draw(canvas)
    name_h = draw.textbbox((0, 0), name, font=name_font)[3]
    tag_h = draw.textbbox((0, 0), tagline, font=tag_font)[3]

    # Vertical rhythm: logo, then the legal name, then the two businesses.
    gap_logo_name = 54
    gap_name_tag = 22
    block_h = logo_h + gap_logo_name + name_h + gap_name_tag + tag_h
    y = (HEIGHT - block_h) // 2

    safe_top = int(HEIGHT * SAFE_INSET)
    if y < safe_top:
        raise SystemExit(
            f"composition {block_h}px is taller than the {HEIGHT - 2 * safe_top}px safe area"
        )

    canvas.alpha_composite(logo, ((WIDTH - logo_w) // 2, y))
    y += logo_h + gap_logo_name

    draw.text((WIDTH / 2, y), name, font=name_font, fill=(255, 255, 255, 255), anchor="ma")
    y += name_h + gap_name_tag

    draw.text((WIDTH / 2, y), tagline, font=tag_font, fill=(*MUTED, 255), anchor="ma")

    # Flatten: several scrapers (older Twitter/X and some chat clients) render
    # PNG alpha as black, and an accidental alpha channel here would show up as
    # banding around the blooms.
    flat = Image.new("RGB", (WIDTH, HEIGHT), BACKGROUND)
    flat.paste(canvas, (0, 0), canvas)
    return flat


def main() -> None:
    image = build()
    # `optimize` keeps this well under the 5MB most platforms cap, and under the
    # 1MB where X starts re-encoding.
    image.save(TARGET, format="PNG", optimize=True)
    size_kb = TARGET.stat().st_size / 1024
    print(f"wrote {TARGET.relative_to(ROOT)} ({WIDTH}x{HEIGHT}, {size_kb:.0f} KB)")


if __name__ == "__main__":
    main()
