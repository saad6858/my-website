"use client";
import { motion,useScroll,useSpring,useVelocity } from "framer-motion";
export function VelocityText({children,className}:{children:React.ReactNode;className?:string}){const {scrollY}=useScroll();const v=useVelocity(scrollY);const skew=useSpring(v,{stiffness:200,damping:30});return <motion.span style={{skewX:skew}} className={className}>{children}</motion.span>}
