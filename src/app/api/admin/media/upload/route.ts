import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireRole } from "@/lib/auth/guard";
import { sql, isDatabaseConfigured } from "@/lib/db/client";
import { ALLOWED_MEDIA_TYPES, MAX_IMAGE_BYTES, MAX_VIDEO_BYTES } from "@/lib/hero/mediaValidation";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  // Defense-in-depth: middleware already blocks unauthenticated requests to
  // /api/admin/*, but the token-generation step is re-checked here too,
  // since this is the one admin endpoint that hands a capability (an
  // upload token) to the browser rather than performing an action itself.
  let session;
  try {
    session = await requireRole("ADMIN", "CONTENT_EDITOR");
  } catch {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  if (!isDatabaseConfigured() || !sql) {
    return NextResponse.json({ error: "Media storage is not configured yet." }, { status: 503 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [...ALLOWED_MEDIA_TYPES],
          maximumSizeInBytes: Math.max(MAX_IMAGE_BYTES, MAX_VIDEO_BYTES),
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ uploadedBy: session.email }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const uploadedBy = tokenPayload ? (JSON.parse(tokenPayload).uploadedBy as string) : null;
        if (!sql) return;
        // PutBlobResult doesn't report the uploaded size, so size_bytes is
        // left null here — client-side validation (mediaValidation.ts)
        // already enforced the size cap before the bytes ever left the browser.
        await sql`
          INSERT INTO hero_media (url, pathname, content_type, size_bytes, uploaded_by)
          VALUES (${blob.url}, ${blob.pathname}, ${blob.contentType}, ${null}, ${uploadedBy})
        `;
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error("Media upload failed", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
