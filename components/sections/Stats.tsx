"use client";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { CountUp } from "@/components/animations/CountUp";
import { useSiteSettings } from "@/hooks/useSiteSettings";
const fallback=[
  {id:"platform-shipped",value:"1",label:"Platform Shipped"},
  {id:"ideas-in-motion",value:"∞",label:"Ideas in Motion"},
  {id:"built-in-public",value:"100%",label:"Built in Public"},
  {id:"curiosity",value:"24/7",label:"Curiosity"}
];
export function Stats(){const {settings}=useSiteSettings();if(!settings.sections.stats)return null;const data=settings.stats.length?settings.stats:fallback;return <SectionWrapper className="bg-slate-900/40 py-16 md:py-20"><Container><div className="grid grid-cols-2 md:grid-cols-4">{data.map((s,i)=><motion.div key={s.id||i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}} className="relative px-4 py-5 text-center md:py-0">{i>0?<span className="absolute left-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-white/10 md:block"/>:null}<div className="text-3xl font-bold text-white md:text-4xl">{/^\d+$/.test(s.value)?<CountUp end={Number(s.value)}/>:s.value}</div><div className="mt-2 font-mono text-[10px] uppercase tracking-[.22em] text-slate-500">{s.label}</div></motion.div>)}</div></Container></SectionWrapper>}
