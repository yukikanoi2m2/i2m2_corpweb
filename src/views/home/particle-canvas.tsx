"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import { subscribeToTicker } from "@/lib/animation/ticker";

import {
  backgroundFragmentShader,
  backgroundVertexShader,
} from "./shaders/background";
import {
  particleFragmentShader,
  particleVertexShader,
} from "./shaders/particles";

/**
 * `three` r169 dropped WebGL1 (removed in r163), so a WebGL2 context is a hard
 * requirement. Probing with a throwaway canvas lets the caller pick a fallback
 * before any renderer is constructed.
 */
const isWebGL2Available = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
};

/** Phone-sized viewport — the breakpoint the mobile render budget keys off. */
const isMobileViewport = () => window.innerWidth < 640;

/**
 * Per-device render budget.
 *
 * The desktop numbers are the source's. The phone numbers exist because the
 * full-fat scene starves the main thread: measured on iOS Safari (390×844,
 * DPR 3) the page ran at **1.2 rAF/s**, so react-spring — which shares that
 * same rAF — needed ~18s to finish a 1.2s fade. The visible result was a black
 * page with only the static header logo, i.e. every animated overlay still at
 * opacity ~0.05. Cutting fill rate and vertex count is therefore not a
 * cosmetic optimisation, it is what makes the *text* appear at all.
 *
 * What each knob costs on a phone:
 *  - `dpr`: pixels are quadratic. DPR 3 on a 390×844 CSS viewport is 1170×2532
 *    = 3.0M pixels, and bloom resamples that 5 times over. DPR 1.25 → 0.51M.
 *  - `segments`: `SphereGeometry(4.2, 200, 600)` is 120,801 vertices, each
 *    running the morph vertex shader every frame. 64×96 keeps the moiré-ring
 *    look (the rings come from latitude banding, which survives the reduction)
 *    at 6,305 vertices.
 *  - `bloom`: `UnrealBloomPass` is 5 downsample + 5 upsample full-screen
 *    passes. Dropping it is the single largest saving; the particle shader is
 *    additive so the glow is only softened, not lost.
 */
const BUDGET = {
  desktop: { dpr: 2, antialias: true, segments: [200, 600], bloom: true },
  mobile: { dpr: 1.25, antialias: false, segments: [64, 96], bloom: false },
} as const;

/**
 * The fixed WebGL backdrop: an aurora shader + the scroll-driven particle morph
 * + UnrealBloom, ported from script.js.
 *
 * Smoothing lives in Lenis (the shared scroll layer), so reading `scrollY` each
 * frame already yields a smoothed value. The render loop runs on the shared
 * ticker (the supported extension point for loop-based animation; see
 * animation-system.md).
 *
 * Scroll progress for the overlays is published by `ExperienceController`, not
 * here — the page's text must stay readable even if this canvas never starts.
 *
 * Rendering is best-effort: `three` r169 is WebGL2-only, so contexts fail on
 * older devices, some in-app browsers and GPU-blocked environments. Setup runs
 * inside a `try/catch` and reports failure through `onFailure` so the caller
 * can swap in a static backdrop instead of taking the whole route down.
 */
export interface ParticleCanvasProps {
  /** Called if the WebGL2 context or scene setup fails. */
  onFailure?: () => void;
}

export const ParticleCanvas = ({ onFailure }: ParticleCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Kept in a ref so the setup effect below never re-runs (and never rebuilds
  // the whole scene) just because the parent re-rendered with a new callback.
  const onFailureRef = useRef(onFailure);
  useEffect(() => {
    onFailureRef.current = onFailure;
  }, [onFailure]);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    // Probe before touching three: a failed `WebGLRenderer` constructor throws,
    // and on some drivers also emits a lost-context warning we can avoid.
    if (!isWebGL2Available()) {
      onFailureRef.current?.();
      return;
    }

    // Recorded as they are created so both the catch block and the unmount
    // cleanup can release the same set.
    let renderer: THREE.WebGLRenderer | undefined;
    let composer: EffectComposer | undefined;
    let bloomPass: UnrealBloomPass | undefined;

    try {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 8;

    // Same scene and same choreography on every device; only the render budget
    // differs (see BUDGET — the phone settings are what keep the main thread
    // free enough for the overlay springs to run).
    const budget = isMobileViewport() ? BUDGET.mobile : BUDGET.desktop;
    renderer = new THREE.WebGLRenderer({
      antialias: budget.antialias,
      alpha: true,
      // The scene is drawn every frame and never read back, so the browser
      // doesn't need to keep the last frame around.
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, budget.dpr));
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    // Release the frozen canvas and fall back to the static backdrop if the
    // driver drops the context (backgrounded tab, GPU memory pressure).
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      onFailureRef.current?.();
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);

    // --- AURORA BACKGROUND SETUP ---
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0.0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        color1: { value: new THREE.Color("#ff4c33") },
        color2: { value: new THREE.Color("#3366ff") },
      },
      vertexShader: backgroundVertexShader,
      fragmentShader: backgroundFragmentShader,
      depthWrite: false,
    });
    const bgQuad = new THREE.Mesh(bgGeometry, bgMaterial);
    bgScene.add(bgQuad);

    // Dense SphereGeometry rendered as Points — the moiré rings come for free.
    // Segment counts come from the render budget: the rings are produced by
    // latitude banding, so a coarser sphere keeps the look on phones.
    const geometry = new THREE.SphereGeometry(
      4.2,
      budget.segments[0],
      budget.segments[1],
    );
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0.0 },
        uIntro: { value: 0.0 },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    // Keep visible when stretched far below the original bounding sphere.
    particles.frustumCulled = false;
    scene.add(particles);

    // --- POST-PROCESSING (BLOOM) ---
    // Bloom means 10 extra full-screen passes plus two half-float render
    // targets, which is the single largest cost in a phone frame. When the
    // budget disables it we skip `EffectComposer` altogether rather than
    // running a composer with no effect pass: a composer would still allocate
    // its ping-pong targets, and its `RenderPass`es write to an offscreen
    // buffer that nothing then copies to the canvas (it reassigns
    // `renderToScreen` itself every frame, so that can't be overridden). The
    // two scenes are instead drawn straight to the default framebuffer below.
    if (budget.bloom) {
      composer = new EffectComposer(renderer);

      const renderBg = new RenderPass(bgScene, bgCamera);
      composer.addPass(renderBg);

      const renderFg = new RenderPass(scene, camera);
      renderFg.clear = false;
      renderFg.clearDepth = true;
      composer.addPass(renderFg);

      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5, // strength
        0.5, // radius
        0.05, // threshold
      );
      composer.addPass(bloomPass);
    }

    let time = 0;

    // On-load intro: the sphere appears filled and close, then dollies back to
    // its resting position while the centre hollows into the ring. Time-driven
    // (not scroll), starting on the first rendered frame.
    const INTRO_MS = 2600;
    let introStart = 0;

    // Mobile browsers fire `resize` on every URL-bar collapse and on each frame
    // of an orientation change; rebuilding the composer's render targets
    // synchronously each time is what makes those moments stutter. Coalesce to
    // one rebuild per frame.
    let resizeRaf = 0;
    const applyResize = () => {
      resizeRaf = 0;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer?.setSize(window.innerWidth, window.innerHeight);
      // Only present on the bloom path; the direct-draw path has no targets.
      composer?.setSize(window.innerWidth, window.innerHeight);
      bgMaterial.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
    };
    const handleResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(applyResize);
    };
    window.addEventListener("resize", handleResize);

    const render = (now: number) => {
      time += 0.005;

      // Intro progress (eased), driven by wall-clock since the first frame.
      if (introStart === 0) introStart = now;
      const introRaw = Math.min((now - introStart) / INTRO_MS, 1);
      const introEased = 1 - Math.pow(1 - introRaw, 3); // easeOutCubic
      material.uniforms.uIntro.value = introEased;

      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const currentScroll = maxScroll > 0 ? scrollTop / maxScroll : 0;

      material.uniforms.uTime.value = time;
      material.uniforms.uScroll.value = currentScroll;
      bgMaterial.uniforms.uTime.value = time;
      bgMaterial.uniforms.uScroll.value = currentScroll;

      // --- CAMERA & ROTATION LOGIC ---
      const panProgress = Math.min(currentScroll / 0.5, 1.0);
      const smoothPan = panProgress * panProgress * (3.0 - 2.0 * panProgress);

      const flyPhase =
        currentScroll < 0.5
          ? 0.0
          : Math.min((currentScroll - 0.5) / 0.35, 1.0);

      const blackHoleDive =
        currentScroll < 0.8
          ? 0.0
          : Math.min((currentScroll - 0.8) / 0.12, 1.0);

      camera.position.y = -38.0 * smoothPan + 5.0 * Math.pow(blackHoleDive, 2.0);
      camera.position.z = 8.0 - 4.0 * smoothPan - 55.0 * flyPhase;

      const galaxyPullback =
        currentScroll < 0.93
          ? 0.0
          : Math.min((currentScroll - 0.93) / 0.07, 1.0);
      const smoothPullback =
        galaxyPullback * galaxyPullback * (3.0 - 2.0 * galaxyPullback);

      camera.position.z += 75.0 * smoothPullback;
      camera.position.y += 35.0 * smoothPullback;

      const lookX = 0.0;
      let waveTilt = 0.0;
      if (currentScroll > 0.3 && currentScroll < 0.7) {
        const tiltProgress = (currentScroll - 0.3) / 0.4;
        waveTilt = Math.sin(tiltProgress * Math.PI) * 15.0;
      }

      const lookY = THREE.MathUtils.lerp(
        camera.position.y + waveTilt,
        -33.0,
        smoothPullback,
      );
      const lookZ = THREE.MathUtils.lerp(
        camera.position.z - 100.0,
        -120.0,
        smoothPullback,
      );

      // Intro dolly — start ~3 units closer (sphere fills the view) and ease
      // back to the resting z. Faded out past the top so scrolling mid-intro
      // doesn't fight the scroll-driven camera. Applied after lookZ is derived,
      // so the focal point stays put and the eye simply dollies in.
      const introZoom =
        (1 - introEased) * -3.0 * (1 - Math.min(currentScroll / 0.05, 1));
      camera.position.z += introZoom;

      camera.lookAt(new THREE.Vector3(lookX, lookY, lookZ));

      particles.rotation.y = smoothPan * Math.PI * 2.0;
      particles.rotation.x = Math.sin(smoothPan * Math.PI) * 0.15;
      camera.rotation.z = 0.0;

      // --- BIG BANG FLASH (0.90 → 0.95) ---
      const glowScaleProgress =
        currentScroll < 0.9 ? 0.0 : Math.min((currentScroll - 0.9) / 0.03, 1.0);
      const glowScale = Math.pow(glowScaleProgress, 4.0) * 400.0;
      const hideGlow =
        currentScroll < 0.93
          ? 0.0
          : Math.min((currentScroll - 0.93) / 0.02, 1.0);
      glow.style.transform = `translate(-50%, -50%) scale(${glowScale})`;
      glow.style.opacity = `${1.0 - hideGlow}`;

      if (composer) {
        composer.render();
      } else {
        // No-bloom path: same two-scene composite the RenderPasses would do
        // (aurora first, particles additively on top with a cleared depth
        // buffer), drawn straight to the canvas. `autoClear` is off, so the
        // colour clear is explicit.
        renderer?.setRenderTarget(null);
        renderer?.clear();
        renderer?.render(bgScene, bgCamera);
        renderer?.clearDepth();
        renderer?.render(scene, camera);
      }
    };

    // Phones cap the canvas at ~30fps. The ticker's framerate value is a
    // minimum interval in ms, and it throttles *this subscriber only* — so the
    // overlay springs keep every frame the display offers while the expensive
    // WebGL draw runs half as often. The intro and camera are wall-clock and
    // scroll driven, so nothing plays at half speed; it just renders at 30fps.
    const frameInterval = budget.bloom ? 0 : 33;
    const unsubscribe = subscribeToTicker(render, () => frameInterval);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      renderer?.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost,
      );
      renderer?.domElement.remove();
      geometry.dispose();
      material.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      bloomPass?.dispose();
      composer?.dispose();
      renderer?.dispose();
    };
    } catch (error) {
      // Shader compile failures, OOM on the dense geometry, driver quirks —
      // none of them should escalate into a route-level error boundary.
      console.error("ParticleCanvas: WebGL setup failed", error);
      bloomPass?.dispose();
      composer?.dispose();
      renderer?.domElement.remove();
      renderer?.dispose();
      onFailureRef.current?.();
      return;
    }
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      />
      {/* Big-bang white flash that scales out of the singularity. */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-1/2 z-10 size-25 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 80%)",
        }}
      />
    </>
  );
};
