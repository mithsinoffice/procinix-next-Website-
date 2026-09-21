"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { UploadCloud, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { ALLOWED_IMAGE_TYPES, ALLOWED_VIDEO_TYPES, maxBytesFor, generateMediaPathname } from "@/lib/hero/mediaValidation";

type Kind = "image" | "video";

export function MediaUploadField({
  label,
  kind,
  value,
  onChange,
}: {
  label: string;
  kind: Kind;
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const accept = (kind === "video" ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES).join(",");

  async function handleFile(file: File) {
    setError(null);
    const allowed = kind === "video" ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES;
    if (!(allowed as readonly string[]).includes(file.type)) {
      setError(`Unsupported file type: ${file.type || "unknown"}.`);
      setState("error");
      return;
    }
    const max = maxBytesFor(file.type);
    if (file.size > max) {
      setError(`File is too large (max ${Math.round(max / (1024 * 1024))}MB).`);
      setState("error");
      return;
    }

    setState("uploading");
    try {
      // The object key is generated here from a random id + the validated
      // content type — never from the original filename — so an admin/
      // content-editor's browser can't put arbitrary, misleading, or
      // malformed text into a public, permanent storage URL. The server
      // independently re-validates this shape before issuing an upload
      // token (defense in depth — see /api/admin/media/upload).
      const pathname = generateMediaPathname(file.type);
      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/admin/media/upload",
      });
      onChange(blob.url);
      setState("idle");
    } catch (err) {
      setError((err as Error).message || "Upload failed.");
      setState("error");
    }
  }

  return (
    <div>
      <label className="block text-[13px] font-medium text-slate-700 mb-1.5">{label}</label>
      {value ? (
        <div className="relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
          {kind === "video" ? (
            <video src={value} className="w-full h-40 object-cover" muted controls />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="w-full h-40 object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
            aria-label={`Remove ${label.toLowerCase()}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={state === "uploading"}
          className="w-full h-32 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-500 hover:border-[#0a8f8f] hover:text-[#0a8f8f] transition-colors disabled:opacity-60"
        >
          {state === "uploading" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <UploadCloud className="h-5 w-5" />
          )}
          <span className="text-[13px]">
            {state === "uploading" ? "Uploading…" : `Upload ${kind === "video" ? "video" : "image"}`}
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {state === "error" && error && (
        <p className="mt-1.5 text-[12.5px] text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
      {value && state === "idle" && (
        <p className="mt-1.5 text-[12.5px] text-emerald-600 flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" /> Uploaded
        </p>
      )}
    </div>
  );
}
