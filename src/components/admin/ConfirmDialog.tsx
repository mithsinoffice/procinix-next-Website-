"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  destructive = false,
  onConfirm,
}: {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  destructive?: boolean;
  onConfirm: () => void | Promise<void>;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-[100]" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
          <AlertDialog.Title className="text-[16px] font-semibold text-[#0F1B1D]">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-[14px] text-slate-600 leading-relaxed">
            {description}
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button type="button" className="px-4 py-2 rounded-lg text-[14px] text-slate-600 hover:bg-slate-100">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                type="button"
                onClick={onConfirm}
                className={
                  destructive
                    ? "px-4 py-2 rounded-lg text-[14px] font-medium bg-red-600 text-white hover:bg-red-700"
                    : "px-4 py-2 rounded-lg text-[14px] font-medium bg-[#0a8f8f] text-white hover:bg-[#097a7a]"
                }
              >
                {confirmLabel}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
