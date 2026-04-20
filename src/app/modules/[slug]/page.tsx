import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { MODULE_ROUTES, type RouteDef } from "@/lib/routes";
import { MODULE_CONTENT, ALL_MODULE_SLUGS } from "@/content/modules";
import { ModuleDetail } from "@/components/templates/ModuleDetail";

function findRouteBySlug(slug: string): RouteDef | null {
  const route = Object.values(MODULE_ROUTES).find((r) =>
    r.path.endsWith(`/${slug}`),
  );
  return route ?? null;
}

export function generateStaticParams() {
  return ALL_MODULE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = findRouteBySlug(slug);
  const content = MODULE_CONTENT[slug];
  if (!route || !content) return { title: "Module not found" };
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
  const content = MODULE_CONTENT[slug];
  if (!route || !content) notFound();
  return <ModuleDetail content={content} route={route} />;
}
