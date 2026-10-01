"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, TriangleAlert, XCircle, X } from "lucide-react";
import { useEffect } from "react";
export type ToastType = "success"|"error"|"warning"|"info";
const config = { success:{icon:CheckCircle2, border:"border-emerald-500/40", iconClass:"text-emerald-400"}, error:{icon:XCircle,border:"border-red-500/40",iconClass:"text-red-400"}, warning:{icon:TriangleAlert,border:"border-amber-500/40",iconClass:"text-amber-400"}, info:{icon:Info,border:"border-indigo-500/40",iconClass:"text-indigo-400"} } as const;
export function Toast({ message, type="info", onClose }: { message:string; type?:ToastType; onClose:()=>void }) { const C=config[type]; const Icon=C.icon; useEffect(()=>{ const t=window.setTimeout(onClose,4000); return()=>window.clearTimeout(t)},[onClose]); return <AnimatePresence><motion.div initial={{opacity:0,x:30,y:-12}} animate={{opacity:1,x:0,y:0}} exit={{opacity:0,x:30}} className={`pointer-events-auto fixed right-4 top-4 z-[120] flex max-w-sm items-center gap-3 rounded-xl border ${C.border} bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-xl`}><Icon size={18} className={C.iconClass}/><span className="text-sm text-slate-200">{message}</span><button onClick={onClose} className="ml-2 text-slate-500 hover:text-white"><X size={16}/></button></motion.div></AnimatePresence>; }
