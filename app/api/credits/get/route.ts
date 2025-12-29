import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "../../../../lib/firebaseAdmin";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!token) {
      return NextResponse.json({ error: "Missing bearer token" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const ref = adminDb.collection("users").doc(uid);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json({ error: "Not initialized" }, { status: 404 });
    }

    const d = snap.data() || {};
    return NextResponse.json({
      ok: true,
      planId: d.plan_id || "free",
      creditsRemaining: Number(d.credits_remaining ?? 0),
      lastResetAt: d.last_reset_at ?? null,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Get error" }, { status: 500 });
  }
}
