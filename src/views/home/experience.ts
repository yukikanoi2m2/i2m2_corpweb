import { create } from "zustand";

/**
 * Shared state for the scroll experience.
 *
 * `ParticleCanvas` owns the single smoothed scroll value and, each frame,
 * publishes it two ways:
 *  - `experienceProgress.current` — a mutable read by the per-frame card
 *    animator (no React re-render).
 *  - `useExperiencePhase` — coarse section states updated **only when they
 *    change**, so overlay springs re-render at phase boundaries, not 60×/s.
 *
 * Thresholds mirror the `currentScroll` comparisons in the source script.js.
 */

/** Live smoothed scroll progress, 0 (top) → 1 (bottom). */
export const experienceProgress = { current: 0 };

export type SectionState = "before" | "visible" | "after";

/**
 * Scroll-progress windows for each overlay.
 *
 * Ported from script.js, then widened so no stretch of the scroll is blank.
 * The source windows left long gaps between overlays (hero ended at 0.02, the
 * cards only arrived at 0.15) which read as a **black screen** on phones: the
 * page scrolls ~11,000px, so 0.02 is only ~220px — less than one swipe — and
 * the next 1,400px had no content at all. Each overlay now hands over to the
 * next, so there is always something on screen.
 *
 * `leave`/`in` boundaries are intentionally adjacent (hero.leave === dna.in)
 * because `Reveal` cross-fades over 1.2s, so the outgoing and incoming
 * overlays overlap rather than cut.
 */
export const PHASE = {
  hero: { leave: 0.1 },
  dna: { in: 0.1, full: 0.16, fadeStart: 0.34, out: 0.4, spanEnd: 0.4 },
  // Held until the big-bang flash (0.90) so the fly-through never plays over an
  // empty screen — this was the longest blank stretch in the source windows.
  wave: { in: 0.4, out: 0.89 },
  // Matches the camera's galaxy pull-back in particle-canvas (0.93), so the
  // caption arrives with the wide shot rather than over the fly-through.
  galaxy: { in: 0.93 },
} as const;

export interface ExperiencePhase {
  hero: SectionState;
  wave: SectionState;
  galaxy: SectionState;
  dnaActive: boolean;
  /** Recompute states from progress; only writes when something changed. */
  sync: (progress: number) => void;
}

const heroState = (p: number): SectionState =>
  p < PHASE.hero.leave ? "visible" : "after";

const waveState = (p: number): SectionState => {
  if (p < PHASE.wave.in) return "before";
  if (p <= PHASE.wave.out) return "visible";
  return "after";
};

const galaxyState = (p: number): SectionState =>
  p >= PHASE.galaxy.in ? "visible" : "before";

export const useExperiencePhase = create<ExperiencePhase>((set, get) => ({
  hero: "visible",
  wave: "before",
  galaxy: "before",
  dnaActive: false,
  sync: (p) => {
    const hero = heroState(p);
    const wave = waveState(p);
    const galaxy = galaxyState(p);
    const dnaActive = p > PHASE.dna.in && p < PHASE.dna.spanEnd;
    const s = get();
    if (
      s.hero === hero &&
      s.wave === wave &&
      s.galaxy === galaxy &&
      s.dnaActive === dnaActive
    ) {
      return;
    }
    set({ hero, wave, galaxy, dnaActive });
  },
}));
