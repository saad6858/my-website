"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { PortfolioItem } from "@/types";

export function ProjectModal({ project, onClose }: { project: PortfolioItem | null; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!project) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { onClose(); return; }
      if (event.key !== "Tab" || !dialog.current) return;
      const focusable = [...dialog.current.querySelectorAll<HTMLElement>('button:not([disabled]):not([tabindex="-1"]), a[href], video[controls], [tabindex]:not([tabindex="-1"])')].filter((node) => node.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previousOverflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [project, onClose]);

  return <AnimatePresence>{project ? <motion.div ref={dialog} key={project.id} className="fixed inset-0 z-[130]" role="dialog" aria-modal="true" aria-labelledby={`project-modal-title-${project.id}`}>
    <motion.button type="button" aria-label="Close project details" tabIndex={-1} className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.28 }} onClick={onClose}/>
    <div className="absolute inset-0 overflow-y-auto overscroll-contain p-0 sm:p-6" data-lenis-prevent onClick={(event)=>{if(event.target===event.currentTarget)onClose();}}>
      <motion.article className="relative mx-auto min-h-full max-w-5xl overflow-hidden border border-[var(--cine-border)] bg-[var(--cine-bg)] shadow-2xl sm:my-8 sm:min-h-0 sm:rounded-2xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} transition={{ duration: reducedMotion ? 0 : 0.28 }}>
        <div className="relative h-[38vh] min-h-64 overflow-hidden sm:h-[54vh]">
          <motion.div layoutId={`project-art-${project.id}`} transition={{ layout: { duration: reducedMotion ? 0 : 0.55 } }} className="absolute inset-0">
            {project.coverImage ? <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 80vw" className="object-cover" priority/> : <div className="h-full w-full" style={{ background: "radial-gradient(ellipse at 70% 30%, color-mix(in srgb, var(--cine-accent) 42%, transparent), var(--cine-bg-2) 65%)" }} />}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--cine-bg)] via-transparent to-black/20"/>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close project details" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur hover:bg-black"><X size={18}/></button>
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--cine-accent-2)]">{project.category}</p><h2 id={`project-modal-title-${project.id}`} className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">{project.title}</h2></div>
        </div>
        <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[minmax(0,1fr)_16rem]">
          <div><p className="text-base leading-8 text-[var(--cine-muted)]">{project.description}</p>{project.gallery?.length ? <div className="mt-6 grid gap-3 sm:grid-cols-2">{project.gallery.map((url,index)=>url?<div key={`${project.id}-gallery-${index}`} className="relative aspect-video overflow-hidden rounded-xl border border-[var(--cine-border)]"><Image src={url} alt={`${project.title} gallery image ${index+1}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover"/></div>:null)}</div>:null}{project.videoUrl?<div className="mt-6 overflow-hidden rounded-xl border border-[var(--cine-border)] bg-black"><video src={project.videoUrl} controls playsInline preload="metadata" className="max-h-[560px] w-full" aria-label={`${project.title} project video`}/></div>:null}</div>
          <aside><p className="text-xs font-semibold uppercase tracking-[.18em] text-[var(--cine-muted)]">Build details</p><div className="mt-4 flex flex-wrap gap-2">{project.tech.map((tech)=><span key={tech} className="inline-flex items-center gap-1 rounded-full border border-[var(--cine-border)] px-3 py-1.5 text-xs"><Check size={12} className="text-[var(--cine-accent)]"/>{tech}</span>)}</div><p className="mt-6 text-sm text-[var(--cine-muted)]">Status: <span className="text-[var(--cine-fg)]">{project.status.replace("_", " ")}</span></p><a href={`/portfolio#${project.id}`} onClick={onClose} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--cine-border)] px-4 py-3 text-sm font-semibold hover:border-[var(--cine-accent)]">Open portfolio entry <ArrowUpRight size={16}/></a></aside>
        </div>
      </motion.article>
    </div>
  </motion.div> : null}</AnimatePresence>;
}
