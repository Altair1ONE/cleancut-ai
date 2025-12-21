// lib/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

// Prefer server-side SUPABASE_URL but allow NEXT_PUBLIC fallback
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Server-side only. DO NOT expose service role key to client.
 */
if (!supabaseUrl) {
  throw new Error(
    "Missing Supabase URL. Set SUPABASE_URL (recommended) or NEXT_PUBLIC_SUPABASE_URL."
  );
}
if (!serviceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});
