"use client";
import { useEffect,useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import type { PortfolioItem } from "@/types";
export default function PortfolioPage(){const [items,setItems]=useState<PortfolioItem[]>([]);const [cat,setCat]=useState("All");useEffect(()=>{fetch("/api/portfolio",{cache:"no-store"}).then(r=>r.ok?r.json():[]).then(setItems).catch(()=>{})},[]);const cats=["All",...Array.from(new Set(items.map(p=>p.category)))];const shown=cat==="All"?items:items.filter(p=>p.category===cat);return <main className="pt-28 pb-20"><Container><SectionLabel text="PORTFOLIO"/><h1 className="mt-5 text-5xl font-black md:text-7xl">My <span className="text-gradient">Portfolio</span></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">A collection of systems, interfaces, experiments, and product ideas.</p><div className="mt-9"><PortfolioFilter categories={cats.length?cats:["All"]} active={cat} onChange={setCat}/></div><div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{shown.map((p,i)=><PortfolioCard key={p.id} project={p} index={i}/>)}</div></Container></main>}
