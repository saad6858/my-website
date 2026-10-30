import type {MetadataRoute} from 'next';
import {adminDb} from '@/lib/firebase-admin';
import {getSiteSettings} from '@/lib/public-data';

export const dynamic = 'force-dynamic';

const RESERVED = new Set([
  '',
  'about',
  'services',
  'projects',
  'industries',
  'insights',
  'faq',
  'contact',
  'privacy',
  'admin',
  'home' // never list /home — it redirects to /
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const base = String(
    settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://smautomations.tech'
  ).replace(/\/$/, '');

  const fixed = ['', 'about', 'services', 'projects', 'industries', 'insights', 'faq', 'contact', 'privacy'];
  const seen = new Set<string>();
  const result: MetadataRoute.Sitemap = [];

  const push = (path: string, changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'], priority: number) => {
    const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
    if (clean === 'home' || clean === 'admin' || clean.startsWith('admin/')) return;
    const url = clean ? `${base}/${clean}` : base;
    if (seen.has(url)) return;
    seen.add(url);
    result.push({url, lastModified: new Date(), changeFrequency, priority});
  };

  for (const p of fixed) {
    push(p, p === '' ? 'monthly' : 'weekly', p === '' ? 1 : 0.6);
  }

  try {
    const db = adminDb();
    const snap = await db.collection('pages').where('status', '==', 'published').get();
    for (const d of snap.docs) {
      const slug = String(d.get('slug') || '').replace(/^\/+/, '').replace(/\/+$/, '');
      if (!slug || slug === 'home' || RESERVED.has(slug) || slug.startsWith('admin')) continue;
      push(slug, 'monthly', 0.5);
    }

    const projects = await db.collection('projects').where('status', '==', 'published').get();
    for (const d of projects.docs) {
      const slug = String(d.get('slug') || '').replace(/^\/+/, '');
      if (slug) push(`projects/${slug}`, 'monthly', 0.6);
    }

    const posts = await db.collection('posts').where('status', '==', 'published').get();
    for (const d of posts.docs) {
      const slug = String(d.get('slug') || '').replace(/^\/+/, '');
      if (slug) push(`insights/${slug}`, 'monthly', 0.5);
    }
  } catch {}

  return result;
}
