"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassButton } from "@/components/ui/glass-button";
import type { ExperienceCopy } from "@/data/mocks/home";

import { useExperiencePhase } from "./experience";
import { Reveal } from "./reveal";
import { SectionTitle } from "./section-title";

const WAVE_TITLE_CLASS =
  "flex flex-wrap justify-start font-display text-display-sm font-normal leading-title tracking-title text-left text-foreground text-fade-trailing";

export interface WaveSectionProps {
  content: ExperienceCopy;
}

export const WaveSection = ({ content }: WaveSectionProps) => {
  const state = useExperiencePhase((s) => s.wave);

  return (
    <section
      aria-label="中核事業"
      className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center gap-15 px-[10vw] text-left max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:gap-8 max-lg:px-6"
    >
      <div className="flex max-w-title-sm flex-1 flex-col items-start max-lg:max-w-full">
        <Reveal state={state} className="mb-6">
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>

        {state !== "before" && (
          <Reveal state={state} enterAnimated={false}>
            <SectionTitle
              tag="h2"
              text={content.titleLines.join(" ")}
              className={WAVE_TITLE_CLASS}
            />
          </Reveal>
        )}
      </div>

      <div className="flex max-w-lead-sm flex-1 flex-col items-start max-lg:max-w-full">
        {/* The two core businesses read as two distinct blocks. They share one
            type treatment on purpose — the brand direction differentiates them
            by layout and typography, never by colour. */}
        {content.items && content.items.length > 0 ? (
          <div className="mb-10 flex w-full flex-col gap-6 max-lg:gap-5">
            {content.items.map((item, i) => (
              <Reveal
                key={item.num}
                state={state}
                delay={i * 120}
                className="flex w-full flex-col items-start border-t border-border-glass pt-5 text-left"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg font-extralight leading-none text-gradient-accent">
                    {item.num}
                  </span>
                  <span className="text-eyebrow font-medium uppercase tracking-[0.2em] text-muted">
                    {item.label}
                  </span>
                </div>
                <h3 className="mt-2.5 font-display text-xl font-normal tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-lead leading-normal text-muted">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal
            state={state}
            tag="p"
            className="mb-10 text-left text-lead leading-normal text-muted"
          >
            {content.subtitle}
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
      </div>
    </section>
  );
};
