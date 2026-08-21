"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassButton } from "@/components/ui/glass-button";
import type { ExperienceCopy } from "@/data/mocks/home";

import { useExperiencePhase } from "./experience";
import { Reveal } from "./reveal";
import { SectionTitle } from "./section-title";

// TextEngine lays its words out as inline-blocks, so `text-align: center` alone
// doesn't reliably centre them — drive centring with a flex container instead.
export const HERO_TITLE_CLASS =
  "flex flex-wrap justify-center font-display text-display font-normal leading-title tracking-title text-center text-foreground text-fade-trailing";

export interface HeroSectionProps {
  content: ExperienceCopy;
}

export const HeroSection = ({ content }: HeroSectionProps) => {
  const state = useExperiencePhase((s) => s.hero);

  return (
    <section
      aria-label="ヒーロー"
      className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center px-5 text-center"
    >
      <Reveal state={state} className="mb-10">
        <Eyebrow>{content.eyebrow}</Eyebrow>
      </Reveal>

      <Reveal state={state} enterAnimated={false} className="mb-6 max-w-title">
        <SectionTitle
          tag="h1"
          text={content.titleLines.join(" ")}
          className={HERO_TITLE_CLASS}
        />
      </Reveal>

      <Reveal
        state={state}
        tag="p"
        className="mb-10 max-w-lead text-lead leading-normal text-muted"
      >
        {content.subtitle}
      </Reveal>

      {/* The two core businesses, readable at a glance. Deliberately shares one
          type treatment across both — the brand direction differentiates them
          by layout and typography, never by colour. The `×` is decorative, so
          it's hidden from assistive tech. */}
      {content.keywords && content.keywords.length > 0 && (
        <Reveal
          state={state}
          delay={120}
          className="mb-12 flex items-center justify-center gap-5 max-sm:flex-col max-sm:gap-3"
        >
          {content.keywords.map((keyword, i) => (
            <div key={keyword.label} className="flex items-center gap-5 max-sm:gap-3">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="text-lead font-light text-muted/50 max-sm:hidden"
                >
                  ×
                </span>
              )}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-eyebrow font-medium uppercase tracking-[0.2em] text-gradient-accent">
                  {keyword.label}
                </span>
                <span className="text-kicker font-light tracking-wide text-muted">
                  {keyword.name}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      )}

      <Reveal
        state={state}
        className="flex gap-4 max-md:w-full max-md:max-w-75 max-md:flex-col"
      >
        {content.buttons.map((button) => (
          <GlassButton
            key={button.label}
            variant={button.withArrow ? "primary" : "secondary"}
            withArrow={button.withArrow}
            href={button.href}
          >
            {button.label}
          </GlassButton>
        ))}
      </Reveal>
    </section>
  );
};
