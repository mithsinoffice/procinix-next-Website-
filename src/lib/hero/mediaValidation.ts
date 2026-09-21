/**
 * Media constraints shared by the client upload widget and the server-side
 * token generator, so both enforce the same limits. SVG is deliberately
 * excluded — it can carry executable script and isn't genuinely needed for
 * product screenshots/video.
 */
export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/avif"] as const;
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"] as const;
export const ALLOWED_MEDIA_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB
export const MAX_VIDEO_BYTES = 60 * 1024 * 1024; // 60MB

export function maxBytesFor(contentType: string): number {
  return (ALLOWED_VIDEO_TYPES as readonly string[]).includes(contentType) ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
}

/** Maps each allowed MIME type to the one file extension it may use in a
 *  generated object key. Never derived from a user-supplied filename. */
const EXTENSION_FOR_CONTENT_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

export function extensionForContentType(contentType: string): string | null {
  return EXTENSION_FOR_CONTENT_TYPE[contentType] ?? null;
}

/**
 * The only pathname shape the media-upload token endpoint will ever issue
 * or accept. Generated server- and client-side from a random id and the
 * validated content type — never from the original filename a browser or
 * attacker supplies, which could otherwise become part of a public,
 * permanent storage URL (misleading names, control characters, absurd
 * lengths). See docs/hero-slider.md, "Security".
 */
export function isSafeGeneratedMediaPathname(pathname: string, contentType: string): boolean {
  const ext = extensionForContentType(contentType);
  if (!ext) return false;
  const pattern = new RegExp(`^hero/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\\.${ext}$`);
  return pattern.test(pathname);
}

export function generateMediaPathname(contentType: string): string {
  const ext = extensionForContentType(contentType);
  if (!ext) throw new Error(`Unsupported content type: ${contentType}`);
  return `hero/${crypto.randomUUID()}.${ext}`;
}
