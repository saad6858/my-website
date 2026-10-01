"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useEffect,useState } from "react";
export function AnnouncementBar(){const {settings}=useSiteSettings();const [dismissed,setDismissed]=useState(false);useEffect(()=>{const at=Number(localStorage.getItem("announcement-dismissed")||0);if(at>Date.now()-86400000)setDismissed(true)},[]);if(!settings.announcement.enabled||dismissed)return null;return <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} className="fixed inset-x-0 top-0 z-50 border-b border-emerald-500/20 bg-emerald-500/10 text-center"><div className="relative mx-auto max-w-7xl px-10 py-2 text-xs font-medium text-emerald-300"><Link href={settings.announcement.link||"#"}>{settings.announcement.text}</Link><button aria-label="Dismiss" onClick={()=>{localStorage.setItem("announcement-dismissed",String(Date.now()));setDismissed(true)}} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300/70 hover:text-white"><X size={15}/></button></div></motion.div>}
