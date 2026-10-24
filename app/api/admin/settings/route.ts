import {NextResponse} from 'next/server';
import {adminDb,requireAdmin} from '@/lib/firebase-admin';
import {FieldValue} from 'firebase-admin/firestore';

export const runtime='nodejs';

export async function GET(req:Request){
  try{
    await requireAdmin(req);
    const s=await adminDb().doc('siteSettings/global').get();
    return NextResponse.json({settings:s.exists?s.data():{}});
  }catch(e){
    const m=e instanceof Error?e.message:'';
    return NextResponse.json(
      {error:m==='AUTH_REQUIRED'||m==='ADMIN_REQUIRED'?'You are not authorised.':'Admin service is not configured or unavailable.'},
      {status:m==='AUTH_REQUIRED'||m==='ADMIN_REQUIRED'?403:500}
    );
  }
}

export async function PUT(req:Request){
  try{
    await requireAdmin(req);
    const body=await req.json();
    if(!body||typeof body!=='object'||Array.isArray(body)){
      return NextResponse.json({error:'Invalid settings.'},{status:400});
    }
    const allowed=[
      'brandName','tagline','introEnabled','introEveryVisit','introMode',
      'projectCardHeight','projectThumbHeight','projectThumbHeightMobile',
      'themeDefault','themeOptions','accent','email','whatsappNumber',
      'whatsappMessage','linkedin','siteUrl','footerText','seoTitle',
      'seoDescription','socialImage','navigationJson','footerLinksJson',
      'showMarquee','showHeroArt','showAmbient','showScrollProgress','siteLayout','introPreset','introCustomEnabled','introScenesJson'
    ];
    const clean=Object.fromEntries(
      Object.entries(body).filter(([k,v])=>allowed.includes(k)&&['string','boolean'].includes(typeof v))
    );
    for(const key of ['projectCardHeight','projectThumbHeight','projectThumbHeightMobile']){
      if(typeof clean[key]==='string'&&!/^(auto|\d{1,4}(px|vh|vw|rem|%)?)$/.test(clean[key] as string)){
        return NextResponse.json({error:`${key} must be auto or a simple CSS size such as 420px.`},{status:400});
      }
    }
    if(typeof clean.accent==='string'&&!/^#[0-9a-fA-F]{6}$/.test(clean.accent)){
      return NextResponse.json({error:'Accent must be a six-digit hex colour.'},{status:400});
    }
    if(clean.themeDefault&&!['dark','light','glass','tokyo','evolute','cinematic','editorial','slate','ink','forest'].includes(String(clean.themeDefault))){
      return NextResponse.json({error:'Invalid theme.'},{status:400});
    }
    if(clean.introMode&&!['off','first','always'].includes(String(clean.introMode))){
      return NextResponse.json({error:'Invalid intro mode.'},{status:400});
    }
    if(clean.siteLayout&&!['classic','rail','bento'].includes(String(clean.siteLayout))){
      return NextResponse.json({error:'Invalid layout.'},{status:400});
    }
    const introPresets=['pulse','breath','who','story','value','full','deep','cinema','epic','maximus'];
    if(clean.introPreset&&!introPresets.includes(String(clean.introPreset))){
      return NextResponse.json({error:'Invalid intro preset.'},{status:400});
    }
    if(typeof clean.introScenesJson==='string'&&clean.introScenesJson.length>20000){
      return NextResponse.json({error:'Custom intro is too large.'},{status:400});
    }
    for(const key of ['siteUrl','linkedin','socialImage']){
      if(typeof clean[key]==='string'&&clean[key]){
        try{
          const u=new URL(String(clean[key]));
          if(u.protocol!=='https:')throw new Error();
        }catch{
          return NextResponse.json({error:`${key} must be a valid HTTPS URL.`},{status:400});
        }
      }
    }
    if(typeof clean.email==='string'&&clean.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)){
      return NextResponse.json({error:'Email address is invalid.'},{status:400});
    }
    await adminDb().doc('siteSettings/global').set({...clean,updatedAt:FieldValue.serverTimestamp()},{merge:true});
    return NextResponse.json({ok:true});
  }catch(e){
    const m=e instanceof Error?e.message:'';
    return NextResponse.json(
      {error:m==='AUTH_REQUIRED'||m==='ADMIN_REQUIRED'?'You are not authorised.':'Could not save settings.'},
      {status:m==='AUTH_REQUIRED'||m==='ADMIN_REQUIRED'?403:500}
    );
  }
}
