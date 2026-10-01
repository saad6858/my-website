"use client";
import { ArrowUpRight, Bot, BrainCircuit, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Service } from "@/types";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const fallback: Service[] = [
  { id: "workflow", title: "Workflow Automation", description: "Turn repetitive business processes into reliable systems with APIs, webhooks, notifications, and human handoffs.", icon: "Workflow", features: ["Process mapping", "API + webhook integrations", "Workflow orchestration", "Notifications + handoffs", "Maintenance-ready architecture"], price: "Custom", cta: "Discuss a Workflow", enabled: true },
  { id: "agentic-ai", title: "Agentic AI Systems", description: "Design multi-step AI workflows that research, reason, transform, and hand off work with clear guardrails.", icon: "BrainCircuit", features: ["Agent orchestration", "Tool calling", "Knowledge workflows", "Human-in-the-loop controls", "Observability + fallbacks"], price: "Custom", cta: "Plan an AI System", enabled: true },
  { id: "ai-web", title: "AI-Powered Web Platforms", description: "Build polished web products where AI, analytics, dashboards, and operations work together as one experience.", icon: "Bot", features: ["Next.js applications", "Admin dashboards", "Firebase backends", "Analytics + SEO", "Production deployment"], price: "Custom", cta: "Build a Platform", enabled: true },
];
const icons: Record<string, LucideIcon> = { Workflow, BrainCircuit, Bot };

export function Services() {
  const { settings } = useSiteSettings();
  const [services, setServices] = useState<Service[]>(fallback);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/services", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : []))
      .then((data: Service[]) => { if (!cancelled && Array.isArray(data) && data.length) setServices(data); })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);
  if (!settings.sections.services) return null;
  return <SectionWrapper id="services"><Container><SectionLabel text="SERVICES" /><div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><h2 className="text-4xl font-bold tracking-tight md:text-5xl">What I Can <span className="text-gradient">Build</span></h2><p className="mt-4 max-w-2xl text-slate-400">End-to-end digital systems tailored to the real workflow behind the problem.</p></div><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">Start a conversation <ArrowUpRight size={17} /></Link></div><div className="mt-12 grid gap-7 lg:grid-cols-3">{services.map((service,index)=>{const Icon=icons[service.icon]??Bot;return <motion.div key={service.id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{delay:index*.1}} className="h-full"><SpotlightCard className="h-full"><div className="h-full rounded-2xl bg-slate-950/25 p-7"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400"><Icon size={28}/></div><h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p><div className="my-7 h-px bg-white/10"/><div className="space-y-3">{service.features.map(feature=><div key={feature} className="flex items-start gap-3 text-sm text-slate-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400"/>{feature}</div>)}</div><Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:border-emerald-500/40 hover:bg-emerald-500/10">{service.cta} <ArrowUpRight size={16}/></Link></div></SpotlightCard></motion.div>})}</div></Container></SectionWrapper>;
}
