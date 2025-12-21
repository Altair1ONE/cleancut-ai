import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log("[consume] env present?", {
      supabaseUrl: Boolean(supabaseUrl),
      anonKey: Boolean(anonKey),
      serviceKey: Boolean(serviceKey),
    });

    if (!supabaseUrl || !anonKey || !serviceKey) {
      return NextResponse.json(
        { error: "Missing Supabase env vars (URL/ANON/SERVICE_ROLE)." },
        { status: 500 }
      );
    }

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    console.log("[consume] has bearer token?", Boolean(token));

    if (!token) {
      return NextResponse.json(
        { error: "Missing bearer token." },
        { status: 401 }
      );
    }

    // Validate user session
    const supabaseUser = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: userData, error: userErr } = await supabaseUser.auth.getUser();

    console.log("[consume] userErr?", userErr?.message || null);
    console.log("[consume] user id?", userData?.user?.id || null);

    if (userErr || !userData?.user) {
      return NextResponse.json({ error: "Invalid session." }, { status: 401 });
    }

    const user = userData.user;

    // Parse body
    const body = await req.json().catch(() => ({}));
    const imageCount = Number(body?.imageCount ?? 0);
    const isQualityRequested = Boolean(body?.isQuality);

    console.log("[consume] body", { imageCount, isQualityRequested });

    if (!Number.isFinite(imageCount) || imageCount <= 0) {
      return NextResponse.json({ error: "Invalid imageCount." }, { status: 400 });
    }

    // Service role client
    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    // Read plan
    const { data: creditsRow, error: creditsErr } = await supabaseAdmin
      .from("user_credits")
      .select("plan_id, credits_remaining")
      .eq("user_id", user.id)
      .maybeSingle();

    console.log("[consume] creditsRow", creditsRow);
    console.log("[consume] creditsErr", creditsErr?.message || null);

    if (creditsErr) {
      return NextResponse.json({ error: creditsErr.message }, { status: 500 });
    }

    const planId = (creditsRow?.plan_id ?? "free") as string;
    const isFree = planId === "free";
    const isQuality = !isFree && isQualityRequested;

    const perImage = isQuality ? 2 : 1;
    const cost = imageCount * perImage;

    console.log("[consume] plan/cost", { planId, isFree, isQuality, perImage, cost });

    // Deduct (RPC)
    const { data: rpcData, error: rpcErr } = await supabaseAdmin.rpc(
      "admin_consume_credits",
      { p_user_id: user.id, p_amount: cost }
    );

    console.log("[consume] rpcErr", rpcErr?.message || null);
    console.log("[consume] rpcData", rpcData);

    if (rpcErr) {
      if (rpcErr.message?.toLowerCase().includes("not enough")) {
        return NextResponse.json({ error: "Not enough credits." }, { status: 402 });
      }
      return NextResponse.json({ error: rpcErr.message }, { status: 500 });
    }

    const row = Array.isArray(rpcData) && rpcData.length > 0 ? rpcData[0] : null;

    // IMPORTANT: Always return a number for creditsRemaining (fallback to existing creditsRow)
    const creditsRemaining =
      row?.credits_remaining ?? creditsRow?.credits_remaining ?? null;

    return NextResponse.json({
      ok: true,
      planId: row?.plan_id ?? planId,
      creditsRemaining,
      cost,
      mode: isQuality ? "quality" : "fast",
    });
  } catch (e: any) {
    console.log("[consume] exception", e?.message || e);
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
