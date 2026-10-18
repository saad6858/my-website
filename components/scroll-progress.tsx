'use client';
import {useEffect} from 'react';

/** A single compositor-friendly reading-position indicator; no React state updates per scroll tick. */
export function ScrollProgress(){
  useEffect(()=>{
    const bar=document.querySelector<HTMLElement>('[data-scroll-progress]');
    if(!bar)return;
    let frame=0;
    const update=()=>{
      if(frame)return;
      frame=window.requestAnimationFrame(()=>{
        frame=0;
        const root=document.documentElement;
        const range=root.scrollHeight-window.innerHeight;
        const progress=range>0?Math.min(1,Math.max(0,window.scrollY/range)):0;
        bar.style.transform=`scaleX(${progress})`;
      });
    };
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update,{passive:true});
    update();
    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);if(frame)window.cancelAnimationFrame(frame)};
  },[]);
  return <div className="scroll-progress" data-scroll-progress aria-hidden="true"/>;
}
