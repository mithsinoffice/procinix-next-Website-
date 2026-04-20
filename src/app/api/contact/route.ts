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
  const isDemo = d.intent === "demo";
  const firstName = d.name.split(/\s+/)[0] || d.name;

  const internalSubject = `[Procinix] ${isDemo ? "Demo request" : "Contact"} — ${d.name}${d.company ? ` (${d.company})` : ""}`;

  const internalHtml = `
    <h2>New ${isDemo ? "demo request" : "inquiry"}</h2>
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

  // --- 1) Internal notification: info@ → mithilesh@ ---
  try {
    const { error } = await resend.emails.send({
      from: `Procinix Website <${fromEmail}>`,
      to: toEmail,
      replyTo: d.email,
      subject: internalSubject,
      html: internalHtml,
    });
    if (error) {
      console.error("Resend internal error", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend internal exception", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  // --- 2) Auto-response to the visitor (BCC to internal inbox for trail) ---
  // Non-blocking: if this fails, we don't fail the whole request — the
  // internal notification already went through.
  try {
    await resend.emails.send({
      from: `Procinix <${fromEmail}>`,
      to: d.email,
      bcc: toEmail,
      replyTo: fromEmail,
      subject: isDemo
        ? "We've received your demo request — Procinix"
        : "Thanks for reaching out — Procinix",
      html: autoResponseHtml({ firstName, isDemo }),
      text: autoResponseText({ firstName, isDemo }),
    });
  } catch (err) {
    console.error("Resend auto-response failed (non-fatal)", err);
  }

  return NextResponse.json({ ok: true });
}

function autoResponseHtml({
  firstName,
  isDemo,
}: {
  firstName: string;
  isDemo: boolean;
}) {
  const safeName = escapeHtml(firstName);
  const opener = isDemo
    ? `Thanks for requesting a demo of Procinix. We'll reach out within <b>1 business day</b> to schedule a 30-minute walkthrough tailored to your operating model.`
    : `Thanks for reaching out to Procinix. A member of our team will respond within <b>1 business day</b>.`;

  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#F4F6F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f1b1d;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6F7;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
              <tr>
                <td style="background:#041F22;padding:28px 32px;">
                  <div style="color:#18D6D3;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;">
                    Procinix · Automation &amp; Beyond
                  </div>
                  <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:8px;letter-spacing:-0.01em;">
                    ${isDemo ? "Demo request received" : "Message received"}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:32px;color:#1f2d30;font-size:15px;line-height:1.6;">
                  <p style="margin:0 0 16px 0;">Hi ${safeName},</p>
                  <p style="margin:0 0 16px 0;">${opener}</p>
                  <p style="margin:0 0 16px 0;">In the meantime, a few resources that might be useful:</p>
                  <ul style="margin:0 0 20px 0;padding-left:20px;">
                    <li style="margin-bottom:6px;"><a href="https://www.procinix.ai/platform" style="color:#0a8f8f;text-decoration:none;font-weight:500;">The platform overview</a> — S2P, O2C, R2R on one operating model</li>
                    <li style="margin-bottom:6px;"><a href="https://www.procinix.ai/roi-calculator" style="color:#0a8f8f;text-decoration:none;font-weight:500;">Finance Transformation Value Assessment</a> — model directional outcomes</li>
                    <li style="margin-bottom:6px;"><a href="https://www.procinix.ai/source-to-pay" style="color:#0a8f8f;text-decoration:none;font-weight:500;">Source-to-Pay</a> · <a href="https://www.procinix.ai/order-to-cash" style="color:#0a8f8f;text-decoration:none;font-weight:500;">Order-to-Cash</a> · <a href="https://www.procinix.ai/record-to-report" style="color:#0a8f8f;text-decoration:none;font-weight:500;">Record-to-Report</a></li>
                  </ul>
                  <p style="margin:0 0 8px 0;">Talk soon,</p>
                  <p style="margin:0;font-weight:600;">The Procinix team</p>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 32px;background:#f7f9f9;border-top:1px solid #e5ebeb;color:#697575;font-size:12px;line-height:1.55;">
                  <div>This is an automated confirmation from <a href="https://www.procinix.ai" style="color:#0a8f8f;text-decoration:none;">www.procinix.ai</a>. Reply to this email to reach us — or write to <a href="mailto:info@procinix.ai" style="color:#0a8f8f;text-decoration:none;">info@procinix.ai</a>.</div>
                </td>
              </tr>
            </table>
            <div style="color:#94a3a3;font-size:11px;margin-top:16px;">
              Procinix · Automation &amp; Beyond · www.procinix.ai
            </div>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function autoResponseText({
  firstName,
  isDemo,
}: {
  firstName: string;
  isDemo: boolean;
}) {
  const opener = isDemo
    ? "Thanks for requesting a demo of Procinix. We'll reach out within 1 business day to schedule a 30-minute walkthrough tailored to your operating model."
    : "Thanks for reaching out to Procinix. A member of our team will respond within 1 business day.";
  return [
    `Hi ${firstName},`,
    "",
    opener,
    "",
    "In the meantime, a few resources:",
    "• Platform overview — https://www.procinix.ai/platform",
    "• Value Assessment — https://www.procinix.ai/roi-calculator",
    "• Source-to-Pay — https://www.procinix.ai/source-to-pay",
    "• Order-to-Cash — https://www.procinix.ai/order-to-cash",
    "• Record-to-Report — https://www.procinix.ai/record-to-report",
    "",
    "Talk soon,",
    "The Procinix team",
    "",
    "—",
    "This is an automated confirmation from www.procinix.ai.",
    "Reply to this email or write to info@procinix.ai.",
  ].join("\n");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
