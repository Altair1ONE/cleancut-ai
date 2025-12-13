"use client";

import { useEffect, useState } from "react";

type FeedbackType = "bug" | "suggestion" | "other";

export function FeedbackModal({
  open,
  onClose,
  page,
}: {
  open: boolean;
  onClose: () => void;
  page: string;
}) {
  const [type, setType] = useState<FeedbackType>("suggestion");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setType("suggestion");
      setMessage("");
      setEmail("");
      setStatus("idle");
      setErrorMsg(null);
    }
  }, [open]);

  if (!open) return null;

  async function submit() {
    setErrorMsg(null);

    if (message.trim().length < 5) {
      setStatus("error");
      setErrorMsg("Please write a short message (at least 5 characters).");
      return;
    }

    const url = process.env.NEXT_PUBLIC_FEEDBACK_URL;
    if (!url) {
      setStatus("error");
      setErrorMsg("NEXT_PUBLIC_FEEDBACK_URL is not set in .env.local.");
      return;
    }

    setStatus("sending");

    try {
      const metaObj = {
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        time: new Date().toISOString(),
      };

      // ✅ Most reliable method for Google Apps Script from browser:
      // send URL-encoded form body (no CORS headache)
      const body = new URLSearchParams({
        page,
        type,
        message,
        email,
        meta: JSON.stringify(metaObj),
      });

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      // If fetch didn't throw, treat as success
      setStatus("sent");
    } catch (e: any) {
      console.error(e);
      setStatus("error");
      setErrorMsg("Could not send feedback. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Feedback / Suggestions
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              We’re new — your feedback helps us improve quickly.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 hover:border-slate-500"
          >
            Close
          </button>
        </div>

        {status === "sent" ? (
          <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            ✅ Thank you! Your feedback was sent successfully.
          </div>
        ) : (
          <>
            <div className="mt-5 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-200">
                  Type
                </label>
                <div className="mt-2 flex gap-2">
                  {(["suggestion", "bug", "other"] as FeedbackType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`rounded-full px-3 py-1 text-xs ${
                        type === t
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-800 text-slate-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-200">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you’d like improved, or report a bug…"
                  className="mt-2 h-28 w-full rounded-2xl border border-slate-800 bg-slate-900/40 p-3 text-sm text-slate-100 outline-none focus:border-slate-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-200">
                  Email (optional)
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="If you want us to reply"
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900/40 p-3 text-sm text-slate-100 outline-none focus:border-slate-600"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400">{errorMsg}</p>
              )}

              <button
                onClick={submit}
                disabled={status === "sending"}
                className="w-full rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                {status === "sending" ? "Sending..." : "Send feedback"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
