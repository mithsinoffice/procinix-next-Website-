import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { INDUSTRY_ROUTES, type RouteDef } from "@/lib/routes";
import { INDUSTRY_CONTENT, ALL_INDUSTRY_SLUGS } from "@/content/industries";
import { IndustryDetail } from "@/components/templates/IndustryDetail";

function findRouteBySlug(slug: string): RouteDef | null {
  const route = Object.values(INDUSTRY_ROUTES).find((r) =>
    r.path.endsWith(`/${slug}`),
  );
  return route ?? null;
}

export function generateStaticParams() {
  return ALL_INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = findRouteBySlug(slug);
  const content = INDUSTRY_CONTENT[slug];
  if (!route || !content) return { title: "Industry not found" };
  return buildMetadata({
    title: route.title,
    description: content.tagline,
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
  const content = INDUSTRY_CONTENT[slug];
  if (!route || !content) notFound();
  return <IndustryDetail content={content} route={route} />;
}
