"use client";
import { AnimatePresence,motion } from "framer-motion";
export function PageTransition({children}: {children:React.ReactNode}){return <AnimatePresence mode="wait"><motion.div key="page" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.4,ease:[.16,1,.3,1]}}>{children}</motion.div></AnimatePresence>}
