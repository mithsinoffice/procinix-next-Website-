import { Suspense } from "react";
import { Container } from "@/components/primitives/Container";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";
import { GridLines } from "@/components/primitives/GridLines";
import { getPublicHeroCampaigns } from "@/lib/hero/data";
import { HeroSlider } from "./HeroSlider";
import { HeroSlideContent } from "./HeroSlideContent";
import { HeroMedia } from "./HeroMedia";
import { HeroControls } from "./HeroControls";
import type { HeroCampaign } from "@/lib/hero/types";

/**
 * Static, non-interactive shell shown for the brief window before
 * `HeroSlider` hydrates (it needs `useSearchParams` for deep-linking,
 * which requires a Suspense boundary — see docs/hero-slider.md).
 *
 * Renders the top-priority campaign with real, crawlable, non-shifting
 * content using the exact same subcomponents as the hydrated slider, so
 * there's nothing to visually "pop in". HeroControls takes
 * no onClick handlers here — passing a function from this Server Component
 * into those Client Components would violate the RSC server/client
 * boundary (see the fix in commit history for the previous showcase
 * implementation) — they render as inert markup until hydration replaces
 * this tree with the interactive <HeroSlider>.
 */
function HeroSliderFallback({ campaigns }: { campaigns: HeroCampaign[] }) {
  const active = campaigns[0];
  if (!active) return null;
  return (
    <section className="relative isolate overflow-hidden pt-[72px] min-h-[88vh] lg:min-h-[90vh] flex items-center">
      <AuroraBackground />
      <GridLines />
      <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <HeroSlideContent campaign={active} />
          </div>
          <div className="order-1 lg:order-2">
            <HeroMedia campaign={active} isActive eager />
          </div>
        </div>
        <div className="mt-10 lg:mt-14 flex items-center gap-5">
          <HeroControls count={campaigns.length} activeIndex={0} />
        </div>
      </Container>
    </section>
  );
}

export async function HeroSliderSection() {
  const campaigns = await getPublicHeroCampaigns();
  return (
    <Suspense fallback={<HeroSliderFallback campaigns={campaigns} />}>
      <HeroSlider campaigns={campaigns} />
    </Suspense>
  );
}
