import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/guard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  // Belt-and-suspenders: middleware already redirects unauthenticated
  // requests before this layout renders, but this keeps the layout correct
  // if it's ever reached another way (e.g. a future server-side test).
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#F5F7F7] text-[#0F1B1D] flex">
      <AdminSidebar role={session.role} email={session.email} />
      <div className="flex-1 min-w-0">
        <main className="p-6 lg:p-10 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
