import Link from "next/link";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import {
  CORE_ROUTES,
  PILLAR_ROUTES,
  INDUSTRY_ROUTES,
  REGION_ROUTES,
  UTILITY_ROUTES,
  MODULES_BY_FAMILY,
} from "@/lib/routes";

const topModules = [
  ...MODULES_BY_FAMILY.s2p.slice(0, 4),
  ...MODULES_BY_FAMILY.o2c.slice(0, 3),
  ...MODULES_BY_FAMILY.r2r.slice(0, 3),
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[var(--bg-primary)] overflow-hidden">
      {/* subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[60%]"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent-teal), transparent)",
          opacity: 0.4,
        }}
      />

      <Container size="wide" className="pt-24 pb-10">
        {/* Brand / CTA strip */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20 pb-16 border-b border-white/[0.06]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)] animate-[pulse-soft_2.4s_ease-in-out_infinite]" />
              Automation & Beyond
            </span>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] text-white tracking-[-0.015em]">
              Don't change your business <br className="hidden sm:block" />
              to fit software.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={CORE_ROUTES.bookDemo.path}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent-amber)] px-6 py-3 text-[14px] font-medium text-[#1A1407] shadow-[0_10px_30px_-10px_rgba(240,166,58,0.55)] hover:bg-[#FFB84D] transition-all"
            >
              Book a Demo
            </Link>
            <Link
              href={CORE_ROUTES.roi.path}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-[14px] text-white hover:border-[var(--accent-teal)]/70 hover:bg-white/[0.04] transition-all"
            >
              Value Assessment
            </Link>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-white mb-5"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-teal)] to-[var(--accent-teal-bright)]">
                <span className="absolute inset-0.5 rounded-md bg-[var(--bg-primary)]" />
                <span className="relative font-display text-[14px] font-bold text-[var(--accent-teal-bright)]">
                  P
                </span>
              </span>
              <span className="font-display text-[19px] font-semibold tracking-[-0.01em]">
                procinix
                <span className="text-[var(--accent-teal)]">.</span>
                <span className="text-white/70 text-[15px]">ai</span>
              </span>
            </Link>
            <p className="text-[14px] text-white/55 leading-relaxed mb-6 max-w-sm">
              A unified finance operations platform — agentic AI, intelligent workflows, and real-time analytics across Source-to-Pay, Order-to-Cash, and Record-to-Report.
            </p>
            <ul className="space-y-3 text-[13.5px] text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-[var(--accent-teal)] shrink-0" />
                <span>Built for multi-entity, multi-country operations</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-[var(--accent-teal)] shrink-0" />
                <a
                  href="mailto:hello@procinix.ai"
                  className="hover:text-white transition-colors"
                >
                  hello@procinix.ai
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-[var(--accent-teal)] shrink-0" />
                <a
                  href="tel:+918591399753"
                  className="hover:text-white transition-colors"
                >
                  +91 85913 99753
                </a>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/procinix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:border-[var(--accent-teal)]/60 hover:text-[var(--accent-teal-bright)] transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn
            title="Platform"
            links={[
              { label: CORE_ROUTES.platform.label, href: CORE_ROUTES.platform.path },
              { label: PILLAR_ROUTES.sourceToPay.label, href: PILLAR_ROUTES.sourceToPay.path },
              { label: PILLAR_ROUTES.orderToCash.label, href: PILLAR_ROUTES.orderToCash.path },
              { label: PILLAR_ROUTES.recordToReport.label, href: PILLAR_ROUTES.recordToReport.path },
              { label: CORE_ROUTES.roi.label, href: CORE_ROUTES.roi.path },
            ]}
          />
          <FooterColumn
            title="Modules"
            links={topModules.map((m) => ({ label: m.label, href: m.path }))}
          />
          <FooterColumn
            title="Industries"
            links={Object.values(INDUSTRY_ROUTES).map((i) => ({
              label: i.label,
              href: i.path,
            }))}
          />
          <FooterColumn
            title="Global"
            links={Object.values(REGION_ROUTES).map((r) => ({
              label: r.label,
              href: r.path,
            }))}
          />
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/45">
          <p>© {new Date().getFullYear()} Procinix. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {Object.values(UTILITY_ROUTES).map((u) => (
              <Link
                key={u.path}
                href={u.path}
                className="hover:text-white/80 transition-colors"
              >
                {u.label}
              </Link>
            ))}
            <Link
              href={CORE_ROUTES.contact.path}
              className="hover:text-white/80 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="col-span-1 md:col-span-2">
      <h4 className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-5">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[13.5px] text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
