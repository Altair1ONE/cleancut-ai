import { NextResponse } from "next/server";
import { adminAuth, adminDb, adminFieldValue } from "../../../../lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json({ error: "Missing bearer token." }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const body = await req.json().catch(() => ({}));
    const imageCount = Number(body?.imageCount ?? 0);
    const isQualityRequested = Boolean(body?.isQuality);

    if (!Number.isFinite(imageCount) || imageCount <= 0) {
      return NextResponse.json({ error: "Invalid imageCount." }, { status: 400 });
    }

    const userRef = adminDb.collection("users").doc(uid);

    const result = await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(userRef);
      if (!snap.exists) {
        throw new Error("Credits not initialized");
      }

      const d = snap.data() || {};
      const planId = (d.plan_id ?? "free") as string;

      const isFree = planId === "free";
      const isQuality = !isFree && isQualityRequested;

      const perImage = isQuality ? 2 : 1;
      const cost = imageCount * perImage;

      const current = Number(d.credits_remaining ?? 0);
      if (current < cost) {
        return { ok: false, notEnough: true, planId, creditsRemaining: current };
      }

      const next = current - cost;

      tx.update(userRef, {
        credits_remaining: next,
        updated_at: new Date().toISOString(),
      });

      // usage log (optional)
      const usageRef = adminDb.collection("usage_events").doc();
      tx.set(usageRef, {
        user_id: uid,
        email: d.email || decoded.email || null,
        plan_id: planId,
        mode: isQuality ? "quality" : "fast",
        images_count: imageCount,
        credits_spent: cost,
        created_at: new Date().toISOString(),
      });

      return { ok: true, planId, creditsRemaining: next, cost, mode: isQuality ? "quality" : "fast" };
    });

    if (!result.ok) {
      return NextResponse.json({ error: "Not enough credits." }, { status: 402 });
    }

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
