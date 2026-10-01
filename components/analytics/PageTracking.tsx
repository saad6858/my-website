"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";
export function PageTracking(){const pathname=usePathname();useEffect(()=>{if(pathname)void trackPageView(pathname)},[pathname]);return null;}
