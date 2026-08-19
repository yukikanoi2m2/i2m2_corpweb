#!/usr/bin/env python3
"""
Regenerate every favicon / app icon from `public/logo-i2m2.png`.

Why a script and not hand-exported PNGs: the icons must stay in sync with the
logo, and there are eleven of them across three naming conventions (favicon,
apple-icon, android-icon) plus the App Router's `src/app/favicon.ico`.

Two decisions worth recording:

1. **Only the cross mark is used, not the full lockup.** The source logo is a
   631x203 horizontal lockup (mark + "i2m2" + tagline). Squeezed into 16x16 the
   wordmark becomes 3px tall — illegible noise. The mark alone occupies its own
   column run in the source (x 5-197, y 4-197, i.e. 193x194 — already square),
   so it crops cleanly and stays recognisable at 16px.

2. **A dark plate is composited behind it.** The artwork is white-on-
   transparent, which disappears completely against the light browser chrome
   Safari and Chrome use for tabs and bookmarks. The plate is the site's own
   background colour, so the icon reads as a deliberate dark badge on light UI
   and blends into dark UI. `favicon.ico` keeps its alpha corners via a rounded
   plate; the Apple/Android icons use a full-bleed square because both
   platforms apply their own mask (Apple in particular composites onto black,
   so a transparent icon would lose the artwork).

3. **Small sizes get a solid cross instead of the outlined one.** The logo mark
   is drawn as thin outlines (a cross keyline plus a stethoscope). Downsampled
   to 16px those strokes fall below one pixel and average into grey mush — the
   16x16 built straight from the artwork was unrecognisable. For 16-32px the
   cross is therefore redrawn as a solid silhouette, taken from the mark's own
   proportions, which is what the eye actually resolves at that size. Larger
   icons keep the full artwork.

Run: python3 scripts/generate-icons.py
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SOURCE = PUBLIC / "logo-i2m2.png"

# Bounding box of the cross mark inside the lockup, measured from the alpha
# channel (the first contiguous run of non-transparent columns).
MARK_BOX = (5, 4, 198, 198)

# --background, from globals.css. Keeps the icon on-brand on light chrome.
PLATE = (10, 10, 12, 255)

# Fraction of the canvas left as margin around the mark. The mark is a cross,
# so its extremities are thin; a little breathing room stops it touching the
# rounded corners.
PADDING = 0.14

# Supersample factor for the rounded plate, so the corners are anti-aliased.
SS = 8

# At or below this size the outlined artwork stops resolving, so the solid
# silhouette is used instead. 32px still holds the outlines on hi-dpi tabs, but
# the same legibility problem applies there at 1x, so it also gets the solid
# form; 48px and up keep the full mark.
SOLID_MAX = 32

# Arm thickness of the solid cross, as a fraction of its overall width. Matches
# the proportion of the logo's cross (its arms are ~0.38 of the full span).
CROSS_ARM = 0.38


def load_mark() -> Image.Image:
    """The cross mark, cropped tight and trimmed to its own alpha bounds."""
    logo = Image.open(SOURCE).convert("RGBA")
    mark = logo.crop(MARK_BOX)
    bbox = mark.getbbox()
    return mark.crop(bbox) if bbox else mark


def solid_cross(size: int) -> Image.Image:
    """A filled plus sign — the legible stand-in for the mark at small sizes."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    arm = size * CROSS_ARM
    lo = (size - arm) / 2
    hi = lo + arm
    radius = arm * 0.18
    # Two overlapping rounded bars; the shared centre fills the intersection.
    draw.rounded_rectangle((lo, 0, hi, size - 1), radius=radius, fill=(255, 255, 255, 255))
    draw.rounded_rectangle((0, lo, size - 1, hi), radius=radius, fill=(255, 255, 255, 255))
    return img


def render(mark: Image.Image, size: int, *, rounded: bool) -> Image.Image:
    """The mark centred on a plate, fitted to `size`x`size`."""
    # Build large, then downsample once — LANCZOS on the composite keeps the
    # thin cross strokes from breaking up at 16px.
    big = size * SS
    canvas = Image.new("RGBA", (big, big), (0, 0, 0, 0))

    if rounded:
        plate = Image.new("RGBA", (big, big), (0, 0, 0, 0))
        ImageDraw.Draw(plate).rounded_rectangle(
            (0, 0, big - 1, big - 1), radius=int(big * 0.22), fill=PLATE
        )
    else:
        plate = Image.new("RGBA", (big, big), PLATE)
    canvas.alpha_composite(plate)

    # Below SOLID_MAX the outlined artwork averages into grey; use the solid
    # silhouette, which survives the downsample.
    source = solid_cross(big) if size <= SOLID_MAX else mark

    inner = int(big * (1 - 2 * PADDING))
    scale = min(inner / source.width, inner / source.height)
    art = source.resize(
        (
            max(1, round(source.width * scale)),
            max(1, round(source.height * scale)),
        ),
        Image.LANCZOS,
    )
    canvas.alpha_composite(
        art, ((big - art.width) // 2, (big - art.height) // 2)
    )

    return canvas.resize((size, size), Image.LANCZOS)


def main() -> None:
    mark = load_mark()
    print(f"source mark: {mark.width}x{mark.height}")

    # Browser favicons — rounded so they read as a badge, not a black square.
    for size in (16, 32):
        out = PUBLIC / f"favicon-{size}x{size}.png"
        render(mark, size, rounded=True).save(out)
        print(f"wrote {out.relative_to(ROOT)}")

    # Multi-resolution .ico. Windows/omnibox pick the size they need; 48 is used
    # by Windows shortcuts and Chrome's bookmark bar on hi-dpi.
    ico_sizes = (16, 24, 32, 48, 64, 128, 256)
    frames = [render(mark, s, rounded=True) for s in ico_sizes]
    for target in (PUBLIC / "favicon.ico", ROOT / "src" / "app" / "favicon.ico"):
        # `append_images` writes every frame into the one .ico container.
        frames[0].save(
            target,
            format="ICO",
            sizes=[(s, s) for s in ico_sizes],
            append_images=frames[1:],
        )
        print(f"wrote {target.relative_to(ROOT)}")

    # Apple touch icon — iOS ignores rounding (it applies its own mask) and
    # composites onto black, so ship it full-bleed.
    apple = PUBLIC / "apple-icon-180x180.png"
    render(mark, 180, rounded=False).save(apple)
    print(f"wrote {apple.relative_to(ROOT)}")

    # Android / PWA icons, also masked by the launcher.
    for size in (36, 48, 72, 96, 144, 192):
        out = PUBLIC / f"android-icon-{size}x{size}.png"
        render(mark, size, rounded=False).save(out)
        print(f"wrote {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
