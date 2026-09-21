import Link from "next/link";
import { GalleryHorizontal, History, AlertTriangle } from "lucide-react";
import { isDatabaseConfigured } from "@/lib/db/client";
import { listAllCampaigns } from "@/lib/hero/data";

export default async function AdminDashboardPage() {
  const dbReady = isDatabaseConfigured();
  const campaigns = dbReady ? await listAllCampaigns().catch(() => []) : [];
  const live = campaigns.filter((c) => c.status === "published").length;
  const draft = campaigns.filter((c) => c.status === "draft").length;

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-[#0F1B1D]">Dashboard</h1>
      <p className="text-[14px] text-slate-500 mt-1">Manage the Procinix website&apos;s homepage campaign slider.</p>

      {!dbReady && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[13.5px] text-amber-800 leading-relaxed">
            No database is connected yet (DATABASE_URL is unset), so the homepage is showing the evergreen
            fallback hero and this dashboard has nothing to manage. See docs/hero-slider.md for the one-time
            setup steps.
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-[28px] font-semibold text-[#0F1B1D]">{campaigns.length}</div>
          <div className="text-[13px] text-slate-500 mt-1">Total campaigns</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-[28px] font-semibold text-emerald-600">{live}</div>
          <div className="text-[13px] text-slate-500 mt-1">Live now</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-[28px] font-semibold text-slate-500">{draft}</div>
          <div className="text-[13px] text-slate-500 mt-1">Drafts</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/slider"
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 hover:border-[#0a8f8f]/40 hover:shadow-sm transition-all"
        >
          <GalleryHorizontal className="h-5 w-5 text-[#0a8f8f]" />
          <div>
            <div className="text-[14px] font-medium text-[#0F1B1D]">Homepage Slider</div>
            <div className="text-[12.5px] text-slate-500">Add, edit, reorder and schedule campaigns</div>
          </div>
        </Link>
        <Link
          href="/admin/audit"
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 hover:border-[#0a8f8f]/40 hover:shadow-sm transition-all"
        >
          <History className="h-5 w-5 text-[#0a8f8f]" />
          <div>
            <div className="text-[14px] font-medium text-[#0F1B1D]">Audit Log</div>
            <div className="text-[12.5px] text-slate-500">Who changed what, and when</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
