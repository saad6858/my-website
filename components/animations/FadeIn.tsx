"use client";
import { motion } from "framer-motion";
export function FadeIn({children,delay=0,direction="up",duration=.8,className,once=true}:{children:React.ReactNode;delay?:number;direction?:"up"|"down"|"left"|"right"|"none";duration?:number;className?:string;once?:boolean}){const d={up:[0,40],down:[0,-40],left:[40,0],right:[-40,0],none:[0,0]} as const;const [x,y]=d[direction];return <motion.div initial={{opacity:0,x,y}} whileInView={{opacity:1,x:0,y:0}} viewport={{once,amount:.1}} transition={{duration,delay,ease:[.16,1,.3,1]}} className={className}>{children}</motion.div>}
