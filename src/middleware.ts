import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

/**
 * Edge-runtime gate for every /admin page and /api/admin/* route (except
 * the login endpoint and the login page itself, which must be reachable
 * while logged out).
 *
 * This only checks that the session cookie is present and carries a valid
 * signature/expiry/role claim — it deliberately does not hit the database,
 * so it stays fast on the edge. Every mutating server action still
 * re-checks the session itself (src/lib/auth/guard.ts's requireRole) as a
 * second, defense-in-depth layer that isn't just "trust the middleware".
 */

const PUBLIC_ADMIN_PATHS = ["/admin/login"];
const PUBLIC_API_PATHS = ["/api/admin/login"];

function getSecretKey(): Uint8Array | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  const key = getSecretKey();
  if (!key) return false;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload.role === "ADMIN" || payload.role === "CONTENT_EDITOR";
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p)) {
      return NextResponse.next();
    }
    const authenticated = await hasValidSession(request);
    if (!authenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    if (PUBLIC_API_PATHS.some((p) => pathname === p)) {
      return NextResponse.next();
    }
    const authenticated = await hasValidSession(request);
    if (!authenticated) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
