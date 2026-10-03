"use client";
import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
export function ThemeProvider({children}:{children:React.ReactNode}){ const {settings}=useSiteSettings(); useEffect(()=>{const version=settings.siteVersion||"v1-dark";const light=version!=="v1-dark";document.documentElement.dataset.siteVersion=version;document.documentElement.classList.toggle("dark",!light);document.documentElement.style.colorScheme=light?"light":"dark";document.documentElement.style.setProperty("--accent-primary",settings.appearance.accentColor||"#10b981");},[settings.siteVersion,settings.appearance.accentColor]); return <>{children}</>; }
