"use client";

import { useEffect } from "react";

export function Toast({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-white shadow-xl">
      {message}
    </div>
  );
}
