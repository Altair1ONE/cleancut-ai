export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xevora.org";

export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH || "/cleancut";

/**
 * Prefix any internal path with basePath.
 * Example: withBasePath("/pricing") -> "/cleancut/pricing"
 */
export function withBasePath(path: string) {
  if (!path.startsWith("/")) path = "/" + path;
  if (path === "/") return BASE_PATH;
  return `${BASE_PATH}${path}`;
}

/**
 * Full absolute URL helper (useful for sitemap/robots/canonical).
 */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${withBasePath(path)}`;
}
