import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "../../../../../lib/firebaseAdmin";

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

export async function GET(req: Request) {
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

    // Fetch latest 200 users. OrderBy may fail if updated_at types vary.
    // We'll just pull and sort in memory by updated_at.
    const snap = await adminDb.collection("users").limit(200).get();

    const rows = snap.docs.map((d) => {
      const data: any = d.data();

      // Firestore Timestamp -> ISO
      const updatedAt =
        data?.updated_at?.toDate?.() instanceof Date
          ? data.updated_at.toDate().toISOString()
          : typeof data?.updated_at === "string"
          ? data.updated_at
          : null;

      return {
        uid: d.id,
        email: data?.email ?? null,
        plan_id: data?.plan_id ?? null,
        credits_remaining:
          typeof data?.credits_remaining === "number"
            ? data.credits_remaining
            : data?.credits_remaining != null
            ? Number(data.credits_remaining)
            : null,
        paddle_status: data?.paddle_status ?? null,
        paddle_subscription_id: data?.paddle_subscription_id ?? null,
        email_verified: typeof data?.email_verified === "boolean" ? data.email_verified : null,
        updated_at: updatedAt,
      };
    });

    rows.sort((a: any, b: any) => {
      const ta = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const tb = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return tb - ta;
    });

    return NextResponse.json({ ok: true, rows });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Admin list failed" },
      { status: 500 }
    );
  }
}
