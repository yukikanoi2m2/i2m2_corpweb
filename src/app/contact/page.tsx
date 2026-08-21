"use client";

import { animated, easings, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";

const FORM_URL = "https://forms.gle/9GjvAXSTRwnANpg97";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 },
    config: { duration: 1000, easing: easings.easeOutQuart },
    delay: 200,
  });

  const ctaSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 },
    config: { duration: 800, easing: easings.easeOutQuart },
    delay: 600,
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-5 py-24 sm:px-6">
      {/* Page header */}
      <animated.section
        style={headerSpring}
        className="max-w-2xl text-center"
      >
        <Eyebrow>CONTACT</Eyebrow>
        {/* Kept to a noun, matching the other page headers (事業内容 / 会社概要 /
            採用情報). The two-purpose framing lives in the lead below: at
            `text-display-sm` a full sentence wrapped to four lines and left the
            closing 。 orphaned on its own line. */}
        <h1 className="mt-10 text-balance-ja font-display text-display-sm font-light leading-title tracking-title text-foreground">
          お問い合わせ
        </h1>
        <p className="mt-6 text-lead font-light leading-[1.8] tracking-wide text-muted">
          カルテ電子化・医療DXのご相談、医療M&A・事業承継のご相談は、
          <br className="max-sm:hidden" />
          いずれも下記のフォームから承ります。
        </p>
      </animated.section>

      {/* CTA button */}
      <animated.div style={ctaSpring} className="mt-12">
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-surface-button px-10 text-button font-medium text-foreground shadow-glass-btn backdrop-blur-2xl"
        >
          フォームを開く
          <span className="text-foreground/60">&rarr;</span>
        </a>
      </animated.div>

      {/* Contact info */}
      <animated.section
        style={ctaSpring}
        className="mt-20 w-full max-w-2xl"
      >
        <div className="rounded-2xl border border-border-glass bg-surface-glass p-6 backdrop-blur-md sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-eyebrow font-medium uppercase tracking-[0.15em] text-muted">
                MAIL
              </p>
              <p className="mt-2 text-lead font-light text-foreground">
                info@i2m2.com
              </p>
            </div>
            <div>
              <p className="text-eyebrow font-medium uppercase tracking-[0.15em] text-muted">
                ADDRESS
              </p>
              <p className="mt-2 text-lead font-light leading-[1.8] text-foreground">
                〒106-6137 東京都港区六本木6-10-1
                <br />
                六本木ヒルズ森タワー37F
              </p>
            </div>
          </div>
        </div>
      </animated.section>
    </main>
  );
}
