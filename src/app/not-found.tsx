import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[calc(100vh-72px)] items-center overflow-hidden pt-[72px]">
      <AuroraBackground intensity="soft" />
      <Container size="narrow" className="relative z-10 py-24 text-center">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)]" />
          Error 404
        </span>
        <h1 className="font-display text-6xl lg:text-7xl text-white tracking-[-0.02em] mb-5">
          Off the map.
        </h1>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          The page you were looking for doesn't exist — or hasn't been published
          yet. Head back to the platform overview.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-amber)] px-6 py-3 text-[14px] font-medium text-[#1A1407] shadow-[0_10px_30px_-10px_rgba(240,166,58,0.55)] hover:bg-[#FFB84D] transition-all"
        >
          Back to home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Container>
    </div>
  );
}
