import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function parseAdminEmails(raw: string) {
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function isAdminEmail(email?: string | null) {
  const raw = process.env.ADMIN_EMAILS || "";
  const allowed = parseAdminEmails(raw);
  return !!email && allowed.includes(email.trim().toLowerCase());
}

type Action = "add" | "deduct" | "set";

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

    // Admin must be logged in (bearer token)
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!token) {
      return NextResponse.json({ error: "Missing bearer token." }, { status: 401 });
    }

    // Validate admin identity using anon client + token
    const supabaseUser = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: userData, error: userErr } = await supabaseUser.auth.getUser();
    if (userErr || !userData?.user) {
      return NextResponse.json({ error: "Invalid session." }, { status: 401 });
    }

    const adminUser = userData.user;

    // Server-side admin check (secure)
    if (!isAdminEmail(adminUser.email)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    // Parse body
    const body = await req.json().catch(() => ({}));
    const targetUserId = String(body?.userId || "");
    const action = String(body?.action || "") as Action;
    const amount = Number(body?.amount ?? 0);
    const planId = body?.planId ? String(body.planId) : null;

    if (!targetUserId) {
      return NextResponse.json({ error: "Missing userId." }, { status: 400 });
    }

    if (!["add", "deduct", "set"].includes(action)) {
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    // Service role for DB write
    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Read current credits
    const { data: row, error: readErr } = await supabaseAdmin
      .from("user_credits")
      .select("credits_remaining, plan_id")
      .eq("user_id", targetUserId)
      .maybeSingle();

    if (readErr) return NextResponse.json({ error: readErr.message }, { status: 500 });
    if (!row) return NextResponse.json({ error: "User credits row not found." }, { status: 404 });

    const current = Number(row.credits_remaining ?? 0);
    const next =
      action === "add"
        ? current + amount
        : action === "deduct"
        ? Math.max(0, current - amount)
        : amount; // set

    const nextPlan = planId ?? row.plan_id ?? "free";

    const { error: updErr } = await supabaseAdmin
      .from("user_credits")
      .update({
        credits_remaining: next,
        plan_id: nextPlan,
        last_reset_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", targetUserId);

    if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

    // Optional: also update user_plans plan_id if admin passed planId
    if (planId) {
      await supabaseAdmin
        .from("user_plans")
        .upsert(
          { user_id: targetUserId, plan_id: planId, updated_at: new Date().toISOString() },
          { onConflict: "user_id" }
        );
    }

    return NextResponse.json({
      ok: true,
      userId: targetUserId,
      action,
      previousCredits: current,
      creditsRemaining: next,
      planId: nextPlan,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
