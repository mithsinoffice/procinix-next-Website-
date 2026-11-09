import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { GLOSSARY_ROUTES, type RouteDef } from "@/lib/routes";
import { GLOSSARY_CONTENT, ALL_GLOSSARY_SLUGS } from "@/content/glossary";
import { GlossaryDetail } from "@/components/templates/GlossaryDetail";

function findRouteBySlug(slug: string): RouteDef | null {
  const route = Object.values(GLOSSARY_ROUTES).find((r) =>
    r.path.endsWith(`/${slug}`),
  );
  return route ?? null;
}

export function generateStaticParams() {
  return ALL_GLOSSARY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = findRouteBySlug(slug);
  const content = GLOSSARY_CONTENT[slug];
  if (!route || !content) return { title: "Term not found" };
  return buildMetadata({
    title: route.title,
    description: content.metaDescription ?? content.shortDefinition,
    path: route.path,
    keywords: route.keywords,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = findRouteBySlug(slug);
  const content = GLOSSARY_CONTENT[slug];
  if (!route || !content) notFound();

  return <GlossaryDetail content={content} route={route} />;
}
