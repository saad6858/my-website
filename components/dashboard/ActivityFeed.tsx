"use client";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
export interface ActivityItem{ id:string;text:string;timestamp:Date; }
export function ActivityFeed({activities}:{activities:ActivityItem[]}){return <div className="space-y-3">{activities.slice(0,10).map((a,i)=><motion.div key={a.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.04}} className="flex gap-3 rounded-xl border border-slate-800/70 bg-slate-950/30 p-3"><span className="mt-0.5 rounded-lg bg-indigo-500/10 p-2 text-indigo-300"><Clock3 size={14}/></span><div><p className="text-sm text-slate-300">{a.text}</p><p className="mt-1 text-[10px] text-slate-600">{formatRelativeTime(a.timestamp)}</p></div></motion.div>)}{!activities.length&&<p className="p-5 text-sm text-slate-600">No recent activity.</p>}</div>}
