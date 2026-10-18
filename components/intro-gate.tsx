'use client';
import {useEffect,useRef,useState} from 'react';
import {Monogram} from './monogram';
export function IntroGate({enabled=true}:{enabled?:boolean}){
  const [visible,setVisible]=useState(false);const skipRef=useRef<HTMLButtonElement|null>(null);
  useEffect(()=>{if(!enabled)return;try{if(sessionStorage.getItem('sm-intro-seen'))return;setVisible(true);const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const timer=window.setTimeout(()=>{setVisible(false);sessionStorage.setItem('sm-intro-seen','1')},reduce?80:1050);return()=>window.clearTimeout(timer)}catch{}},[enabled]);
  useEffect(()=>{if(visible)skipRef.current?.focus({preventScroll:true})},[visible]);
  if(!enabled||!visible)return null;
  function skip(){try{sessionStorage.setItem('sm-intro-seen','1')}catch{}setVisible(false)}
  function onKeyDown(e:React.KeyboardEvent<HTMLDivElement>){if(e.key==='Escape'){e.preventDefault();skip()}if(e.key==='Tab'){e.preventDefault();skipRef.current?.focus()}}
  return <div className="intro-gate" role="dialog" aria-modal="true" aria-label="SM Automations introduction" onKeyDown={onKeyDown}><div className="intro-inner" aria-hidden="true"><Monogram className="intro-monogram"/><p className="eyebrow">SM AUTOMATIONS / AI SYSTEMS</p><p className="intro-title">Make work flow.<br/><span>Make room to grow.</span></p><div className="intro-progress"><i/></div></div><button ref={skipRef} onClick={skip} className="intro-skip">Skip intro ↗</button></div>
}
