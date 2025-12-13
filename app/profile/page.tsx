"use client";

import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { supabase } from "../../lib/supabaseClient";

export default function ProfilePage() {
  const { user, displayName } = useAuth();
  const [name, setName] = useState(displayName);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user) return null;

  async function saveProfile() {
    setSaving(true);
    setSuccess(false);

    await supabase.auth.updateUser({
      data: { name },
    });

    setSaving(false);
    setSuccess(true);
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h1 className="text-xl font-semibold text-white">Your profile</h1>

      <div className="mt-4">
        <label className="text-xs text-slate-400">Display name</label>
        <input
          className="mt-1 w-full rounded-xl bg-slate-950 p-3 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-xs text-slate-400">Email</label>
        <input
          className="mt-1 w-full rounded-xl bg-slate-950 p-3 text-sm text-slate-400"
          value={user.email}
          disabled
        />
      </div>

      {success && (
        <p className="mt-3 text-xs text-green-400">
          ✅ Profile updated successfully
        </p>
      )}

      <button
        onClick={saveProfile}
        disabled={saving}
        className="mt-4 w-full rounded-full bg-indigo-500 py-2 text-sm text-white"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}
