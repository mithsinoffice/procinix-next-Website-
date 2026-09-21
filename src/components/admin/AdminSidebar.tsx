"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, GalleryHorizontal, History, LogOut } from "lucide-react";
import clsx from "clsx";
import type { AdminRole } from "@/lib/hero/types";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/slider", label: "Homepage Slider", icon: GalleryHorizontal, exact: false },
  { href: "/admin/audit", label: "Audit Log", icon: History, exact: false },
];

export function AdminSidebar({ role, email }: { role: AdminRole; email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-[#041F22] text-white flex flex-col min-h-screen">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="font-display text-lg tracking-tight">PROCINIX</div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-white/45 mt-0.5">Admin</div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-white/35">Website Content</div>
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14px] transition-colors",
                active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <div className="px-2 mb-3">
          <div className="text-[13px] text-white/85 truncate">{email}</div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-white/40 mt-0.5">{role}</div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-white/70 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
        >
          <LogOut className="h-3.5 w-3.5" />
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
