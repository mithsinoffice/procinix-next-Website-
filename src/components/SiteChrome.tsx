"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

/**
 * The public marketing site gets the global Navigation + Footer; the
 * /admin operational area renders its own sidebar shell instead (see
 * src/app/admin/(dashboard)/layout.tsx) and deliberately skips both, since
 * it isn't part of the public site experience.
 *
 * A client-side pathname check here (rather than splitting the app into
 * multiple root layouts / route groups) keeps every existing public route
 * exactly where it is — no path changes, no risk to existing SEO routes.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
