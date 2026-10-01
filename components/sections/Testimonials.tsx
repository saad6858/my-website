"use client";
import { Star } from "lucide-react";
import { useEffect,useState } from "react";
import { GlassCard } from "@/components/layout/GlassCard";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
const demo=[{quote:"A thoughtful builder who cares about the system behind the interface.",name:"Example Client",role:"Product Lead"},{quote:"Clear communication, strong systems thinking, and a polished final experience.",name:"Example Partner",role:"Founder"},{quote:"The biggest difference was how easy the product felt to evolve after launch.",name:"Example Collaborator",role:"Operator"}];
export function Testimonials(){const [i,setI]=useState(0);useEffect(()=>{const t=setInterval(()=>setI(x=>(x+1)%demo.length),5000);return()=>clearInterval(t)},[]);const x=demo[i];return <SectionWrapper><Container size="small"><SectionLabel text="TESTIMONIALS"/><h2 className="mt-5 text-4xl font-bold md:text-5xl">What Clients <span className="text-gradient">Say</span></h2><GlassCard className="mt-10"><div className="flex gap-1 text-amber-300">{Array.from({length:5},(_,n)=><Star key={n} size={16} fill="currentColor"/>)}</div><p className="mt-6 text-xl leading-8 text-slate-200">“{x.quote}”</p><div className="mt-7"><div className="font-semibold text-white">{x.name}</div><div className="text-sm text-slate-500">{x.role}</div></div></GlassCard><div className="mt-5 flex gap-2">{demo.map((_,n)=><button key={n} onClick={()=>setI(n)} className={`h-2 rounded-full transition ${i===n?"w-8 bg-emerald-400":"w-2 bg-slate-700"}`}/>)}</div></Container></SectionWrapper>}
