import { listAuditLog } from "@/lib/audit";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default async function AuditLogPage() {
  const entries = await listAuditLog();

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-[#0F1B1D]">Audit Log</h1>
      <p className="text-[14px] text-slate-500 mt-1 mb-6">
        Read-only record of who published, edited, reordered, or archived homepage campaigns.
      </p>

      {entries.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-[14px] text-slate-500">
          No activity recorded yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[12px] uppercase tracking-[0.06em] text-slate-500">
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Actor</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Campaign</th>
                <th className="px-4 py-3 font-medium">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13.5px] text-[#0F1B1D]">
              {entries.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3 text-slate-500 text-[12.5px] whitespace-nowrap">{formatDate(e.createdAt)}</td>
                  <td className="px-4 py-3">{e.actorEmail}</td>
                  <td className="px-4 py-3 capitalize">{e.action}</td>
                  <td className="px-4 py-3 text-slate-500">{e.campaignSlug ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{e.changeSummary ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
