"use client";
import { motion } from "framer-motion";
export function SlideUp({children,staggerDelay=.1,className}:{children:React.ReactNode;staggerDelay?:number;className?:string}){return <motion.div initial="hidden" whileInView="show" viewport={{once:true,amount:.1}} variants={{hidden:{},show:{transition:{staggerChildren:staggerDelay}}}} className={className}>{Array.isArray(children)?children.map((child,i)=><motion.div key={i} variants={{hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}}}}>{child}</motion.div>):children}</motion.div>}
