"use client";
import type { ComponentType, ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, SectionHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminPageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
    <div>
      {eyebrow && <p className="font-mono text-[10px] uppercase tracking-[.25em] text-indigo-300">{eyebrow}</p>}
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>;
}

export function Panel({ children, className, ...props }: SectionHTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  return <section {...props} className={cn("rounded-2xl border border-slate-800 bg-slate-900/50", className)}>{children}</section>;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50", className)} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50", className)} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50", className)} />;
}

export function Label({ children }: { children: ReactNode }) {
  return <label className="text-xs font-medium uppercase tracking-wider text-slate-500">{children}</label>;
}

export function Loading({ label = "Loading…" }: { label?: string }) {
  return <div className="grid min-h-48 place-items-center rounded-2xl border border-slate-800 bg-slate-900/30"><div className="text-center text-slate-500"><LoaderCircle className="mx-auto animate-spin text-indigo-400" size={24} /><p className="mt-3 text-sm">{label}</p></div></div>;
}

export function Kpi({ label, value, icon: Icon, sub }: { label: string; value: string | number; icon?: ComponentType<{ size?: number }>; sub?: string }) {
  return <Panel className="p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-wider text-slate-600">{label}</p><p className="mt-2 text-3xl font-bold text-white">{value}</p>{sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}</div>{Icon && <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-300"><Icon size={19} /></div>}</div></Panel>;
}
