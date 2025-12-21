// components/PaddleCheckoutButton.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";
import { PADDLE_PRICE_IDS } from "../lib/paddlePrices";

declare global {
  interface Window {
    Paddle?: any;
  }
}

type Props = {
  plan: "pro_monthly" | "lifetime";
  className?: string;
  children: React.ReactNode;
};

function loadPaddleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (window.Paddle) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-paddle="v2"]'
    );

    if (existing) {
      // If script exists but Paddle isn't ready yet, wait for load
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Paddle script failed"))
      );
      return;
    }

    const s = document.createElement("script");
    s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    s.async = true;
    s.setAttribute("data-paddle", "v2");
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Paddle script failed"));
    document.head.appendChild(s);
  });
}

function normalizeEnv(env: string) {
  const v = (env || "").toLowerCase().trim();
  if (v === "sandbox") return "sandbox";
  if (v === "production") return "production";
  // common mistakes
  if (v === "prod") return "production";
  if (v === "live") return "production";
  if (v === "test") return "sandbox";
  return "production";
}

export default function PaddleCheckoutButton({ plan, className, children }: Props) {
  const { user, loading } = useAuth();
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "";
  const environment = normalizeEnv(process.env.NEXT_PUBLIC_PADDLE_ENV || "production");

  const priceId = useMemo(() => PADDLE_PRICE_IDS[plan], [plan]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setInitError(null);

        // Helpful debug (remove later if you want)
        console.log("[Paddle] init start", {
          plan,
          hasToken: !!token,
          environment,
          priceId,
        });

        if (!token) {
          setInitError("Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN");
          return;
        }

        if (!priceId) {
          setInitError(
            plan === "pro_monthly"
              ? "Missing NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTHLY"
              : "Missing NEXT_PUBLIC_PADDLE_PRICE_LIFETIME"
          );
          return;
        }

        await loadPaddleScript();

        if (!window.Paddle?.Initialize) {
          setInitError("Paddle.Initialize not found (script failed or blocked)");
          return;
        }

        window.Paddle.Initialize({
          token,
          environment,
        });

        if (!cancelled) {
          setReady(true);
          console.log("[Paddle] ready ✅", { plan, environment, priceId });
        }
      } catch (e: any) {
        if (!cancelled) {
          setReady(false);
          setInitError(e?.message || "Paddle init failed");
          console.error("[Paddle] init error:", e);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, environment, priceId, plan]);

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Require user logged in (important for webhook mapping)
    if (loading) return;

    if (!user?.id) {
      alert("Please sign in first to upgrade. (So we can link payment to your account.)");
      return;
    }

    if (!ready || !priceId) {
      // Show a useful message instead of silent failure
      alert(
        initError ||
          "Payments are not configured yet. Check Paddle token/env/price IDs."
      );
      return;
    }

    setOpening(true);
    try {
      const email = user.email || undefined;
      const supabaseUserId = user.id;

      // Open Paddle Checkout Overlay
      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: email ? { email } : undefined,
        customData: { supabase_user_id: supabaseUserId, plan },
      });
    } catch (err) {
      console.error("[Paddle] Checkout.open failed:", err);
      alert("Checkout failed to open. Check console for details.");
    } finally {
      setOpening(false);
    }
  };

  const disabled = opening; // only disable while opening (so button still clicks & shows errors)

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
