import { getSession } from "@/lib/auth/guard";
import { SlideForm } from "@/components/admin/SlideForm";

export default async function NewSlidePage() {
  const session = await getSession();
  return (
    <div>
      <h1 className="text-[24px] font-semibold text-[#0F1B1D]">Add New Slide</h1>
      <p className="text-[14px] text-slate-500 mt-1 mb-6">Create a new homepage campaign slide.</p>
      <SlideForm role={session!.role} />
    </div>
  );
}
