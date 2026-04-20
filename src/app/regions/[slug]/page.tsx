import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { REGION_ROUTES, type RouteDef } from "@/lib/routes";
import { REGION_CONTENT, ALL_REGION_SLUGS } from "@/content/regions";
import { RegionDetail } from "@/components/templates/RegionDetail";

function findRouteBySlug(slug: string): RouteDef | null {
  const route = Object.values(REGION_ROUTES).find((r) =>
    r.path.endsWith(`/${slug}`),
  );
  return route ?? null;
}

export function generateStaticParams() {
  return ALL_REGION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = findRouteBySlug(slug);
  const content = REGION_CONTENT[slug];
  if (!route || !content) return { title: "Region not found" };
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
  const content = REGION_CONTENT[slug];
  if (!route || !content) notFound();
  return <RegionDetail content={content} route={route} />;
}
