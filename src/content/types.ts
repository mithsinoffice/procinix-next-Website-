import type { Family } from "@/lib/routes";

export type ModuleContent = {
  slug: string;
  family: Family;
  tagline: string;
  heroStats?: { value: string; label: string }[];
  painPoints: string[];
  features: { title: string; body: string }[];
  outcomes: { metric: string; detail: string }[];
  aiAngle: string;
  relatedSlugs: string[];
};

export type IndustryContent = {
  slug: string;
  tagline: string;
  painPoints: string[];
  useCases: { family: Family; title: string; body: string }[];
  relevantModuleSlugs: string[];
  complexityHandled: string[];
  outcomes: { metric: string; detail: string }[];
};

export type RegionContent = {
  slug: string;
  tagline: string;
  compliance: string[];
  painPoints: string[];
  outcomes: { metric: string; detail: string }[];
  signatureModuleSlugs: string[];
};

export type SolutionContent = {
  slug: string;
  region: string;
  focus: string;
  tagline: string;
  painPoints: string[];
  capabilities: string[];
  outcomes: { metric: string; detail: string }[];
  relevantModuleSlugs: string[];
};
