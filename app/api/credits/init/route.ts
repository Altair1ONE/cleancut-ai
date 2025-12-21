// app/api/credits/init/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!token) {
      return NextResponse.json({ ok: false, error: "Missing bearer token" }, { status: 401 });
    }

    // Verify user from Supabase using the access token (JWT)
    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);

    if (userErr || !userData?.user) {
      return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
    }

    const userId = userData.user.id;

    // If credits row already exists, do nothing
    const { data: existing, error: existErr } = await supabaseAdmin
      .from("user_credits")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existErr) {
      return NextResponse.json({ ok: false, error: existErr.message }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ ok: true, created: false });
    }

    // ✅ One-time free grant (no monthly reset)
    const oneTimeFreeCredits = 30;

    const { error: insertErr } = await supabaseAdmin.from("user_credits").insert({
      user_id: userId,
      plan_id: "free",
      credits_remaining: oneTimeFreeCredits,
      last_reset_at: null, // IMPORTANT: free does not reset monthly
      updated_at: new Date().toISOString(),
    });

    if (insertErr) {
      return NextResponse.json({ ok: false, error: insertErr.message }, { status: 500 });
    }

    // Optional: also ensure user_plans exists
    await supabaseAdmin.from("user_plans").upsert(
      {
        user_id: userId,
        plan_id: "free",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    return NextResponse.json({ ok: true, created: true, credits: oneTimeFreeCredits });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Init error" }, { status: 500 });
  }
}
