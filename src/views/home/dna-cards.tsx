"use client";

import { useRef } from "react";

import { StatCard } from "@/components/ui/stat-card";
import type { StatCardContent } from "@/data/mocks/home";
import { useLoop } from "@/hooks/animation/use-render-loop";

import { experienceProgress, PHASE } from "./experience";

/**
 * The three statistic cards that orbit the DNA helix between scroll 0.15–0.38.
 *
 * Positions are a parametric function of scroll (orbit angle + fly-through
 * offset), exactly as in script.js — so they're written straight to the DOM
 * each frame through the shared ticker (`useLoop`). Imperative ref writes are
 * not a CSS transition/keyframe, so hard rule #1 holds.
 */

/**
 * Orbit phase per card, chosen so each one peaks at an evenly spaced point
 * *inside* the container's fully-opaque window.
 *
 * A card is brightest when `sin(angle) === 1`, i.e. at
 * `t = (π/2 − offset) / 2π` of its orbit. The previous even split
 * (`0, 2π/3, 4π/3`) put those peaks at t = 0.25 / 0.92 / 0.58 — and the
 * container itself is already fading out from t = 0.8 (scroll 0.34) onward.
 * Card 2 (「289件+」) therefore peaked at t = 0.92 and could never exceed
 * **0.417** opacity, while the other two reached a full 1.0. That is why it
 * read as washed out next to 総売上 / 社員. Its peak also landed at y ≈ 30px,
 * tucked under the fixed header.
 *
 * Ordering the offsets `0, 3π/2, π` moves the peaks to t = 0.25 / 0.50 / 0.75
 * — equally spaced, all at container opacity 1.0, and all comfortably inside
 * the viewport (y ≈ 680 / 530 / 380 at 900px tall). Same orbit, same motion,
 * just re-phased: the ring is still 120° apart, so no two cards overlap.
 */
const ANGLE_OFFSETS = [0, (3 * Math.PI) / 2, Math.PI];
const Y_OFFSETS = [-150, 0, 150];

export interface DnaCardsProps {
  cards: StatCardContent[];
}

export const DnaCards = ({ cards }: DnaCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card0 = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const cardRefs = [card0, card1, card2];

  useLoop(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const cs = experienceProgress.current;

      // Read the windows from PHASE rather than repeating literals — these used
      // to be hard-coded and silently drifted out of sync with the store, which
      // is how the cards ended up invisible during part of their own phase.
      const { in: dnaIn, full, fadeStart, out } = PHASE.dna;

      let dnaOpacity = 0;
      if (cs > dnaIn && cs < out) {
        dnaOpacity = Math.min((cs - dnaIn) / (full - dnaIn), 1);
        if (cs > fadeStart) {
          dnaOpacity = Math.max(1 - (cs - fadeStart) / (out - fadeStart), 0);
        }
      }
      container.style.opacity = `${dnaOpacity}`;
      if (dnaOpacity <= 0) return;

      const dnaProgress = (cs - dnaIn) / (out - dnaIn);
      const globalYOffset = 600 - dnaProgress * 1200;
      const baseAngle = dnaProgress * Math.PI * 2;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = Math.min(window.innerWidth * 0.35, 400);
      const ry = 80;

      cardRefs.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        const angle = baseAngle + ANGLE_OFFSETS[i];
        const x = cx + Math.cos(angle) * rx;
        const y = cy + Math.sin(angle) * ry + globalYOffset + Y_OFFSETS[i];
        const scale = 0.8 + 0.2 * Math.sin(angle);
        // Clamped at 0: the raw curve dips to -0.2 on the back half of the
        // orbit, and a negative opacity is written to the DOM verbatim. It
        // renders the same as 0, but it means the far side of the ring spends
        // longer fully invisible than the maths intends, which made the fade
        // in/out feel uneven between cards.
        const opacity = Math.max(0.4 + 0.6 * Math.sin(angle), 0);
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale}) rotateY(${angle - Math.PI / 2}rad)`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${Math.round(scale * 100)}`;
      });
    },
    { framerate: 0 },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[5] opacity-0"
      style={{ perspective: "1200px" }}
    >
      {cards.map((card, i) => (
        <div
          key={card.id}
          ref={cardRefs[i]}
          className="absolute left-0 top-0 opacity-0 will-change-transform"
        >
          <StatCard content={card} />
        </div>
      ))}
    </div>
  );
};
