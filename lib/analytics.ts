"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SESSION_KEY = "my-platform-session";
export function generateSessionId() { const existing = typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null; if (existing) return existing; const id = `${Date.now()}-${crypto.randomUUID()}`; localStorage.setItem(SESSION_KEY, id); return id; }
export function getDeviceInfo() { return { userAgent: navigator.userAgent, screen: `${window.innerWidth}x${window.innerHeight}` }; }
export async function trackPageView(page: string) {
  if (typeof window === "undefined") return;
  const sessionId = generateSessionId();
  const seenKey = `my-platform-seen:${sessionId}:${page}`;
  if (sessionStorage.getItem(seenKey)) return;
  sessionStorage.setItem(seenKey, "1");
  await fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page, sessionId, userAgent: navigator.userAgent }) }).catch(() => undefined);
}
export function usePageTracking() {
  const pathname = usePathname();
  useEffect(() => { if (pathname) void trackPageView(pathname); }, [pathname]);
}
