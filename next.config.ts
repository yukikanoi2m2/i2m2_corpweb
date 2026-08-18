import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — the whole site is pre-rendered to plain HTML/CSS/JS in
  // `out/`. Nothing here needs a Node server at runtime: the particle
  // experience is 100% client-side WebGL, and every page is static content.
  // This is what makes the site deployable to any static host (Cloudflare
  // Pages, etc.) with no adapter and no server runtime to keep alive.
  output: "export",

  // Drop the `X-Powered-By: Next.js` response header.
  poweredByHeader: false,

  // Three.js ships its `examples/jsm` add-ons (EffectComposer, UnrealBloomPass…)
  // as untranspiled ESM — transpile them through the Next pipeline.
  transpilePackages: ["three"],

  compiler: {
    // Strip `console.*` from production bundles, keeping error/warn for
    // monitoring. Left on in dev so logs stay available.
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  images: {
    // A static export has no image-optimization server, so `next/image` must
    // serve the original files instead of `/_next/image?url=…` (which would
    // 404 on a static host). The only raster asset is the header logo, already
    // sized for the layout, so there is nothing to gain from optimisation.
    unoptimized: true,
  },

  // React Compiler (automatic memoisation) is an opt-in performance win.
  // It requires the `babel-plugin-react-compiler` dev dependency and routes
  // the build through Babel — enable once installed:
  // reactCompiler: true,
};

export default nextConfig;
