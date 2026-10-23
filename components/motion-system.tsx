'use client';
import type {ReactNode} from 'react';
import {AnimatePresence, motion, useScroll, useSpring} from 'motion/react';
import {usePathname} from 'next/navigation';

/** Page transitions use opacity/transform only — no filter:blur (zoom/GPU lag). */
export function PageTransition({children}:{children:ReactNode}){
  const pathname=usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="route-scene"
        initial={{opacity:0,y:10}}
        animate={{opacity:1,y:0}}
        exit={{opacity:0,y:-6}}
        transition={{duration:.32,ease:[.22,1,.36,1]}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function ScrollProgress(){
  const {scrollYProgress}=useScroll();
  const scaleX=useSpring(scrollYProgress,{stiffness:150,damping:30,restDelta:.001});
  return <motion.div className="scroll-progress" style={{scaleX,transformOrigin:'0% 50%'}} aria-hidden="true"/>;
}

export function Reveal({
  children,className='',delay=0,direction='up',once=true,amount=.14
}:{children:ReactNode;className?:string;delay?:number;direction?:'up'|'down'|'left'|'right'|'none';once?:boolean;amount?:number}){
  const offset=direction==='up'?{y:28}:direction==='down'?{y:-22}:direction==='left'?{x:24}:direction==='right'?{x:-24}:{};
  return (
    <motion.div
      className={className}
      initial={{opacity:0,...offset}}
      whileInView={{opacity:1,x:0,y:0}}
      viewport={{once,amount,margin:'0px 0px -40px 0px'}}
      transition={{duration:.7,delay,ease:[.16,1,.3,1]}}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({children,className='',index=0}:{children:ReactNode;className?:string;index?:number}){
  return (
    <motion.div
      className={className}
      initial={{opacity:0,y:24,scale:.99}}
      whileInView={{opacity:1,y:0,scale:1}}
      viewport={{once:true,amount:.18}}
      transition={{duration:.65,delay:Math.min(index*.08,.4),ease:[.16,1,.3,1]}}
      whileHover={{y:-6,transition:{duration:.22,ease:'easeOut'}}}
    >
      {children}
    </motion.div>
  );
}

export function WordReveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
  return (
    <motion.span
      className={className}
      initial={{opacity:0,y:'0.55em'}}
      animate={{opacity:1,y:0}}
      transition={{duration:.75,delay,ease:[.16,1,.3,1]}}
      style={{display:'inline-block',transformOrigin:'50% 100%'}}
    >
      {children}
    </motion.span>
  );
}

export function Stagger({children,className=''}:{children:ReactNode;className?:string}){
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{once:true,amount:.12}}
      variants={{hidden:{},show:{transition:{staggerChildren:.09,delayChildren:.06}}}}
    >
      {children}
    </motion.div>
  );
}
