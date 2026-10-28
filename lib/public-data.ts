import {adminDb} from '@/lib/firebase-admin';
import {redirect} from 'next/navigation';
import {initialPages,initialSettings,type SitePage,seedProjects} from '@/lib/content';

export async function getPublishedPage(slug:string):Promise<SitePage|undefined>{
  let redirectTo:string|undefined;
  let hasConfiguredSettings=false;
  try{
    const db=adminDb();
    // Homepage at / uses empty slug "". Also accept legacy slug "home".
    const candidates = (slug === '' || slug === 'home') ? ['', 'home'] : [slug];
    let ownedUnpublished = false;
    for (const s of candidates) {
      const snap = await db.collection('pages').where('slug','==',s).limit(10).get();
      const published = snap.docs.find(d => d.get('status') === 'published');
      if (published) return {id: published.id, ...published.data()} as SitePage;
      if (!snap.empty) ownedUnpublished = true;
    }
    // Draft/archived owns this slug — do not fall back to seed content.
    if (ownedUnpublished) return undefined;
    if (slug && slug !== 'home') {
      const {createHash} = await import('node:crypto');
      const key = createHash('sha256').update(slug).digest('hex');
      const r = await db.collection('slugRedirects').doc(key).get();
      if (r.exists && r.get('status') === 'active' && typeof r.get('to') === 'string') {
        redirectTo = '/' + String(r.get('to')).replace(/^\//, '');
      }
    }
    const settings = await db.doc('siteSettings/global').get();
    hasConfiguredSettings = settings.exists;
  }catch{}
  if (redirectTo) redirect(redirectTo);
  if (hasConfiguredSettings) return undefined;
  const seedSlug = (slug === 'home') ? '' : slug;
  return initialPages.find(p => p.slug === seedSlug && p.status === 'published');
}

export async function getSiteSettings():Promise<Record<string,any>>{
  let raw:Record<string,any>={};
  try{const d=await adminDb().doc('siteSettings/global').get();if(d.exists)raw=d.data()||{}}catch{}
  const settings:Record<string,any>={...initialSettings,...raw};
  if(!settings.brandName||settings.brandName==='Saad Maqbool')settings.brandName='SM Automations';
  if(!settings.siteUrl||settings.siteUrl==='https://saadmaqbool.vercel.app')settings.siteUrl='https://smautomations.tech';
  if(!settings.seoTitle||settings.seoTitle==='Saad Maqbool — AI & Automation')settings.seoTitle='SM Automations — Intelligent Systems';
  if(!settings.accent||settings.accent==='#c3a67a')settings.accent='#e24d56';
  if(!['dark','light','glass','tokyo','evolute','cinematic','editorial','slate','ink','forest'].includes(String(settings.themeDefault||'')))settings.themeDefault='dark';
  settings.themeOptions=['dark','glass','tokyo','evolute','cinematic','editorial','slate','ink','forest','light'];
  if(!['classic','rail','bento'].includes(String(settings.siteLayout||'')))settings.siteLayout='classic';
  if(!settings.introPreset)settings.introPreset='breath';
  // Never surface LinkedIn on the public site
  settings.linkedin='';
  return settings;
}

export async function getPublishedCollection(collectionName:'projects'|'services'|'posts'|'faqs'|'industries'){
  try{
    const db=adminDb();
    const snap=await db.collection(collectionName).where('status','==','published').get();
    const items=snap.docs.map(d=>({id:d.id,...d.data()})).sort((a:any,b:any)=>(Number(a.order)||0)-(Number(b.order)||0));
    if(items.length)return items;
    const settings=await db.doc('siteSettings/global').get();
    if(settings.exists)return [];
    if(collectionName==='projects')return seedProjects;
    return [];
  }catch{if(collectionName==='projects')return seedProjects;return []}
}
