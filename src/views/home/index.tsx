import { homeContent } from "@/data/mocks/home";

import { DnaCards } from "./dna-cards";
import { ExperienceBackdrop } from "./experience-backdrop";
import { ExperienceController } from "./experience-controller";
import { GalaxySection } from "./galaxy-section";
import { HeroSection } from "./hero-section";
import { WaveSection } from "./wave-section";

/**
 * Home view — the scroll-driven particle experience rebuilt from the source
 * `New Era` project. A Server Component that composes the fixed WebGL canvas and
 * the overlay sections (all client leaves) over a tall scroll driver.
 *
 * One single experience for every device — no desktop/mobile split. Phones get
 * exactly the same WebGL particle morph, overlays and scroll choreography as
 * desktop (source index.html had no separate mobile page either).
 *
 * The backdrop and the scroll state are deliberately separate components: the
 * overlays reveal off scroll progress, so `ExperienceController` must keep
 * publishing it even on devices where the WebGL backdrop falls back to a static
 * gradient — otherwise the copy would stay stuck at `opacity: 0`.
 */
export const HomeView = () => {
  return (
    <main>
      <ExperienceController />
      <ExperienceBackdrop />

      <HeroSection content={homeContent.hero} />
      <DnaCards cards={homeContent.cards} />
      <WaveSection content={homeContent.wave} />
      <GalaxySection content={homeContent.galaxy} />

      {/* Scroll driver — 14 screens of height produce the 0→1 progress that
          morphs the particles and reveals each overlay (source body 1400vh). */}
      <div aria-hidden="true" className="h-[1400vh]" />
    </main>
  );
};
