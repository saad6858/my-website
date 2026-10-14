import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

type ServiceLandingContent = {
  eyebrow: string;
  title: string;
  intro: string;
  idealFor: string;
  capabilities: string[];
  workflow: string[];
  boundaries: string[];
  cta: string;
};

export function serviceLandingMetadata(content: ServiceLandingContent): Metadata {
  return { title: content.title, description: content.intro.slice(0, 155), openGraph: { title: content.title, description: content.intro.slice(0, 200), type: "website" } };
}

export function ServiceLandingPage({ content }: { content: ServiceLandingContent }) {
  return <main className="pt-20">
    <section data-layout-section="hero" className="relative isolate overflow-hidden border-b border-[var(--cine-border)] px-4 py-16 md:py-24">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 78% 16%, color-mix(in srgb, var(--cine-accent) 20%, transparent), transparent 56%)" }} />
      <div className="mx-auto max-w-6xl">
        <Link href="/services" className="text-sm text-[var(--cine-muted)] hover:text-[var(--cine-fg)]">← All services</Link>
        <p className="mt-10 font-mono text-xs uppercase tracking-[.24em] text-[var(--cine-accent)]">{content.eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-.055em] md:text-6xl lg:text-7xl">{content.title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--cine-muted)] md:text-lg">{content.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[var(--cine-accent)] px-5 py-3 text-sm font-semibold text-[var(--cine-bg)]">{content.cta}<ArrowRight size={16}/></Link><Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-[var(--cine-border)] px-5 py-3 text-sm font-semibold">Compare services</Link></div>
      </div>
    </section>
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 md:py-16">
      <section className="rounded-2xl border border-[var(--cine-border)] bg-[var(--cine-bg-2)] p-6 md:p-8"><h2 className="text-xl font-bold">A good fit for</h2><p className="mt-4 text-sm leading-7 text-[var(--cine-muted)]">{content.idealFor}</p></section>
      <section className="rounded-2xl border border-[var(--cine-border)] bg-[var(--cine-bg-2)] p-6 md:p-8"><h2 className="text-xl font-bold">Possible capabilities</h2><ul className="mt-5 space-y-3">{content.capabilities.map((item)=><li key={item} className="flex gap-3 text-sm leading-6"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--cine-accent)]"/>{item}</li>)}</ul></section>
      <section className="rounded-2xl border border-[var(--cine-border)] p-6 md:p-8"><h2 className="text-xl font-bold">A practical rollout</h2><ol className="mt-5 space-y-4">{content.workflow.map((item,index)=><li key={item} className="flex gap-3 text-sm leading-6"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--cine-border)] font-mono text-xs text-[var(--cine-accent)]">{String(index+1).padStart(2,"0")}</span>{item}</li>)}</ol></section>
      <section className="rounded-2xl border border-[var(--cine-border)] p-6 md:p-8"><h2 className="flex items-center gap-2 text-xl font-bold"><ShieldCheck size={19} className="text-[var(--cine-accent)]"/> Scope & safeguards</h2><ul className="mt-5 space-y-3">{content.boundaries.map((item)=><li key={item} className="text-sm leading-6 text-[var(--cine-muted)]">• {item}</li>)}</ul></section>
    </div>
    <section className="mx-auto mb-16 max-w-6xl px-4"><div className="flex flex-col justify-between gap-5 rounded-2xl border border-[var(--cine-border)] bg-[var(--cine-bg-2)] p-6 md:flex-row md:items-center md:p-8"><div><h2 className="text-2xl font-bold">Start with the workflow, not the hype.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--cine-muted)]">We can map the current process, define the handoff points, and decide whether automation is appropriate before agreeing on scope.</p></div><Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--cine-border)] px-5 py-3 text-sm font-semibold">Discuss your use case <ArrowRight size={16}/></Link></div></section>
  </main>;
}
