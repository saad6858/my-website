"use client";
export function Shimmer({className,children}:{className?:string;children?:React.ReactNode}){return <div className={`animate-shimmer bg-[linear-gradient(110deg,rgba(255,255,255,.04)_8%,rgba(255,255,255,.10)_18%,rgba(255,255,255,.04)_33%)] bg-[length:200%_100%] ${className||""}`}>{children}</div>}
