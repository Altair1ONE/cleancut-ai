// app/api/paddle/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { planIdFromPriceId } from "../../../../lib/paddlePrices";

export const runtime = "nodejs";

function verifyPaddleSignature(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET || "";
  if (!secret) return false;
  if (!signatureHeader) return false;

  // Paddle header format: "ts=...;h1=..." (semicolon-separated)
  const parts = signatureHeader.split(";").map((p) => p.trim());
  const tsPart = parts.find((p) => p.startsWith("ts="));
  const h1Part = parts.find((p) => p.startsWith("h1="));

  if (!tsPart || !h1Part) return false;

  const ts = tsPart.slice(3);
  const h1 = h1Part.slice(3);

  const signedPayload = `${ts}:${rawBody}`;
  const digest = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(digest, "hex"), Buffer.from(h1, "hex"));
  } catch {
    return false;
  }
}


function creditsForPlan(planId: "free" | "pro_monthly" | "lifetime") {
  if (planId === "pro_monthly") return 1000;
  if (planId === "lifetime") return 200;
  return 30; // free (you can keep free one-time separate if you want)
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("Paddle-Signature");

  const ok = verifyPaddleSignature(rawBody, sig);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  const eventType: string = event?.event_type || event?.eventType || "";
  const data = event?.data || event?.data?.object || event?.data?.data || event?.data;

  const customData = data?.custom_data || data?.customData || {};
  const supabaseUserId: string | undefined = customData?.supabase_user_id;

  if (!supabaseUserId) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  async function setPlanAndCredits(planId: "free" | "pro_monthly" | "lifetime") {
    // 1) upsert plan table
    const { error: planErr } = await supabaseAdmin
      .from("user_plans")
      .upsert(
        {
          user_id: supabaseUserId,
          plan_id: planId,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (planErr) throw planErr;

    // 2) restore credits instantly on successful purchase
    const credits = creditsForPlan(planId);

    const { error: credErr } = await supabaseAdmin
      .from("user_credits")
      .upsert(
        {
          user_id: supabaseUserId,
          plan_id: planId,
          credits_remaining: credits,
          last_reset_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (credErr) throw credErr;
  }

  try {
    // ✅ When payment succeeds (covers one-time and first subscription payment)
    if (eventType === "transaction.completed") {
      const items = data?.items || data?.details?.line_items || data?.line_items || [];
      const priceId =
        items?.[0]?.price?.id ||
        items?.[0]?.price_id ||
        items?.[0]?.priceId ||
        data?.price_id ||
        data?.priceId;

      if (priceId) {
        const planId = planIdFromPriceId(priceId);
        if (planId) {
          await setPlanAndCredits(planId);
        }
      }
    }

    // ✅ Keep subscription status updated
    if (eventType.startsWith("subscription.")) {
      const subscriptionId = data?.id || data?.subscription_id || data?.subscriptionId;
      const status = data?.status;

      await supabaseAdmin
        .from("user_plans")
        .upsert(
          {
            user_id: supabaseUserId,
            paddle_subscription_id: subscriptionId || null,
            paddle_status: status || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

      // OPTIONAL: if subscription renews and Paddle sends a new transaction.completed,
      // your credits will be restored there automatically. That’s ideal.
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Webhook error" }, { status: 500 });
  }
}
