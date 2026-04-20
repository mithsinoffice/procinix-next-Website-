"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/primitives/Button";

type Intent = "contact" | "demo";

type Props = {
  intent?: Intent;
  headline?: string;
  subhead?: string;
  submitLabel?: string;
};

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const focusAreas = [
  { value: "", label: "Primary focus area…" },
  { value: "s2p", label: "Source-to-Pay" },
  { value: "o2c", label: "Order-to-Cash" },
  { value: "r2r", label: "Record-to-Report" },
  { value: "platform", label: "Platform / transformation" },
  { value: "other", label: "Other" },
];

const roles = [
  { value: "", label: "Your role…" },
  { value: "cfo", label: "CFO / Finance leadership" },
  { value: "controller", label: "Controller / Finance Director" },
  { value: "ap-ar-lead", label: "Head of AP / AR" },
  { value: "procurement-lead", label: "Head of Procurement" },
  { value: "ssc", label: "Head of Shared Services" },
  { value: "transformation", label: "Head of Transformation" },
  { value: "other", label: "Other" },
];

export function ContactForm({
  intent = "contact",
  headline,
  subhead,
  submitLabel,
}: Props) {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [utm, setUtm] = useState<Record<string, string> | null>(null);

  // Capture UTM from URL on client load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    ["source", "medium", "campaign", "term", "content"].forEach((k) => {
      const v = params.get(`utm_${k}`);
      if (v) captured[k] = v;
    });
    if (Object.keys(captured).length > 0) setUtm(captured);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: (fd.get("name") as string)?.trim(),
      company: (fd.get("company") as string)?.trim(),
      email: (fd.get("email") as string)?.trim(),
      phone: (fd.get("phone") as string)?.trim(),
      country: (fd.get("country") as string)?.trim(),
      message:
        ((fd.get("message") as string) ?? "").trim() +
        (fd.get("role") ? `\n\nRole: ${fd.get("role")}` : "") +
        (fd.get("focus") ? `\nFocus: ${fd.get("focus")}` : ""),
      intent,
      website: (fd.get("website") as string) ?? "",
      utm: utm ?? undefined,
    };

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setState({
          status: "error",
          message: data?.error ?? "Could not send message.",
        });
        return;
      }
      // Fire dataLayer event for GTM (if present)
      if (typeof window !== "undefined" && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: intent === "demo" ? "demo_request" : "contact_submit",
        });
      }
      setState({ status: "success" });
      form.reset();
    } catch {
      setState({ status: "error", message: "Network error. Please retry." });
    }
  }

  if (state.status === "success") {
    return (
      <Card className="p-8 lg:p-10 max-w-2xl">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-teal)]/15 text-[var(--accent-teal-bright)] mb-5">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <h3 className="font-display text-[24px] text-white mb-3">
          Got it — thanks.
        </h3>
        <p className="text-[15px] text-white/65 leading-relaxed">
          {intent === "demo"
            ? "A Procinix specialist will reach out within one business day to schedule your walkthrough."
            : "We'll be in touch within one business day."}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8 lg:p-10">
      {(headline || subhead) && (
        <div className="mb-8">
          {headline && (
            <h3 className="font-display text-[24px] lg:text-[28px] text-white leading-snug mb-2">
              {headline}
            </h3>
          )}
          {subhead && (
            <p className="text-[14.5px] text-white/60 leading-relaxed">
              {subhead}
            </p>
          )}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Country" name="country" />
        <SelectField label="Role" name="role" options={roles} />
        <SelectField
          label="Primary focus area"
          name="focus"
          options={focusAreas}
          className="md:col-span-2"
        />
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-[12.5px] text-white/70">
            {intent === "demo"
              ? "What would you like the demo to focus on?"
              : "What's on your mind?"}
          </label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full rounded-lg border border-white/10 bg-[var(--bg-primary)] text-white text-[15px] px-4 py-3 focus:border-[var(--accent-teal-bright)] focus:outline-none transition-colors resize-y min-h-[120px]"
            placeholder={
              intent === "demo"
                ? "e.g. multi-entity AP automation, DSO reduction, close acceleration…"
                : "Tell us the context and what you're trying to solve."
            }
          />
        </div>

        {/* Honeypot — invisible to humans */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] opacity-0 h-0 w-0"
          aria-hidden
        />

        {state.status === "error" && (
          <div className="md:col-span-2 flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13.5px] text-red-100">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
          <p className="text-[11.5px] text-white/40 leading-relaxed max-w-md">
            By submitting, you agree to be contacted about Procinix. We don't
            share your details. See our privacy policy.
          </p>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={state.status === "submitting"}
            className={
              state.status === "submitting" ? "opacity-70 cursor-wait" : ""
            }
          >
            <span className="inline-flex items-center gap-2">
              {state.status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                submitLabel ?? (intent === "demo" ? "Request Demo" : "Send Message")
              )}
            </span>
          </Button>
        </div>
      </form>
    </Card>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={"flex flex-col gap-2 " + (className ?? "")}>
      <label className="text-[12.5px] text-white/70">
        {label}
        {required && <span className="text-[var(--accent-amber)]"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-[var(--bg-primary)] text-white text-[15px] px-4 py-3 focus:border-[var(--accent-teal-bright)] focus:outline-none transition-colors"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  className,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={"flex flex-col gap-2 " + (className ?? "")}>
      <label className="text-[12.5px] text-white/70">{label}</label>
      <div className="relative">
        <select
          name={name}
          className="w-full appearance-none rounded-lg border border-white/10 bg-[var(--bg-primary)] text-white text-[15px] px-4 py-3 pr-10 focus:border-[var(--accent-teal-bright)] focus:outline-none transition-colors"
          defaultValue=""
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[var(--bg-primary)]">
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-[12px]">
          ▾
        </span>
      </div>
    </div>
  );
}
