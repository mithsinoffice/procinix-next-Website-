import Link from "next/link";
import { Plus, AlertTriangle } from "lucide-react";
import { getSession } from "@/lib/auth/guard";
import { isDatabaseConfigured } from "@/lib/db/client";
import { listAllCampaigns } from "@/lib/hero/data";
import { SliderTable } from "@/components/admin/SliderTable";

export default async function SliderListPage() {
  const session = await getSession();
  const dbReady = isDatabaseConfigured();
  const campaigns = dbReady ? await listAllCampaigns().catch(() => []) : [];

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-semibold text-[#0F1B1D]">Homepage Slider</h1>
          <p className="text-[14px] text-slate-500 mt-1 max-w-xl">
            Manage the full-page slider on your website. Add, edit, reorder and schedule campaigns.
          </p>
        </div>
        <Link
          href="/admin/slider/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0a8f8f] text-white text-[14px] font-medium px-4 py-2.5 hover:bg-[#097a7a] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Slide
        </Link>
      </div>

      {!dbReady ? (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[13.5px] text-amber-800 leading-relaxed">
            No database is connected yet. Provision one and run the migration script before campaigns can be
            managed here — see docs/hero-slider.md.
          </div>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-[14px] text-slate-500">No campaigns yet.</p>
          <Link href="/admin/slider/new" className="mt-3 inline-block text-[14px] text-[#0a8f8f] font-medium">
            Add your first slide →
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <SliderTable campaigns={campaigns} role={session!.role} />
        </div>
      )}
    </div>
  );
}
