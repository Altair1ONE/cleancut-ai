import { Suspense } from "react";
import type { Metadata } from "next";
import CheckEmailClient from "../../components/CheckEmailClient";

export const metadata: Metadata = {
  title: "Check your email",
  description:
    "Check your inbox for the confirmation link to activate your CleanCut AI account.",
};

function LoadingCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <div className="h-6 w-48 animate-pulse rounded bg-slate-800" />
      <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-800" />
      <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-800" />
      <div className="mt-6 h-10 w-40 animate-pulse rounded-full bg-slate-800" />
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <Suspense fallback={<LoadingCard />}>
        <CheckEmailClient />
      </Suspense>
    </main>
  );
}
