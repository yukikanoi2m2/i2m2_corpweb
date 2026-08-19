// 📖 Docs: obsidian/frontend/components/common.md
"use client";

import Link from "next/link";
import { animated, easings, useTransition } from "@react-spring/web";

import { CookieButton } from "./CookieButton";
import { useCookieStore } from "./cookieStore";

export const CookieBanner = () => {
  const consent = useCookieStore((s) => s.consent);
  const hydrated = useCookieStore((s) => s.hydrated);
  const modalOpen = useCookieStore((s) => s.modalOpen);
  const acceptAll = useCookieStore((s) => s.acceptAll);
  const rejectAll = useCookieStore((s) => s.rejectAll);
  const openModal = useCookieStore((s) => s.openModal);

  // Banner shows only after hydration confirmed no prior consent. Hidden while
  // the preferences modal is up so the two surfaces never compete for focus.
  const shouldShow = hydrated && consent === null && !modalOpen;

  // react-spring keeps the node mounted through the leave animation — no
  // manual mount/timeout juggling needed.
  //
  // `leave` needs its own config. A spring approaches its target
  // asymptotically, and react-spring only unmounts once it *rests*, so with the
  // default precision the banner spent ~4s on iOS Safari crawling through
  // opacity 0.057 → 0.020 → 0.006 → 0.0019 while still in the DOM. On a phone,
  // where the WebGL canvas competes for the same rAF loop, that tail stretched
  // further and read as "tapping the button does nothing".
  //
  // The leave animation must finish in a *single* frame, because react-spring's
  // scheduler caps how much animation time one frame may advance:
  //
  //   updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667)
  //   — @react-spring/rafz
  //
  // The particle canvas shares this rAF loop and production iOS Safari was
  // measured at ~1.2fps while WebGL warms up. At that rate each frame advances
  // the animation clock by only 64ms, so *any* longer leave costs several real
  // frames: a 240ms fade took ~2s of wall clock, and react-spring only unmounts
  // once the animation rests. That is why tapping "すべて許可" appeared to do
  // nothing — the consent was saved instantly, but the banner stayed put.
  //
  // 64ms keeps a perceptible fade on a healthy 60fps device (~4 frames) while
  // guaranteeing that one starved frame is enough to complete and unmount.
  // Still `@react-spring/web` throughout — no CSS transition, no unmount timer.
  const transitions = useTransition(shouldShow, {
    from: { opacity: 0, y: 24 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 24 },
    config: (_item, _index, phase) =>
      phase === "leave"
        ? { duration: 64, easing: easings.easeOutQuad, clamp: true }
        : { tension: 280, friction: 32 },
  });

  return transitions((style, show) =>
    show ? (
      <animated.section
        aria-label="Cookieの同意"
        style={{
          opacity: style.opacity,
          transform: style.y.to((v) => `translateY(${v}px)`),
          // react-spring unmounts only after the leave animation rests, and on a
          // starved rAF loop that can trail the fade by a noticeable margin.
          // Until then this is a full-width `fixed` element sitting above the
          // page, so a faded-out banner would still swallow taps aimed at what
          // is now visible underneath it. Dropping hit-testing the moment it
          // stops being opaque keeps the dismissal feeling instant.
          pointerEvents: style.opacity.to((v) => (v < 0.99 ? "none" : "auto")),
        }}
        className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-2 rounded-xl border border-foreground/10 bg-background/95 p-4 font-sans text-foreground shadow-2xl backdrop-blur-xl sm:bottom-12 sm:left-auto sm:right-12 sm:w-[420px] sm:gap-3 sm:p-6"
      >
        <h2 className="text-base font-medium leading-snug sm:text-lg">
          このウェブサイトはCookieを使用しています
        </h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          サイトの正常な動作、利用状況の把握、今後の改善のためにCookieを使用しています。
          {/* The category explainer is redundant next to the three buttons and
              costs ~2 lines — a large share of a phone viewport. Shown from
              `sm` up, where the banner is a fixed 420px card with room. */}
          <span className="hidden sm:inline">
            すべて許可、不要なものを拒否、またはカテゴリごとに選択できます。
          </span>{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground/70"
          >
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <CookieButton onClick={acceptAll}>すべて許可</CookieButton>
          <CookieButton variant="secondary" onClick={rejectAll}>
            すべて拒否
          </CookieButton>
          <button
            type="button"
            onClick={openModal}
            className="px-2 py-2 text-sm font-medium leading-none text-foreground underline underline-offset-2 hover:text-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            設定を管理
          </button>
        </div>
      </animated.section>
    ) : null,
  );
};
