"use client";
import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
export function ThemeProvider({children}:{children:React.ReactNode}) {
  const {settings}=useSiteSettings();
  useEffect(()=>{
    const root=document.documentElement;
    root.dataset.colorTheme=settings.appearance.colorTheme||"obsidian-crimson";
    root.dataset.layoutDesign=settings.appearance.layoutDesign||"series-cinema";
    root.style.setProperty("--accent-primary",settings.appearance.accentColor||"#e5132b");
    const light=["ivory-editorial","warm-sand","arctic-blue","sage-studio","rose-quartz","lavender-mist","citrus-pop","cobalt-paper","terracotta","mono-ink"].includes(root.dataset.colorTheme);
    root.style.colorScheme=light?"light":"dark";
    root.classList.toggle("dark",!light);
  },[settings.appearance.colorTheme,settings.appearance.layoutDesign,settings.appearance.accentColor,settings.appearance.fontFamily]);
  return <>{children}</>;
}
