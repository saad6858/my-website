'use client';
import type {ReactNode} from 'react';
import {AnimatePresence, motion, useScroll, useSpring} from 'motion/react';
import {usePathname} from 'next/navigation';

export function PageTransition({children}:{children:ReactNode}){
  const pathname=usePathname();
  return <AnimatePresence mode="wait" initial={false}><motion.div key={pathname} className="route-scene" initial={{opacity:0,y:12,filter:'blur(5px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-8,filter:'blur(3px)'}} transition={{duration:.38,ease:[.22,1,.36,1]}}>{children}</motion.div></AnimatePresence>;
}

export function ScrollProgress(){
  const {scrollYProgress}=useScroll();
  const scaleX=useSpring(scrollYProgress,{stiffness:150,damping:30,restDelta:.001});
  return <motion.div className="scroll-progress" style={{scaleX,transformOrigin:'0% 50%'}} aria-hidden="true"/>;
}

export function Reveal({children,className='',delay=0,direction='up',once=true,amount=.14}:{children:ReactNode;className?:string;delay?:number;direction?:'up'|'down'|'left'|'right'|'none';once?:boolean;amount?:number}){
  const offset=direction==='up'?{y:34}:direction==='down'?{y:-26}:direction==='left'?{x:30}:direction==='right'?{x:-30}:{};
  return <motion.div className={className} initial={{opacity:0,...offset,filter:'blur(5px)'}} whileInView={{opacity:1,x:0,y:0,filter:'blur(0px)'}} viewport={{once,amount,margin:'0px 0px -40px 0px'}} transition={{duration:.78,delay,ease:[.16,1,.3,1]}}>{children}</motion.div>;
}

export function RevealItem({children,className='',index=0}:{children:ReactNode;className?:string;index?:number}){
  return <motion.div className={className} initial={{opacity:0,y:28,scale:.985}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,amount:.18}} transition={{duration:.72,delay:Math.min(index*.085,.42),ease:[.16,1,.3,1]}} whileHover={{y:-7,transition:{duration:.25,ease:'easeOut'}}}>{children}</motion.div>;
}

export function WordReveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
  return <motion.span className={className} initial={{opacity:0,y:'0.7em',rotateX:-24,filter:'blur(7px)'}} animate={{opacity:1,y:0,rotateX:0,filter:'blur(0px)'}} transition={{duration:.85,delay,ease:[.16,1,.3,1]}} style={{display:'inline-block',transformOrigin:'50% 100%'}}>{children}</motion.span>;
}

export function Stagger({children,className=''}:{children:ReactNode;className?:string}){
  return <motion.div className={className} initial="hidden" whileInView="show" viewport={{once:true,amount:.12}} variants={{hidden:{},show:{transition:{staggerChildren:.09,delayChildren:.06}}}}>{children}</motion.div>;
}
