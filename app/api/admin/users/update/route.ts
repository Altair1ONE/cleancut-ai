import { NextResponse } from "next/server";
import { adminAuth, adminDb, adminFieldValue } from "../../../../../lib/firebaseAdmin";

export const runtime = "nodejs";

function getBearerToken(req: Request): string | null {
  const h = req.headers.get("authorization") || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

function isEmailAdmin(email: string | undefined | null): boolean {
  const raw = process.env.ADMIN_EMAILS || "";
  const list = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (!email) return false;
  return list.includes(email.toLowerCase());
}

type PlanId = "free" | "pro_monthly" | "lifetime";
type Action =
  | { action: "set_plan"; uid: string; planId: PlanId }
  | { action: "set_credits"; uid: string; credits: number }
  | { action: "add_credits"; uid: string; delta: number };

export async function POST(req: Request) {
  try {
    const token = getBearerToken(req);
    if (!token) {
      return NextResponse.json({ ok: false, error: "Missing token" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const email = decoded.email || null;

    const adminByClaim = decoded.admin === true;
    const adminByEmail = isEmailAdmin(email);

    if (!adminByClaim && !adminByEmail) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    const body = (await req.json()) as Partial<Action>;
    const uid = body.uid;
    if (!uid || typeof uid !== "string") {
      return NextResponse.json({ ok: false, error: "Missing uid" }, { status: 400 });
    }

    const ref = adminDb.collection("users").doc(uid);

    if (body.action === "set_plan") {
      const planId = body.planId;
      if (!planId || !["free", "pro_monthly", "lifetime"].includes(planId)) {
        return NextResponse.json({ ok: false, error: "Invalid planId" }, { status: 400 });
      }

      await ref.set(
        {
          plan_id: planId,
          updated_at: adminFieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return NextResponse.json({ ok: true });
    }

    if (body.action === "set_credits") {
      const credits = Number((body as any).credits);
      if (!Number.isFinite(credits) || credits < 0) {
        return NextResponse.json({ ok: false, error: "Invalid credits" }, { status: 400 });
      }

      await ref.set(
        {
          credits_remaining: Math.floor(credits),
          updated_at: adminFieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return NextResponse.json({ ok: true });
    }

    if (body.action === "add_credits") {
      const delta = Number((body as any).delta);
      if (!Number.isFinite(delta)) {
        return NextResponse.json({ ok: false, error: "Invalid delta" }, { status: 400 });
      }

      await ref.set(
        {
          credits_remaining: adminFieldValue.increment(Math.floor(delta)),
          updated_at: adminFieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Admin update failed" },
      { status: 500 }
    );
  }
}
