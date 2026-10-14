"use client";
import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { isColorTheme, DEFAULT_COLOR_THEME } from "@/lib/theme-catalog";
import { isLayoutDesign } from "@/lib/design-catalog";
export function ThemeProvider({children}:{children:React.ReactNode}) {
  const {settings}=useSiteSettings();
  useEffect(()=>{
    const root=document.documentElement;
    root.dataset.colorTheme=isColorTheme(settings.appearance.colorTheme)?settings.appearance.colorTheme:DEFAULT_COLOR_THEME;
    root.dataset.layoutDesign=isLayoutDesign(settings.appearance.layoutDesign)?settings.appearance.layoutDesign:"cinema-index";
    root.style.setProperty("--accent-primary",settings.appearance.accentColor||"#e5132b");
    const light=["ivory-forest","editorial-sand","sage-cream","lavender-paper","terracotta-sunset","rose-quartz","arctic-bloom"].includes(root.dataset.colorTheme);
    root.style.colorScheme=light?"light":"dark";
    root.classList.toggle("dark",!light);
  },[settings.appearance.colorTheme,settings.appearance.layoutDesign,settings.appearance.accentColor,settings.appearance.fontFamily]);
  return <>{children}</>;
}
