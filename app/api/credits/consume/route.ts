import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !anonKey || !serviceKey) {
      return NextResponse.json(
        { error: "Missing Supabase env vars (URL/ANON/SERVICE_ROLE)." },
        { status: 500 }
      );
    }

    // Read bearer token from client
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!token) {
      return NextResponse.json({ error: "Missing bearer token." }, { status: 401 });
    }

    // Validate user using ANON client + token
    const supabaseUser = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: userData, error: userErr } = await supabaseUser.auth.getUser();
    if (userErr || !userData?.user) {
      return NextResponse.json({ error: "Invalid session." }, { status: 401 });
    }

    const user = userData.user;

    // Parse request body
    const body = await req.json().catch(() => ({}));
    const imageCount = Number(body?.imageCount ?? 0);
    const isQualityRequested = Boolean(body?.isQuality);

    if (!Number.isFinite(imageCount) || imageCount <= 0) {
      return NextResponse.json({ error: "Invalid imageCount." }, { status: 400 });
    }

    // Use SERVICE ROLE for secure DB operations
    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    // Get current plan from credits row (source of truth)
    const { data: creditsRow, error: creditsErr } = await supabaseAdmin
      .from("user_credits")
      .select("plan_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (creditsErr) {
      return NextResponse.json({ error: creditsErr.message }, { status: 500 });
    }

    const planId = (creditsRow?.plan_id ?? "free") as string;

    // Enforce: free plan cannot use quality
    const isFree = planId === "free";
    const isQuality = !isFree && isQualityRequested;

    // Cost rule
    const perImage = isQuality ? 2 : 1;
    const cost = imageCount * perImage;

    // Atomic deduction via RPC
    const { data: rpcData, error: rpcErr } = await supabaseAdmin.rpc(
      "admin_consume_credits",
      { p_user_id: user.id, p_amount: cost }
    );

    if (rpcErr) {
      // Not enough credits
      if (rpcErr.message?.toLowerCase().includes("not enough")) {
        return NextResponse.json({ error: "Not enough credits." }, { status: 402 });
      }
      return NextResponse.json({ error: rpcErr.message }, { status: 500 });
    }

    const row = Array.isArray(rpcData) && rpcData.length > 0 ? rpcData[0] : null;

    return NextResponse.json({
      ok: true,
      planId: row?.plan_id ?? planId,
      creditsRemaining: row?.credits_remaining ?? null,
      cost,
      mode: isQuality ? "quality" : "fast",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
