import type { Family } from "@/lib/routes";

export type ModuleContent = {
  slug: string;
  family: Family;
  tagline: string;
  /** Longer, keyword-rich SEO meta description (~150-160 chars). Falls back to `tagline` when absent. */
  metaDescription?: string;
  heroStats?: { value: string; label: string }[];
  painPoints: string[];
  features: { title: string; body: string }[];
  outcomes: { metric: string; detail: string }[];
  aiAngle: string;
  /** Page-level FAQ content — rendered as an accordion + FAQPage JSON-LD schema. */
  faq?: { question: string; answer: string }[];
  relatedSlugs: string[];
};

export type IndustryContent = {
  slug: string;
  tagline: string;
  metaDescription?: string;
  painPoints: string[];
  useCases: { family: Family; title: string; body: string }[];
  relevantModuleSlugs: string[];
  complexityHandled: string[];
  outcomes: { metric: string; detail: string }[];
  faq?: { question: string; answer: string }[];
};

export type RegionContent = {
  slug: string;
  tagline: string;
  metaDescription?: string;
  compliance: string[];
  painPoints: string[];
  outcomes: { metric: string; detail: string }[];
  signatureModuleSlugs: string[];
  faq?: { question: string; answer: string }[];
};

export type SolutionContent = {
  slug: string;
  region: string;
  focus: string;
  tagline: string;
  metaDescription?: string;
  painPoints: string[];
  capabilities: string[];
  outcomes: { metric: string; detail: string }[];
  relevantModuleSlugs: string[];
  faq?: { question: string; answer: string }[];
};

export type ComparisonContent = {
  slug: string;
  /** Name of the competitor being compared against. */
  competitor: string;
  tagline: string;
  metaDescription?: string;
  /** Short framing paragraph — how the two categories/approaches differ. */
  summary: string;
  /** What Procinix specifically brings to this comparison. */
  procinixStrengths: string[];
  /** Fair, general summary of what the competitor is known for. */
  competitorStrengths: string[];
  comparisonRows: { category: string; procinix: string; competitor: string }[];
  whenToChooseProcinix: string;
  whenToChooseCompetitor: string;
  relevantModuleSlugs: string[];
  faq?: { question: string; answer: string }[];
};

/** Accent tone reused from the site's three-family palette (see ModuleDetail's familyTone). */
export type ShowcaseAccent = "teal" | "amber" | "purple";

export type ShowcaseMedia =
  | {
      mediaType: "image";
      /** Path under /public, e.g. "/showcase/command-centre/desktop.png". Omit to render the built-in placeholder frame. */
      desktopSrc?: string;
      mobileSrc?: string;
      alt: string;
    }
  | {
      mediaType: "video";
      desktopSrc?: string;
      mobileSrc?: string;
      /** Poster frame shown before playback / while the video is inactive. */
      poster?: string;
      alt: string;
    };

export type ShowcaseCampaign = {
  id: string;
  /** URL-safe slug used for deep-linking, e.g. ?showcase=r2r */
  slug: string;
  /** Short label shown in the pill navigation, e.g. "S2P" */
  navigationLabel: string;
  eyebrow: string;
  headline: string;
  description: string;
  media: ShowcaseMedia;
  accent: ShowcaseAccent;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Reuses real, already-published site stats — never invented figures. */
  metrics?: { label: string; value: string }[];
  badges?: string[];
  /** Lower renders first. */
  priority: number;
  /** Toggle a campaign off without deleting its config. */
  active: boolean;
  /** ISO 8601 instants (UTC). Omit either bound for an open-ended window. */
  startAt?: string;
  endAt?: string;
  /** GA4 campaign identifier carried on every event this card fires. */
  analyticsCampaignId: string;
};
