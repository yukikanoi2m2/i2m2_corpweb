/**
 * Fallback backdrop for devices that cannot run the WebGL2 particle scene
 * (three r169 is WebGL2-only) or that lost their GPU context.
 *
 * It reuses the experience's two signature colours — the warm `#ff4c33` aurora
 * that lights the hero and the cool `#3366ff` that takes over deeper in the
 * scroll — as static radial gradients. Pure CSS painted once: no GPU context,
 * no render loop, no per-frame cost, which is exactly what the affected devices
 * need. Fixed and behind the content at the same layer as the real canvas, so
 * the overlay sections read identically over either backdrop.
 */
export const StaticBackdrop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 bg-black"
    style={{
      backgroundImage: [
        "radial-gradient(120% 80% at 50% -10%, rgba(255,76,51,0.55) 0%, rgba(255,76,51,0) 60%)",
        "radial-gradient(120% 90% at 50% 110%, rgba(51,102,255,0.45) 0%, rgba(51,102,255,0) 62%)",
      ].join(","),
    }}
  />
);
