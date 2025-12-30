// app/api/admin/users/list/route.ts
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "../../../../../lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getAllowedAdminEmails() {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

async function requireAdmin(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return { ok: false as const, res: NextResponse.json({ error: "Missing token" }, { status: 401 }) };
  }

  const decoded = await adminAuth.verifyIdToken(token);

  // ✅ Admin can be: custom claim OR email allowlist
  const isClaimAdmin = decoded.admin === true;
  const email = (decoded.email || "").toLowerCase();
  const isEmailAdmin = getAllowedAdminEmails().includes(email);

  if (!isClaimAdmin && !isEmailAdmin) {
    return {
      ok: false as const,
      res: NextResponse.json({ error: "Not admin" }, { status: 403 }),
    };
  }

  return { ok: true as const, decoded };
}

function toIso(v: any): string | null {
  if (!v) return null;
  if (typeof v === "string") {
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d.toISOString();
  }
  if (v?.toDate) return v.toDate().toISOString(); // Firestore Timestamp
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "object" && typeof v.seconds === "number") {
    return new Date(v.seconds * 1000).toISOString();
  }
  return null;
}

export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.res;

  try {
    // ✅ Read last 200 user docs
    const snap = await adminDb.collection("users").limit(200).get();

    const rows = snap.docs
      .map((d) => {
        const data: any = d.data();
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
          updated_at: toIso(data?.updated_at),
        };
      })
      .sort((a, b) => {
        const ta = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const tb = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return tb - ta;
      });

    return NextResponse.json({ ok: true, rows });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Failed to load users" }, { status: 500 });
  }
}
