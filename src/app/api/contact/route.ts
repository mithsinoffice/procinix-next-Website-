import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: z.string().max(200).optional().default(""),
  phone: z.string().max(40).optional().default(""),
  country: z.string().max(80).optional().default(""),
  message: z.string().min(1).max(5000),
  intent: z.string().max(40).optional().default("contact"),
  utm: z
    .object({
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(120).optional(),
      term: z.string().max(120).optional(),
      content: z.string().max(120).optional(),
    })
    .optional(),
  // Honeypot — humans leave this empty
  website: z.string().max(0).optional().default(""),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // Honeypot
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Contact form: missing env vars (need RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL)",
    );
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const d = parsed.data;

  const subject = `[Procinix] ${d.intent === "demo" ? "Demo request" : "Contact"} — ${d.name}${d.company ? ` (${d.company})` : ""}`;

  const html = `
    <h2>New ${d.intent === "demo" ? "demo request" : "inquiry"}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif">
      <tr><td><b>Name</b></td><td>${escapeHtml(d.name)}</td></tr>
      <tr><td><b>Email</b></td><td>${escapeHtml(d.email)}</td></tr>
      <tr><td><b>Company</b></td><td>${escapeHtml(d.company)}</td></tr>
      <tr><td><b>Phone</b></td><td>${escapeHtml(d.phone)}</td></tr>
      <tr><td><b>Country</b></td><td>${escapeHtml(d.country)}</td></tr>
      <tr><td><b>Intent</b></td><td>${escapeHtml(d.intent)}</td></tr>
      <tr><td valign="top"><b>Message</b></td><td><pre style="white-space:pre-wrap;margin:0;font-family:inherit">${escapeHtml(d.message)}</pre></td></tr>
      ${
        d.utm
          ? `<tr><td valign="top"><b>UTM</b></td><td><pre style="margin:0">${escapeHtml(JSON.stringify(d.utm, null, 2))}</pre></td></tr>`
          : ""
      }
    </table>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `Procinix Website <${fromEmail}>`,
      to: toEmail,
      replyTo: d.email,
      subject,
      html,
    });
    if (error) {
      console.error("Resend error", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend exception", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
