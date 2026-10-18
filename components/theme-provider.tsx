'use client';
import {createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
type Theme='signal'|'cobalt'|'editorial'|'teal'|'terminal'|'blueprint'|'paper';
const allowed:Theme[]=['signal','cobalt','editorial','teal','terminal','blueprint','paper'];
const C=createContext<{theme:Theme;setTheme:(v:Theme)=>void}>({theme:'signal',setTheme:()=>{}});
export function ThemeProvider({children,defaultTheme='signal'}:{children:React.ReactNode;defaultTheme?:string}){
  const initial:Theme=allowed.includes(defaultTheme as Theme)?defaultTheme as Theme:'signal';
  const [theme,setThemeState]=useState<Theme>(initial);
  useEffect(()=>{setThemeState(initial);document.documentElement.dataset.theme=initial;},[initial]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;},[theme]);
  const setTheme=useCallback((v:Theme)=>{if(allowed.includes(v))setThemeState(v)},[]);
  const value=useMemo(()=>({theme,setTheme}),[theme,setTheme]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
export function useTheme(){return useContext(C)}
