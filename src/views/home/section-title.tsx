"use client";

import { easings } from "@react-spring/web";
import { useEffect, useState } from "react";
import TextEngine from "spring-text-engine";

import type { Tags } from "@/types/springs";

/**
 * Heading with the per-letter blur cascade from style.css (`.char` animation):
 * each letter rises from +40px, un-blurs and fades in, staggered by index.
 * Driven by `spring-text-engine` (hard rule — all text animation goes through
 * it). Mounted by the parent when its section becomes visible, so `mode="once"`
 * plays the cascade in on entry.
 *
 * The one exception is a heading already present in the server-rendered HTML —
 * see `appHydrated` below for why that case renders at rest instead.
 */

const LETTER_IN = { y: 0, opacity: 1, filter: "blur(0px)" };
const LETTER_OUT = { y: 40, opacity: 0, filter: "blur(16px)" };
const LETTER_CONFIG = { duration: 1200, easing: easings.easeOutQuart };

/**
 * Flipped by the first `SectionTitle` mount, i.e. as soon as the app hydrates.
 *
 * Why this exists: the engine seeds each letter's spring with `letterOut` as its
 * `from`, and that starting state is what gets written into the exported static
 * HTML — `opacity: 0; filter: blur(16px)`. Every heading was therefore genuinely
 * invisible until React had downloaded, parsed and hydrated. On a phone that
 * wait is long enough that the page read as black with only the static header
 * logo showing, which is the bug this fixes.
 *
 * A heading present in the server HTML cannot be both readable at 0ms and
 * animate in *from* invisible — it would have to blank itself out first, which
 * is a worse flash than the one being fixed. Measured hydration here is ~750ms
 * even unthrottled and ~3.3s on a throttled phone profile, so there is no
 * "fast enough to cascade unnoticed" window to exploit. Server-rendered
 * headings therefore start at their resting state and stay there.
 *
 * Headings mounted later still cascade in full: wave and galaxy titles are only
 * rendered once their phase turns visible, so they see an already-hydrated app.
 * That covers every heading the user actually scrolls into.
 */
let appHydrated = false;

export interface SectionTitleProps {
  tag: Extract<Tags, "h1" | "h2">;
  text: string;
  className?: string;
}

export const SectionTitle = ({ tag, text, className }: SectionTitleProps) => {
  // Captured on first render so it stays stable, and read lazily so the value
  // reflects mount order rather than module-eval order.
  const [cascade] = useState(() => appHydrated);

  useEffect(() => {
    appHydrated = true;
  }, []);

  return (
    // Both branches render through the engine with the same non-empty
    // letterIn/letterOut, so the span structure is identical and only the inline
    // style values differ — no layout shift, and no hydration mismatch.
    <TextEngine
      tag={tag}
      mode="once"
      letterIn={LETTER_IN}
      letterOut={cascade ? LETTER_OUT : LETTER_IN}
      letterStagger={15}
      letterConfig={LETTER_CONFIG}
      className={className}
    >
      {text}
    </TextEngine>
  );
};
