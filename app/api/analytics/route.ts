import { NextResponse } from "next/server";
import { adminAdd, adminList } from "@/lib/admin-db";
import { requireAdminApi } from "@/lib/server-auth";
import type { PageView } from "@/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const page = String(body.page ?? "").slice(0, 300);
    const sessionId = String(body.sessionId ?? "").slice(0, 120);
    const userAgent = String(body.userAgent ?? "").slice(0, 500);
    const durationMs = Number.isFinite(Number(body.durationMs)) ? Math.max(0, Math.min(24 * 60 * 60 * 1000, Number(body.durationMs))) : undefined;
    if (!page.startsWith("/") || !sessionId) return NextResponse.json({ error: "Invalid analytics event" }, { status: 400 });
    await adminAdd("page_views", { page, sessionId, userAgent, timestamp: new Date(), ...(durationMs === undefined ? {} : { durationMs }) } satisfies Omit<PageView, "id">);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 202 });
  }
}

export async function GET(req: Request) {
  try {
    await requireAdminApi();
    const all = await adminList<PageView>("page_views");
    const { searchParams } = new URL(req.url);
    const startParam = searchParams.get("startDate");
    const endParam = searchParams.get("endDate");
    const start = startParam ? new Date(startParam) : new Date(0);
    const end = endParam ? new Date(endParam) : new Date();
    const rows = all.filter((row) => {
      const date = new Date(row.timestamp as unknown as string);
      return Number.isFinite(date.getTime()) && date >= start && date <= end;
    });

    const sessions = new Set(rows.map((row) => row.sessionId));
    const byPage = new Map<string, number>();
    const bySession = new Map<string, { min: number; max: number; durationSum: number; durationCount: number }>();
    const byDay = new Map<string, { date: string; messages: number; replies: number }>();

    for (const row of rows) {
      byPage.set(row.page, (byPage.get(row.page) ?? 0) + 1);
      const timestamp = new Date(row.timestamp as unknown as string).getTime();
      const existing = bySession.get(row.sessionId);
      const duration = typeof row.durationMs === "number" ? row.durationMs : 0;
      if (!existing) bySession.set(row.sessionId, { min: timestamp, max: timestamp, durationSum: duration, durationCount: typeof row.durationMs === "number" ? 1 : 0 });
      else {
        existing.min = Math.min(existing.min, timestamp);
        existing.max = Math.max(existing.max, timestamp);
        if (typeof row.durationMs === "number") {
          existing.durationSum += duration;
          existing.durationCount += 1;
        }
      }
      const d = new Date(timestamp);
      const key = d.toISOString().slice(0, 10);
      const daily = byDay.get(key) ?? { date: key, messages: 0, replies: 0 };
      daily.messages += 1;
      byDay.set(key, daily);
    }

    const sessionDurations: number[] = [];
    for (const session of bySession.values()) {
      const derived = Math.max(0, session.max - session.min);
      sessionDurations.push(session.durationCount ? Math.max(derived, session.durationSum) : derived);
    }
    const avgSessionDuration = sessionDurations.length ? Math.round(sessionDurations.reduce((sum, value) => sum + value, 0) / sessionDurations.length) : 0;
    const topPages = [...byPage.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([page, views]) => ({ page, views }));

    return NextResponse.json({
      totalViews: rows.length,
      uniqueSessions: sessions.size,
      topPages,
      avgSessionDuration,
      dailyViews: [...byDay.values()].sort((a, b) => a.date.localeCompare(b.date)),
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unauthorized" }, { status: 401 });
  }
}
