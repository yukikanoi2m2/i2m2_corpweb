"use client";

import { useCallback, useState } from "react";

import { CanvasErrorBoundary } from "./canvas-error-boundary";
import { ParticleCanvas } from "./particle-canvas";
import { StaticBackdrop } from "./static-backdrop";

/**
 * Chooses the page backdrop: the WebGL particle scene when the device can run
 * it, the static gradient when it cannot.
 *
 * Two independent failure paths converge here, because a decorative backdrop
 * must never be able to take the route down:
 *  1. `onFailure` — no WebGL2 context, a throwing setup, or a lost context.
 *     Reported by the canvas itself from inside its effect.
 *  2. `CanvasErrorBoundary` — anything thrown during render, which an effect's
 *     `try/catch` cannot see.
 *
 * `ParticleCanvas` renders on the first client pass regardless, so capable
 * devices get the full experience with no probe-then-mount delay; the swap only
 * happens on the devices that actually fail.
 */
export const ExperienceBackdrop = () => {
  const [failed, setFailed] = useState(false);

  // Stable identity — `ParticleCanvas` keeps it in a ref, but this also avoids
  // handing it a new function on every re-render.
  const handleFailure = useCallback(() => setFailed(true), []);

  if (failed) return <StaticBackdrop />;

  return (
    <CanvasErrorBoundary fallback={<StaticBackdrop />}>
      <ParticleCanvas onFailure={handleFailure} />
    </CanvasErrorBoundary>
  );
};
