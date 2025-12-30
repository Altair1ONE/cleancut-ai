// app/api/admin/users/update/route.ts
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "../../../../../lib/firebaseAdmin";
import type { PlanId } from "../../../../../lib/plans";
import { creditsForPlan } from "../../../../../lib/planCredits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getAllowedAdminEmails() {
  const raw =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

async function requireAdmin(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return {
      ok: false as const,
      res: NextResponse.json({ error: "Missing token" }, { status: 401 }),
    };
  }

  const decoded = await adminAuth.verifyIdToken(token);

  const isClaimAdmin = decoded.admin === true;
  const email = (decoded.email || "").toLowerCase();
  const isEmailAdmin = getAllowedAdminEmails().includes(email);

  if (!isClaimAdmin && !isEmailAdmin) {
    return {
      ok: false as const,
      res: NextResponse.json({ error: "Not admin" }, { status: 403 }),
    };
  }

  return { ok: true as const };
}

function isPlanId(v: any): v is PlanId {
  return v === "free" || v === "pro_monthly" || v === "lifetime";
}

export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.res;

  try {
    const body = await req.json().catch(() => ({}));
    const uid = String(body?.uid || "").trim();
    if (!uid)
      return NextResponse.json(
        { ok: false, error: "Missing uid" },
        { status: 400 }
      );

    const ref = adminDb.collection("users").doc(uid);

    const patchBase: any = {
      updated_at: new Date().toISOString(),
    };

    const hasPlanChange = body?.plan_id != null;
    const hasExplicitCredits = body?.credits_remaining != null;
    const hasAddCredits = body?.add_credits != null;

    // ---- plan_id ----
    let planIdToSet: PlanId | null = null;
    if (hasPlanChange) {
      if (!isPlanId(body.plan_id)) {
        return NextResponse.json(
          { ok: false, error: "Invalid plan_id" },
          { status: 400 }
        );
      }
      planIdToSet = body.plan_id;
      patchBase.plan_id = body.plan_id;
    }

    // ---- credits_remaining explicit set (hard override) ----
    if (hasExplicitCredits) {
      const n = Number(body.credits_remaining);
      if (!Number.isFinite(n) || n < 0) {
        return NextResponse.json(
          { ok: false, error: "Invalid credits_remaining" },
          { status: 400 }
        );
      }

      await ref.set(
        {
          ...patchBase,
          credits_remaining: Math.floor(n),
          last_reset_at: new Date().toISOString(),
        },
        { merge: true }
      );

      return NextResponse.json({ ok: true });
    }

    // ---- add_credits (can be negative) ----
    if (hasAddCredits) {
      const add = Number(body.add_credits);
      if (!Number.isFinite(add)) {
        return NextResponse.json(
          { ok: false, error: "Invalid add_credits" },
          { status: 400 }
        );
      }

      await adminDb.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const current = snap.exists
          ? Number((snap.data() as any)?.credits_remaining ?? 0)
          : 0;
        const next = Math.max(0, Math.floor(current + add));

        tx.set(ref, { ...patchBase, credits_remaining: next }, { merge: true });
      });

      return NextResponse.json({ ok: true });
    }

    /**
     * ✅ KEY CHANGE:
     * If admin changes plan and does NOT explicitly set credits_remaining or add_credits,
     * then auto-grant credits according to the plan (ADD, not reset).
     *
     * - free: no auto-grant (free should not “monthly reset”)
     * - pro/lifetime: add plan credits to whatever the user currently has
     */
    if (planIdToSet && planIdToSet !== "free") {
      const award = creditsForPlan(planIdToSet);

      await adminDb.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const current = snap.exists
          ? Number((snap.data() as any)?.credits_remaining ?? 0)
          : 0;

        const next = Math.max(0, Math.floor(current + award));

        tx.set(
          ref,
          {
            ...patchBase,
            plan_id: planIdToSet,
            credits_remaining: next,
            last_reset_at: new Date().toISOString(),
          },
          { merge: true }
        );
      });

      return NextResponse.json({ ok: true });
    }

    // If only plan_id=free or no plan change, just patch
    await ref.set(patchBase, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Update failed" },
      { status: 500 }
    );
  }
}
