// lib/apiPath.ts
export function apiPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${clean}`;
}
