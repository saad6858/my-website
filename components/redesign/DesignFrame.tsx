"use client";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function DesignSection({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  return <section id={id} data-layout-section={id || "section"} className={`redesign-section relative px-5 py-20 sm:px-8 md:py-28 ${className}`}><div className="redesign-section__inner mx-auto w-full max-w-[1320px]">{children}</div></section>;
}
export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return <p className="redesign-eyebrow flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-[var(--cine-accent)]"><span className="redesign-eyebrow__rule h-px w-7 bg-current" />{index ? <span className="font-mono opacity-60">{index}</span> : null}{children}</p>;
}
export function SectionHeading({ eyebrow, index, title, accent, description, align = "left" }: { eyebrow: string; index?: string; title: string; accent?: string; description?: string; align?: "left" | "center" }) {
  return <div className={`redesign-heading ${align === "center" ? "text-center" : ""}`}><Eyebrow index={index}>{eyebrow}</Eyebrow><h2 className="redesign-title mt-5 max-w-[16ch] text-[clamp(2.4rem,6vw,5.8rem)] font-semibold leading-[.96] tracking-[-.065em]">{title}{accent ? <> <span className="text-gradient">{accent}</span></> : null}</h2>{description ? <p className={`mt-6 max-w-2xl text-base leading-7 text-[var(--cine-muted)] sm:text-lg sm:leading-8 ${align === "center" ? "mx-auto" : ""}`}>{description}</p> : null}</div>;
}
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <Link href={href} className={`redesign-arrow-link group inline-flex min-h-12 items-center justify-center gap-3 border border-[var(--cine-border)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--cine-accent)] hover:bg-[var(--cine-accent)] hover:text-[var(--cine-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cine-accent)] ${className}`}>{children}<ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>;
}
export function NumberMark({ children }: { children: ReactNode }) { return <span className="redesign-number font-mono text-xs tracking-[.16em] text-[var(--cine-accent)]">{children}</span>; }
