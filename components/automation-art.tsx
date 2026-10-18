'use client';
import {motion} from 'motion/react';
import {ArrowUpRight,BrainCircuit,Database,Workflow,Zap} from 'lucide-react';

export function AutomationArt(){return <div className="automation-art" aria-label="Abstract automation system illustration">
  <div className="art-halo art-halo-red"/><div className="art-halo art-halo-violet"/>
  <svg className="art-wires" viewBox="0 0 640 570" fill="none" aria-hidden="true">
    <defs><linearGradient id="wire-gradient" x1="50" y1="60" x2="570" y2="510" gradientUnits="userSpaceOnUse"><stop stopColor="#F05A55"/><stop offset=".52" stopColor="#A77CFF"/><stop offset="1" stopColor="#6BB8FF"/></linearGradient><linearGradient id="wire-fade" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".9"/><stop offset="1" stopColor="#fff" stopOpacity=".05"/></linearGradient></defs>
    <motion.path d="M92 116 C196 116 175 220 286 220 S388 310 516 310" stroke="url(#wire-gradient)" strokeWidth="1.5" strokeDasharray="5 9" initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:.8}} transition={{duration:2.2,ease:'easeInOut'}}/>
    <motion.path d="M109 432 C180 432 198 352 285 352 S392 150 531 150" stroke="url(#wire-fade)" strokeWidth="1" strokeDasharray="2 8" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:2.8,delay:.25,ease:'easeInOut'}} opacity=".5"/>
    <motion.circle cx="286" cy="220" r="5" fill="#F05A55" animate={{r:[4,7,4],opacity:[.65,1,.65]}} transition={{duration:2.3,repeat:Infinity}}/>
    <motion.circle cx="285" cy="352" r="4" fill="#A77CFF" animate={{r:[3,6,3],opacity:[.5,1,.5]}} transition={{duration:1.9,repeat:Infinity,delay:.3}}/>
    <motion.circle r="4" fill="#fff" animate={{cx:[92,175,286,388,516],cy:[116,116,220,310,310]}} transition={{duration:8,repeat:Infinity,ease:'linear'}}/>
  </svg>
  <motion.div className="art-orbit art-orbit-outer" animate={{rotate:360}} transition={{duration:44,repeat:Infinity,ease:'linear'}}/>
  <motion.div className="art-orbit art-orbit-inner" animate={{rotate:-360}} transition={{duration:33,repeat:Infinity,ease:'linear'}}/>
  <motion.div className="art-core" animate={{y:[0,-8,0],rotate:[0,1.5,0]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}><span className="art-core-label">SYSTEM 001</span><div className="art-core-glyph"><span>S</span><span>M</span></div><span className="art-core-caption">INTELLIGENCE / IN MOTION</span></motion.div>
  <motion.div className="art-float-card art-card-one" initial={{opacity:0,x:20,y:12}} animate={{opacity:1,x:0,y:0}} transition={{duration:.8,delay:.4}}><span className="art-card-icon"><Workflow size={16}/></span><span><b>Workflow orchestration</b><small>Trigger → decide → act</small></span><span className="art-live-dot"/></motion.div>
  <motion.div className="art-float-card art-card-two" initial={{opacity:0,x:-18,y:10}} animate={{opacity:1,x:0,y:0}} transition={{duration:.8,delay:.65}}><span className="art-card-icon violet"><BrainCircuit size={16}/></span><span><b>Agentic systems</b><small>Context-aware execution</small></span><ArrowUpRight size={14}/></motion.div>
  <motion.div className="art-float-card art-card-three" animate={{y:[0,-5,0]}} transition={{duration:5.6,repeat:Infinity,ease:'easeInOut'}}><span className="art-card-icon blue"><Database size={16}/></span><span><b>Knowledge layer</b><small>Retrieval grounded</small></span><Zap size={14} className="art-zap"/></motion.div>
  <span className="art-coordinate art-coordinate-top">24°51' N / 67°00' E</span><span className="art-coordinate art-coordinate-bottom">SM / AUTOMATIONS / 2026</span>
</div>}
