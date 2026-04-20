"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { ButtonLink } from "@/components/primitives/Button";
import {
  CORE_ROUTES,
  PILLAR_ROUTES,
  MODULES_BY_FAMILY,
  INDUSTRY_ROUTES,
  REGION_ROUTES,
} from "@/lib/routes";

type NavItem = {
  label: string;
  href?: string;
  flyout?: "platform" | "industries" | "global";
};

const NAV: NavItem[] = [
  { label: "Platform", flyout: "platform" },
  { label: "Industries", flyout: "industries" },
  { label: "Global", flyout: "global" },
  { label: "ROI / Value", href: CORE_ROUTES.roi.path },
  { label: "Resources", href: CORE_ROUTES.resources.path },
];

function isActive(pathname: string, href?: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [flyout, setFlyout] = useState<NavItem["flyout"] | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setFlyout(null);
    setMobileOpen(null);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(4, 31, 34, 0.72)" : "rgba(4, 31, 34, 0)",
          borderColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={clsx(
          "fixed top-0 inset-x-0 z-50 border-b",
          scrolled && "backdrop-blur-xl",
        )}
        onMouseLeave={() => setFlyout(null)}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
            aria-label="Procinix — Automation & Beyond"
          >
            <Image
              src="/logo-procinix.png"
              alt="Procinix — Automation & Beyond"
              width={2847}
              height={714}
              priority
              className="h-10 sm:h-11 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              if (item.flyout) {
                const isOpen = flyout === item.flyout;
                return (
                  <button
                    key={item.label}
                    onMouseEnter={() => setFlyout(item.flyout!)}
                    onFocus={() => setFlyout(item.flyout!)}
                    onClick={() =>
                      setFlyout((f) => (f === item.flyout ? null : item.flyout!))
                    }
                    className={clsx(
                      "group relative flex items-center gap-1 rounded-full px-4 py-2 text-[13.5px] transition-colors",
                      isOpen || active
                        ? "text-white"
                        : "text-white/75 hover:text-white",
                    )}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={clsx(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  onMouseEnter={() => setFlyout(null)}
                  className={clsx(
                    "relative rounded-full px-4 py-2 text-[13.5px] transition-colors",
                    active ? "text-white" : "text-white/75 hover:text-white",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10 -z-10"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href={CORE_ROUTES.bookDemo.path}
              variant="primary"
              size="md"
              iconAfter
              className="hidden sm:inline-flex"
            >
              Book Demo
            </ButtonLink>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop flyouts */}
        <AnimatePresence>
          {flyout && (
            <motion.div
              key={flyout}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="hidden lg:block absolute inset-x-0 top-full"
              onMouseEnter={() => setFlyout(flyout)}
            >
              <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
                <div
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-secondary)]/95 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
                  style={{
                    backgroundImage:
                      "radial-gradient(60% 60% at 50% 0%, rgba(17,197,198,0.08), transparent 70%)",
                  }}
                >
                  {flyout === "platform" && <PlatformFlyout />}
                  {flyout === "industries" && <IndustriesFlyout />}
                  {flyout === "global" && <GlobalFlyout />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-xl pt-[72px]"
          >
            <div className="h-full overflow-y-auto px-6 py-10">
              <MobileDrawer
                openSection={mobileOpen}
                onToggle={(key) =>
                  setMobileOpen((c) => (c === key ? null : key))
                }
                onNavigate={() => setOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ========== Desktop flyout panels ========== */

function PlatformFlyout() {
  return (
    <div className="grid grid-cols-12 gap-0">
      <div className="col-span-3 border-r border-white/[0.06] bg-white/[0.02] p-8">
        <p className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-3">
          The Platform
        </p>
        <h3 className="font-display text-2xl text-white leading-tight mb-3">
          One platform. Three finance cycles.
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          Unified S2P, O2C, and R2R — agentic AI, intelligent workflows, and real-time insights across every entity.
        </p>
        <Link
          href={CORE_ROUTES.platform.path}
          className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent-teal-bright)] hover:text-white transition-colors"
        >
          Explore the platform
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="col-span-9 grid grid-cols-3 divide-x divide-white/[0.06]">
        <FlyoutColumn
          pillar={PILLAR_ROUTES.sourceToPay}
          modules={MODULES_BY_FAMILY.s2p.slice(0, 6)}
        />
        <FlyoutColumn
          pillar={PILLAR_ROUTES.orderToCash}
          modules={MODULES_BY_FAMILY.o2c}
        />
        <FlyoutColumn
          pillar={PILLAR_ROUTES.recordToReport}
          modules={MODULES_BY_FAMILY.r2r.slice(0, 6)}
        />
      </div>
    </div>
  );
}

function FlyoutColumn({
  pillar,
  modules,
}: {
  pillar: { path: string; label: string };
  modules: { path: string; label: string }[];
}) {
  return (
    <div className="p-8">
      <Link
        href={pillar.path}
        className="group/col inline-flex items-center gap-1.5 mb-5"
      >
        <span className="font-display text-[15px] font-semibold text-white">
          {pillar.label}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-white/40 group-hover/col:text-[var(--accent-teal-bright)] group-hover/col:-translate-y-0.5 group-hover/col:translate-x-0.5 transition-all" />
      </Link>
      <ul className="space-y-2">
        {modules.map((m) => (
          <li key={m.path}>
            <Link
              href={m.path}
              className="block rounded-md px-2.5 py-1.5 text-[13px] text-white/65 hover:bg-white/[0.04] hover:text-white transition-all"
            >
              {m.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndustriesFlyout() {
  const items = Object.values(INDUSTRY_ROUTES);
  return (
    <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
      <div className="p-8 bg-white/[0.02]">
        <p className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-3">
          Industries
        </p>
        <h3 className="font-display text-xl text-white leading-tight mb-3">
          Built for the complexity of your sector.
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          Configurable workflows adapted to the real operating models of retail, manufacturing, construction, D2C, and enterprise shared services.
        </p>
        <Link
          href={CORE_ROUTES.industries.path}
          className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent-teal-bright)] hover:text-white transition-colors"
        >
          All industries
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="p-8 grid grid-cols-1 gap-1">
        {items.map((i) => (
          <Link
            key={i.path}
            href={i.path}
            className="group/item flex items-start justify-between rounded-lg px-3 py-3 hover:bg-white/[0.04] transition-all"
          >
            <div>
              <div className="text-[14px] font-medium text-white">{i.label}</div>
              <div className="text-[12px] text-white/50 mt-0.5">
                {i.description}
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/30 group-hover/item:text-[var(--accent-teal-bright)] shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function GlobalFlyout() {
  const regions = Object.values(REGION_ROUTES);
  return (
    <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
      <div className="p-8 bg-white/[0.02]">
        <p className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-teal)] mb-3">
          Global Coverage
        </p>
        <h3 className="font-display text-xl text-white leading-tight mb-3">
          Multi-country, multi-currency, multi-entity — by design.
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          Purpose-built for finance teams operating across regions, with compliance flexibility where you need it.
        </p>
        <Link
          href={CORE_ROUTES.global.path}
          className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent-teal-bright)] hover:text-white transition-colors"
        >
          Global platform
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="p-8 grid grid-cols-2 gap-1">
        {regions.map((r) => (
          <Link
            key={r.path}
            href={r.path}
            className="group/item flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-white/[0.04] transition-all"
          >
            <span className="text-[13.5px] text-white/80">{r.label}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-white/30 group-hover/item:text-[var(--accent-teal-bright)]" />
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ========== Mobile drawer ========== */

function MobileDrawer({
  openSection,
  onToggle,
  onNavigate,
}: {
  openSection: string | null;
  onToggle: (key: string) => void;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <MobileAccordion
        title="Platform"
        isOpen={openSection === "platform"}
        onToggle={() => onToggle("platform")}
      >
        <MobileLink
          href={CORE_ROUTES.platform.path}
          onClick={onNavigate}
          strong
        >
          Platform overview
        </MobileLink>
        {Object.values(PILLAR_ROUTES).map((p) => (
          <MobileLink key={p.path} href={p.path} onClick={onNavigate}>
            {p.label}
          </MobileLink>
        ))}
      </MobileAccordion>

      <MobileAccordion
        title="Industries"
        isOpen={openSection === "industries"}
        onToggle={() => onToggle("industries")}
      >
        <MobileLink
          href={CORE_ROUTES.industries.path}
          onClick={onNavigate}
          strong
        >
          All industries
        </MobileLink>
        {Object.values(INDUSTRY_ROUTES).map((i) => (
          <MobileLink key={i.path} href={i.path} onClick={onNavigate}>
            {i.label}
          </MobileLink>
        ))}
      </MobileAccordion>

      <MobileAccordion
        title="Global"
        isOpen={openSection === "global"}
        onToggle={() => onToggle("global")}
      >
        <MobileLink href={CORE_ROUTES.global.path} onClick={onNavigate} strong>
          Global platform
        </MobileLink>
        {Object.values(REGION_ROUTES).map((r) => (
          <MobileLink key={r.path} href={r.path} onClick={onNavigate}>
            {r.label}
          </MobileLink>
        ))}
      </MobileAccordion>

      <MobileLink href={CORE_ROUTES.roi.path} onClick={onNavigate} strong>
        ROI / Value Assessment
      </MobileLink>
      <MobileLink href={CORE_ROUTES.resources.path} onClick={onNavigate} strong>
        Resources
      </MobileLink>

      <div className="mt-6 flex flex-col gap-3">
        <ButtonLink href={CORE_ROUTES.bookDemo.path} variant="primary" size="lg" iconAfter>
          Book a Demo
        </ButtonLink>
        <ButtonLink href={CORE_ROUTES.contact.path} variant="secondary" size="lg">
          Contact Sales
        </ButtonLink>
      </div>
    </div>
  );
}

function MobileAccordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-white"
      >
        <span className="font-display text-lg">{title}</span>
        <ChevronDown
          className={clsx(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-4 flex flex-col gap-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  strong,
  children,
}: {
  href: string;
  onClick: () => void;
  strong?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "block py-2 text-[15px] transition-colors",
        strong ? "text-white" : "text-white/65 hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}
