import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/actions";
import { defaultSiteSettings } from "@/lib/site-defaults";
import type { SiteSettings } from "@/types";

function publicSettings(settings: SiteSettings): Partial<SiteSettings> {
  return {
    id: settings.id,
    brand: settings.brand,
    sections: settings.sections,
    appearance: settings.appearance,
    announcement: settings.announcement,
    seo: {
      title: settings.seo.title,
      description: settings.seo.description,
      ogImage: settings.seo.ogImage,
      keywords: settings.seo.keywords,
      robots: settings.seo.robots,
    },
    pricing: {
      currency: settings.pricing.currency,
      tiers: settings.pricing.tiers,
    },
    contact: settings.contact,
    stats: settings.stats,
    updatedAt: settings.updatedAt,
  };
}

export async function GET() {
  try {
    return NextResponse.json(publicSettings(await getSiteSettings()), { headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=300" } });
  } catch {
    return NextResponse.json(publicSettings(defaultSiteSettings), { headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=300" } });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    await updateSiteSettings(body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Forbidden" }, { status: 403 });
  }
}
