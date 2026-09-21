import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { COMPARISON_ROUTES, type RouteDef } from "@/lib/routes";
import { COMPARISON_CONTENT, ALL_COMPARISON_SLUGS } from "@/content/comparisons";
import { ComparisonDetail } from "@/components/templates/ComparisonDetail";

function findRouteBySlug(slug: string): RouteDef | null {
  const route = Object.values(COMPARISON_ROUTES).find((r) =>
    r.path.endsWith(`/${slug}`),
  );
  return route ?? null;
}

export function generateStaticParams() {
  return ALL_COMPARISON_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = findRouteBySlug(slug);
  const content = COMPARISON_CONTENT[slug];
  if (!route || !content) return { title: "Comparison not found" };
  return buildMetadata({
    title: route.title,
    description: content.metaDescription ?? content.tagline,
    path: route.path,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = findRouteBySlug(slug);
  const content = COMPARISON_CONTENT[slug];
  if (!route || !content) notFound();
  return <ComparisonDetail content={content} route={route} />;
}
