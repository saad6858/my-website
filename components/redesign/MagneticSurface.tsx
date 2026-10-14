"use client";
import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
export function MagneticSurface({children,className="",strength=7,animateIn=true}:{children:ReactNode;className?:string;strength?:number;animateIn?:boolean}){
 const reduced=useReducedMotion();const rawX=useMotionValue(0);const rawY=useMotionValue(0);const x=useSpring(rawX,{stiffness:170,damping:20,mass:.25});const y=useSpring(rawY,{stiffness:170,damping:20,mass:.25});
 const move=(event:PointerEvent<HTMLDivElement>)=>{if(reduced||event.pointerType!=="mouse")return;const rect=event.currentTarget.getBoundingClientRect();rawX.set(((event.clientX-rect.left)/rect.width-.5)*strength*2);rawY.set(((event.clientY-rect.top)/rect.height-.5)*strength*2)};
 const reset=()=>{rawX.set(0);rawY.set(0)};
 return <motion.div className={className} style={{x:reduced?0:x,y:reduced?0:y,willChange:reduced?"auto":"transform"}} initial={animateIn&&!reduced?{opacity:0,scale:.965}:false} animate={{opacity:1,scale:1}} transition={{duration:reduced?0:.8,ease:[.22,1,.36,1]}} onPointerMove={move} onPointerLeave={reset}>{children}</motion.div>;
}
