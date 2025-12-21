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

    const s = document.createElement("script");
    s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Paddle script failed"));
    document.head.appendChild(s);
  });
}

export default function PaddleCheckoutButton({ plan, className, children }: Props) {
  const { user, loading } = useAuth();
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "";
  const priceId = useMemo(() => PADDLE_PRICE_IDS[plan], [plan]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);

        console.log("[Paddle] init", {
          plan,
          hasToken: !!token,
          priceId,
        });

        if (!token) {
          setError("Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN");
          return;
        }

        if (!priceId) {
          setError(
            plan === "pro_monthly"
              ? "Missing NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTHLY"
              : "Missing NEXT_PUBLIC_PADDLE_PRICE_LIFETIME"
          );
          return;
        }

        await loadPaddleScript();

        if (!window.Paddle?.Initialize) {
          setError("Paddle.Initialize not available");
          return;
        }

        // ✅ CORRECT for Paddle Billing v2
        window.Paddle.Initialize({
          token,
        });

        if (!cancelled) {
          setReady(true);
          console.log("[Paddle] ready ✅", { plan, priceId });
        }
      } catch (e: any) {
        console.error("[Paddle] init error", e);
        if (!cancelled) setError(e?.message || "Paddle init failed");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, priceId, plan]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    if (!user?.id) {
      alert("Please sign in first to upgrade.");
      return;
    }

    if (!ready || !priceId) {
      alert(error || "Payments not ready yet.");
      return;
    }

    setOpening(true);

    try {
      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: user.email ? { email: user.email } : undefined,
        customData: {
          supabase_user_id: user.id,
          plan,
        },
      });
    } catch (err) {
      console.error("[Paddle] Checkout error", err);
      alert("Checkout failed to open.");
    } finally {
      setOpening(false);
    }
  };

  return (
    <button type="button" onClick={onClick} disabled={opening} className={className}>
      {children}
    </button>
  );
}
