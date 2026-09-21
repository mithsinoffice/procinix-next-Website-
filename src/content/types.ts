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
