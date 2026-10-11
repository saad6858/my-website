"use client";
import {useEffect} from "react";
import Lenis from "lenis";
export function SmoothScroll(){useEffect(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const lenis=new Lenis({duration:1.05,easing:(t:number)=>1-Math.pow(1-t,4),smoothWheel:true,autoRaf:true});return()=>lenis.destroy()},[]);return null}
