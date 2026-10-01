"use client";
import type { LucideIcon } from "lucide-react";
export function EmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description: string; action?: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-8 py-14 text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-400"><Icon size={28}/></div><h3 className="text-lg font-semibold text-white">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{description}</p>{action ? <div className="mt-6">{action}</div> : null}</div>;
}
