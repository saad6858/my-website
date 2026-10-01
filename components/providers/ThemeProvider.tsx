"use client";
import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
export function ThemeProvider({children}:{children:React.ReactNode}){ const {settings}=useSiteSettings(); useEffect(()=>{document.documentElement.classList.add("dark"); document.documentElement.style.setProperty("--accent-primary",settings.appearance.accentColor||"#10b981");},[settings.appearance.accentColor]); return <>{children}</>; }
