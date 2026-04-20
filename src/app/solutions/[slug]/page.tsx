import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { SOLUTION_ROUTES, type RouteDef } from "@/lib/routes";
import { SOLUTION_CONTENT, ALL_SOLUTION_SLUGS } from "@/content/solutions";
import { SolutionDetail } from "@/components/templates/SolutionDetail";

function findRouteBySlug(slug: string): RouteDef | null {
  const route = Object.values(SOLUTION_ROUTES).find((r) =>
    r.path.endsWith(`/${slug}`),
  );
  return route ?? null;
}

export function generateStaticParams() {
  return ALL_SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = findRouteBySlug(slug);
  const content = SOLUTION_CONTENT[slug];
  if (!route || !content) return { title: "Solution not found" };
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
  const content = SOLUTION_CONTENT[slug];
  if (!route || !content) notFound();
  return <SolutionDetail content={content} route={route} />;
}
