"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
const titleMap:Record<string,string>={"/dashboard":"Overview","/dashboard/leads":"Lead Tracker","/dashboard/projects":"Project Pipeline","/dashboard/analytics":"Analytics","/dashboard/content":"Content Calendar","/dashboard/finance":"Finance","/dashboard/blog":"Blog CMS","/dashboard/settings":"Site Settings","/dashboard/contacts":"Contacts","/dashboard/newsletter":"Newsletter","/dashboard/files":"Files"};
export function DashboardFrame({children}:{children:React.ReactNode}){const [open,setOpen]=useState(false);const path=usePathname();const title=titleMap[path]||Object.entries(titleMap).find(([p])=>p!=="/dashboard"&&path.startsWith(p+"/"))?.[1]||"Dashboard";return <div className="min-h-screen bg-[#020617] text-white"><Sidebar isOpen={open} onClose={()=>setOpen(false)}/>{open?<button className="fixed inset-0 z-[85] bg-black/60 lg:hidden" onClick={()=>setOpen(false)} aria-label="Close sidebar"/>:null}<div className="lg:pl-[260px]"><TopBar onMenuClick={()=>setOpen(true)} title={title}/><AnimatePresence mode="wait"><motion.main key={path} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.2}} className="p-4 sm:p-6 lg:p-8">{children}</motion.main></AnimatePresence></div></div>}
