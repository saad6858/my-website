import { NextResponse } from "next/server";
import { adminList, serializeAdmin } from "@/lib/admin-db";
import type { Service } from "@/types";

export const revalidate = 60;

export async function GET() {
  try {
    const services = await adminList<Service & { sortOrder?: number }>("services");
    const active = services.filter((service) => service.enabled).sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
    return NextResponse.json(serializeAdmin(active), { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
