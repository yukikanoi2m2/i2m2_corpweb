"use client";

import { animated, easings, useSpring } from "@react-spring/web";
import { useEffect, useState, type ElementType } from "react";

import type { Tags } from "@/types/springs";
import type { SectionState } from "./experience";

/**
 * Phase-driven fade/slide reveal — the `.is-visible` / `.is-leaving` content
 * states from style.css. Content enters from +30px below and leaves up to
 * -30px, mirroring the source's three resting states. Spring-based (no existing
 * springs/ primitive expresses a 3-state, externally-driven scroll reveal).
 */

const HIDDEN_BELOW = { opacity: 0, y: 30 };
const VISIBLE = { opacity: 1, y: 0 };
const HIDDEN_ABOVE = { opacity: 0, y: -30 };

// Approximates the source's `cubic-bezier(0.2, 1, 0.2, 1)` 1.2s transition.
const REVEAL_CONFIG = { duration: 1200, easing: easings.easeOutQuart };

export interface RevealProps {
  state: SectionState;
  tag?: Tags;
  className?: string;
  delay?: number;
  /** When false the element starts visible (used for title blocks). */
  enterAnimated?: boolean;
  children: React.ReactNode;
}

export const Reveal = ({
  state,
  tag = "div",
  className,
  delay = 0,
  enterAnimated = true,
  children,
}: RevealProps) => {
  // Whether hydration has happened. Starts false so the server markup and the
  // first client render agree, then flips in an effect.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const target =
    state === "visible"
      ? VISIBLE
      : state === "after"
        ? HIDDEN_ABOVE
        : HIDDEN_BELOW;

  const styles = useSpring({
    // Before hydration the entrance spring's `from` (opacity 0) is what gets
    // serialised into the HTML, which meant the hero text was invisible until
    // React had downloaded, parsed and hydrated — on a phone that read as a
    // black page with only the static header logo showing.
    //
    // Falling back to `target` (not a fixed "visible") is what makes that safe:
    // every overlay is `fixed inset-0`, so they are all stacked on top of each
    // other. Starting them all visible would paint the hero, wave and galaxy
    // copy over one another until hydration. `target` is each overlay's own
    // resting state for the current phase, so the server HTML shows exactly
    // what this scroll position should show — the hero, and nothing else.
    from: enterAnimated && hydrated ? HIDDEN_BELOW : target,
    to: target,
    delay,
    config: REVEAL_CONFIG,
  });

  const Tag = animated[tag] as ElementType;

  return (
    // react-spring serialises the initial spring style differently on server vs
    // client; values converge on mount, so suppress the cosmetic mismatch.
    <Tag className={className} style={styles} suppressHydrationWarning>
      {children}
    </Tag>
  );
};
