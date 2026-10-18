'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowUpRight, Menu, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Monogram} from './monogram';
type NavLink={label:string;href:string};
const fallback:NavLink[]=[{label:'Services',href:'/services'},{label:'Selected work',href:'/projects'},{label:'Industries',href:'/industries'},{label:'About',href:'/about'}];
function parseNavigation(raw?:string):NavLink[]{try{const x=JSON.parse(raw||'');if(Array.isArray(x)){const valid=x.filter((i:any)=>i&&typeof i.label==='string'&&typeof i.href==='string'&&i.href.startsWith('/')&&!i.href.startsWith('//')).slice(0,7).map((i:any)=>({label:i.label.slice(0,40),href:i.href.slice(0,120)}));if(valid.length)return valid}}catch{}return fallback}
export function SiteHeader({brand='SM Automations',navigationJson=''}:{brand?:string;navigationJson?:string}){
  const path=usePathname();const [open,setOpen]=useState(false);const links=parseNavigation(navigationJson);
  useEffect(()=>setOpen(false),[path]);
  useEffect(()=>{if(!open)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[open]);
  return <header className="site-header"><div className="header-inner"><Link className="brand" href="/" aria-label={`${brand} home`}><span className="brand-mark"><Monogram/></span><span className="brand-name">{brand}<small>AI SYSTEMS · AUTOMATION</small></span></Link><nav className={open?'nav open':'nav'} aria-label="Main navigation">{links.map(({label,href})=><Link key={`${label}-${href}`} className={path===href?'active':''} href={href}>{label}</Link>)}<Link className="nav-contact" href="/contact">Let’s talk <ArrowUpRight size={15}/></Link></nav><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open}>{open?<X size={21}/>:<Menu size={21}/>}</button></div></header>
}
