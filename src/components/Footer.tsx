import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import {
  CORE_ROUTES,
  PILLAR_ROUTES,
  GUIDE_ROUTES,
  GLOSSARY_ROUTES,
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

// The nav's hover flyout isn't in the initial server-rendered HTML, and the
// columns above only surface a handful of modules each — so any module not
// listed there had no always-rendered, crawlable link anywhere on the site
// besides the sitemap. This closes that gap without changing the footer's
// visual layout above.
const topModulePaths = new Set(topModules.map((m) => m.path));
const remainingModules = [
  ...MODULES_BY_FAMILY.s2p,
  ...MODULES_BY_FAMILY.o2c,
  ...MODULES_BY_FAMILY.r2r,
].filter((m) => !topModulePaths.has(m.path));

// Guides & glossary — same crawlability gap as modules: nothing in the main
// nav points at these, so they need an always-rendered footer link too.
const guidesAndGlossary = [
  GUIDE_ROUTES.r2rProcessAutomation,
  GUIDE_ROUTES.bankReconciliationAutomation,
  GLOSSARY_ROUTES.whatIsR2R,
  GLOSSARY_ROUTES.whatIsO2C,
  GLOSSARY_ROUTES.whatIsS2P,
  GLOSSARY_ROUTES.whatIsDSO,
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
              Don&apos;t change your business <br className="hidden sm:block" />
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
              className="inline-flex items-center mb-5 hover:opacity-90 transition-opacity"
              aria-label="Procinix home"
            >
              <Image
                src="/logo-procinix.png"
                alt="Procinix — Automation & Beyond"
                width={2847}
                height={714}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-[14px] text-white/55 leading-relaxed mb-6 max-w-sm">
              A unified finance operations platform — agentic AI, intelligent workflows, and real-time analytics across Source-to-Pay, Order-to-Cash, and Record-to-Report.
            </p>
            <ul className="space-y-3 text-[13.5px] text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-[var(--accent-teal)] shrink-0" />
                <span>
                  Procinix Technologies Private Limited
                  <br />
                  608, 6th Floor, Crescent Business Square, Opp. Gundecha
                  Onclave, Khariani Road, Sakinaka, Andheri (E), Mumbai,
                  Maharashtra - 400072, India
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-[var(--accent-teal)] shrink-0" />
                <a
                  href="mailto:info@procinix.ai"
                  className="hover:text-white transition-colors"
                >
                  info@procinix.ai
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
                href="https://www.linkedin.com/company/procinix-technologies-private-limited"
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
              { label: GUIDE_ROUTES.recordToReportBuyersGuide.label, href: GUIDE_ROUTES.recordToReportBuyersGuide.path },
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

        {/* More modules — every module page gets at least one always-rendered,
            crawlable link, even the ones not promoted into the columns above. */}
        {remainingModules.length > 0 && (
          <div className="mt-10 pt-8 border-t border-white/[0.06]">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-4">
              More modules
            </h4>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {remainingModules.map((m) => (
                <Link
                  key={m.path}
                  href={m.path}
                  className="text-[12.5px] text-white/45 hover:text-white/80 transition-colors"
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Guides & glossary — same reasoning as "More modules" above. */}
        <div className="mt-6 pt-6 border-t border-white/[0.06]">
          <h4 className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-4">
            Guides & glossary
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {guidesAndGlossary.map((g) => (
              <Link
                key={g.path}
                href={g.path}
                className="text-[12.5px] text-white/45 hover:text-white/80 transition-colors"
              >
                {g.label}
              </Link>
            ))}
          </div>
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
