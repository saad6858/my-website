"use client";
import Image from "next/image";
import { motion } from "framer-motion";
export function RevealImage({src,alt,className,delay=0,fill=false}:{src:string;alt:string;className?:string;delay?:number;fill?:boolean}){return <motion.div initial={{clipPath:"inset(0 100% 0 0)",scale:1.05}} whileInView={{clipPath:"inset(0 0% 0 0)",scale:1}} viewport={{once:true,amount:.2}} transition={{duration:1,ease:[.16,1,.3,1],delay}} className={`relative overflow-hidden ${className||""}`}>{fill?<Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover"/>:<Image src={src} alt={alt} width={1200} height={1500} className="h-full w-full object-cover"/>}</motion.div>}
