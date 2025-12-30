// lib/apiPath.ts
export function detectBasePath(): string {
  // 1) Prefer env (compiled at build time)
  const envBase = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();

  if (envBase && envBase !== "/") {
    return envBase.startsWith("/") ? envBase : `/${envBase}`;
  }

  // 2) Fallback: infer from URL at runtime (works even if env missing in prod)
  if (typeof window !== "undefined") {
    const p = window.location.pathname || "";

    // If your app is always hosted under /cleancut, infer it
    if (p.startsWith("/cleancut")) return "/cleancut";
  }

  return "";
}

export function apiPath(path: string) {
  const base = detectBasePath();
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
