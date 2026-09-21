import { SignJWT, jwtVerify } from "jose";
import type { AdminRole } from "@/lib/hero/types";

export const SESSION_COOKIE_NAME = "procinix_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export type SessionPayload = {
  email: string;
  role: AdminRole;
};

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set (or is too short — use at least 32 random characters). " +
        "Generate one with `openssl rand -base64 32` and set it in the project's environment variables. " +
        "See docs/hero-slider.md.",
    );
  }
  return new TextEncoder().encode(secret);
}

/** Signs a session JWT. Role is embedded in the token itself so the
 *  edge-runtime middleware can enforce it without a database round trip. */
export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

/** Verifies a session JWT. Returns null (never throws) on any invalid,
 *  expired, or malformed token — callers treat null as "not logged in". */
export async function verifySessionToken(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.email !== "string" || typeof payload.role !== "string") return null;
    if (payload.role !== "ADMIN" && payload.role !== "CONTENT_EDITOR") return null;
    return { email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
