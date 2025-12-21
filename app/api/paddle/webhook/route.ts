// app/api/paddle/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { planIdFromPriceId } from "../../../../lib/paddlePrices";

export const runtime = "nodejs";

/**
 * Verify Paddle signature (HMAC) using Paddle's webhook secret.
 * Your Paddle dashboard provides the webhook secret.
 *
 * NOTE: Header format can vary by Paddle version.
 * Adjust parsing if your Paddle header differs.
 */
function verifyPaddleSignature(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET || "";
  if (!secret) return false;
  if (!signatureHeader) return false;

  // Example header format often includes: "ts=...,h1=..."
  // If your header differs, log it once and adjust parsing.
  const parts = signatureHeader.split(",").map((p) => p.trim());
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

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("Paddle-Signature");

  const ok = verifyPaddleSignature(rawBody, sig);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  // Typical payload shape: { event_type, data }
  const eventType: string = event?.event_type || event?.eventType || "";
  const data = event?.data || event?.data?.object || event?.data?.data || event?.data;

  // We attach supabase_user_id in customData during checkout
  const customData = data?.custom_data || data?.customData || {};
  const supabaseUserId: string | undefined = customData?.supabase_user_id;

  // If we don't know the user, we can’t upgrade.
  // (You can also map by customer email if you want, but user-id is best.)
  if (!supabaseUserId) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  // Helper: upsert plan record
  async function setPlan(planId: "free" | "pro_monthly" | "lifetime") {
    // You can design this table however you want.
    // Minimal approach: a "user_plans" table with user_id (pk), plan_id, updated_at
    const { error } = await supabaseAdmin
      .from("user_plans")
      .upsert(
        {
          user_id: supabaseUserId,
          plan_id: planId,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (error) throw error;
  }

  /**
   * Event handling:
   * - transaction.completed => user paid successfully
   * - subscription.* => keep subscription status in DB
   *
   * Adjust based on the exact events you enabled in Paddle.
   */
  try {
    if (eventType.includes("transaction") || eventType === "transaction.completed") {
      // Find price id from items
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
          await setPlan(planId);
        }
      }
    }

    if (eventType.startsWith("subscription.")) {
      // Optional: store subscription id + status
      const subscriptionId = data?.id || data?.subscription_id || data?.subscriptionId;
      const status = data?.status;

      if (subscriptionId || status) {
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
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Webhook error" }, { status: 500 });
  }
}
