/**
 * Sanity client wrapper.
 *
 * SETUP (one-time):
 *   1. Create a Sanity project at sanity.io/manage (free tier)
 *   2. Install locally: npm i @sanity/client @sanity/image-url next-sanity
 *   3. Create a `post` schema in Sanity Studio (title, slug, excerpt, body, coverImage, publishedAt, seo)
 *   4. Fill in NEXT_PUBLIC_SANITY_* env vars
 *   5. (Optional) embed Studio at /studio with `next-sanity/studio`
 *
 * This file is dependency-free until you install the packages above.
 */

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: unknown;
  coverImage?: { asset?: { url?: string } };
  publishedAt?: string;
  seo?: { title?: string; description?: string; ogImage?: { asset?: { url?: string } } };
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const sanityConfigured = Boolean(projectId);

type SanityQueryOpts = { revalidate?: number | false };

async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, opts: SanityQueryOpts = {}): Promise<T> {
  if (!projectId) {
    return [] as unknown as T;
  }
  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(`$${k}`, JSON.stringify(v));
  }
  const res = await fetch(url.toString(), {
    headers: process.env.SANITY_API_READ_TOKEN
      ? { Authorization: `Bearer ${process.env.SANITY_API_READ_TOKEN}` }
      : undefined,
    next: { revalidate: opts.revalidate ?? 60 },
  });
  if (!res.ok) {
    console.error("Sanity query failed", res.status, await res.text());
    return [] as unknown as T;
  }
  const json = (await res.json()) as { result: T };
  return json.result;
}

export async function getAllPosts(): Promise<Post[]> {
  return sanityFetch<Post[]>(
    `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc){
      _id, title, slug, excerpt, publishedAt,
      coverImage{ asset->{url} }
    }`,
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await sanityFetch<Post[]>(
    `*[_type == "post" && slug.current == $slug][0...1]{
      _id, title, slug, excerpt, body, publishedAt,
      coverImage{ asset->{url} },
      seo{ title, description, ogImage{ asset->{url} } }
    }`,
    { slug },
  );
  return res[0] ?? null;
}
