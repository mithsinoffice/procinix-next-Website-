"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowUp, ArrowDown, Pencil, Copy, Eye, EyeOff, Archive, Loader2 } from "lucide-react";
import { StatusChip } from "./StatusChip";
import { ConfirmDialog } from "./ConfirmDialog";
import type { HeroCampaign, AdminRole } from "@/lib/hero/types";
import {
  publishCampaignAction,
  unpublishCampaignAction,
  archiveCampaignAction,
  duplicateCampaignAction,
  reorderCampaignsAction,
} from "@/app/admin/(dashboard)/slider/actions";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export function SliderTable({ campaigns, role }: { campaigns: HeroCampaign[]; role: AdminRole }) {
  const [order, setOrder] = useState(campaigns);
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canAdmin = role === "ADMIN";

  function move(index: number, direction: -1 | 1) {
    const next = [...order];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    startTransition(async () => {
      const result = await reorderCampaignsAction(next.map((c) => c.id));
      if (!result.ok) setError(result.error);
    });
  }

  async function runAction(id: string, action: (id: string) => Promise<{ ok: boolean; error?: string }>) {
    setBusyId(id);
    setError(null);
    const result = await action(id);
    if (!result.ok) setError(result.error ?? "Action failed.");
    setBusyId(null);
  }

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      )}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-[12px] uppercase tracking-[0.06em] text-slate-500">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Preview</th>
              <th className="px-4 py-3 font-medium">Campaign</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Schedule</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {order.map((c, i) => (
              <tr key={c.id} className="text-[13.5px] text-[#0F1B1D]">
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      disabled={i === 0 || pending || !canAdmin}
                      onClick={() => move(i, -1)}
                      className="text-slate-400 hover:text-slate-700 disabled:opacity-20"
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={i === order.length - 1 || pending || !canAdmin}
                      onClick={() => move(i, 1)}
                      className="text-slate-400 hover:text-slate-700 disabled:opacity-20"
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-10 w-16 rounded-md bg-slate-100 overflow-hidden flex items-center justify-center">
                    {c.desktopMediaUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.desktopMediaUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-[9px] text-slate-400 uppercase">Placeholder</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{c.internalName}</div>
                  <div className="text-[12px] text-slate-400">/{c.slug}</div>
                </td>
                <td className="px-4 py-3 capitalize text-slate-600">{c.mediaType}</td>
                <td className="px-4 py-3">
                  <StatusChip status={c.status} />
                </td>
                <td className="px-4 py-3 text-slate-500 text-[12.5px]">
                  {c.startAt || c.endAt ? (
                    <>
                      {formatDate(c.startAt)} → {formatDate(c.endAt)}
                    </>
                  ) : (
                    "Always"
                  )}
                </td>
                <td className="px-4 py-3 text-slate-500 text-[12.5px]">{formatDate(c.updatedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/slider/${c.id}`}
                      className="p-1.5 rounded-md text-slate-500 hover:text-[#0a8f8f] hover:bg-slate-100"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => runAction(c.id, duplicateCampaignAction)}
                      disabled={busyId === c.id}
                      className="p-1.5 rounded-md text-slate-500 hover:text-[#0a8f8f] hover:bg-slate-100"
                      aria-label="Duplicate"
                    >
                      {busyId === c.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Copy className="h-4 w-4" />}
                    </button>
                    {canAdmin && c.status !== "published" && c.status !== "archived" && (
                      <button
                        type="button"
                        onClick={() => runAction(c.id, publishCampaignAction)}
                        disabled={busyId === c.id}
                        className="p-1.5 rounded-md text-slate-500 hover:text-emerald-600 hover:bg-slate-100"
                        aria-label="Publish"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    {canAdmin && c.status === "published" && (
                      <button
                        type="button"
                        onClick={() => runAction(c.id, unpublishCampaignAction)}
                        disabled={busyId === c.id}
                        className="p-1.5 rounded-md text-slate-500 hover:text-orange-600 hover:bg-slate-100"
                        aria-label="Unpublish"
                      >
                        <EyeOff className="h-4 w-4" />
                      </button>
                    )}
                    {canAdmin && c.status !== "archived" && !c.isEvergreenFallback && (
                      <ConfirmDialog
                        trigger={
                          <button
                            type="button"
                            className="p-1.5 rounded-md text-slate-500 hover:text-red-600 hover:bg-slate-100"
                            aria-label="Archive"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                        }
                        title="Archive this campaign?"
                        description={`"${c.internalName}" will be removed from the live homepage and moved to Archived. This can be reviewed later in the campaign list.`}
                        confirmLabel="Archive"
                        destructive
                        onConfirm={() => runAction(c.id, archiveCampaignAction)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
