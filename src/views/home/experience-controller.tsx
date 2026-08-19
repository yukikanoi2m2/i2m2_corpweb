"use client";

import { useEffect } from "react";

import { subscribeToTicker } from "@/lib/animation/ticker";

import { experienceProgress, useExperiencePhase } from "./experience";

/**
 * Publishes scroll progress for the overlay sections — **independently of
 * WebGL**.
 *
 * This used to live inside `ParticleCanvas`'s render loop, which coupled the
 * whole page's content to the GPU: if the WebGL context failed to initialise,
 * the loop never ran, progress stayed at 0, and every overlay was stuck at
 * `opacity: 0` (the sections reveal off these phases). Owning the scroll state
 * here keeps the text readable even when the backdrop falls back to a static
 * gradient.
 *
 * The maths is identical to (and intentionally duplicated by) the canvas: both
 * derive `currentScroll` from the same two DOM reads in the same frame, so the
 * morph and the overlays stay locked together with no subscription-order
 * dependency between the two components.
 */
export const ExperienceController = () => {
  useEffect(() => {
    const publish = () => {
      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const currentScroll = maxScroll > 0 ? scrollTop / maxScroll : 0;

      experienceProgress.current = currentScroll;
      useExperiencePhase.getState().sync(currentScroll);
    };

    // Publish once up-front so the first paint reflects the restored scroll
    // position (reload mid-page) instead of always starting from the hero.
    publish();

    return subscribeToTicker(publish, () => 0);
  }, []);

  return null;
};
