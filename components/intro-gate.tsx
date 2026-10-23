'use client';
import {useEffect,useState} from 'react';
import {Monogram} from './monogram';

/**
 * introMode:
 *  - off: never show
 *  - first: once per session
 *  - always: every visit / every load
 * Legacy: enabled + everyVisit still supported by callers mapping into mode.
 */
export function IntroGate({
  enabled=true,
  everyVisit=false,
  mode
}:{enabled?:boolean;everyVisit?:boolean;mode?:'off'|'first'|'always'}){
  const resolved: 'off'|'first'|'always' =
    mode || (!enabled ? 'off' : everyVisit ? 'always' : 'first');

  const [visible,setVisible]=useState(false);

  useEffect(()=>{
    if(resolved==='off')return;
    try{
      if(resolved==='first' && sessionStorage.getItem('sm-intro-seen'))return;
      setVisible(true);
      const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
      const timer=window.setTimeout(()=>{
        setVisible(false);
        if(resolved==='first')sessionStorage.setItem('sm-intro-seen','1');
      },reduce?200:1400);
      return()=>window.clearTimeout(timer);
    }catch{}
  },[resolved]);

  if(resolved==='off'||!visible)return null;

  function skip(){
    try{if(resolved==='first')sessionStorage.setItem('sm-intro-seen','1')}catch{}
    setVisible(false);
  }

  return (
    <div className="intro-gate" role="dialog" aria-label="Site introduction">
      <div className="intro-inner">
        <Monogram className="intro-monogram"/>
        <p className="eyebrow">SM AUTOMATIONS / INTELLIGENT SYSTEMS</p>
        <p className="intro-title">Thoughtfully built.<br/>Purposefully useful.</p>
      </div>
      <button onClick={skip} className="intro-skip">Skip intro ↗</button>
    </div>
  );
}
