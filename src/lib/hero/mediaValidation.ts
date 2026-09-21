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
