"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./AuthProvider";

export default function ProvidersGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";

  // Handle both with/without basePath in runtime just to be safe.
  const isAppRoute =
    pathname === "/app" ||
    pathname.startsWith("/app/") ||
    pathname === "/cleancut/app" ||
    pathname.startsWith("/cleancut/app/");

  // If not an app route, do NOT mount AuthProvider (prevents firebase auth iframe load)
  if (!isAppRoute) return <>{children}</>;

  return <AuthProvider>{children}</AuthProvider>;
}
