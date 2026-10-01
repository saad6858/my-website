"use client";
import { motion,useScroll } from "framer-motion";
export function ScrollProgress(){const {scrollYProgress}=useScroll();return <motion.div style={{scaleX:scrollYProgress,transformOrigin:"0%"}} className="fixed left-0 right-0 top-0 z-[70] h-[3px] bg-gradient-to-r from-emerald-400 to-emerald-600"/>}
