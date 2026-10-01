"use client";
import { useEffect,useState } from "react";
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&";
export function TextScramble({text,className,delay=0}:{text:string;className?:string;delay?:number}){const [out,setOut]=useState("");useEffect(()=>{let raf=0;let start=0;const run=()=>{const now=performance.now();if(!start)start=now;const p=Math.min(1,(now-start)/1500);let s="";for(let i=0;i<text.length;i++){if(i/text.length<p)s+=text[i];else if(text[i]===" ")s+=" ";else s+=chars[Math.floor(Math.random()*chars.length)]}setOut(s);if(p<1)raf=requestAnimationFrame(run);else setOut(text)};const t=window.setTimeout(()=>raf=requestAnimationFrame(run),delay);return()=>{clearTimeout(t);cancelAnimationFrame(raf)}},[text,delay]);return <span className={className}>{out}</span>}
