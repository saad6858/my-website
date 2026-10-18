'use client';
import Link from 'next/link';
import {Fragment,useRef} from 'react';
import {motion} from 'motion/react';
import {ArrowLeft,ArrowRight,ArrowUpRight,MoveUpRight,Plus} from 'lucide-react';
import type {Section} from '@/lib/content';
import {Monogram} from './monogram';
import {AutomationArt} from './automation-art';
import {Reveal,RevealItem,WordReveal} from './motion-system';

function LineHeadline({text,hero=false}:{text:string;hero?:boolean}){
  const lines=text.split('\n');
  return <>{lines.map((line,i)=><Fragment key={`${i}-${line}`}><motion.span className="headline-line" initial={{opacity:0,y:hero?42:24,filter:'blur(7px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{duration:.86,delay:.15+i*.14,ease:[.16,1,.3,1]}}>{i===1?<em>{line}</em>:line}</motion.span>{i<lines.length-1&&<br/>}</Fragment>)}</>;
}

function Marquee(){const labels=['AI ASSISTANTS','WORKFLOW AUTOMATION','AGENTIC SYSTEMS','KNOWLEDGE / RAG','BUSINESS INTEGRATIONS'];return <div className="capability-marquee" aria-label="Capabilities"><div className="marquee-track">{[0,1].map(copy=><div className="marquee-group" key={copy} aria-hidden={copy===1}>{labels.map((label,i)=><span key={label}><i>{String(i+1).padStart(2,'0')}</i>{label}<b>✳</b></span>)}</div>)}</div></div>}

function HeroSection({section}:{section:Section}){
  const items=section.items||[];
  return <section className="hero-section" key={section.id}>
    <div className="hero section-wrap">
      <div className="hero-copy">
        <motion.p className="eyebrow hero-eyebrow" initial={{opacity:0,x:-14}} animate={{opacity:1,x:0}} transition={{duration:.6,delay:.1}}><span className="status-orb"/>{section.eyebrow||'SM AUTOMATIONS / INTELLIGENT SYSTEMS'}</motion.p>
        <h1><LineHeadline text={section.title||'Make room for\nwork that matters.'} hero/></h1>
        {section.body&&<motion.p className="hero-lede" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.43,ease:[.16,1,.3,1]}}>{section.body}</motion.p>}
        <motion.div className="hero-actions" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.58,ease:[.16,1,.3,1]}}>
          {section.ctaHref&&section.ctaLabel&&<Link className="button button-primary magnetic-link" href={section.ctaHref}><span>{section.ctaLabel}</span><ArrowUpRight size={16}/></Link>}
          {items.slice(0,1).map((it,i)=><Link className="button button-secondary" key={`${it.title}-${i}`} href={it.href||'/contact'}><span>{it.label||it.title}</span><ArrowUpRight size={15}/></Link>)}
        </motion.div>
        <motion.div className="hero-signals" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.95,duration:.7}}><span><i/> Built around real workflows</span><span>Human oversight, by design</span></motion.div>
      </div>
      <motion.div className="hero-visual-panel" initial={{opacity:0,scale:.96,x:18}} animate={{opacity:1,scale:1,x:0}} transition={{duration:1,delay:.2,ease:[.16,1,.3,1]}}><AutomationArt/></motion.div>
      <div className="hero-index" aria-hidden="true"><span>01</span><i/> <span>INTELLIGENCE / IN MOTION</span></div>
    </div>
    <Marquee/>
  </section>;
}

function SignalCard({item,index}:{item:NonNullable<Section['items']>[number];index:number}){
  const accent=['red','violet','blue','silver'][index%4];
  const href=item.href||'/contact';
  return <RevealItem index={index} className={`showcase-card showcase-${accent}`}><article className="showcase-card-inner"><div className={`showcase-art showcase-art-${index%4}`} aria-hidden="true"><div className="showcase-art-grid"/><div className="showcase-art-orbit orbit-a"/><div className="showcase-art-orbit orbit-b"/><div className="showcase-art-core">{index===0?<Monogram className="showcase-monogram"/>:<span>{String(index+1).padStart(2,'0')}</span>}</div><span className="showcase-art-label">{index===0?'MULTI-AGENT / RAG':index===1?'SYSTEM DESIGN':index===2?'WORKFLOW ENGINE':'INTELLIGENT LAYER'}</span></div><div className="showcase-card-content"><div className="showcase-card-kicker"><span>CASE / {String(index+1).padStart(2,'0')}</span><span className="showcase-card-mark">SM<span> ↗</span></span></div><h3>{item.title}</h3><p>{item.body}</p><Link className="card-link" href={href}>{item.label||'Explore the work'}<ArrowUpRight size={15}/></Link></div></article></RevealItem>;
}

function HorizontalShowcase({section}:{section:Section}){
  const rail=useRef<HTMLDivElement>(null);const items=section.items||[];
  const move=(dir:number)=>rail.current?.scrollBy({left:dir*Math.min(rail.current.clientWidth*.76,620),behavior:'smooth'});
  return <section className="showcase-section content-section section-wrap" key={section.id}><div className="showcase-heading"><Reveal className="section-intro"><p className="eyebrow">{section.eyebrow||'SELECTED WORK'}</p><h2>{section.title}</h2>{section.body&&<p>{section.body}</p>}</Reveal><div className="rail-controls"><button type="button" className="rail-arrow" aria-label="Scroll projects left" onClick={()=>move(-1)}><ArrowLeft size={17}/></button><button type="button" className="rail-arrow" aria-label="Scroll projects right" onClick={()=>move(1)}><ArrowRight size={17}/></button></div></div><div ref={rail} className="showcase-rail" tabIndex={0} aria-label="Horizontally scrollable project showcase">{items.map((item,i)=><SignalCard key={`${item.title}-${i}`} item={item} index={i}/>)}</div><div className="rail-hint"><span><i/> DRAG / SCROLL TO EXPLORE</span><span>{String(items.length).padStart(2,'0')} SELECTED SYSTEMS</span></div></section>;
}

export function SectionRenderer({sections}:{sections:Section[]}){
  return <>{sections.filter(s=>s.visible!==false).map((s)=>{
    const items=s.items||[];
    if(s.type==='hero')return <HeroSection section={s} key={s.id}/>;
    if(s.type==='featured'||s.type==='horizontal-showcase')return <HorizontalShowcase section={s} key={s.id}/>;
    if(s.type==='cards')return <section key={s.id} className="content-section section-wrap"><div className="section-intro-grid"><Reveal className="section-intro"><p className="eyebrow">{s.eyebrow||'WHAT WE BUILD'}</p><h2>{s.title}</h2>{s.body&&<p>{s.body}</p>}</Reveal><Reveal direction="left" delay={.12} className="section-side-note"><span className="side-note-symbol"><Plus size={15}/></span><span>Designed for the way your business actually works.</span></Reveal></div><div className="card-grid">{items.map((it,i)=><RevealItem key={`${s.id}-${i}`} index={i} className={`service-card-wrap service-card-wrap-${i%3}`}><article className="service-card"><div className="service-card-top"><span className="card-index">{String(i+1).padStart(2,'0')}</span><span className="card-trace"><i/><i/><i/></span></div><h3>{it.title}</h3><p>{it.body}</p>{it.href&&<Link href={it.href} className="card-link">Explore <ArrowUpRight size={16}/></Link>}<div className="card-spotlight" aria-hidden="true"/></article></RevealItem>)}</div></section>;
    if(['process','steps','timeline','stats'].includes(s.type))return <section key={s.id} className={`cms-sequence section-wrap cms-sequence-${s.type}`}><Reveal className="section-intro"><p className="eyebrow">{s.eyebrow|| (s.type==='timeline'?'THE JOURNEY':s.type==='stats'?'AT A GLANCE':'HOW IT WORKS')}</p><h2>{s.title}</h2>{s.body&&<p>{s.body}</p>}</Reveal><div className="sequence-grid">{items.map((it,i)=>{const data=it as any;return <RevealItem key={`${s.id}-${i}`} index={i} className="sequence-item"><article><span className="sequence-number">{s.type==='stats'?(data.value||data.metric||it.title):String(i+1).padStart(2,'0')}</span>{data.date&&<span className="sequence-date">{data.date}</span>}<h3>{s.type==='stats'?(data.label||it.body||it.title):(data.title||it.title)}</h3>{s.type!=='stats'&&<p>{it.body}</p>}{data.href&&<Link className="card-link" href={data.href}>{data.label||'Explore'} <ArrowUpRight size={15}/></Link>}</article></RevealItem>})}</div></section>;
    if(s.type==='faq')return <section key={s.id} className="cms-faq-section section-wrap"><Reveal className="section-intro"><p className="eyebrow">{s.eyebrow||'COMMON QUESTIONS'}</p><h2>{s.title}</h2>{s.body&&<p>{s.body}</p>}</Reveal><div className="cms-faq-list">{items.map((it,i)=><Reveal key={`${s.id}-${i}`} delay={Math.min(i*.04,.24)}><details><summary>{it.title}</summary><p>{it.body}</p></details></Reveal>)}</div></section>;
    if(s.type==='gallery'||s.type==='media')return <section key={s.id} className="cms-gallery-section section-wrap"><Reveal className="section-intro"><p className="eyebrow">{s.eyebrow||'MEDIA / DETAIL'}</p><h2>{s.title}</h2>{s.body&&<p>{s.body}</p>}</Reveal><div className="cms-gallery-grid">{(items.length?items:[{title:s.title||'Featured image',body:s.body,image:s.image}]).map((it,i)=>{const data=it as any;const src=typeof (data.image||data.url||data.src)==='string'?(data.image||data.url||data.src):'';return <RevealItem key={`${s.id}-${i}`} index={i} className="cms-gallery-item"><figure>{src.startsWith('https://')?<img src={src} alt={data.alt||data.title||s.title||'SM Automations media'} loading="lazy" decoding="async"/>:<div className="cms-gallery-placeholder"><Monogram className="showcase-monogram"/></div>}<figcaption><strong>{data.title||''}</strong>{data.body&&<span>{data.body}</span>}</figcaption></figure></RevealItem>})}</div></section>;
    if(s.type==='video'){const src=String((s as any).videoUrl||(s as any).url||s.image||(items[0] as any)?.url||items[0]?.href||'');return <section key={s.id} className="cms-video-section section-wrap"><Reveal className="section-intro"><p className="eyebrow">{s.eyebrow||'WATCH / EXPLORE'}</p><h2>{s.title}</h2>{s.body&&<p>{s.body}</p>}</Reveal><Reveal><div className="cms-video-frame">{src.startsWith('https://')?<video src={src} controls playsInline preload="metadata" poster={String((s as any).poster||'')} />:<div className="cms-gallery-placeholder"><span>Add an HTTPS Cloudinary video URL to this section.</span></div>}</div></Reveal></section>}
    if(s.type==='split')return <section key={s.id} className="split-section section-wrap"><Reveal direction="right" className="split-heading"><p className="eyebrow">{s.eyebrow||'A PRACTICAL APPROACH'}</p><h2><LineHeadline text={s.title||''}/></h2><div className="split-signature"><Monogram className="split-monogram"/><span>SM AUTOMATIONS<br/><small>INTELLIGENT BY DESIGN</small></span></div></Reveal><Reveal direction="left" delay={.15} className="split-copy"><span className="split-index">THOUGHT / 001</span><p>{s.body}</p>{s.ctaHref&&<Link className="text-link" href={s.ctaHref}>{s.ctaLabel||'Learn more'}<ArrowUpRight size={16}/></Link>}<div className="split-orbit" aria-hidden="true"><span/><span/><span/></div></Reveal></section>;
    if(s.type==='cta')return <motion.section key={s.id} className="cta-section section-wrap" initial={{opacity:0,y:38}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.8,ease:[.16,1,.3,1]}}><div className="cta-atmosphere" aria-hidden="true"><span/><span/><span/></div><div className="cta-content"><p className="eyebrow">{s.eyebrow||'THE NEXT STEP'}</p><h2><LineHeadline text={s.title||''}/></h2><p>{s.body}</p>{s.ctaHref&&<Link className="button button-primary" href={s.ctaHref}><span>{s.ctaLabel||'Contact us'}</span><MoveUpRight size={16}/></Link>}</div><div className="cta-deco" aria-hidden="true"><Monogram className="cta-monogram"/><span className="cta-deco-line"/></div></motion.section>;
    return <section key={s.id} className="prose-section section-wrap"><Reveal direction="right" className="prose-rail"><p className="eyebrow">{s.eyebrow||'THE DETAILS'}</p><span className="prose-vertical-label">SM / AUTOMATIONS</span></Reveal><Reveal className="prose-content">{s.title&&<h2><LineHeadline text={s.title}/></h2>}{s.body?.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}{items.map((it,i)=><p key={`${it.title}-${i}`}><strong>{it.title}</strong>{it.body?` — ${it.body}`:''}{it.href&&<> <Link className="inline-link" href={it.href}>{it.label||'Explore'} ↗</Link></>}</p>)}</Reveal></section>;
  })}</>;
}
