"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { CanvasErrorBoundary } from "./canvas-error-boundary";
import { StaticBackdrop } from "./static-backdrop";

/**
 * Loaded on demand so `three` is not part of the initial bundle.
 *
 * This is the fix for the reported black screen, and it is why deferring the
 * *mount* alone was not enough: a static `import` put three's 556 KB into a
 * `<script>` tag in the document head, so the phone had to download, parse and
 * execute all of it **before** React could hydrate — and the hero text is
 * invisible until hydration runs its entrance springs. The delay was therefore
 * unavoidable no matter when the component mounted. As a separate chunk it is
 * fetched after hydration instead, so the text paints first.
 *
 * `ssr: false` because the canvas is client-only anyway (it touches `window`
 * and WebGL), matching how the Cookie banner is loaded.
 */
const ParticleCanvas = dynamic(
  () => import("./particle-canvas").then((m) => m.ParticleCanvas),
  { ssr: false },
);

/**
 * Chooses the page backdrop: the WebGL particle scene when the device can run
 * it, the static gradient when it cannot (or not yet).
 *
 * Three independent paths converge here, because a decorative backdrop must
 * never be able to hide the page's content:
 *  1. `onFailure` — no WebGL2 context, a throwing setup, or a lost context.
 *     Reported by the canvas itself from inside its effect.
 *  2. `CanvasErrorBoundary` — anything thrown during render, which an effect's
 *     `try/catch` cannot see.
 *  3. Deferred mount on phones — see below.
 *
 * Either way `StaticBackdrop` is on screen, so the backdrop is never a bare
 * black rectangle while we wait.
 */

/** Phone-sized viewport; matches the canvas's own render-budget breakpoint. */
const isMobileViewport = () => window.innerWidth < 640;

/**
 * How long the phone backdrop waits before building the WebGL scene.
 *
 * Compiling the shaders and uploading the point cloud is a single long,
 * synchronous block of main-thread work, and it lands in exactly the window
 * where the hero's entrance springs need frames. When it won that race the
 * result was the reported bug: a black page with only the static header logo
 * visible, because every animated element was still near opacity 0 — measured
 * at 0.054 six seconds after load, with the page managing 1 animation frame per
 * second. Waiting until the reveal has finished (`Reveal` runs for 1.2s) means
 * the text is painted and readable *before* the GPU work starts. Desktop mounts
 * immediately — it has the headroom, and this preserves the original timing.
 */
const CANVAS_DEFER_MS = 1500;

export const ExperienceBackdrop = () => {
  const [failed, setFailed] = useState(false);
  // Rendered on the server and on the first client pass, so the markup is
  // identical either way; the effect below decides when the canvas may mount.
  const [canMount, setCanMount] = useState(false);

  // Stable identity — `ParticleCanvas` keeps it in a ref, but this also avoids
  // handing it a new function on every re-render.
  const handleFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    if (!isMobileViewport()) {
      setCanMount(true);
      return;
    }
    const id = window.setTimeout(() => setCanMount(true), CANVAS_DEFER_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (failed || !canMount) return <StaticBackdrop />;

  return (
    <>
      {/* Stays underneath the canvas: the gradient covers the first frames
          while the scene warms up, and the canvas paints black over it. */}
      <StaticBackdrop />
      <CanvasErrorBoundary fallback={null}>
        <ParticleCanvas onFailure={handleFailure} />
      </CanvasErrorBoundary>
    </>
  );
};
