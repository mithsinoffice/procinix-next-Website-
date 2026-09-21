import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = { robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#F5F7F7] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="font-display text-2xl tracking-tight text-[#0F1B1D]">PROCINIX</div>
          <div className="text-[12px] uppercase tracking-[0.18em] text-slate-500 mt-1">Admin sign-in</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
