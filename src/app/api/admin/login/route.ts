import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { sql, isDatabaseConfigured } from "@/lib/db/client";
import { verifyPassword } from "@/lib/auth/passwords";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/lib/auth/session";
import { checkRateLimit, sweepRateLimitBuckets } from "@/lib/auth/rateLimit";

export const runtime = "nodejs";

const LoginSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(200),
});

const LOGIN_RATE_LIMIT = { max: 5, windowMs: 15 * 60 * 1000 };

export async function POST(request: Request) {
  sweepRateLimitBuckets();

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

  const { allowed, retryAfterMs } = checkRateLimit(`login:${ip}`, LOGIN_RATE_LIMIT);
  if (!allowed) {
    console.warn(`Admin login rate-limited for ip=${ip}`);
    return NextResponse.json(
      { error: "Too many attempts. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } },
    );
  }

  if (!isDatabaseConfigured() || !sql) {
    console.error("Admin login attempted before DATABASE_URL was configured.");
    return NextResponse.json({ error: "Admin sign-in is not configured yet." }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = LoginSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  }
  const { email, password } = parsed.data;

  const rows = await sql`
    SELECT email, password_hash, role, disabled_at FROM admin_users WHERE email = ${email} LIMIT 1
  `;

  // Constant-shape response whether the email exists or not — never reveal
  // which part of the credential pair was wrong.
  const genericError = () =>
    NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

  if (rows.length === 0) {
    console.warn(`Admin login failed (unknown email) ip=${ip}`);
    return genericError();
  }

  const user = rows[0];
  if (user.disabled_at) {
    console.warn(`Admin login failed (disabled account) email=${email} ip=${ip}`);
    return genericError();
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    console.warn(`Admin login failed (bad password) email=${email} ip=${ip}`);
    return genericError();
  }

  const token = await createSessionToken({ email: user.email, role: user.role });
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);

  console.log(`Admin login succeeded email=${email} role=${user.role} ip=${ip}`);
  return NextResponse.json({ ok: true, role: user.role });
}
