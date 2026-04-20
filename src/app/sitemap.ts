import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

const priorityByGroup: Record<string, number> = {
  core: 0.9,
  pillar: 0.85,
  module: 0.75,
  industry: 0.7,
  region: 0.7,
  solution: 0.75,
  utility: 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.values(ROUTES).map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.path === "/" ? "weekly" : "monthly",
    priority: r.path === "/" ? 1 : (priorityByGroup[r.group] ?? 0.5),
  }));
}
