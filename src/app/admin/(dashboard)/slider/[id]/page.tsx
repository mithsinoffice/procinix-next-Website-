import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth/guard";
import { getCampaignById } from "@/lib/hero/data";
import { SlideForm } from "@/components/admin/SlideForm";

export default async function EditSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const campaign = await getCampaignById(id);
  if (!campaign) notFound();

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-[#0F1B1D]">Edit Slide</h1>
      <p className="text-[14px] text-slate-500 mt-1 mb-6">{campaign.internalName}</p>
      <SlideForm campaign={campaign} role={session!.role} />
    </div>
  );
}
