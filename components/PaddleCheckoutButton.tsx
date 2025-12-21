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

    const existing = document.querySelector<HTMLScriptElement>('script[data-paddle="v2"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Paddle script failed")));
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

export default function PaddleCheckoutButton({ plan, className, children }: Props) {
  const { user } = useAuth();
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);

  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "";
  const environment = process.env.NEXT_PUBLIC_PADDLE_ENV || "production"; // "sandbox" or "production"

  const priceId = useMemo(() => PADDLE_PRICE_IDS[plan], [plan]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!token) return; // not configured yet
        await loadPaddleScript();

        if (!window.Paddle?.Initialize) return;

        // Initialize once
        window.Paddle.Initialize({
          token,
          environment,
        });

        if (!cancelled) setReady(true);
      } catch {
        if (!cancelled) setReady(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, environment]);

  const onClick = async () => {
    if (!ready || !priceId) return;

    setOpening(true);
    try {
      const email = user?.email || undefined;
      const supabaseUserId = user?.id || undefined;

      // Open Paddle Checkout Overlay
      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: email ? { email } : undefined,
        // This is VERY useful so your webhook can map payment -> user
        customData: supabaseUserId ? { supabase_user_id: supabaseUserId, plan } : { plan },
      });
    } finally {
      setOpening(false);
    }
  };

  const disabled = !ready || !priceId || opening;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}
