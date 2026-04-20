"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

const pageToHref: Record<string, string> = {
  home: "/",
  platform: "/platform",
  "use-cases": "/use-cases",
  about: "/about",
  contact: "/contact",
  "roi-calculator": "/roi-calculator",
  "ap-automation": "/ap-automation",
  "ar-automation": "/ar-automation",
  "r2r-automation": "/r2r-automation",
  analytics: "/analytics",
  "finance-consulting": "/finance-consulting",
  implementations: "/implementations",
  sourcing: "/sourcing",
  budgeting: "/budgeting",
  "sourcing-budgeting": "/sourcing-budgeting",
  procurement: "/procurement",
  "invoice-capture": "/invoice-capture",
  matching: "/matching",
  "vendor-onboarding": "/vendor-onboarding",
  "payment-automation": "/payment-automation",
  "travel-expense": "/travel-expense",
  "petty-cash": "/petty-cash",
  "fixed-assets": "/fixed-assets",
  blog: "/blog",
};

/**
 * Drop-in replacement for the legacy `onNavigate(pageId)` callback used
 * in components ported from the Vite SPA. Maps old page IDs to real routes
 * and pushes via the Next.js router.
 */
export function useLegacyNavigate() {
  const router = useRouter();
  return useCallback(
    (page: string) => {
      const href = pageToHref[page] ?? `/${page}`;
      router.push(href);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [router],
  );
}
