import { Suspense } from "react";
import { Container } from "@/components/primitives/Container";
import { getEligibleCampaigns } from "@/content/showcase";
import { ProductShowcaseInner } from "./ProductShowcaseInner";
import { ShowcaseNavigation } from "./ShowcaseNavigation";
import { ShowcaseContent } from "./ShowcaseContent";
import { ShowcaseMedia } from "./ShowcaseMedia";

/**
 * Static shell shown for the brief window before `ProductShowcaseInner`
 * hydrates (it needs `useSearchParams` for deep-linking, which requires a
 * Suspense boundary — see docs/product-showcase.md). Renders the
 * top-priority eligible campaign so there's real, crawlable content instead
 * of a blank placeholder, and so there's no layout shift into the
 * hydrated version.
 */
function ShowcaseFallback() {
  const campaigns = getEligibleCampaigns();
  const active = campaigns[0];
  if (!active) return null;
  return (
    <section
      id="see-procinix-in-action"
      className="relative py-24 lg:py-32 scroll-mt-24 border-y border-white/[0.05] bg-[var(--bg-secondary)]/40"
    >
      <Container size="wide">
        <div className="flex flex-col items-start gap-3 mb-10 lg:mb-14 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)] font-medium">
            Product Tour
          </span>
          <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.08] tracking-[-0.02em] text-white">
            See Procinix in Action
          </h2>
        </div>
        <div className="mb-8 lg:mb-10">
          <ShowcaseNavigation campaigns={campaigns} activeId={active.id} onSelect={() => {}} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <ShowcaseContent campaign={active} />
          </div>
          <div className="order-1 lg:order-2">
            <ShowcaseMedia campaign={active} isActive eager />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProductShowcase() {
  return (
    <Suspense fallback={<ShowcaseFallback />}>
      <ProductShowcaseInner />
    </Suspense>
  );
}
