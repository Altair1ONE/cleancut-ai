import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "../../../../lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!token) {
      return NextResponse.json({ ok: false, error: "Missing bearer token" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email || null;

    const ref = adminDb.collection("users").doc(uid);
    const snap = await ref.get();

    if (snap.exists) {
      return NextResponse.json({ ok: true, created: false });
    }

    const oneTimeFreeCredits = 30;

    await ref.set({
      plan_id: "free",
      credits_remaining: oneTimeFreeCredits,
      last_reset_at: null,
      email,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, created: true, credits: oneTimeFreeCredits });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Init error" }, { status: 500 });
  }
}
