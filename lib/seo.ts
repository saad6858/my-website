import type { Metadata } from "next";
import type { Post, SiteSettings } from "@/types";

export const defaultMeta = { title: "my-platform", description: "A premium personal brand platform for AI, automation, systems, and building in public." };

export function generateMetaTags(settings: SiteSettings, page?: string): Metadata {
  const title = page ? `${page} | ${settings.seo.title}` : settings.seo.title;
  return {
    title,
    description: settings.seo.description,
    keywords: settings.seo.keywords.split(",").map(k => k.trim()).filter(Boolean),
    robots: settings.seo.robots,
    openGraph: { title, description: settings.seo.description, images: settings.seo.ogImage ? [settings.seo.ogImage] : undefined, type: "website" },
    twitter: { card: "summary_large_image", title, description: settings.seo.description, images: settings.seo.ogImage ? [settings.seo.ogImage] : undefined }
  };
}
export function generateStructuredData(type: string, data: Record<string, unknown>) { return { "@context": "https://schema.org", "@type": type, ...data }; }
export function generateSitemap(posts: Post[]) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const urls = ["/", "/about", "/services", "/portfolio", "/blog", "/contact", ...posts.filter(p => p.status === "published").map(p => `/blog/${p.slug}`)];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${base}${u}</loc></url>`).join("")}</urlset>`;
}
export function generateRobotsTxt() { const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"; return `User-agent: *\nAllow: /\nDisallow: /dashboard/\nDisallow: /api/\nDisallow: /seed\nSitemap: ${base}/sitemap.xml`; }
